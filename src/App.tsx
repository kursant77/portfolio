import React, { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import './i18n';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import CV from './components/CV';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Initialize theme on app load
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.add(theme);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Services />
        <CV />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;