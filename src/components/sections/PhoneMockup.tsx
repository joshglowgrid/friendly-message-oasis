
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const PhoneMockup = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [screenIndex, setScreenIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const screens = [
    {
      image: "https://framerusercontent.com/images/wJINOk3BFAbg3J9JjJkqJ1YY0.png",
      title: "Content Creation",
      description: "Eye-catching reels, photos, and videos that showcase your brand."
    },
    {
      image: "https://framerusercontent.com/images/1YybfM1vJoYjE7EbieJ4Z1smbI.png",
      title: "Social Media Management",
      description: "Strategic content planning and community growth."
    },
    {
      image: "https://framerusercontent.com/images/eVmEWxrjusxPcr9FiWiADXCMhvk.png",
      title: "Email Marketing",
      description: "Targeted campaigns and automated flows that convert."
    }
  ];
  
  const phoneRotation = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 0, 10]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const phoneY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);
  
  useEffect(() => {
    const updateScreenIndex = () => {
      const progress = scrollYProgress.get();
      if (progress < 0.33) {
        setScreenIndex(0);
      } else if (progress < 0.66) {
        setScreenIndex(1);
      } else {
        setScreenIndex(2);
      }
    };
    
    const unsubscribe = scrollYProgress.on('change', updateScreenIndex);
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-32 md:py-48 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl orange-gradient-text font-blink mb-4">Mobile-First Marketing</h2>
            <p className="text-white/80 max-w-xl mb-8">
              We create content that connects with audiences on the devices they use most. Our mobile-first approach ensures your brand stands out on every screen.
            </p>
            
            <div className="space-y-6">
              {screens.map((screen, i) => (
                <motion.div 
                  key={i}
                  className={cn(
                    "p-4 rounded-lg border transition-all duration-300", 
                    screenIndex === i 
                      ? "border-orange-400 bg-black/30" 
                      : "border-white/10 bg-transparent"
                  )}
                  animate={{ 
                    opacity: screenIndex === i ? 1 : 0.6,
                    scale: screenIndex === i ? 1 : 0.98
                  }}
                >
                  <h3 className="text-xl font-semibold">{screen.title}</h3>
                  <p className="text-white/70">{screen.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <motion.div
              ref={phoneRef}
              style={{ 
                rotateZ: phoneRotation,
                scale: phoneScale,
                y: phoneY
              }}
              className="relative w-60 h-auto"
            >
              {/* Phone frame */}
              <div className="relative">
                <svg viewBox="0 0 308 632" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                  {/* Phone frame path */}
                  <path
                    d="M306 126.084V505.916C306 518.646 302.755 531.193 296.667 542.358C290.578 553.523 281.862 562.945 271.233 569.666L257.469 578C250.284 582.584 242.179 585.506 233.714 586.541C225.249 587.576 216.627 586.697 208.551 583.971L195.245 579.562C188.062 577.193 180.466 576.348 172.957 577.084L140.043 580.916C132.534 581.652 124.938 580.807 117.755 578.438L104.449 574.029C96.373 571.303 87.751 570.424 79.286 571.459C70.821 572.494 62.716 575.416 55.531 580L41.767 588.334C31.138 595.055 22.422 604.477 16.333 615.642C10.245 626.807 7 639.354 7 652.084V683M306 126.084V94.916C306 82.1863 302.755 69.6395 296.667 58.4741C290.578 47.3087 281.862 37.8867 271.233 31.1665L257.469 22.8331C250.284 18.2493 242.179 15.3275 233.714 14.2925C225.249 13.2575 216.627 14.1366 208.551 16.8627L195.245 21.2714C188.062 23.6405 180.466 24.4855 172.957 23.7497L140.043 19.9176C132.534 19.1818 124.938 20.0268 117.755 22.3959L104.449 26.8046C96.373 29.5307 87.751 30.4098 79.286 29.3748C70.821 28.3398 62.716 25.418 55.531 20.8342L41.767 12.5008C31.138 5.78059 22.422 -3.64139 16.333 -14.8068C10.245 -25.9722 7 -38.519 7 -51.2487V-83M306 126.084C306 110.532 294 87.1991 266.5 87.1991C252.667 87.1991 232.7 95.1991 232.5 126.084"
                    stroke="url(#gradient)"
                    strokeWidth="6"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="7" y1="-83" x2="400" y2="700" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF8359" />
                      <stop offset="1" stopColor="#FF4E87" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Screen content */}
                <div className="absolute top-[6%] left-[8%] right-[8%] bottom-[6%] overflow-hidden rounded-3xl">
                  {screens.map((screen, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: screenIndex === i ? 1 : 0,
                        scale: screenIndex === i ? 1 : 1.1
                      }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                      style={{ display: screenIndex === i ? 'block' : 'none' }}
                    >
                      <img 
                        src={screen.image} 
                        alt={screen.title} 
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
                
                {/* Glow effect */}
                <div className="absolute -inset-4 opacity-30 blur-xl rounded-full" style={{
                  background: 'linear-gradient(to right, #FF8359, #FF4E87)',
                  filter: 'blur(20px)'
                }} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
