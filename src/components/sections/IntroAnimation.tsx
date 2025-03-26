
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/Logo';

export const IntroAnimation = () => {
  const [loadingState, setLoadingState] = useState<'loading' | 'logo' | 'complete'>('loading');

  useEffect(() => {
    // Quick loading animation
    const loadingTimer = setTimeout(() => {
      setLoadingState('logo');
    }, 800);
    
    // Hide intro after showing logo
    const completeTimer = setTimeout(() => {
      setLoadingState('complete');
    }, 2500);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loadingState !== 'complete' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ 
            background: loadingState === 'loading' 
              ? 'linear-gradient(to right, #0D0D0D, #151515)' 
              : 'linear-gradient(-45deg, #FF8359, #FF4E87)' 
          }}
        >
          {loadingState === 'loading' ? (
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="h-1 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
            />
          ) : (
            <>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{ 
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.1" fill-rule="evenodd"/%3E%3C/svg%3E")',
                  backgroundSize: 'cover' 
                }} />
              </div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  duration: 0.5 
                }}
                className="relative w-1/2 max-w-md z-10"
              >
                <Logo 
                  src="https://github.com/joshglowgrid/friendly-message-oasis/blob/main/glowgridmedia.png?raw=true" 
                  alt="GlowGrid Logo"
                  url=""
                />
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
