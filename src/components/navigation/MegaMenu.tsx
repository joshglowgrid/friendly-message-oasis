
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const menuVariants = {
  hidden: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.2 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.2 }
  }
};

interface MegaMenuItemProps {
  title: string;
  items: {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    link: string;
  }[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const MegaMenuItem: React.FC<MegaMenuItemProps> = ({ 
  title, 
  items, 
  isOpen,
  onOpen,
  onClose
}) => {
  return (
    <div 
      className="relative" 
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button 
        className="flex items-center justify-center px-3 py-2 text-sm font-medium uppercase tracking-wide text-white hover:after:scale-x-100 hover:after:origin-bottom-left after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:orange-gradient-bg after:origin-bottom-right after:transition-transform after:duration-150"
      >
        {title} <ChevronDown className="ml-1 h-3 w-3" />
      </button>

      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={menuVariants}
          className="absolute left-1/2 z-50 mt-2 w-screen max-w-4xl -translate-x-1/2 px-4"
        >
          <div className="overflow-hidden rounded-xl border border-orange-400/20 bg-black/95 backdrop-blur-lg shadow-xl">
            <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => (
                <Link
                  key={i}
                  to={item.link}
                  className="group flex flex-col gap-2 rounded-lg p-3 transition-colors hover:bg-white/5"
                >
                  {item.icon && (
                    <div className="orange-gradient-bg flex h-10 w-10 items-center justify-center rounded-full">
                      {item.icon}
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-white group-hover:text-orange-400">{item.title}</div>
                    {item.description && (
                      <div className="text-sm text-white/70">{item.description}</div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <div className="orange-gradient-bg p-6">
              <div className="flex justify-between items-center">
                <div className="text-white">
                  <h3 className="text-lg font-semibold">Ready to grow your brand?</h3>
                  <p className="text-sm text-white/80">Schedule a discovery call with our team</p>
                </div>
                <Button 
                  variant="outline" 
                  className="bg-white text-transparent hover:bg-black hover:text-white hover:border-white bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-300"
                >
                  Book a Call <Phone className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

interface MegaMenuProps {
  className?: string;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ className }) => {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  const services = [
    { 
      title: "Social Media Management", 
      description: "Strategic content planning and management", 
      link: "/services/social-media",
    },
    { 
      title: "Content Creation", 
      description: "Engaging reels and short-form video",
      link: "/services/content-creation",
    },
    { 
      title: "Email Marketing", 
      description: "Automated flows and campaigns",
      link: "/services/email-marketing",
    },
    { 
      title: "Website Development", 
      description: "High-converting landing pages",
      link: "/services/website-development",
    },
    { 
      title: "SEO Strategy", 
      description: "Blog content and technical optimization",
      link: "/services/seo",
    },
    { 
      title: "Analytics & Reporting", 
      description: "Data-driven insights and growth metrics",
      link: "/services/analytics",
    },
  ];

  const resources = [
    { 
      title: "Marketing Guides", 
      description: "Step-by-step tutorials and strategies", 
      link: "/resources/guides",
    },
    { 
      title: "Template Library", 
      description: "Customizable design assets",
      link: "/resources/templates",
    },
    { 
      title: "Case Studies", 
      description: "Client success stories and results",
      link: "/resources/case-studies",
    },
    { 
      title: "Webinars", 
      description: "Educational videos and presentations",
      link: "/resources/webinars",
    },
  ];

  const handleOpenMenu = (menu: string) => {
    setOpenMenu(menu);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  return (
    <nav className={cn("flex items-center space-x-1", className)}>
      <MegaMenuItem 
        title="Services" 
        items={services}
        isOpen={openMenu === 'services'}
        onOpen={() => handleOpenMenu('services')}
        onClose={handleCloseMenu}
      />
      
      <Link to="/work" className="px-3 py-2 text-sm font-medium uppercase tracking-wide text-white relative hover:after:scale-x-100 hover:after:origin-bottom-left after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:orange-gradient-bg after:origin-bottom-right after:transition-transform after:duration-150">
        Work
      </Link>
      
      <Link to="/blog" className="px-3 py-2 text-sm font-medium uppercase tracking-wide text-white relative hover:after:scale-x-100 hover:after:origin-bottom-left after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:orange-gradient-bg after:origin-bottom-right after:transition-transform after:duration-150">
        Blog
      </Link>
      
      <MegaMenuItem 
        title="Resources" 
        items={resources}
        isOpen={openMenu === 'resources'}
        onOpen={() => handleOpenMenu('resources')}
        onClose={handleCloseMenu}
      />
      
      <Link to="/team" className="px-3 py-2 text-sm font-medium uppercase tracking-wide text-white relative hover:after:scale-x-100 hover:after:origin-bottom-left after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:orange-gradient-bg after:origin-bottom-right after:transition-transform after:duration-150">
        Team
      </Link>
      
      <Link to="/contact" className="px-3 py-2 text-sm font-medium uppercase tracking-wide text-white relative hover:after:scale-x-100 hover:after:origin-bottom-left after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:orange-gradient-bg after:origin-bottom-right after:transition-transform after:duration-150">
        Contact
      </Link>
      
      <Button 
        variant="gradient" 
        className="ml-4 text-sm font-medium"
        onClick={() => window.open('https://calendly.com/glowgridmedia/30min', '_blank')}
      >
        Book a Call <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </nav>
  );
};
