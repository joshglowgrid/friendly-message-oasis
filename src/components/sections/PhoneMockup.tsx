
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PhoneMockup = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left text content */}
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl orange-gradient-text font-blink mb-4">
              Digital Marketing Ecosystem
            </h2>
            <p className="text-white/80 leading-relaxed">
              We build complete marketing ecosystems that connect your brand with your audience across multiple touchpoints. From social media to email, web to video, we create cohesive experiences that drive engagement and conversions.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center bg-black/30 border border-white/10 rounded-md mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Social Media Integration</h3>
                  <p className="text-white/70">Strategic content that builds community and drives engagement.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center bg-black/30 border border-white/10 rounded-md mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Email Automation</h3>
                  <p className="text-white/70">Targeted campaigns that nurture leads and retain clients.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 flex items-center justify-center bg-black/30 border border-white/10 rounded-md mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                    <path d="M18 14h-8"></path>
                    <path d="M15 18h-5"></path>
                    <path d="M10 6h8v4h-8V6Z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Content Strategy</h3>
                  <p className="text-white/70">Cohesive storytelling across platforms for maximum impact.</p>
                </div>
              </div>
            </div>
            <div>
           <Button
  variant="outline"
  className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
  asChild
>
  <a href="/services">
    Explore our Services
  </a>
</Button>
            </div>
          
          {/* Right visual content - image that can be managed through Craft CMS */}
          <div className="lg:w-1/2 flex justify-center">
            <img 
              src="https://img.glowgridmedia.com/MedSpa%20Digital%20Marketing-HCard.png" 
              alt="Digital Marketing Visual" 
              className="w-64 md:w-80 h-auto shadow-lg rounded-md" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};
