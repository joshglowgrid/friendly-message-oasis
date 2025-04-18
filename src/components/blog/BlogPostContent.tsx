
import React from 'react';
import { Facebook, Linkedin, Twitter } from 'lucide-react';
import { renderMarkdown } from '@/utils/markdownRenderer';
import { BlogPost } from '@/types/blog';
import { cn } from '@/lib/utils';
import { BlogPostCTA } from './BlogPostCTA';

interface BlogPostContentProps {
  post: BlogPost;
}

export const BlogPostContent: React.FC<BlogPostContentProps> = ({ post }) => {
  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    const text = encodeURIComponent(post.excerpt || '');
    
    let shareUrl = '';
    
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="container mx-auto px-4 relative z-10 -mt-6">
      <div className="bg-black/90 border border-orange-400/20 rounded-lg p-6 md:p-10 max-w-4xl mx-auto backdrop-blur-sm">
        <article 
          className="prose prose-lg prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />
        
        {/* Share buttons */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-white/60 font-medium">Share this article:</span>
            <div className="flex gap-3 blog-social-icons">
              <button 
                onClick={() => handleShare('facebook')}
                className={cn(
                  "flex items-center justify-center rounded-full w-10 h-10 transition-colors duration-200",
                  "bg-white text-orange-500 hover:bg-orange-500 hover:text-white"
                )}
                aria-label="Share on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleShare('twitter')}
                className={cn(
                  "flex items-center justify-center rounded-full w-10 h-10 transition-colors duration-200",
                  "bg-white text-orange-500 hover:bg-orange-500 hover:text-white"
                )}
                aria-label="Share on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleShare('linkedin')}
                className={cn(
                  "flex items-center justify-center rounded-full w-10 h-10 transition-colors duration-200",
                  "bg-white text-orange-500 hover:bg-orange-500 hover:text-white"
                )}
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
