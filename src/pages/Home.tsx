import React, { Suspense } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Background3D from '../components/Background3D';

// Lazy load components for performance
const About = React.lazy(() => import('../components/About'));
const Skills = React.lazy(() => import('../components/Skills'));
const Projects = React.lazy(() => import('../components/Projects'));
const Services = React.lazy(() => import('../components/Services'));
const FAQ = React.lazy(() => import('../components/FAQ'));
const CV = React.lazy(() => import('../components/CV'));
const Contact = React.lazy(() => import('../components/Contact'));
const Footer = React.lazy(() => import('../components/Footer'));

const LoadingFallback = () => (
  <div className="py-20 flex justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

export default function Home() {
  return (
    <ThemeProvider>
      <SEOHead />
      <div className="min-h-screen bg-white dark:bg-transparent transition-colors duration-700 relative">
        <Background3D />
        <Navbar />
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <About />
          <Skills />
          <Projects />
          <Services />
          <FAQ />
          <CV />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

