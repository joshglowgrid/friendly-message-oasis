
import React from 'react';
import { Sparkles, BarChart2, Users, Layers, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
  return <section className="py-20 bg-stone-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">The GlowGrid Difference</h2>
          <p className="text-xl max-w-3xl mx-auto text-stone-50">
            We construct evidence-based digital ecosystems that generate quantifiable return on investment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyUsItems.map((item, index) => {
          const Icon = item.icon;
          return <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 text-purple-600">
                    <Icon size={36} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>;
        })}
        </div>
      </div>
    </section>;
};

export default WhyUsSection;
