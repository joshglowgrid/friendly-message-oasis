
import React from 'react';
import { Button } from '@/components/ui/button';

const IntroSection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-8 px-6 text-center relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10 backdrop-blur-sm z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-orange-500/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-pink-500/5 blur-3xl"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <h1 className="sm:text-4xl md:text-5xl lg:text-6xl font-blink orange-gradient-text mb-6 leading-tight px-[5px] font-semibold text-3xl">
          Where Strategy Meets Aesthetic—Digital Marketing That Moves the Needle.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto">
          We don't just post—we build ecosystems. Welcome to the new era of brand growth.
        </p>
        <Button 
          variant="gradient" 
          onClick={scrollToContact} 
          className="text-base sm:text-lg py-3 h-auto rounded-md text-center px-[20px] shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
        >
          Let's Grow Together → 
        </Button>
      </div>
    </section>
  );
};

export default IntroSection;
