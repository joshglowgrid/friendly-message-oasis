
import React, { useEffect, useState } from 'react';
import NavLink from '@/components/NavLink';
import Logo from '@/components/Logo';
import ContactForm from '@/components/ContactForm';
import { cn } from '@/lib/utils';
import { ArrowDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
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
  
  const scrollToContent = () => {
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center">
      {/* Hero Section - Fullscreen Logo */}
      <section className="h-screen w-full flex flex-col items-center justify-center relative px-4">
        <div className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/5">
          <Logo 
            src="https://github.com/joshglowgrid/friendly-message-oasis/blob/main/glowgridmedia.png?raw=true" 
            alt="GlowGrid Logo" 
          />
        </div>
        <div className="absolute bottom-10 animate-bounce cursor-pointer" onClick={scrollToContent}>
          <ArrowDown size={32} className="text-white/80 hover:text-orange-400 transition-colors" />
        </div>
      </section>
      
      {/* Main Content */}
      <div id="content" className="w-full">
        {/* Mobile Navigation */}
        <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm py-4 px-4 w-full">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex justify-end">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobile && mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md py-4">
              <div className="flex flex-col items-center space-y-4">
                <NavLink href="#about" onClick={() => setMobileMenuOpen(false)}>ABOUT</NavLink>
                <NavLink href="#services" onClick={() => setMobileMenuOpen(false)}>SERVICES</NavLink>
                <NavLink href="#why-us" onClick={() => setMobileMenuOpen(false)}>WHY US</NavLink>
                <NavLink href="#industries" onClick={() => setMobileMenuOpen(false)}>INDUSTRIES</NavLink>
                <NavLink href="#contact" onClick={() => setMobileMenuOpen(false)}>CONTACT</NavLink>
              </div>
            </div>
          )}

          {/* Desktop Menu */}
          <div className="hidden md:flex justify-center">
            <div className="flex space-x-8 sm:space-x-16">
              <NavLink href="#about">ABOUT</NavLink>
              <NavLink href="#services">SERVICES</NavLink>
              <NavLink href="#why-us">WHY US</NavLink>
              <NavLink href="#industries">INDUSTRIES</NavLink>
              <NavLink href="#contact">CONTACT</NavLink>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <section className="py-12 px-6 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-blink orange-gradient-text mb-6 leading-tight">
              Where Strategy Meets Aesthetic—Digital Marketing That Moves the Needle.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto">
              We don't just post—we build ecosystems. Welcome to the new era of brand growth.
            </p>
            <Button 
              className="orange-gradient-bg text-base sm:text-lg px-6 py-3 h-auto rounded-md shadow-lg hover:shadow-orange-400/20 transition-all duration-300" 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Let's Grow Together → Start Your Strategy Session
            </Button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 bg-black/50">
          <div className="max-w-5xl mx-auto">
            <div className="glass-panel p-8 sm:p-10 md:p-12 space-y-8">
              <h2 className="text-2xl sm:text-3xl font-blink orange-gradient-text text-center animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
                Full-Spectrum Digital Strategy, Custom-Crafted for Healthcare & Wellness Brands
              </h2>
              <div className="space-y-6 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100">
                <p className="text-white/80 leading-relaxed text-center mb-8">
                  At GlowGrid Media, every service is engineered for growth and grounded in data. We don't guess—we analyze, test, and tailor.
                </p>
                
                <h3 className="text-xl font-semibold mb-4">Our Core Services Include:</h3>
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="font-bold mr-2">•</span>
                    <div>
                      <span className="font-medium">Social Media Management & Content Creation</span>
                      <p className="text-white/70">Visually compelling, algorithm-friendly, and brand-aligned.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">•</span>
                    <div>
                      <span className="font-medium">Email Marketing & Automation</span>
                      <p className="text-white/70">Nurture your audience with timely, effective messaging that converts.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">•</span>
                    <div>
                      <span className="font-medium">SEO & Content Marketing</span>
                      <p className="text-white/70">Rank higher, reach further, and speak with authority.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">•</span>
                    <div>
                      <span className="font-medium">Custom Landing Pages & Website Strategy</span>
                      <p className="text-white/70">Designed for performance—whether you're capturing leads or scheduling patients.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">•</span>
                    <div>
                      <span className="font-medium">E-Commerce Optimization & Digital Merchandising</span>
                      <p className="text-white/70">Maximize your store's potential with strategic UX and conversion funnels.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">•</span>
                    <div>
                      <span className="font-medium">Brand Identity & Visual Redesigns</span>
                      <p className="text-white/70">Elevate your look to match the excellence you deliver.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">•</span>
                    <div>
                      <span className="font-medium">Advanced Analytics & Performance Insights</span>
                      <p className="text-white/70">Know what's working, improve what's not—down to the last click.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-us" className="py-20 px-6">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-2xl sm:text-3xl font-blink orange-gradient-text text-center animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
              Why Choose GlowGrid Media?
            </h2>
            <p className="text-center text-white/80 max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100">
              Because we don't believe in copy-paste strategies.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Industry Expertise",
                  description: "Deep knowledge in dental, aesthetic, skincare, and wellness markets."
                },
                {
                  title: "Data-Driven Execution",
                  description: "We track everything—and use those insights to sharpen your edge."
                },
                {
                  title: "High-Touch Partnerships",
                  description: "You're not just another account. You're a brand we invest in."
                },
                {
                  title: "Scalable Solutions",
                  description: "Whether you're starting up or scaling fast, we build to grow with you."
                },
                {
                  title: "Proven Results",
                  description: "+115% Instagram growth, increased engagement, and higher conversion rates across our managed accounts."
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="glass-panel p-6 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700" 
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-3">
                    <span className="text-green-400 mr-2">✅</span>
                    <h3 className="text-xl font-medium">{item.title}</h3>
                  </div>
                  <p className="text-white/70">{item.description}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-white/80 font-medium italic mt-8 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
              GlowGrid Media isn't a vendor. We're your strategic partner in digital evolution.
            </p>
          </div>
        </section>

        {/* Industries Section */}
        <section id="industries" className="py-20 px-6 bg-black/50">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-2xl sm:text-3xl font-blink orange-gradient-text text-center animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
              Industries We Serve
            </h2>
            <p className="text-center text-white/80 max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100">
              <strong>Built for Impact. Designed for Niche Excellence.</strong><br />
              At GlowGrid Media, we specialize in industries where trust, clarity, and compliance matter just as much as creativity.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: "📍",
                  title: "Dental Practices",
                  description: "From cosmetic dentistry to general oral care, we help practices grow visibility, credibility, and patient loyalty."
                },
                {
                  icon: "📍",
                  title: "Skincare & Aesthetics",
                  description: "We craft elevated digital identities for medspas, dermatology clinics, and skincare experts that demand distinction."
                },
                {
                  icon: "📍",
                  title: "Wellness & Health Clinics",
                  description: "Functional medicine, hormone therapy, IV lounges, and holistic wellness centers—our strategies speak your language."
                },
                {
                  icon: "📍",
                  title: "RX & Medical Retail",
                  description: "We bring bold clarity to complex offerings like prescription skincare, supplements, and telehealth-based retail."
                },
                {
                  icon: "📍",
                  title: "Boutique Health Brands",
                  description: "Emerging health & wellness products get a strategy-driven push to gain traction, credibility, and loyal followers."
                }
              ].map((industry, index) => (
                <div 
                  key={index} 
                  className="glass-panel p-6 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700" 
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start mb-3">
                    <span className="text-2xl mr-3">{industry.icon}</span>
                    <div>
                      <h3 className="text-xl font-medium mb-2">{industry.title}</h3>
                      <p className="text-white/70">{industry.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
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

        {/* Footer Section */}
        <footer className="py-10 px-6 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center text-white/60 space-y-4">
            <div className="w-32 mx-auto mb-6">
              <Logo 
                src="https://github.com/joshglowgrid/friendly-message-oasis/blob/main/glowgridmedia.png?raw=true" 
                alt="GlowGrid Logo"
              />
            </div>
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
    </div>
  );
};

export default Index;
