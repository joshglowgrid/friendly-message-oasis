
import React from 'react';
import { Smile, Sparkles, HeartPulse, Pill, FlaskConical } from 'lucide-react';

const industryItems = [{
  icon: Smile,
  title: "Dental Practices",
  description: "From cosmetic dentistry to general oral care, we help practices grow visibility, credibility, and patient loyalty."
}, {
  icon: Sparkles,
  title: "Skincare & Aesthetics",
  description: "We craft elevated digital identities for medspas, dermatology clinics, and skincare experts that demand distinction."
}, {
  icon: HeartPulse,
  title: "Wellness & Health Clinics",
  description: "Functional medicine, hormone therapy, IV lounges, and holistic wellness centers—our strategies speak your language."
}, {
  icon: Pill,
  title: "RX & Medical Retail",
  description: "We bring bold clarity to complex offerings like prescription skincare, supplements, and telehealth-based retail."
}, {
  icon: FlaskConical,
  title: "Boutique Health Brands",
  description: "Emerging health & wellness products get a strategy-driven push to gain traction, credibility, and loyal followers."
}];

const IndustriesSection = () => {
  return (
    <section id="industries" className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 orange-gradient-text">Who We Work With</h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">We specialize in healthcare & wellness marketing for brands that want to make a real impact.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industryItems.map((item, index) => (
            <div 
              key={index}
              className="bg-gray-900/60 border border-orange-500/20 p-6 rounded-lg flex flex-col items-start hover:border-orange-500/50 transition-all duration-300 animate-on-scroll"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              <div className="rounded-full bg-orange-500/10 p-3 mb-4">
                <item.icon className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
