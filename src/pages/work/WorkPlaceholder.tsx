
import React, { useState } from 'react';
import { EnhancedContactSection } from '@/components/sections/EnhancedContactSection';
import { FloatingCTA } from '@/components/navigation/FloatingCTA';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, PieChart, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WorkPlaceholder = () => {
  const location = useLocation();
  const isDetailPage = location.pathname !== '/work';
  const [activeTab, setActiveTab] = useState(0);
  
  // Performance statistics to showcase
  const performanceStats = [
    { label: 'Engagement Rate', value: '115%', icon: <Users className="h-6 w-6 text-orange-400" /> },
    { label: 'Conversion Lift', value: '64%', icon: <Zap className="h-6 w-6 text-orange-400" /> },
    { label: 'ROI Increase', value: '3.2x', icon: <PieChart className="h-6 w-6 text-orange-400" /> },
  ];
  
  // Client industry sectors
  const industries = [
    'Dental & Orthodontics',
    'Medical Aesthetics & Dermatology',
    'Functional Medicine & Wellness',
    'Mental Health & Therapy'
  ];
  
  // Success metrics
  const successMetrics = [
    'Engagement Rate Increases (115%+)',
    'Conversion Optimization',
    'Brand Visibility & Reach',
    'Client Acquisition Metrics'
  ];
  
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-black to-[#0D0D0D] pb-16">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[30%] -right-[10%] h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[120px]"></div>
          <div className="absolute top-[40%] -left-[10%] h-[400px] w-[400px] rounded-full bg-orange-400/10 blur-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl orange-gradient-text font-blink mb-6">
              {isDetailPage ? "Case Study" : "Our Work"}
            </h1>
            <p className="text-white/90 text-xl md:text-2xl font-light">
              Strategic digital growth for healthcare and wellness brands
              that delivers measurable results.
            </p>
          </motion.div>
          
          {/* Performance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {performanceStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-black/30 border border-orange-500/20 rounded-2xl p-6 text-center relative overflow-hidden group"
              >
                <div className="absolute top-2 right-2 bg-orange-500/10 text-orange-400 text-xs font-bold px-2 py-1 rounded-full">
                  +%
                </div>
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {stat.value}
                </h3>
                <p className="text-white/70 text-sm md:text-base">{stat.label}</p>
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl transform transition-all duration-300 group-hover:scale-150"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Industry Focus Section */}
      <div className="bg-black/40 border-y border-white/5 py-20 my-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl orange-gradient-text font-blink mb-4">Industry Focus</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              We specialize in digital marketing for healthcare and wellness brands with unique needs and compliance requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black/30 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Client Industries</h3>
              <div className="grid grid-cols-1 gap-3">
                {industries.map((industry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-white/5 p-3 rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    <span>{industry}</span>
                    <div className="ml-auto w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                      {index + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="bg-black/30 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Success Metrics</h3>
              <div className="space-y-3">
                {successMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-white/5 p-3 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full orange-gradient-bg flex items-center justify-center text-white font-medium">
                      {index + 1}
                    </div>
                    <span>{metric}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 py-12 mb-12">
        <div className="orange-gradient-bg rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to elevate your brand?</h2>
            <p className="text-white/90 mb-8">
              Schedule a discovery call to discuss how we can help your healthcare brand achieve measurable growth.
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 border-white hover:bg-black hover:text-white transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
            >
              Book a Consultation
            </Button>
          </div>
        </div>
      </div>
      
      <EnhancedContactSection />
      <FloatingCTA />
    </div>
  );
};

export default WorkPlaceholder;
