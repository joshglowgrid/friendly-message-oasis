
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-blink mb-4 text-white">Initiate a Conversation</h2>
            <p className="text-white/80 mb-8 max-w-xl">
              Ready to elevate your market position? Connect with our strategists to discuss your growth objectives.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-white">Partner Categories:</h3>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Progressive Dental Practices & DSOs
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Medical Aesthetics & Dermatology
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Integrative Wellness Centers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Healthcare Innovators
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Performance Health & Clinical Nutrition
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-white">Market Presence</h3>
              <p className="text-white/80">
                Los Angeles Metropolitan, San Gabriel Valley, Orange County, and nationwide digital implementation.
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
                  <Mail className="mr-2 h-4 w-4" /> Message
                </TabsTrigger>
                <TabsTrigger 
                  value="call" 
                  className="w-full text-white font-medium data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
                >
                  <Phone className="mr-2 h-4 w-4" /> Schedule Consultation
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
