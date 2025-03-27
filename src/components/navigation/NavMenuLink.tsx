
"use client"

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavMenuLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const NavMenuLink: React.FC<NavMenuLinkProps> = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={cn(
        "px-3 py-2 text-sm font-medium uppercase tracking-wide relative transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:orange-gradient-bg after:origin-bottom-right after:transition-transform after:duration-150 hover:after:scale-x-100 hover:after:origin-bottom-left",
        isActive ? "text-orange-400 after:scale-x-100" : "text-white hover:text-white"
      )}
    >
      {children}
    </Link>
  );
};

// Also provide default export for backward compatibility
export default NavMenuLink;
