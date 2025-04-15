
import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Activity, BarChart2, Layout, MessageCircle } from 'lucide-react';

const methodologyItems = [
  {
    title: "Patient Journey Mapping",
    description: "Strategic sequencing that moves prospective patients from awareness to consultation through clinically appropriate messaging stages.",
    icon: UserCheck
  },
  {
    title: "Behavioral Engagement Framework",
    description: "Dynamic content delivery based on interaction patterns, prioritizing high-intent actions for conversion acceleration.",
    icon: Activity
  },
  {
    title: "Segmentation Architecture",
    description: "Custom audience categorization by treatment interest, patient history, and demographic factors for precise messaging relevance.",
    icon: BarChart2
  },
  {
    title: "Conversion-Focused Design",
    description: "HIPAA-compliant templates engineered for clinical credibility and optimized click-through to appointment booking.",
    icon: Layout
  },
  {
    title: "Brand Voice Consistency",
    description: "Content development that maintains practice positioning while simplifying complex clinical concepts for patient accessibility.",
    icon: MessageCircle
  }
];

const EmailMethodologySection = () => {
  return (
    <section className="py-16 px-4 bg-stone-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl orange-gradient-text font-blink mb-6 text-center">
            Strategic Methodology
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-white/80 text-center mb-8">
              Our email marketing systems are built on evidence-based healthcare communication principles that prioritize 
              patient education while driving measurable practice growth. We employ a multi-phase approach designed specifically 
              for healthcare providers:
            </p>
          </div>
          
          <div className="glass-panel p-8 md:p-10 mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 orange-gradient-text">Initial Targeting & Acquisition</h3>
                <p className="text-white/80 mb-4">
                  We develop strategic lead generation pathways that connect your practice with prospective patients actively researching 
                  your services. Unlike generic marketing, our acquisition funnels are built on healthcare-specific keywords and concerns.
                </p>
                <p className="text-white/80">
                  Each capture point is designed to provide immediate value through educational content while establishing your 
                  practice as the authoritative solution.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 orange-gradient-text">Conversion & Nurture Systems</h3>
                <p className="text-white/80 mb-4">
                  Our proprietary scheduling acceleration sequences have delivered consultation booking increases of 32-47% for 
                  aesthetic and dental practices. These systems combine educational content, social proof, and strategic CTAs.
                </p>
                <p className="text-white/80">
                  For wellness providers, our retention programs have demonstrated 28% improvements in program completion and 
                  follow-through rates compared to standard communication approaches.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {methodologyItems.map((item, index) => {
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

export default EmailMethodologySection;
