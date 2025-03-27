
import React, { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import { cn } from '@/lib/utils';
import { NavLink } from '@/components/NavLink';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const heroHeight = hero?.offsetHeight ?? 0;
    const heroButton = document.querySelector('.hero-cta-button');

    const handleScroll = () => {
      // Check if we've scrolled past the hero section or hero button
      if (heroButton) {
        const buttonBottom = heroButton.getBoundingClientRect().bottom;
        setIsSticky(buttonBottom <= 0);
      } else if (window.scrollY > heroHeight - 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check to set correct state on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 px-4 transition-all duration-300 flex justify-between items-center',
        isSticky ? 'bg-black shadow-md' : 'bg-transparent'
      )}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="py-4 cursor-pointer" onClick={scrollToTop}>
        <Logo 
          src="https://github.com/joshglowgrid/friendly-message-oasis/blob/main/glowgridmedia.png?raw=true" 
          alt="GlowGrid Logo"
          url="/"
        />
      </div>

      <nav className="hidden md:flex space-x-6">
        <NavLink href="/">Home</NavLink>
        <NavLink href="#services">Services</NavLink>
        <NavLink href="#contact">Contact</NavLink>
        <NavLink href="/blog">Blog</NavLink>
      </nav>
    </header>
  );
};

export default Header;
