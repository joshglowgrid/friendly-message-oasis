
import React from 'react';
import ContactForm from '@/components/ContactForm';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="content-under-header min-h-screen bg-[#0D0D0D] pt-20 md:pt-24">
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-16 md:py-24 px-4 relative"
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0"></div>
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-orange-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-pink-500/5 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-blink mb-4 text-white">Get in Touch</h1>
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
                <h3 className="text-xl font-semibold mb-4 text-white">Contact Information</h3>
                <div className="space-y-3">
                  <p className="text-white/80 flex items-center gap-2">
                    <Mail className="text-orange-400" size={18} />
                    <a href="mailto:hello@glowgridmedia.com" className="hover:text-orange-400 transition-colors">hello@glowgridmedia.com</a>
                  </p>
                  <p className="text-white/80">
                    Los Angeles Metropolitan, San Gabriel Valley, Orange County, and nationwide digital implementation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-white/10">
              <h2 className="text-2xl font-semibold mb-6 text-white">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactPage;
