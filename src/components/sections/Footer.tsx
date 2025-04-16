import React from 'react';
import Logo from '@/components/Logo';
import { Instagram, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 md:py-10 px-4 md:px-6 border-t border-white/10 bg-[#0D0D0D] w-full">
      <div className="max-w-6xl mx-auto text-white/60">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <div className="md:col-span-5">
            <div className="w-36 sm:w-48 md:w-56 mb-4">
              <Logo 
                src="https://img.glowgridmedia.com/glowgridmedia.png" 
                alt="GlowGrid Logo"
              />
            </div>
            <p className="text-sm mb-4 max-w-md">
              A digital marketing studio crafting scalable brand ecosystems for healthcare, aesthetics, and wellness brands.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/glowgridmarketing" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-orange-400 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-white font-medium mb-3 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/social-media" className="text-sm hover:text-orange-400 transition-colors">Social Media</Link></li>
              <li><Link to="/services/website-development" className="text-sm hover:text-orange-400 transition-colors">Web Development</Link></li>
              <li><Link to="/services/content-creation" className="text-sm hover:text-orange-400 transition-colors">Content Creation</Link></li>
              <li><Link to="/services/email-marketing" className="text-sm hover:text-orange-400 transition-colors">Email Marketing</Link></li>
              <li><Link to="/services/seo" className="text-sm hover:text-orange-400 transition-colors">SEO Strategy</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-white font-medium mb-3 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/work" className="text-sm hover:text-orange-400 transition-colors">Our Work</Link></li>
              <li><Link to="/blog" className="text-sm hover:text-orange-400 transition-colors">Blog</Link></li>
              <li><Link to="/resources" className="text-sm hover:text-orange-400 transition-colors">Resources</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-orange-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="text-white font-medium mb-3 text-sm uppercase tracking-wider">Contact</h3>
            <p className="text-sm mb-2">Los Angeles, California</p>
            <p className="text-sm mb-4">Serving clients nationwide</p>
            <button 
              onClick={scrollToTop}
              className="text-white/60 hover:text-orange-400 transition-colors p-2 rounded-full border border-white/20 hover:border-orange-400 inline-flex"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
        
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs sm:text-sm">
            © {new Date().getFullYear()} GlowGrid Media. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0 flex space-x-4">
            <Link to="/privacy-policy" className="text-xs sm:text-sm hover:text-orange-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-xs sm:text-sm hover:text-orange-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
