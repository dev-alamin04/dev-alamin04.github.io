import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiSmartphone, FiDatabase, FiServer, FiLayout, FiActivity } from 'react-icons/fi';

const services = [
  {
    icon: <FiCode />,
    title: "Web Development",
    description: "Building responsive, fast, and scalable web applications using React, Vue, or modern vanilla JS."
  },
  {
    icon: <FiServer />,
    title: "Backend Architecture",
    description: "Designing robust APIs and microservices with Laravel, Node.js, and complex MySQL/PostgreSQL databases."
  },
  {
    icon: <FiLayout />,
    title: "UI/UX Implementation",
    description: "Translating Figma designs into pixel-perfect, accessible, and beautifully animated frontend code."
  },
  {
    icon: <FiDatabase />,
    title: "Database Optimization",
    description: "Structuring complex data relationships, optimizing queries, and ensuring data integrity at scale."
  },
  {
    icon: <FiActivity />,
    title: "Real-time Systems",
    description: "Implementing WebSockets, geofencing, and real-time tracking for logistics and delivery apps."
  },
  {
    icon: <FiSmartphone />,
    title: "API & Deep Linking",
    description: "Creating secure APIs for mobile apps, handling universal deep linking, and third-party integrations (OAuth, Stripe)."
  }
];

const Services = () => {
  return (
    <section id="services" className="services section-padding" style={{ background: '#f8fafc' }}>
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
            My <span className="text-gradient">Services</span>
          </h2>
          <p className="section-subtitle">What I can do for you</p>
        </motion.div>

        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '50px' }}>
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              style={{
                background: '#fff',
                padding: '40px 30px',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              <div 
                className="service-icon"
                style={{
                  width: '70px',
                  height: '70px',
                  margin: '0 auto 25px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  color: '#3b82f6',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem'
                }}
              >
                {service.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#1e293b', marginBottom: '15px' }}>{service.title}</h3>
              <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem' }}>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
