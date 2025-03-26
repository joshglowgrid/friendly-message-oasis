
import React, { useEffect } from 'react';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { EnhancedContactSection } from '@/components/sections/EnhancedContactSection';
import { motion } from 'framer-motion';
import { FloatingCTA } from '@/components/navigation/FloatingCTA';
import { Instagram, ArrowRight } from 'lucide-react';

const SocialMediaPage = () => {
  const [scrolled, setScrolled] = React.useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionElements = section.querySelectorAll('.animate-on-scroll');
        if (sectionTop < window.innerHeight * 0.8) {
          sectionElements.forEach((el, index) => {
            setTimeout(() => {
              (el as HTMLElement).style.opacity = '1';
              (el as HTMLElement).style.transform = 'translateY(0)';
            }, index * 100);
          });
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const serviceFeatures = [
    {
      title: "Strategy Development",
      description: "Customized social media strategies aligned with your business goals and target audience."
    },
    {
      title: "Content Creation",
      description: "High-quality posts, graphics, and videos that engage your audience and reinforce your brand."
    },
    {
      title: "Community Management",
      description: "Active engagement with your audience, responding to comments and messages promptly."
    },
    {
      title: "Analytics & Reporting",
      description: "Regular reports on performance metrics, insights, and recommendations for optimization."
    },
    {
      title: "Paid Social Campaigns",
      description: "Strategic ad campaigns that target specific demographics and maximize ROI."
    },
    {
      title: "Influencer Collaborations",
      description: "Partnerships with relevant influencers to expand your reach and credibility."
    }
  ];

  return (
    <div className="min-h-screen text-white flex flex-col items-center overflow-hidden">
      <FloatingCTA />
      <Header scrolled={scrolled} />
      
      {/* Hero Section */}
      <section className="w-full py-20 px-4 md:py-32 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60"></div>
          <div className="absolute top-0 right-0 w-full h-full opacity-20">
            <img 
              src="https://framerusercontent.com/images/1YybfM1vJoYjE7EbieJ4Z1smbI.png"
              alt="Social Media Background"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-blink orange-gradient-text mb-6">
              Social Media Management
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Build your brand presence, engage your audience, and drive results with our comprehensive social media management services.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <Button 
              variant="gradient" 
              size="lg"
              onClick={scrollToContact}
              className="text-base px-8 py-6 h-auto"
            >
              Get Started <ArrowRight className="ml-2" size={16} />
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Services Features */}
      <section className="w-full py-16 px-4 md:py-24 md:px-8 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl orange-gradient-text font-blink mb-4">
              Our Social Media Services
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              We offer end-to-end social media management solutions designed to elevate your brand, engage your audience, and drive measurable results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-panel p-6 hover:bg-white/5 transition-all duration-300"
              >
                <div className="mb-4 orange-gradient-bg inline-flex p-3 rounded-full">
                  <Instagram size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              onClick={scrollToContact}
              className="border-orange-400/50 text-orange-400 hover:bg-orange-400/10"
            >
              Request a Custom Quote
            </Button>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="w-full py-16 px-4 md:py-24 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl orange-gradient-text font-blink mb-4">
              Our Process
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              We follow a systematic approach to ensure your social media presence aligns with your business goals and resonates with your target audience.
            </p>
          </div>
          
          <div className="space-y-8">
            {[
              { step: "01", title: "Discovery & Strategy", description: "We learn about your business, audience, and goals to create a tailored social media strategy." },
              { step: "02", title: "Content Planning", description: "We develop a content calendar that aligns with your brand voice and marketing objectives." },
              { step: "03", title: "Creation & Curation", description: "Our team creates engaging content and curates relevant industry content to share with your audience." },
              { step: "04", title: "Publishing & Management", description: "We publish content at optimal times and actively manage your community through engagement." },
              { step: "05", title: "Analysis & Optimization", description: "We continuously monitor performance, provide detailed reports, and optimize our approach." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex gap-6 items-start"
              >
                <div className="orange-gradient-text text-4xl font-bold min-w-12 text-center">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-16 px-4 md:py-24 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 md:p-12 space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-blink orange-gradient-text mb-4">
              Ready to Transform Your Social Media?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Let's create a social media strategy that builds your brand, engages your audience, and drives measurable results.
            </p>
            <Button 
              variant="gradient" 
              size="lg"
              onClick={scrollToContact}
              className="text-base px-8 py-4 h-auto"
            >
              Start Your Social Media Journey
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Section */}
      <EnhancedContactSection />
      <Footer />
    </div>
  );
};

export default SocialMediaPage;
