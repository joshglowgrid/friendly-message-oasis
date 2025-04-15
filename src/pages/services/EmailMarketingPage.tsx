
import React from 'react';
import { EnhancedContactSection } from '@/components/sections/EnhancedContactSection';
import { FloatingCTA } from '@/components/navigation/FloatingCTA';
import WhyUsSection from '@/components/sections/WhyUsSection';
import EmailPlatformsSection from '@/components/sections/EmailPlatformsSection';
import EmailMethodologySection from '@/components/sections/EmailMethodologySection';
import EmailCTASection from '@/components/sections/EmailCTASection';

const EmailMarketingPage = () => {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl orange-gradient-text font-blink mb-8">
          Email Marketing
        </h1>
        
        <div className="glass-panel p-8 mb-12">
          <p className="text-white/80 text-lg mb-6">
            GlowGrid Media designs strategic email marketing solutions for healthcare and wellness brands 
            focused on patient acquisition, retention, and practice growth. Our approach integrates clinical 
            messaging with data-driven methodology to create meaningful patient relationships.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Core Capabilities</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Marketing Automation & Sequencing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Segmentation & Personalization
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Appointment & Booking Systems
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Lead Nurture Campaigns
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
                  Medical Spas & Aesthetics Providers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Wellness & Nutrition Brands
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Mental Health Practitioners
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <EmailMethodologySection />
      <EmailPlatformsSection />
      <EmailCTASection />
      <WhyUsSection />
      <EnhancedContactSection />
      <FloatingCTA />
    </div>
  );
};

export default EmailMarketingPage;
