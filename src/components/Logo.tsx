
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  src: string;
  alt: string;
  className?: string;
}

const Logo = ({ src, alt, className }: LogoProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <div className={cn("relative w-full h-auto overflow-hidden", className)}>
      <div className={cn(
        "w-full h-auto transition-opacity duration-700",
        loaded ? "opacity-100" : "opacity-0"
      )}>
        <img
          src={src}
          alt={alt}
          className="w-full h-auto animate-glow-pulse animate-float"
        />
      </div>
    </div>
  );
};

export default Logo;
