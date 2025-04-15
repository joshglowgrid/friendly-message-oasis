
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const ServiceCards = () => {
  const services = [
    {
      title: 'Social Media Management',
      description: 'Strategic content planning and community growth.',
      link: '/services/social-media',
    },
    {
      title: 'Web Development',
      description: 'Custom websites optimized for conversion and user experience.',
      link: '/services/website-development',
    },
    {
      title: 'Content Creation',
      description: 'Eye-catching reels, photos, and videos that showcase your brand.',
      link: '/services/content-creation',
    },
    {
      title: 'Email Marketing',
      description: 'Targeted campaigns and automated flows that convert.',
      link: '/services/email-marketing',
    },
    {
      title: 'SEO Strategy',
      description: 'Visibility-focused content and technical optimization.',
      link: '/services/seo',
    },
    {
      title: 'Analytics & Reporting',
      description: 'Data-driven insights to measure and maximize ROI.',
      link: '/services/analytics',
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-blink mb-4 orange-gradient-text animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            Our Services
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100">
            Comprehensive digital strategies tailored for healthcare, aesthetics, and wellness brands seeking sustainable growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Link 
              key={index} 
              to={service.link}
              className="group border border-white/10 rounded-xl p-6 md:p-8 bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-all duration-300 hover:border-orange-500/30 animate-on-scroll opacity-0 translate-y-4"
              style={{transitionDelay: `${index * 50}ms`}}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-orange-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-white/60 mb-6">
                {service.description}
              </p>
              <div className="flex justify-end">
                <ArrowRight className="text-orange-400 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            variant="gradient" 
            size="lg"
            className="hover:text-white"
            asChild
          >
            <Link to="/services">
              View All Services <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
