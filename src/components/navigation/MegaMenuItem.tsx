
"use client"

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const menuVariants = {
  hidden: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.2 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.2 }
  }
};

export interface MenuItemType {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  link: string;
}

interface MegaMenuItemProps {
  title: string;
  items: MenuItemType[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onLinkClick?: () => void;
}

export const MegaMenuItem: React.FC<MegaMenuItemProps> = ({ 
  title, 
  items, 
  isOpen,
  onOpen,
  onClose,
  onLinkClick
}) => {
  const location = useLocation();
  const isActive = items.some(item => location.pathname === item.link);
  const [isHovering, setIsHovering] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  
  const handleMouseEnter = () => {
    setIsHovering(true);
    onOpen();
    
    // Clear any existing timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Increase delay to 500ms to allow more time to move to submenu
    closeTimeoutRef.current = window.setTimeout(() => {
      if (!isHovering) {
        onClose();
      }
    }, 500);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
    onClose(); // Close menu after navigation
    if (onLinkClick) {
      onLinkClick();
    }
  };
  
  return (
    <div 
      className="relative" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className={cn(
          "flex items-center justify-center px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:orange-gradient-bg after:origin-bottom-right after:transition-transform after:duration-150",
          isActive 
            ? "text-orange-400 after:scale-x-100" 
            : "text-white hover:text-white hover:after:scale-x-100 hover:after:origin-bottom-left"
        )}
      >
        {title} <ChevronDown className="ml-1 h-3 w-3" />
      </button>

      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={menuVariants}
          className="absolute left-1/2 z-50 mt-2 w-screen max-w-4xl -translate-x-1/2 px-4"
          onMouseEnter={() => {
            setIsHovering(true);
            // Clear any existing timeout
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current);
              closeTimeoutRef.current = null;
            }
          }}
          onMouseLeave={() => {
            setIsHovering(false);
            closeTimeoutRef.current = window.setTimeout(() => {
              if (!isHovering) {
                onClose();
              }
            }, 300);
          }}
        >
          <div className="overflow-hidden rounded-xl border border-orange-400/20 bg-black shadow-xl">
            <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => (
                <Link
                  key={i}
                  to={item.link}
                  className={cn(
                    "group flex flex-col gap-2 rounded-lg p-3 transition-colors hover:bg-white/5",
                    location.pathname === item.link ? "bg-white/10" : ""
                  )}
                  onClick={() => {
                    onClose();
                    if (onLinkClick) {
                      onLinkClick();
                    }
                  }}
                >
                  {item.icon && (
                    <div className="orange-gradient-bg flex h-10 w-10 items-center justify-center rounded-full">
                      {item.icon}
                    </div>
                  )}
                  <div>
                    <div className={cn(
                      "font-medium group-hover:text-orange-400 transition-colors",
                      location.pathname === item.link ? "text-orange-400" : "text-white"
                    )}>
                      {item.title}
                    </div>
                    {item.description && (
                      <div className="text-sm text-white/70">{item.description}</div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <div className="orange-gradient-bg p-6">
              <div className="flex justify-between items-center">
                <div className="text-white">
                  <h3 className="text-lg font-semibold">Ready to grow your brand?</h3>
                  <p className="text-sm text-white/80">Schedule a discovery call with our team</p>
                </div>
                <Button 
                  variant="outline" 
                  className="bg-white text-transparent hover:bg-black hover:text-white hover:border-white bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-300"
                  onClick={() => scrollToSection('contact')}
                >
                  Book a Call <Phone className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
