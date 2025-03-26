
import React from 'react';
import { cn } from '@/lib/utils';
import ContactForm from '@/components/ContactForm';
import RequestCallForm from '@/components/RequestCallForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Phone } from 'lucide-react';

export const EnhancedContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 px-4 relative">
      {/* Subtle background gradient similar to intro section */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0"></div>
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-orange-500/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-pink-500/5 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-blink mb-4 text-white">Let's Grow Together</h2>
            <p className="text-white/80 mb-8 max-w-xl">
              Ready to elevate your healthcare or wellness brand? Connect with our team to discuss your marketing goals.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-white">Our Clients Include:</h3>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Dental Practices & DSOs
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Medical Spas & Aesthetics
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Wellness Centers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Healthcare Providers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Fitness & Nutrition Brands
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-white">Serving</h3>
              <p className="text-white/80">
                Los Angeles, The San Gabriel Valley, Orange County, and businesses across the United States.
              </p>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-white/10">
            <Tabs defaultValue="form" className="w-full">
              <TabsList className="w-full mb-6 orange-gradient-bg bg-opacity-90 border-2 border-orange-400/30">
                <TabsTrigger 
                  value="form" 
                  className="w-full text-white font-medium data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
                >
                  <Mail className="mr-2 h-4 w-4" /> Contact Us
                </TabsTrigger>
                <TabsTrigger 
                  value="call" 
                  className="w-full text-white font-medium data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
                >
                  <Phone className="mr-2 h-4 w-4" /> Request a Call
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="form" className="mt-0">
                <ContactForm />
              </TabsContent>
              
              <TabsContent value="call" className="mt-0">
                <RequestCallForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};
