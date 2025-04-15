
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const EmailCTASection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-black to-stone-950">
      <div className="max-w-5xl mx-auto glass-panel p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl orange-gradient-text font-blink mb-6">
          Ready to Transform Your Patient Communications?
        </h2>
        
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Our healthcare-focused email marketing strategies deliver measurable improvements in patient acquisition, 
          engagement, and retention metrics. Schedule a consultation to discover how GlowGrid can elevate your 
          practice's digital communication.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="gradient" 
            onClick={scrollToContact}
            className="text-white px-8 py-6 h-auto text-base"
          >
            Request Email Strategy Session <ArrowRight className="ml-2" />
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location.href = '/services'}
            className="text-base px-6 py-5 h-auto"
          >
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EmailCTASection;
