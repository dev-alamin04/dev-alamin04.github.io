import React, { useEffect, useRef, useState } from 'react';

const FishBackground = () => {
  const canvasRef = useRef(null);

  // Store fish state and refs in a single persistent object
  const [fishes] = useState(() => {
    const createFish = (id, type) => {
      const baseScale = type === 'red' ? (1.15 + Math.random() * 0.2) : (0.9 + Math.random() * 0.15);
      return {
        id, type,
        groupRef: React.createRef(),
        tailOutlineRef: React.createRef(),
        tailRaysRefs: Array.from({ length: 9 }).map(() => React.createRef()),
        x: 0, y: 0, angle: 0, 
        lerp: 0.035 + Math.random() * 0.02, 
        timeOffset: Math.random() * 10000, 
        baseScale, scale: baseScale, opacity: 1, state: 'alive', stateTimer: 0
      };
    };

    return [
      createFish(1, 'golden'),
      createFish(2, 'golden'),
      createFish(3, 'golden'),
      createFish(5, 'red'),
      createFish(6, 'red'),
      createFish(7, 'red'),
      createFish(8, 'red')
    ];
  });
  const fishesRef = useRef(fishes);

  // Store sharks state and refs
  const [sharks] = useState(() => {
    const createShark = (id, scale, lerp) => ({
      id,
      groupRef: React.createRef(),
      tailOutlineRef: React.createRef(),
      mouthRef: React.createRef(),
      x: 0, y: 0, angle: 0, lerp, scale,
      timeOffset: Math.random() * 1000,
      bitingUntil: 0
    });

    return [
      createShark(1, 2.2, 0.035),
      createShark(2, 2.0, 0.032)
    ];
  });
  const sharksRef = useRef(sharks);
  const bloodParticlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Helper to pick a random point within padded screen bounds
    const getRandomPoint = (margin, currentX, currentY, minDist = 0) => {
      let pt = { x: 0, y: 0 };
      for(let i = 0; i < 15; i++) {
        pt.x = margin + Math.random() * (canvas.width - 2 * margin);
        pt.y = margin + Math.random() * (canvas.height - 2 * margin);
        if (currentX === undefined || currentY === undefined) return pt;
        const dist = Math.sqrt(Math.pow(pt.x - currentX, 2) + Math.pow(pt.y - currentY, 2));
        if (dist >= minDist) return pt;
      }
      return pt;
    };

    // Bubbles and Debris for underwater effect
    const bubbles = Array.from({ length: 80 }).map(() => {
      const isDebris = Math.random() > 0.4; // 60% chance of being tiny debris
      return {
        isDebris,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: isDebris ? Math.random() * 1.5 + 0.5 : Math.random() * 2 + 1,
        speed: isDebris ? Math.random() * 0.3 + 0.1 : Math.random() * 1.5 + 0.5,
        vx: isDebris ? (Math.random() - 0.5) * 0.5 : 0,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        wobbleDist: isDebris ? Math.random() * 2 + 1 : Math.random() * 10 + 5,
        wobbleOffset: Math.random() * Math.PI * 2,
        opacity: isDebris ? Math.random() * 0.2 + 0.05 : Math.random() * 0.15 + 0.05
      };
    });

    // Generates the tail outline and internal fin rays based on sine waves
    const generateTailPaths = (time, offset) => {
      const w1 = Math.sin(time * 0.005 + offset) * 12;
      const w2 = Math.cos(time * 0.004 + offset) * 15;
      const w3 = Math.sin(time * 0.003 + offset) * 10;
      
      const bx = -20; // Tail base attachment X
      const byTop = -6;
      const byBot = 6;
    
      // Far corners of the tail
      const topX = -80 + w1;
      const topY = -45 + w2;
      const botX = -80 + w2;
      const botY = 45 - w1;
    
      // Trailing edge midpoint
      const midX = -95 + w3;
      const midY = 0 + w1;
    
      const tailOutline = `
        M ${bx},${byTop} 
        C -45,-30 -60,-45 ${topX},${topY}
        C ${topX - 10},${topY + 20} ${midX - 5},${midY - 15} ${midX},${midY}
        C ${midX - 5},${midY + 15} ${botX - 10},${botY - 20} ${botX},${botY}
        C -60,45 -45,30 ${bx},${byBot}
        Z
      `;
      
      const rays = [];
      const numRays = 9;
      for (let i = 0; i < numRays; i++) {
        const t = i / (numRays - 1);
        let targetX, targetY;
        
        if (t < 0.5) {
          const u = t * 2;
          targetX = topX * (1 - u) + midX * u;
          targetY = topY * (1 - u) + midY * u;
        } else {
          const u = (t - 0.5) * 2;
          targetX = midX * (1 - u) + botX * u;
          targetY = midY * (1 - u) + botY * u;
        }
        
        const ctrlX = bx + (targetX - bx) * 0.5 - 10;
        const ctrlY = targetY * 0.6;
        rays.push(`M ${bx},0 Q ${ctrlX},${ctrlY} ${targetX},${targetY}`);
      }
      
      return { tailOutline, rays };
    };

    // Generates a rigid sweeping crescent tail for the sharks
    const generateSharkTail = (time, offset = 0) => {
      const w1 = Math.sin(time * 0.005 + offset) * 15;
      const bx = -30;
      const topX = -60 + w1;
      const topY = -35;
      const botX = -60 + w1;
      const botY = 35;
      const inCtrlX = -40 + w1;
      const inCtrlY = 0;
      
      return `
        M ${bx}, -8
        Q ${bx - 10}, -20 ${topX}, ${topY}
        Q ${inCtrlX}, ${inCtrlY} ${botX}, ${botY}
        Q ${bx - 10}, 20 ${bx}, 8
        Z
      `;
    };

    let lastTime = Date.now();

    const animate = () => {
      const time = Date.now();
      const deltaTime = Math.min((time - lastTime) / 16.67, 3); // Normalize to 60fps, cap at 3 to prevent huge jumps
      lastTime = time;
      
      // 1. Clear Canvas (Background moved to CSS layer)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Bubbles and Debris
      bubbles.forEach(b => {
        b.y -= b.speed * deltaTime;
        b.x += b.vx * deltaTime;
        if (b.y < -10) {
          b.y = canvas.height + 10;
          b.x = Math.random() * canvas.width;
        }
        if (b.x < -10) b.x = canvas.width + 10;
        if (b.x > canvas.width + 10) b.x = -10;

        const xOffset = Math.sin(time * b.wobbleSpeed + b.wobbleOffset) * b.wobbleDist;
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity})`;
        ctx.beginPath();
        ctx.arc(b.x + xOffset, b.y, b.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Blood Particles
      const activeBlood = [];
      bloodParticlesRef.current.forEach(p => {
        const elapsed = time - p.spawnTime;
        if (elapsed < p.lifespan) {
          const progress = elapsed / p.lifespan;
          // Decelerate over time
          const currentVx = p.vx * (1 - progress);
          const currentVy = p.vy * (1 - progress);
          
          p.x += currentVx * deltaTime;
          p.y += currentVy * deltaTime;
          
          const opacity = 1 - Math.pow(progress, 2); // Ease-in fade out
          const currentSize = p.size * (1 - progress * 0.5); // shrink slightly
          
          ctx.fillStyle = `rgba(185, 28, 28, ${opacity})`; // red-700
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
          ctx.fill();
          
          activeBlood.push(p);
        }
      });
      bloodParticlesRef.current = activeBlood;

      // Initialize targets if missing
      sharksRef.current.forEach(shark => {
        if (shark.targetX === undefined) {
          const pt = getRandomPoint(150);
          shark.targetX = pt.x;
          shark.targetY = pt.y;
        }
      });
      fishesRef.current.forEach(f => {
        if (f.targetX === undefined) {
          const pt = getRandomPoint(100);
          f.targetX = pt.x;
          f.targetY = pt.y;
        }
      });

      // 2a. Update Sharks (Autonomous Hunt / Wander)
      sharksRef.current.forEach(shark => {
        let nearestFish = null;
        let minSharkDist = Infinity;
        
        fishesRef.current.forEach(fish => {
          if (fish.state !== 'alive') return;
          const dx = fish.x - shark.x;
          const dy = fish.y - shark.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < minSharkDist) {
            minSharkDist = dist;
            nearestFish = fish;
          }
        });

        let sTargetSpeedMult = 1;
        const sharkDetectDist = 250;
        const sharkCatchDist = 85; // Increased catch radius significantly to account for 2.2x scale origin offset

        if (nearestFish && minSharkDist < sharkDetectDist) {
          // Hunting Mode
          shark.targetX = nearestFish.x;
          shark.targetY = nearestFish.y;
          sTargetSpeedMult = 1.3; // Speed up to hunt
          
          if (minSharkDist < sharkCatchDist) {
            // Fish caught! Mark it as dying
            nearestFish.state = 'dying';
            nearestFish.stateTimer = time;
            
            // Trigger bite animation
            shark.bitingUntil = time + 400;
            
            // Spawn blood particles
            for (let i = 0; i < 8; i++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = Math.random() * 6 + 2;
              bloodParticlesRef.current.push({
                x: nearestFish.x,
                y: nearestFish.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 3 + 2,
                spawnTime: time,
                lifespan: 400 + Math.random() * 200
              });
            }
            
            // Shark resumes wandering immediately
            const newTarget = getRandomPoint(150, shark.x, shark.y, 200);
            shark.targetX = newTarget.x;
            shark.targetY = newTarget.y;
          }
        } else {
          // Wandering Mode
          sTargetSpeedMult = 0.6; // Calmer speed
          const distToTarget = Math.sqrt(Math.pow(shark.targetX - shark.x, 2) + Math.pow(shark.targetY - shark.y, 2));
          if (distToTarget < 100) {
            const pt = getRandomPoint(150, shark.x, shark.y, 200);
            shark.targetX = pt.x;
            shark.targetY = pt.y;
          }
        }

        // Smoothly ramp speed multiplier
        if (shark.currentSpeedMult === undefined) shark.currentSpeedMult = sTargetSpeedMult;
        shark.currentSpeedMult += (sTargetSpeedMult - shark.currentSpeedMult) * 0.05 * deltaTime;

        // Move Shark via Velocity Steering (Reynolds)
        const sdx = shark.targetX - shark.x;
        const sdy = shark.targetY - shark.y;
        const sDistToTarget = Math.sqrt(sdx*sdx + sdy*sdy);
        
        let sDesiredVx = 0;
        let sDesiredVy = 0;
        if (sDistToTarget > 0) {
          const baseSharkSpeed = 9;
          sDesiredVx = (sdx / sDistToTarget) * baseSharkSpeed * shark.currentSpeedMult;
          sDesiredVy = (sdy / sDistToTarget) * baseSharkSpeed * shark.currentSpeedMult;
        }
        
        if (shark.vx === undefined) shark.vx = 0;
        if (shark.vy === undefined) shark.vy = 0;
        
        // Lerp actual velocity to desired velocity for smooth direction changes
        shark.vx += (sDesiredVx - shark.vx) * shark.lerp * deltaTime;
        shark.vy += (sDesiredVy - shark.vy) * shark.lerp * deltaTime;
        
        shark.x += shark.vx * deltaTime;
        shark.y += shark.vy * deltaTime;
        
        // Strict Boundary clamp for shark
        shark.x = Math.max(50, Math.min(canvas.width - 50, shark.x));
        shark.y = Math.max(50, Math.min(canvas.height - 50, shark.y));

        if (Math.abs(shark.vx) > 0.1 || Math.abs(shark.vy) > 0.1) {
          const vAngle = Math.atan2(shark.vy, shark.vx);
          let deltaAngle = vAngle - shark.angle;
          while (deltaAngle > Math.PI) deltaAngle -= Math.PI * 2;
          while (deltaAngle < -Math.PI) deltaAngle += Math.PI * 2;
          shark.angle += deltaAngle * 0.08 * deltaTime; 
        }
        
        if (shark.groupRef.current) {
          const speed = Math.sqrt(shark.vx*shark.vx + shark.vy*shark.vy);
          const wiggleAmp = speed > 1 ? 2 : 0.5;
          const wiggle = Math.sin(time * 0.005 + shark.timeOffset) * wiggleAmp;
          
          shark.groupRef.current.setAttribute(
            'transform', 
            `translate(${shark.x}, ${shark.y}) rotate(${shark.angle * (180 / Math.PI) + wiggle}) scale(${shark.scale})`
          );
        }
        
        if (shark.tailOutlineRef.current) {
          shark.tailOutlineRef.current.setAttribute('d', generateSharkTail(time, shark.timeOffset));
        }

        if (shark.mouthRef.current) {
          let jawOpenAmount = 0;
          if (time < shark.bitingUntil) {
            const timeRemaining = shark.bitingUntil - time; // 400 to 0
            if (timeRemaining > 250) {
              jawOpenAmount = (400 - timeRemaining) / 150; // Opening
            } else if (timeRemaining > 150) {
              jawOpenAmount = 1; // Holding
            } else {
              jawOpenAmount = timeRemaining / 150; // Closing
            }
          }
          
          const qY = 10 + (jawOpenAmount * 12);
          const endX = 32 - (jawOpenAmount * 4);
          const endY = 10 + (jawOpenAmount * 6);
          shark.mouthRef.current.setAttribute('d', `M 45,7 Q 38,${qY} ${endX},${endY}`);
        }
      });

      // 2b. Update Fish (Autonomous Flee / Wander / Respawn)
      fishesRef.current.forEach((fish) => {
        
        // State Machine for Catch & Respawn
        if (fish.state === 'dying') {
          const elapsed = time - fish.stateTimer;
          if (elapsed < 300) {
            fish.opacity = 1 - (elapsed / 300);
            fish.scale = fish.baseScale * (1 - (elapsed / 300));
          } else {
            fish.state = 'dead';
            fish.stateTimer = time + 1500 + Math.random() * 1000; // Wait 1.5 - 2.5s
            fish.opacity = 0;
            fish.scale = 0.01;
          }
        } else if (fish.state === 'dead') {
          if (time > fish.stateTimer) {
            fish.state = 'spawning';
            fish.stateTimer = time;
            
            // Find a safe spawn point away from all sharks
            let safePt = { x: 0, y: 0 };
            for(let i=0; i<30; i++) {
               safePt = getRandomPoint(100);
               const tooClose = sharksRef.current.some(s => Math.hypot(s.x - safePt.x, s.y - safePt.y) < 300);
               if (!tooClose) break;
            }
            fish.x = safePt.x;
            fish.y = safePt.y;
            fish.targetX = safePt.x;
            fish.targetY = safePt.y;
            fish.vx = 0;
            fish.vy = 0;
            fish.angle = Math.random() * Math.PI * 2;
          }
        } else if (fish.state === 'spawning') {
          const elapsed = time - fish.stateTimer;
          if (elapsed < 400) {
            fish.opacity = elapsed / 400;
            fish.scale = fish.baseScale * (elapsed / 400);
          } else {
            fish.state = 'alive';
            fish.opacity = 1;
            fish.scale = fish.baseScale;
          }
        }
        
        if (fish.state !== 'alive' && fish.state !== 'spawning') {
          // If dead or dying, skip movement and just apply transforms
          if (fish.groupRef.current) {
            fish.groupRef.current.setAttribute(
              'transform', 
              `translate(${fish.x}, ${fish.y}) rotate(${fish.angle * (180 / Math.PI)}) scale(${fish.scale})`
            );
            fish.groupRef.current.style.opacity = fish.opacity;
          }
          return;
        }

        let minSharkDist = Infinity;
        let nearestShark = null;
        
        sharksRef.current.forEach(shark => {
          const dx = fish.x - shark.x;
          const dy = fish.y - shark.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < minSharkDist) {
            minSharkDist = dist;
            nearestShark = shark;
          }
        });
        
        let fTargetSpeedMult = 1;
        const fishDangerDist = 200;
        
        if (nearestShark && minSharkDist < fishDangerDist) {
          // Fleeing Mode
          fTargetSpeedMult = 1.8; // Panic speed
          
          const dxShark = fish.x - nearestShark.x;
          const dyShark = fish.y - nearestShark.y;
          
          let dirX = dxShark / minSharkDist;
          let dirY = dyShark / minSharkDist;
          
          let tempTargetX = fish.x + dirX * 200;
          let tempTargetY = fish.y + dirY * 200;
          
          // Boundary avoidance while fleeing (slide along walls)
          const wallMargin = 150;
          if (fish.x < wallMargin) tempTargetX += (wallMargin - fish.x) * 1.5;
          if (fish.x > canvas.width - wallMargin) tempTargetX -= (fish.x - (canvas.width - wallMargin)) * 1.5;
          if (fish.y < wallMargin) tempTargetY += (wallMargin - fish.y) * 1.5;
          if (fish.y > canvas.height - wallMargin) tempTargetY -= (fish.y - (canvas.height - wallMargin)) * 1.5;
          
          fish.targetX = tempTargetX;
          fish.targetY = tempTargetY;
        } else {
          // Wandering Mode
          fTargetSpeedMult = 0.5; // Idle swimming
          const distToTarget = Math.sqrt(Math.pow(fish.targetX - fish.x, 2) + Math.pow(fish.targetY - fish.y, 2));
          if (distToTarget < 50) {
            const pt = getRandomPoint(100, fish.x, fish.y, 150);
            fish.targetX = pt.x;
            fish.targetY = pt.y;
          }
        }

        // Smoothly ramp speed multiplier
        if (fish.currentSpeedMult === undefined) fish.currentSpeedMult = fTargetSpeedMult;
        fish.currentSpeedMult += (fTargetSpeedMult - fish.currentSpeedMult) * 0.05 * deltaTime;
        
        // Move Fish via Velocity Steering (Reynolds)
        const fdx = fish.targetX - fish.x;
        const fdy = fish.targetY - fish.y;
        const fDistToTarget = Math.sqrt(fdx*fdx + fdy*fdy);
        
        let fDesiredVx = 0;
        let fDesiredVy = 0;
        if (fDistToTarget > 0) {
          const baseFishSpeed = 11;
          fDesiredVx = (fdx / fDistToTarget) * baseFishSpeed * fish.currentSpeedMult;
          fDesiredVy = (fdy / fDistToTarget) * baseFishSpeed * fish.currentSpeedMult;
        }
        
        if (fish.vx === undefined) fish.vx = 0;
        if (fish.vy === undefined) fish.vy = 0;
        
        fish.vx += (fDesiredVx - fish.vx) * fish.lerp * deltaTime;
        fish.vy += (fDesiredVy - fish.vy) * fish.lerp * deltaTime;
        
        fish.x += fish.vx * deltaTime;
        fish.y += fish.vy * deltaTime;
        
        // Strict boundary clamp for fish
        fish.x = Math.max(20, Math.min(canvas.width - 20, fish.x));
        fish.y = Math.max(20, Math.min(canvas.height - 20, fish.y));

        if (Math.abs(fish.vx) > 0.1 || Math.abs(fish.vy) > 0.1) {
          const velocityAngle = Math.atan2(fish.vy, fish.vx);
          
          let deltaAngle = velocityAngle - fish.angle;
          while (deltaAngle > Math.PI) deltaAngle -= Math.PI * 2;
          while (deltaAngle < -Math.PI) deltaAngle += Math.PI * 2;
          
          fish.angle += deltaAngle * 0.1 * deltaTime; 
        }

        // Apply transformations directly to the SVG <g> element
        if (fish.groupRef.current) {
          const speed = Math.sqrt(fish.vx*fish.vx + fish.vy*fish.vy);
          const wiggleFreq = speed > 5 ? 0.015 : 0.003;
          const wiggleAmp = speed > 5 ? 8 : 2; // Degrees
          const wiggle = Math.sin(time * wiggleFreq + fish.timeOffset) * wiggleAmp;
          
          fish.groupRef.current.setAttribute(
            'transform', 
            `translate(${fish.x}, ${fish.y}) rotate(${fish.angle * (180 / Math.PI) + wiggle}) scale(${fish.scale})`
          );
          fish.groupRef.current.style.opacity = fish.opacity;
        }
        
        // Update SVG tail paths
        if (fish.tailOutlineRef.current) {
          const { tailOutline, rays } = generateTailPaths(time, fish.timeOffset);
          fish.tailOutlineRef.current.setAttribute('d', tailOutline);
          
          fish.tailRaysRefs.forEach((rayRef, i) => {
            if (rayRef.current) {
              rayRef.current.setAttribute('d', rays[i]);
            }
          });
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      {/* 1. Deep Water Gradient Layer */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, #0284c7 0%, #0369a1 25%, #0f172a 65%, #020617 100%)',
        zIndex: -4
      }} />

      {/* 2. Organic Caustics Layer via SVG Filter */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: -3, opacity: 0.12, mixBlendMode: 'screen' }}>
        <filter id="caustic-wobble">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="1" result="noise">
            <animate attributeName="baseFrequency" values="0.012; 0.015; 0.012" dur="20s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <g filter="url(#caustic-wobble)">
          {/* Overlapping wavy light streaks */}
          <ellipse cx="20%" cy="30%" rx="35%" ry="8%" fill="#38bdf8" transform="rotate(-15)" />
          <ellipse cx="70%" cy="20%" rx="40%" ry="10%" fill="#38bdf8" transform="rotate(10)" />
          <ellipse cx="40%" cy="60%" rx="40%" ry="8%" fill="#38bdf8" transform="rotate(-5)" />
          <ellipse cx="85%" cy="75%" rx="30%" ry="10%" fill="#38bdf8" transform="rotate(20)" />
          <ellipse cx="15%" cy="85%" rx="30%" ry="8%" fill="#38bdf8" transform="rotate(-10)" />
          <ellipse cx="50%" cy="40%" rx="20%" ry="15%" fill="#38bdf8" transform="rotate(5)" />
        </g>
      </svg>

      {/* 3. Radial Vignette Layer for Depth Focus */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.6) 110%)',
        zIndex: -2
      }} />

      {/* 4. Canvas for Dynamic Particles (Bubbles & Blood) */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }}
      />

      {/* SVG Container for the Fish Vectors */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          {/* Seamless gradient applied across the entire fish from head to tail */}
          <linearGradient id="goldenGrad" gradientUnits="userSpaceOnUse" x1="35" y1="0" x2="-100" y2="0">
            <stop offset="0%" stopColor="#fef08a" />    {/* Light yellow at head */}
            <stop offset="20%" stopColor="#eab308" />   {/* Golden body */}
            <stop offset="70%" stopColor="#ea580c" />   {/* Orange transition */}
            <stop offset="100%" stopColor="#be123c" />  {/* Deep red/rose tail ends */}
          </linearGradient>

          <linearGradient id="redGrad" gradientUnits="userSpaceOnUse" x1="35" y1="0" x2="-100" y2="0">
            <stop offset="0%" stopColor="#fca5a5" />    {/* Light red/pink at head */}
            <stop offset="20%" stopColor="#ef4444" />   {/* Red body */}
            <stop offset="70%" stopColor="#b91c1c" />   {/* Dark red transition */}
            <stop offset="100%" stopColor="#7f1d1d" />  {/* Deepest red tail ends */}
          </linearGradient>
          
          <linearGradient id="rayGrad" gradientUnits="userSpaceOnUse" x1="-20" y1="0" x2="-100" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>

          {/* Shark gradient */}
          <linearGradient id="sharkGrad" gradientUnits="userSpaceOnUse" x1="50" y1="0" x2="-60" y2="0">
            <stop offset="0%" stopColor="#475569" />   {/* slate-600 */}
            <stop offset="50%" stopColor="#1e293b" />  {/* slate-800 */}
            <stop offset="100%" stopColor="#0f172a" /> {/* slate-900 */}
          </linearGradient>
        </defs>

        {/* Shark Characters */}
        {sharks.map(shark => (
          <g key={shark.id} ref={shark.groupRef}>
            <path ref={shark.tailOutlineRef} fill="url(#sharkGrad)" opacity="0.95" />
            <g className="shark-body-static">
              {/* Dorsal Fin */}
              <path d="M 0,-15 C -5,-35 -15,-40 -20,-15 Z" fill="url(#sharkGrad)" opacity="0.95" />
              {/* Pectoral Fin */}
              <path d="M 10,10 C 0,30 -15,45 -5,15 Z" fill="url(#sharkGrad)" opacity="0.95" />
              {/* Main Body (Thick Snout) */}
              <path d="M -30,0 C -30,-22 15,-24 45,-10 C 53,-5 55,4 46,10 C 20,22 -30,20 -30,0 Z" fill="url(#sharkGrad)" />
              {/* Mouth Line */}
              <path ref={shark.mouthRef} stroke="#0f172a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              {/* Eye */}
              <circle cx="36" cy="-7" r="2.5" fill="#111" />
              <circle cx="37" cy="-8" r="1" fill="#fff" />
              {/* Gill slits */}
              <path d="M 18,-2 L 15,6 M 22,-3 L 19,7 M 26,-4 L 23,8" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </g>
        ))}

        {/* Fish Characters */}
        {fishes.map(fish => (
          <g key={fish.id} ref={fish.groupRef}>
            
            {/* Animated Tail Outline */}
            <path ref={fish.tailOutlineRef} fill={`url(#${fish.type}Grad)`} opacity="0.9" />
            
            {/* Animated Tail Fin Rays */}
            {fish.tailRaysRefs.map((rayRef, i) => (
              <path key={i} ref={rayRef} stroke="url(#rayGrad)" strokeWidth="0.75" fill="none" />
            ))}

            {/* Static Body & Fins */}
            <g className="body-static">
              {/* Dorsal Fin (Top) */}
              <path d="M 5,-10 C -5,-35 -25,-30 -20,-2 Z" fill={`url(#${fish.type}Grad)`} opacity="0.95" />
              
              {/* Pelvic/Anal Fin (Bottom) */}
              <path d="M 10,8 C -5,40 -25,35 -20,2 Z" fill={`url(#${fish.type}Grad)`} opacity="0.95" />
              
              {/* Main Body (Oval/Teardrop) */}
              <path d="M -25,0 C -25,-18 15,-20 35,0 C 15,20 -25,18 -25,0 Z" fill={`url(#${fish.type}Grad)`} />
              
              {/* Pectoral Fin (Side) */}
              <path d="M 15,4 Q 5,12 10,18 Q 18,12 15,4 Z" fill={fish.type === 'red' ? "#ef4444" : "#eab308"} opacity="0.8" />
              
              {/* Eye */}
              <circle cx="23" cy="-4" r="2" fill="#111" />
              <circle cx="24" cy="-5" r="0.8" fill="#fff" />
              
              {/* Subtle dark gill patch */}
              <path d="M 12,2 Q 16,8 10,12 Q 8,8 12,2 Z" fill={fish.type === 'red' ? "#991b1b" : "#b45309"} opacity="0.5" />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default FishBackground;
