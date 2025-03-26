
import React from 'react';
import Logo from '@/components/Logo';
import { Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 md:py-10 px-4 md:px-6 border-t border-white/10">
      <div className="max-w-4xl mx-auto text-white/60 space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between mb-3 md:mb-4">
          <div className="w-48 sm:w-56 md:w-64 mb-3 md:mb-0">
            <Logo 
              src="https://github.com/joshglowgrid/friendly-message-oasis/blob/main/glowgridmedia.png?raw=true" 
              alt="GlowGrid Logo"
              url="https://glowgridmedia.com"
            />
          </div>
          <div className="flex space-x-6">
            <a href="https://instagram.com/glowgridmarketing" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-orange-400 transition-colors">
              <Instagram size={24} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://pinterest.com/glowgridmedia" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-orange-400 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 0 1 .069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="currentColor"/>
              </svg>
              <span className="sr-only">Pinterest</span>
            </a>
          </div>
        </div>
        <p className="text-sm text-center">
          © {new Date().getFullYear()} GlowGrid Media. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
