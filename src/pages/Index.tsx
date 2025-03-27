
import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Hero from '@/components/sections/Hero';
import Header from '@/components/sections/Header';
import IntroSection from '@/components/sections/IntroSection';
import { ServiceCards } from '@/components/sections/ServiceCards';
import { PhoneMockup } from '@/components/sections/PhoneMockup';
import { EnhancedContactSection } from '@/components/sections/EnhancedContactSection';
import { IntroAnimation } from '@/components/sections/IntroAnimation';
import { FloatingCTA } from '@/components/navigation/FloatingCTA';
import WhyUsSection from '@/components/sections/WhyUsSection';
import IndustriesSection from '@/components/sections/IndustriesSection';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Animate sections on scroll
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
    <div className="min-h-screen text-white flex flex-col items-center overflow-hidden">
      <IntroAnimation />
      <FloatingCTA />
      <Header scrolled={scrolled} />
      
      <Hero />
      
      <div id="content" className="w-full">
        <IntroSection />
        <ServiceCards />
        <PhoneMockup />
        <WhyUsSection />
        <IndustriesSection />
        <EnhancedContactSection />
      </div>
    </div>
  );
};

export default Index;
