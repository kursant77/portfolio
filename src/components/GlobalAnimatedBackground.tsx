import React from 'react';
import { motion } from 'framer-motion';

export default function GlobalAnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      {/* Animated Large Circles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 blur-3xl"
          style={{
            width: `${300 + i * 120}px`,
            height: `${300 + i * 120}px`,
            left: `${5 + i * 12}%`,
            top: `${5 + i * 15}%`,
          }}
          animate={{
            x: [0, 150, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + i * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}
      
      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${4 + Math.random() * 6}px`,
            height: `${4 + Math.random() * 6}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(${59 + Math.random() * 100}, ${130 + Math.random() * 50}, ${246}, ${0.3 + Math.random() * 0.3})`,
          }}
          animate={{
            y: [0, -200, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}
      
      {/* Animated Lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent dark:via-blue-500/10"
          style={{
            left: `${20 + i * 20}%`,
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
      
      {/* Grid Pattern with Animation */}
      <motion.div 
        className="absolute inset-0 opacity-10 dark:opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Wave Animation */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-400/10 to-transparent dark:from-blue-500/5"
          style={{
            clipPath: `polygon(0 ${100 - i * 20}%, 100% ${80 - i * 15}%, 100% 100%, 0 100%)`,
          }}
          animate={{
            clipPath: [
              `polygon(0 ${100 - i * 20}%, 100% ${80 - i * 15}%, 100% 100%, 0 100%)`,
              `polygon(0 ${90 - i * 20}%, 100% ${70 - i * 15}%, 100% 100%, 0 100%)`,
              `polygon(0 ${100 - i * 20}%, 100% ${80 - i * 15}%, 100% 100%, 0 100%)`,
            ],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  );
}

