
import React from 'react';
import { Sparkles, BarChart2, Users, Layers, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const whyUsItems = [{
  title: "Vertical Expertise",
  description: "Specialized domain knowledge in aesthetic medicine, dental, skincare, and wellness markets.",
  icon: Sparkles
}, {
  title: "Metric-Driven Framework",
  description: "Performance intelligence that transforms raw data into actionable growth directives.",
  icon: BarChart2
}, {
  title: "Strategic Partnerships",
  description: "Collaborative approach that integrates your expertise with our systematic execution.",
  icon: Users
}, {
  title: "Scalable Architecture",
  description: "Systems designed for seamless expansion—from initial launch to market dominance.",
  icon: Layers
}, {
  title: "Verified Performance",
  description: "Benchmarked engagement increases of 115%+ and conversion improvements across managed accounts.",
  icon: TrendingUp
}];

const WhyUsSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-stone-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl orange-gradient-text font-blink mb-3 sm:mb-4">The GlowGrid Difference</h2>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
            We construct evidence-based digital ecosystems that generate quantifiable return on investment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {whyUsItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm hover:bg-white/5 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-4 w-12 h-12 orange-gradient-bg rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-400 transition-colors">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
