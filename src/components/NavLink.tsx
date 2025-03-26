
import React from 'react';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'button' | 'contact-button';
}

const NavLink = ({ href, children, className, onClick, variant = 'default' }: NavLinkProps) => {
  return (
    <a 
      href={href} 
      className={cn(
        "nav-link text-sm md:text-base font-medium tracking-wide uppercase transition-all duration-150 flex items-center",
        variant === 'button' && "orange-gradient-bg px-4 py-2 rounded-md shadow-lg hover:shadow-orange-500/30",
        variant === 'contact-button' && "orange-gradient-bg px-4 py-2 rounded-md shadow-lg hover:bg-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 border border-transparent hover:border-orange-400 text-white",
        className
      )}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default NavLink;
