import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{
      background: scrolled ? 'var(--glass-bg)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
      transition: 'all 0.4s ease'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <motion.a 
          href="#" 
          className="logo"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--dark)', textDecoration: 'none', letterSpacing: '-0.5px' }}
        >
          Dev<span style={{ color: 'var(--primary)' }}>Alamin</span>
        </motion.a>

        <div className={`nav-links ${isOpen ? 'active' : ''}`} style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Services', 'Contact'].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
            >
              <Link
                activeClass="active"
                to={item.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onClick={() => setIsOpen(false)}
                className="nav-link"
                style={{ color: 'var(--gray)', fontWeight: 500, cursor: 'pointer', transition: 'color 0.3s ease' }}
                onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                onMouseOut={(e) => e.target.style.color = 'var(--gray)'}
              >
                {item}
              </Link>
            </motion.div>
          ))}
          <motion.a 
            href="Alamin_khalifa_resume.pdf" 
            target="_blank" 
            className="btn btn-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-lg)' }}
            whileTap={{ scale: 0.95 }}
            style={{ padding: '10px 24px', borderRadius: '50px', background: 'var(--gradient)', color: '#fff', fontWeight: 600, textDecoration: 'none', boxShadow: 'var(--shadow)' }}
          >
            Resume
          </motion.a>
        </div>

        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
