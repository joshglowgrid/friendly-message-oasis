
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { cn } from '@/lib/utils';
import { Mail } from 'lucide-react';

interface ContactFormProps {
  className?: string;
}

const ContactForm = ({ className }: ContactFormProps) => {
  const [state, handleSubmit] = useForm("mnndrlvj");
  
  if (state.succeeded) {
    return (
      <div className={cn("w-full max-w-md", className)}>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
          <div className="text-orange-400 text-4xl mb-4">✓</div>
          <h3 className="text-xl font-semibold mb-2 text-white">Thank You!</h3>
          <p className="text-white/80 mb-4">We've received your message and will get back to you shortly.</p>
        </div>
        
        <div className="text-center space-y-2 mt-4">
          <p className="text-xs text-white/60">
            Serving Los Angeles, The San Gabriel Valley, the surrounding areas and businesses across the United States.
          </p>
          <p className="text-xs flex items-center justify-center gap-1 text-white/80">
            <Mail size={12} /> <a href="mailto:hello@glowgridmedia.com" className="hover:text-orange-400 transition-colors">hello@glowgridmedia.com</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-md", className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 text-white">
            Name <span className="text-orange-400">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 text-white placeholder-white/50"
            placeholder="Your name"
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-white">
            Email Address <span className="text-orange-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 text-white placeholder-white/50"
            placeholder="Your email"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1 text-white">
            Message <span className="text-orange-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 text-white placeholder-white/50"
            placeholder="Your message"
          />
          <ValidationError prefix="Message" field="message" errors={state.errors} />
        </div>

        {/* Display general form errors */}
        {state.errors && Object.keys(state.errors).length > 0 && (
          <div className="text-red-400 text-sm">
            Something went wrong. Please try again.
          </div>
        )}

        <button
          type="submit"
          disabled={state.submitting}
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 px-4 rounded-md hover:from-orange-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {state.submitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      
      <div className="text-center space-y-2 mt-4">
        <p className="text-xs text-white/60">
          Serving Los Angeles, The San Gabriel Valley, the surrounding areas and businesses across the United States.
        </p>
        <p className="text-xs flex items-center justify-center gap-1 text-white/80">
          <Mail size={12} /> <a href="mailto:hello@glowgridmedia.com" className="hover:text-orange-400 transition-colors">hello@glowgridmedia.com</a>
        </p>
      </div>
    </div>
  );
};

export default ContactForm;
