
import React, { useState, useEffect } from 'react';
import Logo from '@/components/Logo';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MegaMenu } from '@/components/navigation/MegaMenu';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { scrollToSection } from '@/components/navigation/navUtils';

interface HeaderProps {
  scrolled: boolean;
}

const Header = ({ scrolled }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true); 
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
      if (isHomePage) {
        setHeaderVisible(true); // Always keep header visible
      } else {
        setHeaderVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Header animation variants
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.nav 
      variants={headerVariants}
      initial="visible"
      animate="visible"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        (headerVisible || scrolled || !isHomePage)
          ? "py-2 md:py-3 bg-black/95 backdrop-blur-md shadow-md border-b border-orange-500/10"
          : "py-4 md:py-5 bg-transparent"
      )}
      style={{
        paddingTop: `calc(env(safe-area-inset-top) + ${(headerVisible || scrolled || !isHomePage) ? '0.5rem' : '1rem'})`,
      }}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex w-full md:w-auto justify-between items-center">
          <div className="w-28 md:w-32 cursor-pointer">
            <Logo 
              src="https://github.com/joshglowgrid/friendly-message-oasis/blob/main/glowgridmedia.png?raw=true" 
              alt="GlowGrid Logo"
              url="/"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMobileMenu}
            className="p-2 text-white md:hidden flex items-center justify-center bg-orange-500/10 rounded-full border border-orange-500/20"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        <div className="hidden md:flex items-center">
          <MegaMenu onLinkClick={handleLinkClick} />
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
              <Link 
                to="/services" 
                onClick={handleLinkClick} 
                className={cn(
                  "text-sm md:text-base font-medium tracking-wide uppercase transition-colors",
                  isActivePath('/services') ? "text-orange-400" : "text-white hover:text-orange-400"
                )}
              >
                Services
              </Link>
              <Link 
                to="/work" 
                onClick={handleLinkClick} 
                className={cn(
                  "text-sm md:text-base font-medium tracking-wide uppercase transition-colors",
                  isActivePath('/work') ? "text-orange-400" : "text-white hover:text-orange-400"
                )}
              >
                Work
              </Link>
              <Link 
                to="/blog" 
                onClick={handleLinkClick} 
                className={cn(
                  "text-sm md:text-base font-medium tracking-wide uppercase transition-colors",
                  isActivePath('/blog') ? "text-orange-400" : "text-white hover:text-orange-400"
                )}
              >
                Blog
              </Link>
              <Link 
                to="/resources" 
                onClick={handleLinkClick} 
                className={cn(
                  "text-sm md:text-base font-medium tracking-wide uppercase transition-colors",
                  isActivePath('/resources') ? "text-orange-400" : "text-white hover:text-orange-400"
                )}
              >
                Resources
              </Link>
              <Link 
                to="/contact" 
                onClick={handleLinkClick} 
                className={cn(
                  "text-sm md:text-base font-medium tracking-wide uppercase transition-colors",
                  isActivePath('/contact') ? "text-orange-400" : "text-white hover:text-white hover:text-orange-400"
                )}
              >
                Contact
              </Link>
              
              <Button 
                variant="gradient" 
                className="w-full justify-center mt-2 py-2 hover:text-white"
                onClick={() => {
                  handleLinkClick();
                  scrollToSection('contact');
                }}
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
