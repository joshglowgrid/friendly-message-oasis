
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const ServiceCards = () => {
  const services = [{
    title: 'Social Media Management',
    description: 'Strategic content planning and community growth.',
    link: '/services/social-media'
  }, {
    title: 'Web Development',
    description: 'Custom websites optimized for conversion and user experience.',
    link: '/services/website-development'
  }, {
    title: 'Content Creation',
    description: 'Eye-catching reels, photos, and videos that showcase your brand.',
    link: '/services/content-creation'
  }, {
    title: 'Email Marketing',
    description: 'Targeted campaigns and automated flows that convert.',
    link: '/services/email-marketing'
  }, {
    title: 'SEO Strategy',
    description: 'Visibility-focused content and technical optimization.',
    link: '/services/seo'
  }, {
    title: 'Analytics & Reporting',
    description: 'Data-driven insights to measure and maximize ROI.',
    link: '/services/analytics'
  }];
  
  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl orange-gradient-text font-blink mb-4">Our Services</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Strategic digital marketing solutions designed specifically for healthcare and wellness brands.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-white/5 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-orange-400">{service.title}</CardTitle>
                <CardDescription className="text-white/70">{service.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to={service.link} className="w-full">
                  <Button variant="outline" className="w-full hover:text-orange-400 hover:border-orange-400">
                    Learn More <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
