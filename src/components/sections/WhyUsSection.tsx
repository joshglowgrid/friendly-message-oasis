
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
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {whyUsItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="relative rounded-xl p-px overflow-hidden h-full"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {/* Card content */}
                <div className="relative rounded-xl bg-black/40 backdrop-blur-sm p-4 sm:p-6 border border-white/10 h-full flex flex-col">
                  <div className="mb-3 sm:mb-4 orange-gradient-bg w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-white">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm sm:text-base">{item.description}</p>
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
