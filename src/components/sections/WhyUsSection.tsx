
import React from 'react';
import { Sparkles, BarChart2, Users, Layers, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose GlowGrid</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We don't just create content—we build data-backed brand ecosystems that generate real growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyUsItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 text-purple-600">
                    <Icon size={36} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
