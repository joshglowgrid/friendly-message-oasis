
import React, { useState, useEffect } from 'react';
import Logo from '@/components/Logo';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MegaMenu } from '@/components/navigation/MegaMenu';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { scrollToSection } from '@/components/navigation/navUtils';

interface HeaderProps {
  scrolled: boolean;
}

const Header = ({ scrolled }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Check if path is active
  const isActivePath = (path: string) => {
    return location.pathname.includes(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Get hero section to determine when to show header
      const heroSection = document.querySelector('section') as HTMLElement;
      const arrowElement = document.querySelector('.arrow-indicator') as HTMLElement;
      
      if (arrowElement) {
        // Show header only after scrolling past the arrow
        const arrowPosition = arrowElement.getBoundingClientRect().bottom;
        setHeaderVisible(arrowPosition < 0);
      } else if (heroSection) {
        // Fallback if arrow not found
        const heroHeight = heroSection.offsetHeight;
        setHeaderVisible(window.scrollY > heroHeight * 0.8);
      } else {
        // Default behavior for non-home pages
        setHeaderVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
        headerVisible ? "py-2 md:py-3 bg-black shadow-md" : "py-4 md:py-5 bg-transparent -translate-y-full"
      )}
      initial={{ y: -100 }}
      animate={{ y: headerVisible ? 0 : -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex w-full md:w-auto justify-between items-center">
          <div className="w-28 md:w-32">
            <Logo 
              src="https://github.com/joshglowgrid/friendly-message-oasis/blob/main/glowgridmedia.png?raw=true" 
              alt="GlowGrid Logo"
              url="/"
            />
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center">
          <MegaMenu />
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 w-full bg-black py-4 border-t border-orange-400/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center space-y-4 px-4">
              <a 
                href="/services" 
                onClick={handleLinkClick} 
                className={cn(
                  "text-sm md:text-base font-medium tracking-wide uppercase transition-colors",
                  isActivePath('/services') ? "text-orange-400" : "text-white hover:text-orange-400"
                )}
              >
                Services
              </a>
              <a 
                href="/work" 
                onClick={handleLinkClick} 
                className={cn(
                  "text-sm md:text-base font-medium tracking-wide uppercase transition-colors",
                  isActivePath('/work') ? "text-orange-400" : "text-white hover:text-orange-400"
                )}
              >
                Work
              </a>
              <a 
                href="/blog" 
                onClick={handleLinkClick} 
                className={cn(
                  "text-sm md:text-base font-medium tracking-wide uppercase transition-colors",
                  isActivePath('/blog') ? "text-orange-400" : "text-white hover:text-orange-400"
                )}
              >
                Blog
              </a>
              <a 
                href="/resources" 
                onClick={handleLinkClick} 
                className={cn(
                  "text-sm md:text-base font-medium tracking-wide uppercase transition-colors",
                  isActivePath('/resources') ? "text-orange-400" : "text-white hover:text-orange-400"
                )}
              >
                Resources
              </a>
              <a 
                href="#contact" 
                onClick={() => scrollToSection('contact')} 
                className="text-sm md:text-base font-medium tracking-wide uppercase hover:text-orange-400 transition-colors"
              >
                Contact
              </a>
              
              <Button 
                variant="gradient" 
                className="w-full justify-center mt-2 py-2"
                onClick={() => scrollToSection('contact')}
              >
                Book a Call
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Header;
