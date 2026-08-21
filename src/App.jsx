import React, { useCallback, useEffect } from 'react';
import useSound from 'use-sound';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import ProjectsGrid from './components/ProjectsGrid';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

// We can use a simple data URI for high-tech sounds (to avoid missing files), 
// but for now, we'll just handle the events and you can plug in real MP3s later.
// Using a short, synthetic base64 sound for hover/click just to prove it works.
const hoverSoundBase64 = "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhCAAAAAECAwQFBgcICQ=="; 
const clickSoundBase64 = "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhCAAAAAECAwQFBgcICQ==";

function App() {
  const [playHover] = useSound(hoverSoundBase64, { volume: 0.1 });
  const [playClick] = useSound(clickSoundBase64, { volume: 0.2 });

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('nav-link')
      ) {
        playHover();
      }
    };

    const handleClick = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button')
      ) {
        playClick();
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, [playHover, playClick]);

  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  return (
    <div className="app-container">
      <CustomCursor />
      
      {/* Global Interactive Background */}
      <Particles
        id="tsparticles-global"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 150, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#38bdf8" },
            links: { color: "#a855f7", distance: 150, enable: true, opacity: 0.15, width: 1 },
            move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 0.5, straight: false },
            number: { density: { enable: true, area: 1000 }, value: 60 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
          },
          detectRetina: true,
        }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}
      />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Timeline />
        <ProjectsGrid />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
