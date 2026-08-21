import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const Contact = () => {
  return (
    <section id="contact" className="contact section-padding">
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
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="section-subtitle">Let's discuss your next project</p>
        </motion.div>

        <div className="contact-wrapper" style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', marginTop: '50px' }}>
          <motion.div
            className="contact-info"
            style={{ flex: '1 1 300px' }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 style={{ fontSize: '1.5rem', color: '#1e293b', marginBottom: '20px' }}>Contact Information</h3>
            <p style={{ color: '#64748b', marginBottom: '40px', lineHeight: 1.6 }}>
              I'm always open to discussing product design work or partnership opportunities. Feel free to reach out to me!
            </p>

            <div className="info-item" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
              <div className="icon" style={{ width: '50px', height: '50px', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                <FiMapPin />
              </div>
              <div>
                <h4 style={{ color: '#1e293b', marginBottom: '5px' }}>Location</h4>
                <p style={{ color: '#64748b' }}>Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="info-item" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
              <div className="icon" style={{ width: '50px', height: '50px', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                <FiMail />
              </div>
              <div>
                <h4 style={{ color: '#1e293b', marginBottom: '5px' }}>Email</h4>
                <p style={{ color: '#64748b' }}>aak75049@gmail.com</p>
              </div>
            </div>

            <div className="info-item" style={{ display: 'flex', gap: '20px' }}>
              <div className="icon" style={{ width: '50px', height: '50px', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                <FiPhone />
              </div>
              <div>
                <h4 style={{ color: '#1e293b', marginBottom: '5px' }}>Phone</h4>
                <p style={{ color: '#64748b' }}>+8801840685069</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form"
            style={{ flex: '1 1 400px', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', padding: '40px', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow)', border: '1px solid var(--glass-border)' }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <input type="text" placeholder="Your Name" style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'var(--dark)', outline: 'none', background: 'var(--light)', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
                </div>
                <div style={{ flex: 1 }}>
                  <input type="email" placeholder="Your Email" style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'var(--dark)', outline: 'none', background: 'var(--light)', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <input type="text" placeholder="Subject" style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'var(--dark)', outline: 'none', background: 'var(--light)', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <textarea placeholder="Your Message" rows="5" style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'var(--dark)', outline: 'none', background: 'var(--light)', resize: 'vertical', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: 'var(--shadow-lg)' }}
                whileTap={{ scale: 0.98 }}
                style={{ width: '100%', border: 'none', cursor: 'pointer', padding: '16px', background: 'var(--gradient)', color: '#fff', borderRadius: '12px', fontWeight: 600, fontSize: '1rem', boxShadow: 'var(--shadow)' }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
