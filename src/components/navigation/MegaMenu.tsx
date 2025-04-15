
"use client"

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { MegaMenuItem } from './MegaMenuItem';
import { getServicesData, getResourcesData } from './menuData';
import { scrollToSection } from './navUtils';

interface MegaMenuProps {
  className?: string;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ className }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const location = useLocation();

  const handleOpenMenu = (menu: string) => {
    setOpenMenu(menu);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Close menu when location changes
  React.useEffect(() => {
    handleCloseMenu();
  }, [location]);

  return (
    <nav className={cn("flex items-center space-x-1", className)}>
      <MegaMenuItem 
        title="Services" 
        items={getServicesData()}
        isOpen={openMenu === 'services'}
        onOpen={() => handleOpenMenu('services')}
        onClose={handleCloseMenu}
      />
      
      <Link 
        to="/work" 
        className={cn(
          "px-3 py-2 text-sm font-medium uppercase tracking-wide relative transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:orange-gradient-bg after:origin-bottom-right after:transition-transform after:duration-150 hover:after:scale-x-100 hover:after:origin-bottom-left",
          isActive('/work') ? "text-orange-400 after:scale-x-100" : "text-white hover:text-white"
        )}
        onClick={handleCloseMenu}
      >
        Work
      </Link>
      
      <Link 
        to="/blog" 
        className={cn(
          "px-3 py-2 text-sm font-medium uppercase tracking-wide relative transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:orange-gradient-bg after:origin-bottom-right after:transition-transform after:duration-150 hover:after:scale-x-100 hover:after:origin-bottom-left",
          isActive('/blog') ? "text-orange-400 after:scale-x-100" : "text-white hover:text-white"
        )}
        onClick={handleCloseMenu}
      >
        Blog
      </Link>
      
      <MegaMenuItem 
        title="Resources" 
        items={getResourcesData()}
        isOpen={openMenu === 'resources'}
        onOpen={() => handleOpenMenu('resources')}
        onClose={handleCloseMenu}
      />
      
      <a 
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('contact');
          handleCloseMenu();
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
          handleCloseMenu();
        }}
      >
        Book a Call <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </nav>
  );
};
