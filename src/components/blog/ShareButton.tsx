
import React from 'react';
import { Share2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
  title?: string;
  excerpt?: string;
  url?: string;
  className?: string;
  variant?: 'icon' | 'text';
}

export const ShareButton: React.FC<ShareButtonProps> = ({ 
  title, 
  excerpt, 
  url = window.location.href,
  className,
  variant = 'text'
}) => {
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: excerpt,
        url,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "The article link has been copied to your clipboard.",
        duration: 3000,
      });
    }
  };

  if (variant === 'icon') {
    return (
      <button 
        onClick={handleShareClick}
        className={cn(
          "flex items-center justify-center rounded-full w-10 h-10 transition-colors duration-200",
          "bg-white text-orange-500 hover:bg-orange-500 hover:text-white",
          className
        )}
        aria-label="Share article"
      >
        <Share2 className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button 
      onClick={handleShareClick}
      className={cn(
        "flex items-center hover:text-orange-400 transition-colors",
        className
      )}
    >
      <Share2 className="w-4 h-4 mr-1" />
      <span>Share</span>
    </button>
  );
};
