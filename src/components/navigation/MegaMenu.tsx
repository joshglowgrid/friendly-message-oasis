
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { MegaMenuItem } from './MegaMenuItem';
import { getServicesData, getResourcesData } from './menuData';
import { scrollToSection } from './navUtils';

interface MegaMenuProps {
  className?: string;
  onLinkClick?: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ className, onLinkClick }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOpenMenu = (menu: string) => {
    setOpenMenu(menu);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  const handleLinkClick = () => {
    handleCloseMenu();
    if (onLinkClick) {
      onLinkClick();
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Close menu when location changes
  useEffect(() => {
    handleCloseMenu();
  }, [location]);

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenu && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleCloseMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu]);

  return (
    <nav ref={menuRef} className={cn("flex items-center space-x-1", className)}>
      <MegaMenuItem 
        title="Services" 
        items={getServicesData()}
        isOpen={openMenu === 'services'}
        onOpen={() => handleOpenMenu('services')}
        onClose={handleCloseMenu}
        onLinkClick={handleLinkClick}
      />
      
      <Link 
        to="/work" 
        className={cn(
          "px-3 py-2 text-sm font-medium uppercase tracking-wide relative transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:orange-gradient-bg after:origin-bottom-right after:transition-transform after:duration-150 hover:after:scale-x-100 hover:after:origin-bottom-left",
          isActive('/work') ? "text-orange-400 after:scale-x-100" : "text-white hover:text-white"
        )}
        onClick={handleLinkClick}
      >
        Work
      </Link>
      
      <Link 
        to="/blog" 
        className={cn(
          "px-3 py-2 text-sm font-medium uppercase tracking-wide relative transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:orange-gradient-bg after:origin-bottom-right after:transition-transform after:duration-150 hover:after:scale-x-100 hover:after:origin-bottom-left",
          isActive('/blog') ? "text-orange-400 after:scale-x-100" : "text-white hover:text-white"
        )}
        onClick={handleLinkClick}
      >
        Blog
      </Link>
      
      <MegaMenuItem 
        title="Resources" 
        items={getResourcesData()}
        isOpen={openMenu === 'resources'}
        onOpen={() => handleOpenMenu('resources')}
        onClose={handleCloseMenu}
        onLinkClick={handleLinkClick}
      />
      
      <a 
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('contact');
          handleLinkClick();
        }}
        className="px-3 py-2 text-sm font-medium uppercase tracking-wide text-white relative hover:text-white hover:after:scale-x-100 hover:after:origin-bottom-left after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:orange-gradient-bg after:origin-bottom-right after:transition-transform after:duration-150"
      >
        Contact
      </a>
      
      <Button 
        variant="gradient" 
        className="ml-4 text-sm font-medium"
        onClick={() => {
          scrollToSection('contact');
          handleLinkClick();
        }}
      >
        Book a Call <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </nav>
  );
};
