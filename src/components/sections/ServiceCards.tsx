
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  MonitorSmartphone, 
  Mail, 
  Pen, 
  PieChart, 
  Layout, 
  Search,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-xl p-px overflow-hidden h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Glow effect */}
      <div 
        className={cn(
          "pointer-events-none absolute -inset-px opacity-0 transition duration-300",
          isHovered && "opacity-100"
        )}
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 131, 89, 0.15), transparent 40%)`,
        }}
      />
      
      {/* Border glow */}
      <div 
        className={cn(
          "pointer-events-none absolute -inset-px opacity-0 transition duration-300",
          isHovered && "opacity-100"
        )}
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 131, 89, 0.3), transparent 40%)`,
          maskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
          maskSize: 'calc(100% - 1px) calc(100% - 1px), 100% 100%',
          maskPosition: '0 0, 0 0',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />
      
      {/* Card content */}
      <div className="relative rounded-xl bg-black/40 backdrop-blur-sm p-4 sm:p-6 border border-white/10 h-full flex flex-col">
        <div className="mb-3 sm:mb-4 orange-gradient-bg w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-white">
          {icon}
        </div>
        <h3 className="text-base sm:text-lg font-semibold mb-2">{title}</h3>
        <p className="text-white/80 mb-4 text-sm sm:text-base flex-grow">{description}</p>
        <Button variant="link" className="p-0 h-auto text-orange-400 hover:text-orange-500 transition-colors mt-auto text-sm sm:text-base" asChild>
          <a href="/services">
            Learn more <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
          </a>
        </Button>
      </div>
    </motion.div>
  );
};

export const ServiceCards = () => {
  const services = [
    {
      title: "Social Media Management",
      description: "Strategic content planning and engaging community management for platforms that convert.",
      icon: <MonitorSmartphone className="h-5 w-5 sm:h-6 sm:w-6" />
    },
    {
      title: "Content Creation",
      description: "Eye-catching reels, photos, and videos that showcase your brand's unique personality.",
      icon: <Pen className="h-5 w-5 sm:h-6 sm:w-6" />
    },
    {
      title: "Email Marketing",
      description: "Targeted campaigns and automated flows that nurture leads and boost customer retention.",
      icon: <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
    },
    {
      title: "Website Development",
      description: "Fast, responsive, and conversion-optimized websites and landing pages.",
      icon: <Layout className="h-5 w-5 sm:h-6 sm:w-6" />
    },
    {
      title: "SEO Strategy",
      description: "Data-driven optimization to increase organic visibility and quality traffic.",
      icon: <Search className="h-5 w-5 sm:h-6 sm:w-6" />
    },
    {
      title: "Analytics & Reporting",
      description: "Clear performance insights and KPIs tracking for continuous improvement.",
      icon: <PieChart className="h-5 w-5 sm:h-6 sm:w-6" />
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl orange-gradient-text font-blink mb-3 sm:mb-4">Our Services</h2>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
            Comprehensive marketing solutions tailored to help healthcare and wellness brands stand out and grow their online presence.
          </p>
        </div>
        
        {/* Modified to show 2 cards per row on mobile instead of 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
