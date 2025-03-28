
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  src: string;
  alt: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  src, 
  alt,
  className
}) => {
  return (
    <div className={cn("logo-glow-wave", className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-contain"
      />
    </div>
  );
};

export default Logo;
