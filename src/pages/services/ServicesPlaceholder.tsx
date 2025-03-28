
import React from 'react';
import { EnhancedContactSection } from '@/components/sections/EnhancedContactSection';
import { FloatingCTA } from '@/components/navigation/FloatingCTA';
import WhyUsSection from '@/components/sections/WhyUsSection';

interface ServicesPlaceholderProps {
  title?: string;
}

const ServicesPlaceholder: React.FC<ServicesPlaceholderProps> = ({ title = "Service Detail" }) => {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl orange-gradient-text font-blink mb-8">
          {title}
        </h1>
        
        <div className="glass-panel p-8 mb-12">
          <p className="text-white/80 text-lg mb-6">
            GlowGrid Media designs comprehensive {title.toLowerCase()} solutions for healthcare and wellness brands focused on measurable growth. 
            Our approach integrates clinical positioning with advanced digital methodology.
          </p>
          
          <p className="text-white/80 mb-8">
            This service page is currently in development. Our team is creating detailed content 
            that showcases our expertise, methodology, and results. Please check back soon for a 
            complete overview of our capabilities in this area.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Core Capabilities</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Strategic Planning & Execution
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Performance Analytics & Optimization
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Competitive Positioning
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Conversion-Focused Implementation
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Ideal For</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Medical & Dental Practices
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Aesthetic Medicine Providers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Wellness & Nutrition Brands
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Health Technology Innovators
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <WhyUsSection />
      <EnhancedContactSection />
      <FloatingCTA />
    </div>
  );
};

export default ServicesPlaceholder;
