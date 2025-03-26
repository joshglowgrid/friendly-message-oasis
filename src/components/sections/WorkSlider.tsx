
import React, { useRef, useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, ZoomIn, X } from 'lucide-react';

export const WorkSlider = () => {
  const [lightboxImage, setLightboxImage] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  const projects = [
    {
      title: "Clarity Dental Website",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Wellness Collective Branding",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "MedSpa Social Campaign",
      category: "Social Media",
      image: "https://images.unsplash.com/photo-1581467725792-e40ad28abc23?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Vitality Email Marketing",
      category: "Email",
      image: "https://images.unsplash.com/photo-1600443299762-7a1c3851bd14?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Holistic Health Partners",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1640622659797-6578dd8a9542?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Radiance Aesthetics Video",
      category: "Content Creation",
      image: "https://images.unsplash.com/photo-1554620121-59e7f3f6e3a4?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const openLightbox = (image: string) => {
    setLightboxImage(image);
    setLightboxOpen(true);
  };

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl orange-gradient-text font-blink mb-4">Our Work</h2>
            <p className="text-white/80 max-w-xl">
              Browse through our recent projects where we've helped healthcare and wellness brands elevate their digital presence.
            </p>
          </div>
          <Button variant="gradient" className="mt-4 md:mt-0" asChild>
            <a href="/work">
              View All Work <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
        
        <Carousel className="w-full" opts={{ align: "start" }}>
          <CarouselContent className="-ml-4">
            {projects.map((project, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="relative group overflow-hidden rounded-lg">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-orange-400 text-sm font-medium">{project.category}</p>
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button 
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                          onClick={() => openLightbox(project.image)}
                        >
                          <ZoomIn size={18} className="text-white" />
                        </button>
                        <a 
                          href={`/work/${index}`} 
                          className="text-sm text-white/80 hover:text-white hover:underline transition-colors flex items-center"
                        >
                          View Project <ArrowRight size={14} className="ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-6">
            <CarouselPrevious className="static ml-0 translate-y-0 bg-black/20 hover:bg-black/40 border-orange-400/30 text-white" />
            <CarouselNext className="static ml-0 translate-y-0 bg-black/20 hover:bg-black/40 border-orange-400/30 text-white" />
          </div>
        </Carousel>
        
        {/* Lightbox dialog */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-5xl p-0 border-0 bg-transparent shadow-none">
            <button 
              className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white z-50"
              onClick={() => setLightboxOpen(false)}
            >
              <X size={24} />
            </button>
            <div className="w-full rounded-lg overflow-hidden">
              <img 
                src={lightboxImage} 
                alt="Project preview" 
                className="w-full h-auto"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
