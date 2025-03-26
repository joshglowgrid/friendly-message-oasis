
import React from 'react';
import ContactForm from '@/components/ContactForm';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-6 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto w-full space-y-12 text-center">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-blink orange-gradient-text animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            Get in Touch
          </h2>
          <p className="text-white/80 max-w-lg mx-auto animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100">
            Have a project in mind? We'd love to hear about it. Send us a message and let's create something amazing together.
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
