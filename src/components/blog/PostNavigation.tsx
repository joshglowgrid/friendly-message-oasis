
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';

interface PostNavigationProps {
  previous: BlogPost | null;
  next: BlogPost | null;
}

export const PostNavigation: React.FC<PostNavigationProps> = ({ previous, next }) => {
  if (!previous && !next) return null;

  return (
    <div className="border-t border-orange-500/20 mt-10 pt-8">
      <div className="flex justify-between items-center">
        {previous ? (
          <Button variant="ghost" className="flex items-center gap-2 hover:bg-orange-500/10 hover:text-orange-400" asChild>
            <Link to={`/blog/${previous.slug}`}>
              <ArrowLeft className="h-4 w-4" />
              <div className="flex flex-col items-start">
                <span className="text-xs text-white/60">Previous</span>
                <span className="font-medium line-clamp-1">{previous.title}</span>
              </div>
            </Link>
          </Button>
        ) : (
          <div></div> /* Empty div to maintain layout */
        )}

        {next ? (
          <Button variant="ghost" className="flex items-center gap-2 hover:bg-orange-500/10 hover:text-orange-400" asChild>
            <Link to={`/blog/${next.slug}`}>
              <div className="flex flex-col items-end">
                <span className="text-xs text-white/60">Next</span>
                <span className="font-medium line-clamp-1">{next.title}</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <div></div> /* Empty div to maintain layout */
        )}
      </div>
    </div>
  );
};
