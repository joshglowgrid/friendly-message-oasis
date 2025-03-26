import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
export const PhoneMockup = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const screens = [{
    title: "Content Creation",
    description: "Eye-catching reels, photos, and videos that showcase your brand.",
    features: ["Strategic video content planning", "High-quality photo production", "Social-first creative direction", "Branded template system"],
    serviceImage: "/lovable-uploads/94dadbd9-14d0-4012-9ec1-9fc74a95fb8f.png"
  }, {
    title: "Social Media Management",
    description: "Strategic content planning and community growth.",
    features: ["Platform-specific strategy", "Engagement & community building", "Analytics & performance tracking", "Trend monitoring & adaptation"],
    serviceImage: "/lovable-uploads/b86bc91f-c813-4cb6-8b9e-0fc6fc8172ab.png"
  }, {
    title: "Email Marketing",
    description: "Targeted campaigns and automated flows that convert.",
    features: ["Customer journey mapping", "Automated nurture sequences", "A/B testing optimization", "Segmentation & personalization"],
    serviceImage: "/lovable-uploads/980ee74c-a6c5-47b5-a04e-6988a9081a69.png"
  }];
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]);
  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  useEffect(() => {
    const updateScreenIndex = () => {
      const progress = scrollYProgress.get();
      if (progress < 0.33) {
        setActiveTab(0);
      } else if (progress < 0.66) {
        setActiveTab(1);
      } else {
        setActiveTab(2);
      }
    };
    const unsubscribe = scrollYProgress.on('change', updateScreenIndex);
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Handle manual tab switching
  const handleTabClick = (index: number) => {
    setActiveTab(index);

    // Optional: Scroll to the corresponding position
    if (sectionRef.current) {
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollTarget = sectionRef.current.offsetTop + sectionHeight * (index + 1) / 4;
      window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
      });
    }
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section ref={sectionRef} id="mobile-services" className="relative py-16 px-4 overflow-hidden pb-8 md:py-[60px]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl orange-gradient-text font-blink mb-6">Mobile-First Marketing</h2>
            <p className="text-white/80 max-w-xl mb-8">
              We create content that connects with audiences on the devices they use most. Our mobile-first approach ensures your brand stands out on every screen.
            </p>
            
            <div className="space-y-6">
              {screens.map((screen, i) => <motion.div key={i} className={cn("p-4 rounded-lg border transition-all duration-300 cursor-pointer", activeTab === i ? "border-orange-400 bg-black/30" : "border-white/10 bg-transparent hover:border-white/30")} animate={{
              opacity: activeTab === i ? 1 : 0.6,
              scale: activeTab === i ? 1 : 0.98
            }} onClick={() => handleTabClick(i)}>
                  <h3 className="text-xl font-semibold">{screen.title}</h3>
                  <p className="text-white/70 mb-2">{screen.description}</p>
                  
                  {activeTab === i && <motion.div initial={{
                opacity: 0,
                height: 0
              }} animate={{
                opacity: 1,
                height: 'auto'
              }} transition={{
                duration: 0.3
              }}>
                      <ul className="space-y-1 mt-3 text-sm text-white/60">
                        {screen.features.map((feature, index) => <li key={index} className="flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
                            {feature}
                          </li>)}
                      </ul>
                      
                      <Button variant="outline" className="mt-4 text-sm border-orange-400/50 text-orange-400 hover:bg-orange-400/10" onClick={scrollToContact}>
                        Request a Quote
                      </Button>
                    </motion.div>}
                </motion.div>)}
            </div>
          </div>
          
          <div className="relative flex justify-center">
            {/* Direct image display without phone mockup */}
            {screens.map((screen, i) => <motion.div key={i} className="relative w-full h-full aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl" initial={{
            opacity: 0
          }} animate={{
            opacity: activeTab === i ? 1 : 0,
            scale: activeTab === i ? 1 : 0.9
          }} style={{
            scale: imageScale,
            y: imageY,
            display: activeTab === i ? 'block' : 'none'
          }} transition={{
            duration: 0.5
          }}>
                <img src={screen.serviceImage} alt={screen.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Optional: Add a title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{screen.title}</h3>
                </div>
                
                {/* Glow effect */}
                <div className="absolute -inset-4 opacity-30 blur-xl rounded-full" style={{
              background: 'linear-gradient(to right, #FF8359, #FF4E87)',
              filter: 'blur(20px)',
              zIndex: -1
            }} />
              </motion.div>)}
          </div>
        </div>
      </div>
    </section>;
};