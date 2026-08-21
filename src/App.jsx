import React from 'react';
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

function App() {
  return (
    <div className="app-container bg-gray-50 text-gray-800 font-sans">
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
