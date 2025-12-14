import React, { Suspense } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

// Lazy load components for performance
const Skills = React.lazy(() => import('../components/Skills'));
const Projects = React.lazy(() => import('../components/Projects'));
const Services = React.lazy(() => import('../components/Services'));
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
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <Skills />
          <Projects />
          <Services />
          <CV />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

