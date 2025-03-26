
import React from 'react';
import { Button } from '@/components/ui/button';

const IntroSection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="py-12 px-6 text-center">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-blink orange-gradient-text mb-6 leading-tight">
          Where Strategy Meets Aesthetic—Digital Marketing That Moves the Needle.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto">
          We don't just post—we build ecosystems. Welcome to the new era of brand growth.
        </p>
        <Button 
          variant="gradient"
          className="text-base sm:text-lg px-6 py-3 h-auto rounded-md" 
          onClick={scrollToContact}
        >
          Let's Grow Together → Start Your Strategy Session
        </Button>
      </div>
    </section>
  );
};

export default IntroSection;
