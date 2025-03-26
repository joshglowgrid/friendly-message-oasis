
import React from 'react';
import { Button } from '@/components/ui/button';

const serviceItems = [{
  title: "Social Media Management & Content Creation",
  description: "Visually compelling, algorithm-friendly, and brand-aligned."
}, {
  title: "Email Marketing & Automation",
  description: "Nurture your audience with timely, effective messaging that converts."
}, {
  title: "SEO & Content Marketing",
  description: "Rank higher, reach further, and speak with authority."
}, {
  title: "Custom Landing Pages & Website Strategy",
  description: "Designed for performance—whether you're capturing leads or scheduling patients."
}, {
  title: "E-Commerce Optimization & Digital Merchandising",
  description: "Maximize your store's potential with strategic UX and conversion funnels."
}, {
  title: "Brand Identity & Visual Redesigns",
  description: "Elevate your look to match the excellence you deliver."
}, {
  title: "Advanced Analytics & Performance Insights",
  description: "Know what's working, improve what's not—down to the last click."
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
          <h2 className="text-2xl sm:text-3xl font-blink orange-gradient-text animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 text-center px-[4px] font-medium">Full-Spectrum Digital Strategy, Custom-Crafted for Healthcare & Wellness Brands</h2>
          <div className="space-y-6 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100">
            <p className="text-white/80 leading-relaxed text-center mb-8">
              At GlowGrid Media, every service is engineered for growth and grounded in data. 
              We don't guess—we analyze, test, and tailor. Serving Los Angeles, The San Gabriel Valley, 
              the surrounding areas and businesses across the United States.
            </p>
            
            <h3 className="text-xl font-semibold mb-4 text-center">Our Core Services Include:</h3>
            
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
                Schedule a Strategy Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
