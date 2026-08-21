import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-scroll';

const Hero = () => {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  return (
    <section id="home" className="hero">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: { value: "transparent" },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#4f46e5" },
            links: {
              color: "#0ea5e9",
              distance: 150,
              enable: true,
              opacity: 0.15,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: false,
              speed: 1,
              straight: false,
            },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      />
      
      <div className="container relative z-10">
        <div className="hero-content">
          <motion.h2 
            className="greeting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hello, I'm
          </motion.h2>
          <motion.h1 
            className="name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Al-amin <span className="text-gradient">Khalifa</span>
          </motion.h1>
          <motion.div 
            className="typewriter-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="typed-text text-xl md:text-2xl font-medium text-gray-400">Full Stack Web Developer</span>
          </motion.div>
          
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            I build exceptional and accessible digital experiences for the web.
          </motion.p>
          
          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            style={{ display: 'flex', gap: '15px' }}
          >
            <Link to="projects" smooth={true} duration={500} style={{ padding: '12px 28px', background: 'var(--gradient)', color: '#fff', borderRadius: '50px', cursor: 'pointer', fontWeight: 600, boxShadow: 'var(--shadow-lg)' }}>
              View My Work
            </Link>
            <Link to="contact" smooth={true} duration={500} style={{ padding: '12px 28px', background: '#fff', color: 'var(--primary)', border: '2px solid var(--primary)', borderRadius: '50px', cursor: 'pointer', fontWeight: 600 }}>
              Contact Me
            </Link>
          </motion.div>

          <motion.div 
            className="social-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            style={{ display: 'flex', gap: '20px', marginTop: '30px' }}
          >
            <a href="https://github.com/dev-alamin04" target="_blank" rel="noreferrer" style={{ fontSize: '1.5rem', color: 'var(--gray)', transition: 'color 0.3s' }} onMouseOver={(e)=>e.target.style.color='var(--primary)'} onMouseOut={(e)=>e.target.style.color='var(--gray)'}><FiGithub /></a>
            <a href="https://www.linkedin.com/in/al-amin-khalifa" target="_blank" rel="noreferrer" style={{ fontSize: '1.5rem', color: 'var(--gray)', transition: 'color 0.3s' }} onMouseOver={(e)=>e.target.style.color='var(--primary)'} onMouseOut={(e)=>e.target.style.color='var(--gray)'}><FiLinkedin /></a>
            <a href="https://twitter.com/dev_alamin04" target="_blank" rel="noreferrer" style={{ fontSize: '1.5rem', color: 'var(--gray)', transition: 'color 0.3s' }} onMouseOver={(e)=>e.target.style.color='var(--primary)'} onMouseOut={(e)=>e.target.style.color='var(--gray)'}><FiTwitter /></a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
