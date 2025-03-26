
import React from 'react';
import { cn } from '@/lib/utils';
import ContactForm from '@/components/ContactForm';
import RequestCallForm from '@/components/RequestCallForm';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Phone } from 'lucide-react';

export const EnhancedContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 px-4 orange-gradient-bg">
      <div className="max-w-7xl mx-auto">
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
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  Dental Practices & DSOs
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  Medical Spas & Aesthetics
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  Wellness Centers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  Healthcare Providers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  Fitness & Nutrition Brands
                </li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-white">Serving</h3>
              <p className="text-white/80 mb-2">
                Los Angeles, The San Gabriel Valley, Orange County, and businesses across the United States.
              </p>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-orange-500 transition-all duration-300 mt-2"
                asChild
              >
                <a href="/contact">
                  View Coverage Areas
                </a>
              </Button>
            </div>
          </div>
          
          <div className="bg-black/10 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-white/10">
            <Tabs defaultValue="form" className="w-full">
              <TabsList className="w-full mb-6 bg-black/20">
                <TabsTrigger value="form" className="w-full data-[state=active]:bg-black/30">
                  <Mail className="mr-2 h-4 w-4" /> Contact Us
                </TabsTrigger>
                <TabsTrigger value="call" className="w-full data-[state=active]:bg-black/30">
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
