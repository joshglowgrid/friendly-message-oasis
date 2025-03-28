
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface LogoProps {
  src: string;
  alt: string;
  className?: string;
  url?: string; // Added url as an optional property
}

const Logo: React.FC<LogoProps> = ({ 
  src, 
  alt,
  className,
  url = "/" // Default to homepage if no URL provided
}) => {
  const logoImage = (
    <img
      src={src}
      alt={alt}
      className="w-full h-auto object-contain"
    />
  );

  return (
    <div className={cn("logo-glow-wave", className)}>
      <Link to={url}>
        {logoImage}
      </Link>
    </div>
  );
};

export default Logo;
