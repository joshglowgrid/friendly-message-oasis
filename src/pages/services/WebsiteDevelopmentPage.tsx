
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/components/navigation/navUtils';
import { Separator } from '@/components/ui/separator';

const WebsiteDevelopmentPage = () => {
  return (
    <div className="bg-black text-white min-h-screen pb-20">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-36 md:pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Website Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">That Drives Results</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mb-8">
            At GlowGrid Media, we design and develop websites that don't just look amazing — they perform. Whether you're a service-based business, ecommerce brand, or wellness professional, we build digital experiences that are responsive, conversion-optimized, and ready to grow with you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              variant="gradient" 
              size="lg" 
              className="px-8"
              onClick={() => scrollToSection('contact')}
            >
              Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-orange-400/50 hover:bg-orange-500/10"
              asChild
            >
              <Link to="/work">View Portfolio</Link>
            </Button>
          </div>
          
          <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg inline-flex items-center gap-2 mb-12">
            <span className="text-orange-400">💡</span>
            <p className="text-gray-100 font-medium">
              We specialize in custom solutions for healthcare and wellness brands — but our expertise spans across industries.
            </p>
          </div>
          
        {/* Featured Case Study Section */}
<div className="w-full mb-12">
  <div className="flex flex-col lg:flex-row items-center gap-10">
    
    {/* Text Column */}
    <div className="lg:w-1/2 space-y-4">
      <h3 className="text-2xl md:text-3xl font-bold text-orange-400">
        Real Results, Real Brands
      </h3>
      <p className="text-gray-300">
        See how we helped an aesthetics brand transform their online presence into a high-converting, patient-friendly platform.
      </p>
      <p className="text-gray-400">
        From strategy and design to full deployment — we deliver digital experiences that grow with your business.
      </p>
    </div>

    {/* Image Column */}
    <div className="lg:w-1/2 w-full">
      <img 
        src="https://img.glowgridmedia.com/Web%20Design%20%26%20Development%20-%20GlowGrid%20Media.webp" 
        alt="Website Mockup"
        className="rounded-xl shadow-xl w-full max-w-md mx-auto"
      />
    </div>
    
  </div>
</div>
          
          <Separator className="bg-orange-500/30 my-12" />
        </div>
      </section>
      
      {/* What's Included Section */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
            <span className="text-orange-400"></span> What's Included in Our Website Development Services
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-orange-400">Custom Website Design</h3>
              <p className="text-gray-300">Visually striking designs tailored to your brand and audience.</p>
            </div>
            
            <div className="bg-gray-900/50 p-6 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-orange-400">Responsive Development</h3>
              <p className="text-gray-300">Seamless functionality across mobile, tablet, and desktop devices.</p>
            </div>
            
            <div className="bg-gray-900/50 p-6 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-orange-400">Conversion-Focused Layouts</h3>
              <p className="text-gray-300">Clear user journeys that drive action — from signups to sales.</p>
            </div>
            
            <div className="bg-gray-900/50 p-6 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-orange-400">SEO Optimization</h3>
              <p className="text-gray-300">Built-in search engine best practices to help you rank and get found.</p>
            </div>
            
            <div className="bg-gray-900/50 p-6 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-orange-400">Performance & Speed Tuning</h3>
              <p className="text-gray-300">Optimized for fast load times and smooth user experience.</p>
            </div>
            
            <div className="bg-gray-900/50 p-6 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-all">
              <h3 className="text-xl font-semibold mb-2 text-orange-400">Ongoing Support & Maintenance</h3>
              <p className="text-gray-300">We keep your site secure, up to date, and performing post-launch.</p>
            </div>
          </div>
          
          <Separator className="bg-orange-500/30 my-12" />
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-2">
            <span className="text-orange-400"></span> Our 4-Step Web Development Process
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orange-400">Discovery & Strategy</h3>
                <p className="text-gray-300">We align your website goals with your business objectives.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orange-400">Design & User Experience</h3>
                <p className="text-gray-300">We create engaging wireframes and layouts tailored to your users.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orange-400">Development & QA</h3>
                <p className="text-gray-300">Custom-coded, mobile-friendly, and rigorously tested.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orange-400">Launch & Support</h3>
                <p className="text-gray-300">Go live confidently — with continuous support when you need it.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-gray-900/80 rounded-lg border border-orange-500/20">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-orange-400">✅</span> Why GlowGrid?
            </h3>
            <p className="text-gray-200 mb-4">
              We blend creative design with strategic thinking to deliver websites that actually work.
              Whether you're a solo entrepreneur or scaling enterprise, we tailor our approach to your goals.
            </p>
            <p className="text-gray-200">
              And if you're in the healthcare or wellness space? You're in especially good hands — we've helped clinics, coaches, and wellness brands grow online with smart, scalable design.
            </p>
          </div>
          
          <Separator className="bg-orange-500/30 my-12" />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            <span className="text-orange-400">📞</span> Ready to Elevate Your Website?
          </h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <Button 
              variant="gradient" 
              size="lg" 
              className="px-8"
              onClick={() => scrollToSection('contact')}
            >
              👉 Schedule a Free Strategy Call
            </Button>
            
            <Button 
  variant="outline" 
  size="lg" 
  className="border-orange-400/50 hover:bg-orange-500/10 text-orange-400"
  asChild
>
  <Link to="/work">👉 View Our Portfolio</Link>
</Button>
          </div>
          
          <Separator className="bg-orange-500/30 my-12" />
          
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            <span className="text-orange-400">🔗</span> Need More Than Just a Website?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="#" className="group">
              <div className="p-6 bg-gray-900/50 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-all">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                  <h3 className="text-xl font-semibold text-orange-400">Branding & Identity Services</h3>
                </div>
              </div>
            </Link>
            
            <Link to="#" className="group">
              <div className="p-6 bg-gray-900/50 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-all">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                  <h3 className="text-xl font-semibold text-orange-400">SEO & Content Marketing Solutions</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebsiteDevelopmentPage;
