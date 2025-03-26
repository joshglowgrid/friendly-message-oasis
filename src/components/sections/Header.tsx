
import React, { useState, useEffect } from 'react';
import Logo from '@/components/Logo';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MegaMenu } from '@/components/navigation/MegaMenu';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  scrolled: boolean;
}

const Header = ({ scrolled }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.nav 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isAtTop ? "py-4 md:py-5" : "py-2 md:py-3 shadow-md",
        scrolled || !isAtTop ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex w-full md:w-auto justify-between items-center">
          <div className="w-28 md:w-32">
            <Logo 
              src="https://github.com/joshglowgrid/friendly-message-oasis/blob/main/glowgridmedia.png?raw=true" 
              alt="GlowGrid Logo"
              url="https://glowgridmedia.com"
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
            className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md py-4 border-t border-orange-400/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center space-y-4 px-4">
              <a href="#services" onClick={handleLinkClick} className="text-sm md:text-base font-medium tracking-wide uppercase hover:text-orange-400 transition-colors">Services</a>
              <a href="#work" onClick={handleLinkClick} className="text-sm md:text-base font-medium tracking-wide uppercase hover:text-orange-400 transition-colors">Work</a>
              <a href="#blog" onClick={handleLinkClick} className="text-sm md:text-base font-medium tracking-wide uppercase hover:text-orange-400 transition-colors">Blog</a>
              <a href="#resources" onClick={handleLinkClick} className="text-sm md:text-base font-medium tracking-wide uppercase hover:text-orange-400 transition-colors">Resources</a>
              <a href="#team" onClick={handleLinkClick} className="text-sm md:text-base font-medium tracking-wide uppercase hover:text-orange-400 transition-colors">Team</a>
              <a href="#contact" onClick={handleLinkClick} className="text-sm md:text-base font-medium tracking-wide uppercase hover:text-orange-400 transition-colors">Contact</a>
              
              <Button 
                variant="gradient" 
                className="w-full justify-center mt-2 py-2"
                onClick={() => window.open('https://calendly.com/glowgridmedia/30min', '_blank')}
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
