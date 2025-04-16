
import React from 'react';
import { Share2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ShareButtonProps {
  title?: string;
  excerpt?: string;
  url?: string;
  className?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ 
  title, 
  excerpt, 
  url = window.location.href,
  className
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

  return (
    <button 
      onClick={handleShareClick}
      className={`flex items-center hover:text-orange-400 transition-colors ${className || ''}`}
    >
      <Share2 className="w-4 h-4 mr-1" />
      <span>Share</span>
    </button>
  );
};
