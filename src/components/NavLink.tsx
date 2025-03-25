
import React from 'react';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className }: NavLinkProps) => {
  return (
    <a 
      href={href} 
      className={cn(
        "nav-link text-lg font-medium tracking-wide uppercase transition-all duration-300", 
        className
      )}
    >
      {children}
    </a>
  );
};

export default NavLink;
