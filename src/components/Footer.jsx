import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer style={{ background: '#0f172a', padding: '60px 0 20px', color: '#cbd5e1' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '40px', marginBottom: '30px' }}>
          
          <div style={{ flex: '1 1 300px' }}>
            <Link to="home" smooth={true} duration={500} style={{ cursor: 'pointer', display: 'inline-block', marginBottom: '20px', textDecoration: 'none' }}>
              <h2 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Dev<span style={{ color: 'var(--primary)' }}>Alamin</span></h2>
            </Link>
            <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px', maxWidth: '350px' }}>
              Building exceptional and accessible digital experiences for the web. Specialized in full-stack development.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="https://github.com/dev-alamin04" target="_blank" rel="noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--light-gray)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.3s ease' }} onMouseOver={(e)=>e.target.style.background='var(--primary)'} onMouseOut={(e)=>e.target.style.background='var(--light-gray)'}>
                <FiGithub />
              </a>
              <a href="https://www.linkedin.com/in/al-amin-khalifa" target="_blank" rel="noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--light-gray)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.3s ease' }} onMouseOver={(e)=>e.target.style.background='var(--primary)'} onMouseOut={(e)=>e.target.style.background='var(--light-gray)'}>
                <FiLinkedin />
              </a>
              <a href="https://twitter.com/dev_alamin04" target="_blank" rel="noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--light-gray)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.3s ease' }} onMouseOver={(e)=>e.target.style.background='var(--primary)'} onMouseOut={(e)=>e.target.style.background='var(--light-gray)'}>
                <FiTwitter />
              </a>
            </div>
          </div>

          <div style={{ flex: '1 1 150px' }}>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '20px' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Home', 'About', 'Skills', 'Experience', 'Projects'].map(item => (
                <li key={item} style={{ marginBottom: '10px' }}>
                  <Link to={item.toLowerCase()} smooth={true} duration={500} style={{ color: '#94a3b8', cursor: 'pointer', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ flex: '1 1 150px' }}>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '20px' }}>Services</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px', color: '#94a3b8' }}>Web Development</li>
              <li style={{ marginBottom: '10px', color: '#94a3b8' }}>Backend Architecture</li>
              <li style={{ marginBottom: '10px', color: '#94a3b8' }}>API Integrations</li>
              <li style={{ marginBottom: '10px', color: '#94a3b8' }}>Database Design</li>
            </ul>
          </div>
        </div>

        <div style={{ textAlign: 'center', color: 'var(--gray)', fontSize: '0.9rem' }}>
          <p>
            &copy; {new Date().getFullYear()} Al-amin Khalifa. Made with <FiHeart style={{ color: '#ef4444', display: 'inline', margin: '0 3px' }} /> and React.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
