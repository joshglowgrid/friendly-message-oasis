
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
        "nav-link text-lg font-medium tracking-wide uppercase transition-all duration-300",
        variant === 'button' && "orange-gradient-bg px-4 py-2 rounded-md shadow-lg hover:shadow-orange-500/30",
        variant === 'contact-button' && "border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-4 py-2 rounded-md transition-all duration-300",
        className
      )}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default NavLink;
