
import React from 'react';
import Logo from '@/components/Logo';
import { Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-10 px-6 border-t border-white/10">
      <div className="max-w-4xl mx-auto text-white/60 space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <div className="w-56 md:w-64 mb-4 md:mb-0">
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
            <a href="https://threads.net/@glowgridmarketing" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-orange-400 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.186 8.672c-.988-.927-1.597-1.726-1.762-1.953a5.24 5.24 0 0 0-3.382-2.414A5.28 5.28 0 0 0 2.974 5.12a5.39 5.39 0 0 0-1.296 3.16 8.379 8.379 0 0 0-.159 1.57v6.385c-.001 1.288.051 2.33.156 3.127.099.754.333 1.486.686 2.155a5.268 5.268 0 0 0 1.953 1.943c.76.391 1.608.574 2.458.526a5.392 5.392 0 0 0 2.741-.803c.8-.483 1.46-1.155 1.93-1.961.933-1.612 1.211-3.433 1.151-5.165-.079-1.208.228-2.098.454-2.692.29-.74.744-1.437 1.297-1.986A5.212 5.212 0 0 1 18.5 8.726V14.6c-.006.344-.017.648-.032.918-.15.277-.074.546-.177.802-.208.499-.557.92-1.015 1.228-.347.242-.748.398-1.167.454-.478.065-.964.065-1.441 0a3.21 3.21 0 0 1-1.164-.452 3.12 3.12 0 0 1-1.01-1.224 2.954 2.954 0 0 1-.308-1.298h-1.872c0 1.852.597 3.226 1.79 4.123 1.194.897 2.736 1.346 4.629 1.346 1.795 0 3.25-.449 4.364-1.346 1.114-.897 1.687-2.271 1.717-4.123V8.758a9.386 9.386 0 0 1 1.66 1.835v-2.24a7.94 7.94 0 0 0-4.601-1.276c-1.424 0-2.728.331-3.91.992a7.644 7.644 0 0 0-3.113 2.815c-.31.462-.589.944-.847 1.442a5.992 5.992 0 0 0-.43-.656zm-.53 4.893.042-.644c.133-1.987-.367-3.67-1.302-5.06-.935-1.389-2.327-2.344-4.176-2.862l-.644-.1v8.366c0 1.622.39 2.92 1.169 3.892.78.973 1.883 1.459 3.309 1.459 1.048 0 1.92-.307 2.618-.919.697-.613 1.046-1.395 1.046-2.346a6.496 6.496 0 0 0-2.062-1.786z" fill="currentColor"/>
              </svg>
              <span className="sr-only">Threads</span>
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
