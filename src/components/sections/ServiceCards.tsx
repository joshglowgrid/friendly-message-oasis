
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
    <section id="services" className="section py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-blink orange-gradient-text mb-12 text-center">
          Digital Growth Systems
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card key={index} className="glass-panel border-white/10 hover:border-orange-400/30 transition-all duration-300 overflow-hidden group">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-white group-hover:orange-gradient-text transition-all duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <CardDescription className="text-white/70 text-base">{service.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Link to={service.link} className="w-full">
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-orange-500 hover:text-white hover:border-orange-500 group-hover:border-orange-500/50">
                    Learn More <ArrowRight className="ml-1" />
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
