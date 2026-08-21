import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiLock } from 'react-icons/fi';
import { clientProjects } from '../data/projects';

const Timeline = () => {
  return (
    <section id="experience" className="client-projects-section section-padding">
      <div className="container">
        <motion.div 
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="title-line"></span>
            Client <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subtitle">Real-world applications I've built for clients with my team</p>
        </motion.div>

        <div className="experience-timeline" style={{ position: 'relative', marginTop: '50px' }}>
          {/* Vertical Line */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6)', transform: 'translateX(-50%)', opacity: 0.2 }} className="timeline-line hidden md:block"></div>

          {clientProjects.map((project, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div 
                key={project.id}
                className="timeline-item"
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  position: 'relative',
                  width: '100%',
                  marginBottom: '40px'
                }}
              >
                {/* Timeline Dot */}
                <motion.div 
                  className="timeline-dot hidden md:block"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '30px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#3b82f6',
                    transform: 'translate(-50%, -50%)',
                    border: '4px solid #fff',
                    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)'
                  }}
                />

                <div 
                  className="timeline-content"
                  style={{
                    width: '100%',
                    maxWidth: '48%',
                    background: '#fff',
                    padding: '30px',
                    borderRadius: '15px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    position: 'relative'
                  }}
                >
                  <div className="timeline-header" style={{ marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '1.4rem', color: '#1e293b' }}>{project.title}</h3>
                    <span style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '20px', fontSize: '0.8rem', marginTop: '10px' }}>
                      {project.type}
                    </span>
                  </div>
                  <div className="timeline-body">
                    <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '20px' }}>
                      {project.description}
                    </p>
                    <div className="project-features" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                      {project.features.map((feature, i) => (
                        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569', fontSize: '0.9rem' }}>
                          <FiCheck style={{ color: '#10b981', flexShrink: 0 }} /> {feature}
                        </span>
                      ))}
                    </div>
                    <div className="tech-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                      {project.techStack.map((tech, i) => (
                        <span key={i} style={{ padding: '4px 10px', background: '#f1f5f9', color: '#64748b', borderRadius: '4px', fontSize: '0.8rem' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.isPrivate && (
                      <button 
                        disabled 
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 15px', background: '#f1f5f9', color: '#94a3b8', border: 'none', borderRadius: '6px', fontSize: '0.9rem', cursor: 'not-allowed' }}
                      >
                        <FiLock /> Private Repository
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
