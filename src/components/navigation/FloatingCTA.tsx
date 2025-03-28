
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUp } from 'lucide-react';

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    const tabTrigger = document.querySelector('[data-state="inactive"][value="call"]') as HTMLElement;
    
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Allow time for scroll before clicking the tab
      setTimeout(() => {
        if (tabTrigger) {
          tabTrigger.click();
        }
      }, 800);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2"
        >
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full border border-white/20 hover:border-orange-400 bg-black/70 backdrop-blur-sm hover:bg-black/90 text-white/70 hover:text-orange-400"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="gradient" 
            size="lg"
            className="rounded-full shadow-lg shadow-orange-500/20"
            onClick={scrollToContact}
          >
            Start a Project <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
