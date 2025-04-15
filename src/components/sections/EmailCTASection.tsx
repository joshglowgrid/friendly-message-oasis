
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';

const EmailCTASection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-black to-stone-950 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl z-0 opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl z-0 opacity-30"></div>
      
      <div className="max-w-5xl mx-auto glass-panel p-8 md:p-12 text-center relative z-10">
        <Mail className="w-16 h-16 mx-auto mb-6 text-orange-400 opacity-70" />
        
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
            className="text-white px-8 py-6 h-auto text-base w-full sm:w-auto"
          >
            Request Email Strategy Session <ArrowRight className="ml-2" />
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location.href = '/services'}
            className="text-base px-6 py-5 h-auto w-full sm:w-auto"
          >
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EmailCTASection;
