
import React from 'react';
import Logo from '@/components/Logo';
import { Instagram, Pinterest, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 md:py-10 px-4 md:px-6 border-t border-white/10">
      <div className="max-w-4xl mx-auto text-white/60 space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between mb-3 md:mb-4">
          <div className="w-48 sm:w-56 md:w-64 mb-3 md:mb-0">
            <Logo 
              src="https://github.com/joshglowgrid/friendly-message-oasis/blob/main/glowgridmedia.png?raw=true" 
              alt="GlowGrid Logo"
            />
          </div>
          <div className="flex space-x-6">
            <a href="https://instagram.com/glowgridmarketing" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-orange-400 transition-colors">
              <Instagram size={24} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://pinterest.com/glowgridmedia" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-orange-400 transition-colors">
              <Pinterest size={24} />
              <span className="sr-only">Pinterest</span>
            </a>
            <button 
              onClick={scrollToTop}
              className="text-white/60 hover:text-orange-400 transition-colors p-1 rounded-full border border-white/20 hover:border-orange-400"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </button>
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
