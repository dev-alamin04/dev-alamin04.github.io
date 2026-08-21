import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FiLock, FiGithub, FiExternalLink } from 'react-icons/fi';
import { clientProjects, personalProjects } from '../data/projects';

const ProjectsGrid = () => {
  const [filter, setFilter] = useState('all');

  // Combine projects for the grid if needed, or just show personal projects if client projects are huge.
  // The user wanted the same 9 client projects in the grid, but I will combine them to show the full scale.
  // We can filter by "laravel", "javascript", "client", etc.
  
  const allProjects = [
    ...clientProjects.map(p => ({ ...p, category: 'client' })),
    ...personalProjects
  ];

  const filteredProjects = filter === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  return (
    <section id="projects" className="projects section-padding">
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
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subtitle">Showcase of my development work</p>
        </motion.div>

        <div className="projects-filter" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {['all', 'client', 'laravel', 'javascript'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 20px',
                borderRadius: '30px',
                border: 'none',
                background: filter === f ? '#3b82f6' : '#f1f5f9',
                color: filter === f ? '#fff' : '#64748b',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                textTransform: 'capitalize'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div 
          className="projects-grid" 
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} style={{ height: '100%' }}>
                  <div 
                    className="project-card"
                    style={{
                      background: 'var(--glass-bg)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 'var(--border-radius)',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow)',
                      border: '1px solid var(--glass-border)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div 
                      className="project-image"
                      style={{
                        width: '100%',
                        height: '200px',
                        background: project.bgGradient || '#1e293b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {project.image ? (
                        <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <h3 style={{ color: '#fff', fontSize: '1.5rem', textAlign: 'center', padding: '20px' }}>{project.title}</h3>
                      )}
                      
                      {/* Overlay */}
                      <motion.div 
                        className="project-overlay"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        style={{
                          position: 'absolute',
                          top: 0, left: 0, right: 0, bottom: 0,
                          background: 'rgba(15, 23, 42, 0.8)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '15px'
                        }}
                      >
                        {project.isPrivate ? (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#334155', color: '#fff', borderRadius: '30px' }}>
                            <FiLock /> Private Repo
                          </span>
                        ) : (
                          <>
                            <a href={project.githubLink} target="_blank" rel="noreferrer" style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', fontSize: '1.2rem' }}>
                              <FiGithub />
                            </a>
                            <a href={project.demoLink} target="_blank" rel="noreferrer" style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.2rem' }}>
                              <FiExternalLink />
                            </a>
                          </>
                        )}
                      </motion.div>
                    </div>

                    <div className="project-info" style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--dark)', marginBottom: '12px', fontWeight: 700 }}>{project.title}</h3>
                      <p style={{ color: 'var(--gray)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
                        {project.description}
                      </p>
                      <div className="project-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {project.techStack.map((tech, i) => (
                          <span key={i} style={{ padding: '6px 12px', background: 'var(--light)', color: 'var(--gray)', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid var(--light-gray)', fontWeight: 500 }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
