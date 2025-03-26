
import React, { useState } from 'react';
import NavLink from '@/components/NavLink';
import Logo from '@/components/Logo';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import NavHeader from '@/components/ui/NavHeader';

interface HeaderProps {
  scrolled: boolean;
}

const Header = ({ scrolled }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <nav className={cn(
      "sticky top-0 z-50 bg-black/80 backdrop-blur-sm w-full transition-all duration-300",
      scrolled ? "py-2" : "py-4"
    )}>
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex w-full md:w-auto justify-between items-center">
          <div className="w-32 md:w-36">
            <Logo 
              src="https://github.com/joshglowgrid/friendly-message-oasis/blob/main/glowgridmedia.png?raw=true" 
              alt="GlowGrid Logo"
              url="https://glowgridmedia.com"
            />
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className="hidden md:block">
          <NavHeader />
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md py-4">
          <div className="flex flex-col items-center space-y-4">
            <NavLink href="#about" onClick={handleLinkClick}>ABOUT</NavLink>
            <NavLink href="#services" onClick={handleLinkClick}>SERVICES</NavLink>
            <NavLink href="#why-us" onClick={handleLinkClick}>WHY US</NavLink>
            <NavLink href="#industries" onClick={handleLinkClick}>INDUSTRIES</NavLink>
            <NavLink href="#contact" onClick={handleLinkClick} variant="contact-button">CONTACT</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
