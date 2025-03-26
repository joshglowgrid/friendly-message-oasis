
import React from 'react';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void; // Added onClick property
}

const NavLink = ({ href, children, className, onClick }: NavLinkProps) => {
  return (
    <a 
      href={href} 
      className={cn(
        "nav-link text-lg font-medium tracking-wide uppercase transition-all duration-300", 
        className
      )}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default NavLink;
