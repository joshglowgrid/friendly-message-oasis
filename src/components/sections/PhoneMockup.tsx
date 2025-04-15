
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';

export const PhoneMockup = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const isMobile = window.innerWidth < 768;
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const services = [
    {
      title: "Content Creation",
      description: "Eye-catching photos, videos, and graphics that showcase your healthcare brand's unique personality and offerings.",
      features: [
        "High-quality photo production",
        "Social-first video creation",
        "Branded visual template systems",
        "Healthcare compliance expertise"
      ],
      icon: "/lovable-uploads/c0d2a5c5-0f7d-4f32-bacf-1707f0cf878f.png",
      color: "from-orange-400 to-orange-600"
    }, 
    {
      title: "Social Media Management",
      description: "Strategic content planning and community growth tactics specifically designed for medical & wellness brands.",
      features: [
        "Platform-specific strategy",
        "Engagement & community building",
        "Analytics & performance tracking",
        "HIPAA-compliant processes"
      ],
      icon: "/lovable-uploads/b86bc91f-c813-4cb6-8b9e-0fc6fc8172ab.png",
      color: "from-blue-400 to-blue-600"
    }, 
    {
      title: "Email Marketing",
      description: "Targeted campaigns and automated flows that convert leads into patients or clients.",
      features: [
        "Customer journey mapping",
        "Automated nurture sequences",
        "A/B testing optimization",
        "Segmentation & personalization"
      ],
      icon: "/lovable-uploads/980ee74c-a6c5-47b5-a04e-6988a9081a69.png",
      color: "from-teal-400 to-teal-600"
    },
    {
      title: "Website Development",
      description: "Conversion-focused websites that turn visitors into leads, with healthcare-specific features and integrations.",
      features: [
        "Custom WordPress solutions",
        "Mobile-optimized design",
        "Lead generation forms",
        "Patient portal integration"
      ],
      icon: "/lovable-uploads/94dadbd9-14d0-4012-9ec1-9fc74a95fb8f.png",
      color: "from-purple-400 to-purple-600"
    }
  ];
  
  const handleCardClick = (index: number) => {
    setActiveCard(index);
  };
  
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  // Card appearance variants
  const cardVariants = {
    inactive: { 
      opacity: 0.7,
      scale: 0.95,
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    active: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };
  
  return (
    <section 
      ref={sectionRef} 
      id="services-showcase" 
      className="relative py-16 md:py-24 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black to-[#0D0D0D]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
        <div className="absolute -top-[30%] -right-[10%] h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-[120px]"></div>
        <div className="absolute top-[40%] -left-[10%] h-[400px] w-[400px] rounded-full bg-orange-400/5 blur-[100px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl orange-gradient-text font-blink mb-4">
            Digital Marketing Ecosystem
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Comprehensive strategic services tailored for healthcare and wellness brands to build a cohesive digital presence.
          </p>
        </motion.div>
        
        {/* Mobile view - Vertical cards */}
        <div className="md:hidden space-y-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="inactive"
              animate={activeCard === i ? "active" : "inactive"}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleCardClick(i)}
              className={cn(
                "bg-black/30 border rounded-xl overflow-hidden cursor-pointer p-6",
                activeCard === i ? "border-orange-400/40" : "border-white/10"
              )}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-10 h-10 rounded-md bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                  <img src={service.icon} alt={service.title} className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </div>
              
              <p className="text-white/70 mb-4">{service.description}</p>
              
              <AnimatePresence>
                {activeCard === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-3 border-t border-white/10"
                  >
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-4 text-sm border-orange-400/30 text-orange-400 hover:bg-orange-400/10"
                      onClick={scrollToContact}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* Desktop view - Horizontal cards */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                initial="inactive"
                animate={activeCard === i ? "active" : "inactive"}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => handleCardClick(i)}
                className={cn(
                  "bg-black/30 border rounded-xl overflow-hidden cursor-pointer h-full flex flex-col transition-all duration-300",
                  activeCard === i ? "border-orange-400/40 shadow-lg shadow-orange-500/5" : "border-white/10"
                )}
              >
                <div className={`h-3 w-full bg-gradient-to-r ${service.color}`}></div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-md bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                        <img src={service.icon} alt={service.title} className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                    </div>
                    <p className="text-white/70 text-sm">{service.description}</p>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-white/10">
                    {activeCard === i ? (
                      <>
                        <ul className="space-y-2 mb-4">
                          {service.features.slice(0, 2).map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                              <span className="text-white/80 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full text-sm border-orange-400/30 text-orange-400 hover:bg-orange-400/10"
                          onClick={scrollToContact}
                        >
                          Learn More
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-xs text-white/60 hover:text-white flex items-center justify-between w-full"
                      >
                        <span>View Details</span>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-12">
          <Button 
            variant="gradient" 
            className="text-base font-medium px-8"
            onClick={scrollToContact}
          >
            Explore All Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
