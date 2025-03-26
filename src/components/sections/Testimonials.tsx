
import React, { useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "GlowGrid took our practice from barely surviving to thriving. Our patient inquiries increased by 183% in just three months.",
      name: "Dr. Sarah Johnson",
      title: "Founder, Clarity Dental Studio",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      quote: "Their comprehensive approach to marketing transformed how we connect with patients. We've seen a 215% increase in qualified leads.",
      name: "Michael Rodriguez",
      title: "CEO, Wellness Collective",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    },
    {
      quote: "The team at GlowGrid understands healthcare marketing deeply. They've helped us scale while maintaining our brand's integrity.",
      name: "Dr. Emily Chen",
      title: "Medical Director, Rejuvenate MedSpa",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
    }
  ];

  const brands = [
    {
      name: "Dental Studio LA",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=150&auto=format&fit=crop"
    },
    {
      name: "Wellness Collective",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=150&auto=format&fit=crop"
    },
    {
      name: "Rejuvenate MedSpa",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=150&auto=format&fit=crop"
    },
    {
      name: "Holistic Health Partners",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=150&auto=format&fit=crop"
    },
    {
      name: "Radiance Aesthetics",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=150&auto=format&fit=crop"
    },
    {
      name: "Vitality Chiropractic",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=150&auto=format&fit=crop"
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl orange-gradient-text font-blink mb-4">Client Success</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Don't just take our word for it. See how we've helped healthcare and wellness brands achieve remarkable growth.
          </p>
        </div>
        
        {/* Testimonial Carousel */}
        <div className="mb-20">
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm border border-white/10">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-orange-400 shrink-0">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <blockquote className="text-xl font-medium text-white italic mb-4">
                          "{testimonial.quote}"
                        </blockquote>
                        <div>
                          <p className="font-semibold text-white">{testimonial.name}</p>
                          <p className="text-orange-400">{testimonial.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex left-0 -translate-x-full bg-black/20 hover:bg-black/40 border-orange-400/30 text-white" />
            <CarouselNext className="hidden lg:flex right-0 translate-x-full bg-black/20 hover:bg-black/40 border-orange-400/30 text-white" />
          </Carousel>
        </div>
        
        {/* Brand Logos */}
        <div className="mb-20">
          <h3 className="text-center text-xl font-medium mb-8 text-white/80">Trusted by Leading Brands</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brands.map((brand, index) => (
              <div 
                key={index} 
                className="aspect-video flex items-center justify-center p-4 rounded-lg bg-white/5 grayscale transition-all duration-300 hover:grayscale-0 hover:bg-white/10"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-12"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Featured Case Study */}
        <div className="rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <span className="text-xs font-medium uppercase text-orange-400 mb-2">Featured Case Study</span>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">How we helped Clarity Dental increase patients by 183%</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-black/30">
                  <p className="text-2xl font-bold orange-gradient-text">183%</p>
                  <p className="text-sm text-white/80">Increase in new patients</p>
                </div>
                <div className="p-4 rounded-lg bg-black/30">
                  <p className="text-2xl font-bold orange-gradient-text">245%</p>
                  <p className="text-sm text-white/80">Growth in Instagram followers</p>
                </div>
                <div className="p-4 rounded-lg bg-black/30">
                  <p className="text-2xl font-bold orange-gradient-text">4.2x</p>
                  <p className="text-sm text-white/80">Return on ad spend</p>
                </div>
                <div className="p-4 rounded-lg bg-black/30">
                  <p className="text-2xl font-bold orange-gradient-text">78%</p>
                  <p className="text-sm text-white/80">Increase in website traffic</p>
                </div>
              </div>
              
              <Button variant="gradient" className="w-fit" asChild>
                <a href="/case-studies/clarity-dental">
                  View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="aspect-auto md:aspect-auto relative">
              <img 
                src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=600&auto=format&fit=crop" 
                alt="Clarity Dental Case Study" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
