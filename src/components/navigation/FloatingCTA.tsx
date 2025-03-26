
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button 
            variant="gradient" 
            size="lg"
            className="rounded-full shadow-lg shadow-orange-500/20"
            onClick={() => window.open('https://calendly.com/glowgridmedia/30min', '_blank')}
          >
            Start a Project <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
