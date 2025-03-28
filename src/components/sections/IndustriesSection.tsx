
import React from 'react';
import { Smile, Sparkles, HeartPulse, Pill, FlaskConical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
    <section className="py-20 bg-[#0D0D0D] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 orange-gradient-text">Industries We Serve</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            We specialize in healthcare and wellness verticals where high-touch service meets luxury experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industryItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="border border-white/10 bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-all">
                <CardContent className="p-6">
                  <div className="mb-4 text-orange-400">
                    <Icon size={36} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
