
import React from 'react';
import { EnhancedContactSection } from '@/components/sections/EnhancedContactSection';
import { FloatingCTA } from '@/components/navigation/FloatingCTA';
import { useLocation } from 'react-router-dom';

const WorkPlaceholder = () => {
  const location = useLocation();
  const isDetailPage = location.pathname !== '/work';
  
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl orange-gradient-text font-blink mb-8">
          {isDetailPage ? "Case Study" : "Our Work"}
        </h1>
        
        <div className="glass-panel p-8 mb-12">
          <p className="text-white/80 text-lg mb-6">
            GlowGrid Media partners with forward-thinking healthcare and wellness brands to build strategic digital ecosystems.
            Our portfolio showcases measurable growth and engagement across various verticals within the medical space.
          </p>
          
          <p className="text-white/80 mb-8">
            Our case studies and portfolio examples are currently being developed. 
            Please check back soon to explore our successful client collaborations or contact us directly to discuss
            recent projects that align with your industry needs.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Client Industries</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Dental & Orthodontics
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Medical Aesthetics & Dermatology
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Functional Medicine & Wellness
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Mental Health & Therapy
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Success Metrics</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Engagement Rate Increases (115%+)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Conversion Optimization
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Brand Visibility & Reach
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Client Acquisition Metrics
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <EnhancedContactSection />
      <FloatingCTA />
    </div>
  );
};

export default WorkPlaceholder;
