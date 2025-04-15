
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface LogoProps {
  src?: string;
  alt?: string;
  className?: string;
  url?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  src = "https://img.glowgridmedia.com/glowgridmedia.png", 
  alt = "GlowGrid Media",
  className,
  url = "/" // Default to homepage if no URL provided
}) => {
  return (
    <div className={cn("logo-glow-wave", className)}>
      <Link to={url}>
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-contain"
        />
      </Link>
    </div>
  );
};

export default Logo;
