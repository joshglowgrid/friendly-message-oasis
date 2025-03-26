
import React from 'react';
import Logo from '@/components/Logo';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToContent = () => {
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative px-4">
      <div className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/5">
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
