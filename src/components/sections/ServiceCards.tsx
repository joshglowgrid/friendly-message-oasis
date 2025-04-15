import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
  return;
};