
import React from 'react';
import { motion } from 'framer-motion';

const platforms = [
  {
    name: "Klaviyo",
    logo: "https://img.glowgridmedia.com/Klaviyo-Email%20Marketing.png",
    description: "Preferred for advanced segmentation and behavioral analytics, allowing medical practices to deliver personalized patient journeys based on engagement patterns."
  },
  {
    name: "ActiveCampaign",
    logo: "https://img.glowgridmedia.com/ActiveCampaign-Email%20Marketing%20CRM.png",
    description: "Utilized for its sophisticated automation capabilities, enabling healthcare providers to create intelligent follow-up sequences that respond to patient actions."
  },
  {
    name: "Flodesk",
    logo: "https://img.glowgridmedia.com/Flodesk-Logo.png",
    description: "Selected for aesthetic-focused practices that prioritize visual impact, with templates designed to showcase clinical results and services with premium presentation."
  },
  {
    name: "Mailchimp",
    logo: "https://img.glowgridmedia.com/Mailchimp%20Email%20Marketing.png",
    description: "Implemented for practices seeking an accessible platform with reliable delivery and straightforward campaign management across multiple patient segments."
  },
  {
    name: "Mindbody",
    logo: "https://img.glowgridmedia.com/Mindbody%20Wellness%20Scheduling%20and%20Marketing.png",
    description: "Integrated for wellness practitioners to combine appointment scheduling with targeted communications, creating a seamless client experience from inbox to visit."
  }
];

const EmailPlatformsSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-stone-950 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl orange-gradient-text font-blink mb-3 sm:mb-4">
            Platforms We Leverage
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
            We integrate with industry-leading email marketing platforms to deliver scalable, conversion-focused patient communication systems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm hover:bg-white/5 transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="mb-6 h-16 flex items-center justify-center bg-white/5 rounded-lg p-2">
                  <img 
                    src={platform.logo} 
                    alt={`${platform.name} logo`} 
                    className="h-full max-h-12 object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://img.glowgridmedia.com/placeholder-logo.png";
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                  {platform.name}
                </h3>
                <p className="text-white/80 text-sm">{platform.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-white/60 text-sm italic">
            GlowGrid Media is platform-agnostic and can work with your existing email infrastructure or recommend solutions based on your specific practice needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmailPlatformsSection;
