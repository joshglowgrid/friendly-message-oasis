
import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Hero from '@/components/sections/Hero';
import IntroSection from '@/components/sections/IntroSection';
import { ServiceCards } from '@/components/sections/ServiceCards';
import { PhoneMockup } from '@/components/sections/PhoneMockup';
import { EnhancedContactSection } from '@/components/sections/EnhancedContactSection';
import { IntroAnimation } from '@/components/sections/IntroAnimation';
import { FloatingCTA } from '@/components/navigation/FloatingCTA';
import WhyUsSection from '@/components/sections/WhyUsSection';
import IndustriesSection from '@/components/sections/IndustriesSection';
import { WorkSlider } from '@/components/sections/WorkSlider';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      // Track scroll position for sticky header
      const heroSection = document.querySelector('#hero');
      
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setScrolled(heroBottom <= 0);
      } else {
        setScrolled(window.scrollY > window.innerHeight * 0.2);
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
    // Add initial scroll check
    setTimeout(() => {
      handleScroll();
      // Enable scrolling immediately
      document.body.style.overflow = "auto";
    }, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!mounted) return null;

  return (
    <div className="min-h-screen text-white flex flex-col items-center overflow-hidden">
      <IntroAnimation />
      
      <Hero />
      
      <div id="content" className="w-full bg-[#0D0D0D]">
        <IntroSection />
        <ServiceCards />
        <PhoneMockup />
        <WorkSlider />
        <WhyUsSection />
        <IndustriesSection />
        <EnhancedContactSection />
      </div>
    </div>
  );
};

export default Index;
