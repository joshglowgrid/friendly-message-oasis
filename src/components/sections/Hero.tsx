
import React, { useEffect, useRef } from 'react';
import Logo from '@/components/Logo';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToContent = () => {
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Mouse position effect for gradient follow
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="h-screen w-full flex flex-col items-center justify-center relative px-4 overflow-hidden"
    >
      {/* Floating logo */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.5,
          type: "spring",
          stiffness: 100
        }}
        className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3 mb-12 relative"
      >
        <Logo 
          src="https://github.com/joshglowgrid/friendly-message-oasis/blob/main/glowgridmedia.png?raw=true" 
          alt="GlowGrid Logo" 
          url="https://glowgridmedia.com"
        />
        
        {/* Glow effect that follows mouse */}
        <div 
          className="absolute -inset-10 opacity-20 blur-xl rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,131,89,0.8) 0%, rgba(255,78,135,0.8) 100%)',
            left: `${mousePosition.x - 100}px`,
            top: `${mousePosition.y - 100}px`,
            width: '200px',
            height: '200px',
            transition: 'left 0.3s ease-out, top 0.3s ease-out',
            filter: 'blur(80px)'
          }}
        />
      </motion.div>
      
      {/* Tagline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6 max-w-3xl"
      >
        Digital Marketing That Moves the Needle for 
        <span className="orange-gradient-text font-blink ml-2">Healthcare & Wellness Brands</span>
      </motion.h1>
      
      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="mb-12"
      >
        <Button 
          variant="gradient" 
          size="lg" 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-base px-8 py-6 h-auto"
        >
          Start Your Growth Journey
        </Button>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-10 animate-bounce cursor-pointer arrow-indicator" 
        onClick={scrollToContent}
      >
        <ArrowDown size={32} className="text-white/80 hover:text-orange-400 transition-colors" />
      </motion.div>
      
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-full h-full bg-black/50 backdrop-blur-sm" />
        
        {/* Gradient circles */}
        <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-pink-500/10 blur-3xl" />
      </div>
    </section>
  );
};

export default Hero;
