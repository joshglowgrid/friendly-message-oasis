
import React from 'react';
import { cn } from '@/lib/utils';
import { Mail } from 'lucide-react';

interface ContactFormProps {
  className?: string;
}

const ContactForm = ({ className }: ContactFormProps) => {
  return (
    <div className={cn("w-full max-w-md", className)}>
      <div className="w-full space-y-5">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSfPFsEeLSEUMIR6JBwFKXLw6jfScXSxq7afh64GE5-yy81mFA/viewform?embedded=true" 
            width="100%" 
            height="600" 
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0}
            className="rounded-lg"
          >
            Loading…
          </iframe>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-xs text-white/60">
            Serving Los Angeles, The San Gabriel Valley, the surrounding areas and businesses across the United States.
          </p>
          <p className="text-xs flex items-center justify-center gap-1 text-white/80">
            <Mail size={12} /> <a href="mailto:hello@glowgridmedia.com" className="hover:text-orange-400 transition-colors">hello@glowgridmedia.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
