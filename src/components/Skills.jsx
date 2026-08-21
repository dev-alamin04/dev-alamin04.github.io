import React from 'react';
import { motion } from 'framer-motion';

const skillsData = {
  frontend: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Bootstrap', 'Tailwind CSS', 'Alpine.js'],
  backend: ['PHP', 'Laravel', 'Node.js', 'Express.js', 'Python'],
  database: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
  tools: ['Git & GitHub', 'Docker', 'AWS', 'Firebase', 'Postman', 'Figma']
};

const SkillCategory = ({ title, skills, delay }) => (
  <motion.div 
    className="skill-category"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
  >
    <h3 className="category-title" style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px' }}>
      {title}
    </h3>
    <div className="skills-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {skills.map((skill, index) => (
        <motion.span 
          key={index} 
          className="skill-tag"
          whileHover={{ scale: 1.1, backgroundColor: '#3b82f6', color: '#fff' }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ padding: '8px 15px', background: '#f8fafc', color: '#475569', borderRadius: '20px', fontSize: '0.9rem', cursor: 'default', border: '1px solid #e2e8f0' }}
        >
          {skill}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  return (
    <section id="skills" className="skills section-padding" style={{ background: '#f8fafc' }}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-center">
            <span className="title-line"></span>
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="section-subtitle text-center">Technologies I work with</p>
        </motion.div>

        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '40px' }}>
          <SkillCategory title="Frontend Development" skills={skillsData.frontend} delay={0.1} />
          <SkillCategory title="Backend Development" skills={skillsData.backend} delay={0.2} />
          <SkillCategory title="Database & Storage" skills={skillsData.database} delay={0.3} />
          <SkillCategory title="Tools & Platforms" skills={skillsData.tools} delay={0.4} />
        </div>
      </div>
    </section>
  );
};

export default Skills;
