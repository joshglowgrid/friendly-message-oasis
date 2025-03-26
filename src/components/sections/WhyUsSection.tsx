
import React from 'react';
import { Sparkles, BarChart2, Users, Layers, TrendingUp } from 'lucide-react';

const whyUsItems = [{
  title: "Industry Expertise",
  description: "Deep knowledge in dental, aesthetic, skincare, and wellness markets.",
  icon: Sparkles
}, {
  title: "Data-Driven Execution",
  description: "We track everything—and use those insights to sharpen your edge.",
  icon: BarChart2
}, {
  title: "High-Touch Partnerships",
  description: "You're not just another account. You're a brand we invest in.",
  icon: Users
}, {
  title: "Scalable Solutions",
  description: "Whether you're starting up or scaling fast, we build to grow with you.",
  icon: Layers
}, {
  title: "Proven Results",
  description: "+115% Instagram growth, increased engagement, and higher conversion rates across our managed accounts.",
  icon: TrendingUp
}];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 orange-gradient-text">Why Choose GlowGrid</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyUsItems.map((item, index) => (
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

export default WhyUsSection;
