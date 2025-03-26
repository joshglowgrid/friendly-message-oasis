
import React from 'react';
import { Smile, Sparkles, HeartPulse, Pill, FlaskConical } from 'lucide-react';

const industryItems = [
  {
    icon: Smile,
    title: "Dental Practices",
    description: "From cosmetic dentistry to general oral care, we help practices grow visibility, credibility, and patient loyalty."
  },
  {
    icon: Sparkles,
    title: "Skincare & Aesthetics",
    description: "We craft elevated digital identities for medspas, dermatology clinics, and skincare experts that demand distinction."
  },
  {
    icon: HeartPulse,
    title: "Wellness & Health Clinics",
    description: "Functional medicine, hormone therapy, IV lounges, and holistic wellness centers—our strategies speak your language."
  },
  {
    icon: Pill,
    title: "RX & Medical Retail",
    description: "We bring bold clarity to complex offerings like prescription skincare, supplements, and telehealth-based retail."
  },
  {
    icon: FlaskConical,
    title: "Boutique Health Brands",
    description: "Emerging health & wellness products get a strategy-driven push to gain traction, credibility, and loyal followers."
  }
];

const IndustriesSection = () => {
  return (
    <section id="industries" className="py-20 px-6 bg-black/50">
      <div className="max-w-5xl mx-auto space-y-12">
        <h2 className="text-2xl sm:text-3xl font-blink orange-gradient-text text-center animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
          Industries We Serve
        </h2>
        <p className="text-center text-white/80 max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100">
          <strong>Built for Impact. Designed for Niche Excellence.</strong><br />
          At GlowGrid Media, we specialize in industries where trust, clarity, and compliance matter just as much as creativity.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {industryItems.map((industry, index) => (
            <div 
              key={index} 
              className="glass-panel p-6 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700" 
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start">
                <div className="orange-gradient-bg p-2 rounded-full mr-3 mt-1">
                  <industry.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">{industry.title}</h3>
                  <p className="text-white/70">{industry.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
