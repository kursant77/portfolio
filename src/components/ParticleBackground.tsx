import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowIntensity: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Particle colors - cyan, purple, white
    const colors = [
      'rgba(0, 255, 255, 0.9)', // cyan
      'rgba(147, 51, 234, 0.9)', // purple
      'rgba(255, 255, 255, 0.7)', // white
    ];

    // Initialize particles (must be defined before resizeCanvas)
    const initParticles = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const particleCount = Math.min(80, Math.max(40, Math.floor((width * height) / 15000)));
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2.5 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          glowIntensity: Math.random() * 0.4 + 0.6,
        });
      }
    };

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Reinitialize particles on resize
      initParticles();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Page Visibility API - pause animation when tab is hidden
    let isVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && !animationFrameRef.current) {
        lastTimeRef.current = performance.now();
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Optimized animation loop with delta time
    const animate = (currentTime: number) => {
      // Pause animation if tab is hidden
      if (!isVisible) {
        animationFrameRef.current = undefined;
        return;
      }

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;
      
      // Skip frame if delta is too large (tab was inactive)
      if (deltaTime > 100) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      // Clear with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0a0e27'); // navy
      gradient.addColorStop(1, '#000000'); // black
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Mouse repulsion effect
        const dx = particle.x - mouseRef.current.x;
        const dy = particle.y - mouseRef.current.y;
        const distanceSq = dx * dx + dy * dy;
        const repulsionRadius = 120;
        const repulsionRadiusSq = repulsionRadius * repulsionRadius;
        const repulsionStrength = 0.4;

        if (distanceSq < repulsionRadiusSq && distanceSq > 0) {
          const distance = Math.sqrt(distanceSq);
          const force = (repulsionRadius - distance) / repulsionRadius;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force * repulsionStrength;
          particle.vy += Math.sin(angle) * force * repulsionStrength;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary collision with bounce
        if (particle.x < particle.radius) {
          particle.vx = Math.abs(particle.vx) * 0.8;
          particle.x = particle.radius;
        } else if (particle.x > width - particle.radius) {
          particle.vx = -Math.abs(particle.vx) * 0.8;
          particle.x = width - particle.radius;
        }
        
        if (particle.y < particle.radius) {
          particle.vy = Math.abs(particle.vy) * 0.8;
          particle.y = particle.radius;
        } else if (particle.y > height - particle.radius) {
          particle.vy = -Math.abs(particle.vy) * 0.8;
          particle.y = height - particle.radius;
        }

        // Damping for smooth motion
        particle.vx *= 0.985;
        particle.vy *= 0.985;

        // Draw particle with 3D glow effect
        const glowRadius = particle.radius * 5;
        const glow = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          glowRadius
        );
        
        // Extract alpha from color
        const baseColor = particle.color.replace(/rgba?\(([^)]+)\)/, '$1').split(',');
        const r = baseColor[0].trim();
        const g = baseColor[1].trim();
        const b = baseColor[2].trim();
        
        glow.addColorStop(0, particle.color);
        glow.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, 0.5)`);
        glow.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.2)`);
        glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        // Outer glow layer
        ctx.save();
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
        ctx.restore();

        // Main particle sphere with shadow
        ctx.save();
        ctx.shadowBlur = 20 * particle.glowIntensity;
        ctx.shadowColor = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.restore();

        // Highlight for 3D depth effect
        ctx.save();
        ctx.beginPath();
        const highlightRadius = particle.radius * 0.35;
        ctx.arc(
          particle.x - particle.radius * 0.25,
          particle.y - particle.radius * 0.25,
          highlightRadius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}

