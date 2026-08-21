import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="about section-padding">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="title-line"></span>
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="section-subtitle">Who I am and what I do</p>
        </motion.div>

        <div className="about-content" style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'center' }}>
          <motion.div 
            className="about-image"
            style={{ flex: '1 1 400px' }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div className="image-wrapper" style={{ position: 'relative', borderRadius: 'var(--border-radius)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--light-gray)' }}>
              <div style={{ width: '100%', height: '400px', background: 'var(--gradient-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ color: 'var(--primary-dark)', fontSize: '2.5rem', fontWeight: 800, textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>Al-amin</h3>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="about-text"
            style={{ flex: '1 1 500px' }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Full Stack Web Developer</h3>
            <p style={{ marginTop: '15px', color: '#64748b', lineHeight: 1.8 }}>
              I am a passionate Full Stack Web Developer with expertise in building scalable, real-world applications. 
              I specialize in Laravel, React, and modern JavaScript architectures. My journey in web development 
              has led me to work on complex marketplaces, real-time geofencing delivery apps, and highly secure 
              transactional platforms.
            </p>
            <p style={{ marginTop: '15px', color: '#64748b', lineHeight: 1.8 }}>
              I am dedicated to writing clean, efficient code and delivering exceptional user experiences. 
              When I'm not coding, I'm exploring new technologies, optimizing backend architectures, or 
              collaborating with teams to solve challenging technical problems.
            </p>
            
            <div className="about-stats" style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
              <div className="stat-box" style={{ padding: '20px', background: '#fff', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', textAlign: 'center', flex: 1 }}>
                <h4 style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '5px' }}>3+</h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Years Experience</p>
              </div>
              <div className="stat-box" style={{ padding: '20px', background: '#fff', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', textAlign: 'center', flex: 1 }}>
                <h4 style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '5px' }}>20+</h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Projects Completed</p>
              </div>
              <div className="stat-box" style={{ padding: '20px', background: '#fff', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', textAlign: 'center', flex: 1 }}>
                <h4 style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '5px' }}>15+</h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Happy Clients</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
