
import React from 'react';
import Logo from '@/components/Logo';
import NavLink from '@/components/NavLink';

const Footer = () => {
  return (
    <footer className="py-10 px-6 border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center text-white/60 space-y-4">
        <div className="w-32 mx-auto mb-6">
          <Logo 
            src="https://github.com/joshglowgrid/friendly-message-oasis/blob/main/glowgridmedia.png?raw=true" 
            alt="GlowGrid Logo"
            url="https://glowgridmedia.com"
          />
        </div>
        <div className="flex justify-center space-x-6">
          <NavLink href="https://twitter.com/glowgridmedia" className="text-white/60 hover:text-white/90">
            Twitter
          </NavLink>
          <NavLink href="https://instagram.com/glowgridmedia" className="text-white/60 hover:text-white/90">
            Instagram
          </NavLink>
          <NavLink href="https://linkedin.com/company/glowgridmedia" className="text-white/60 hover:text-white/90">
            LinkedIn
          </NavLink>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} GlowGrid Media. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
