
import React from 'react';
import { Button } from '@/components/ui/button';

const serviceItems = [{
  title: "Strategic Social Architecture",
  description: "Algorithm-attuned content frameworks and visual systems that deliver measurable engagement."
}, {
  title: "Conversion-Engineered Email Ecosystems",
  description: "Sequential messaging pathways that nurture prospects through behavioral triggers and segmentation."
}, {
  title: "Semantic Search Optimization",
  description: "Content architecture built for modern search algorithms, delivering authority and position."
}, {
  title: "Conversion-First Digital Environments",
  description: "Intentional digital spaces that transform visitor psychology into appointment bookings."
}, {
  title: "Revenue Acceleration Systems",
  description: "Strategic digital merchandising that maximizes transaction value and retention metrics."
}, {
  title: "Visual Identity Architecture",
  description: "Cohesive visual systems that communicate clinical excellence through considered aesthetics."
}, {
  title: "Performance Intelligence Framework",
  description: "Data architecture that transforms metrics into actionable growth directives."
}];

const AboutSection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section id="about" className="py-20 px-6 overflow-hidden relative">
      {/* Subtle gradient background instead of solid black/50 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 -z-10"></div>
      
      <div className="max-w-5xl mx-auto">
        <div className="relative mb-10 h-64 sm:h-80 md:h-96">
          <img 
            src="https://github.com/joshglowgrid/friendly-message-oasis/blob/main/GlowGrid%20Media%20-%20LA%20Medical%20Marketing%20Agency.png?raw=true" 
            alt="Healthcare digital marketing strategy" 
            className="w-full h-full object-cover rounded-2xl animate-on-scroll opacity-0 translate-y-4 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl py-0 my-[20px]"></div>
        </div>
        
        <div className="glass-panel p-8 sm:p-10 md:p-12 space-y-8 sm:px-[90px] px-6">
          <h2 className="text-2xl sm:text-3xl font-blink orange-gradient-text animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 text-center px-[4px] font-medium">Precision-Engineered Digital Systems for Healthcare & Clinical Excellence</h2>
          <div className="space-y-6 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100">
            <p className="text-white/80 leading-relaxed text-center mb-8">
              GlowGrid constructs performance-focused digital infrastructures that drive measurable growth. 
              Every strategy is validated through qualitative and quantitative analytics—scaling what works, 
              eliminating what doesn't. Operating across Los Angeles and nationwide markets.
            </p>
            
            <h3 className="text-xl font-semibold mb-4 text-center">Core Implementation Systems:</h3>
            
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {serviceItems.map((service, index) => (
                <div 
                  key={index} 
                  className="glass-panel p-5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm group"
                >
                  <h4 className="text-lg font-medium mb-2 orange-gradient-text group-hover:scale-105 transition-transform duration-300">{service.title}</h4>
                  <p className="text-white/70 text-sm sm:text-base">{service.description}</p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button 
                variant="gradient" 
                onClick={scrollToContact}
                className="mt-4"
              >
                Request a Strategy Session
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
