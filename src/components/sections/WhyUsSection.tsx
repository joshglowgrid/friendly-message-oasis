
import React from 'react';
import { Sparkles, BarChart2, Users, Layers, TrendingUp } from 'lucide-react';

const whyUsItems = [
  {
    title: "Industry Expertise",
    description: "Deep knowledge in dental, aesthetic, skincare, and wellness markets.",
    icon: Sparkles
  },
  {
    title: "Data-Driven Execution",
    description: "We track everything—and use those insights to sharpen your edge.",
    icon: BarChart2
  },
  {
    title: "High-Touch Partnerships",
    description: "You're not just another account. You're a brand we invest in.",
    icon: Users
  },
  {
    title: "Scalable Solutions",
    description: "Whether you're starting up or scaling fast, we build to grow with you.",
    icon: Layers
  },
  {
    title: "Proven Results",
    description: "+115% Instagram growth, increased engagement, and higher conversion rates across our managed accounts.",
    icon: TrendingUp
  }
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-20 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <h2 className="text-2xl sm:text-3xl font-blink orange-gradient-text text-center animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
          Why Choose GlowGrid Media?
        </h2>
        <p className="text-center text-white/80 max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100">
          Because we don't believe in copy-paste strategies.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyUsItems.map((item, index) => (
            <div 
              key={index} 
              className="glass-panel p-6 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700" 
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-3">
                <div className="mr-3 orange-gradient-bg p-2 rounded-full">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-medium">{item.title}</h3>
              </div>
              <p className="text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-white/80 font-medium italic mt-8 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
          GlowGrid Media isn't a vendor. We're your strategic partner in digital evolution.
        </p>
      </div>
    </section>
  );
};

export default WhyUsSection;
