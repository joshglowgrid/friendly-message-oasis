
import React, { useEffect, useState } from 'react';
import NavLink from '@/components/NavLink';
import Logo from '@/components/Logo';
import ContactForm from '@/components/ContactForm';
import { cn } from '@/lib/utils';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionElements = section.querySelectorAll('.animate-on-scroll');
        
        if (sectionTop < window.innerHeight * 0.8) {
          sectionElements.forEach((el, index) => {
            setTimeout(() => {
              (el as HTMLElement).style.opacity = '1';
              (el as HTMLElement).style.transform = 'translateY(0)';
            }, index * 100);
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen text-white">
      {/* Fixed header with logo */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex justify-center items-center backdrop-blur-sm bg-black/5">
        <div className="w-32 sm:w-40 md:w-48 h-auto">
          <Logo 
            src="https://i.ibb.co/zV9HFndj/glowgrid-media.png" 
            alt="GlowGrid Logo"
          />
        </div>
      </header>

      {/* Navigation */}
      <nav className={cn(
        "fixed top-24 sm:top-28 left-0 right-0 z-40 flex justify-center",
        "py-4 opacity-0 animate-fade-in-slow [animation-delay:300ms]"
      )}>
        <div className="flex space-x-8 sm:space-x-12">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-3xl text-center space-y-6 opacity-0 animate-fade-in [animation-delay:600ms]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            <span className="block">Crafting Digital</span>
            <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Experiences</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-xl mx-auto leading-relaxed">
            We blend creativity and technology to build stunning digital solutions that captivate your audience.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href="#contact" className="button-primary">
              Get in Touch
            </a>
            <a href="#services" className="button-primary">
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-8 sm:p-10 md:p-12 space-y-8">
            <h2 className="text-3xl sm:text-4xl font-semibold text-center animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
              About Us
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100">
                <h3 className="text-xl font-medium">Our Mission</h3>
                <p className="text-white/80 leading-relaxed">
                  We create digital experiences that elevate brands and engage audiences through thoughtful design and innovative technology.
                </p>
              </div>
              <div className="space-y-4 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200">
                <h3 className="text-xl font-medium">Our Approach</h3>
                <p className="text-white/80 leading-relaxed">
                  Simplicity, clarity, and purpose guide everything we build. We believe in crafting solutions that are both beautiful and functional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            Our Services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Web Design", description: "Beautiful, intuitive interfaces that engage users and elevate your brand." },
              { title: "Development", description: "Clean, efficient code that brings your digital products to life." },
              { title: "Branding", description: "Memorable visual identities that connect with your audience." },
              { title: "UI/UX Design", description: "User-centered design that creates seamless digital experiences." },
              { title: "Strategy", description: "Digital roadmaps that align with your business objectives." },
              { title: "Analytics", description: "Data-driven insights to optimize your digital presence." }
            ].map((service, index) => (
              <div 
                key={index} 
                className="glass-panel p-6 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                <p className="text-white/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto w-full space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-semibold animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
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

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center text-white/60 space-y-4">
          <div className="flex justify-center space-x-6">
            <NavLink href="#" className="text-white/60 hover:text-white/90">
              Twitter
            </NavLink>
            <NavLink href="#" className="text-white/60 hover:text-white/90">
              Instagram
            </NavLink>
            <NavLink href="#" className="text-white/60 hover:text-white/90">
              LinkedIn
            </NavLink>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} GlowGrid Media. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
