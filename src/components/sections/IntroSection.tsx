
import React from 'react';
import { Button } from '@/components/ui/button';

const IntroSection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-10 md:py-16 px-4 md:px-6 text-center">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-blink orange-gradient-text mb-4 md:mb-6 leading-tight font-semibold">
          Where Strategy Meets Aesthetic—Digital Marketing That Moves the Needle.
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
          We don't just post—we build ecosystems. Welcome to the new era of brand growth.
        </p>
        <Button 
          variant="gradient" 
          onClick={scrollToContact} 
          className="text-base sm:text-lg py-3 h-auto rounded-md text-center px-6 md:px-8 font-medium"
        >
          Let's Grow Together → 
        </Button>
      </div>
    </section>
  );
};

export default IntroSection;
