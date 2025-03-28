
import React from 'react';
import { Smile, Sparkles, HeartPulse, Pill, FlaskConical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const industryItems = [{
  icon: Smile,
  title: "Dental & Orthodontic",
  description: "Elevating clinical excellence through strategic digital positioning that drives qualified patient acquisition."
}, {
  icon: Sparkles,
  title: "Medical Aesthetics",
  description: "Sophisticated visual narratives and targeted acquisition systems for discerning clientele."
}, {
  icon: HeartPulse,
  title: "Integrative Health",
  description: "Articulating complex methodologies with clarity that positions practitioners as category authorities."
}, {
  icon: Pill,
  title: "Clinical Commerce",
  description: "Conversion architecture for prescription skincare, nutraceuticals, and telehealth product ecosystems."
}, {
  icon: FlaskConical,
  title: "Emerging Health Innovations",
  description: "Market-entry strategies for novel wellness solutions seeking rapid adoption and category leadership."
}];

const IndustriesSection = () => {
  return (
    <section className="py-20 bg-[#0D0D0D] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 orange-gradient-text">Vertical Specialization</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Focused expertise in clinical and wellness categories where premium positioning drives measurable outcomes.
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
