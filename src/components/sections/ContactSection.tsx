
import React from 'react';
import ContactForm from '@/components/ContactForm';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-6 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-4xl mx-auto w-full space-y-12 text-center">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-blink orange-gradient-text animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            Connect With Us
          </h2>
          <p className="text-white/80 max-w-lg mx-auto animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100">
            Ready to transform your digital presence? Outline your vision and let's architect a strategy that aligns with your growth objectives.
          </p>
          <p className="text-white/60 max-w-lg mx-auto animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200">
            Serving Los Angeles, San Gabriel Valley, and progressive healthcare brands nationwide.
          </p>
        </div>
        <div className="flex justify-center">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
