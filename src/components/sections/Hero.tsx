
import React from 'react';
import Logo from '@/components/Logo';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToContent = () => {
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative px-4 overflow-hidden">
      <div className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3">
        <Logo 
          src="https://github.com/joshglowgrid/friendly-message-oasis/blob/main/glowgridmedia.png?raw=true" 
          alt="GlowGrid Logo" 
          url="https://glowgridmedia.com"
        />
      </div>
      <div className="absolute bottom-10 animate-bounce cursor-pointer" onClick={scrollToContent}>
        <ArrowDown size={32} className="text-white/80 hover:text-orange-400 transition-colors" />
      </div>
    </section>
  );
};

export default Hero;
