
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Send, Mail } from 'lucide-react';

interface ContactFormProps {
  className?: string;
}

const ContactForm = ({ className }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '' // honeypot field
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If honeypot field is filled, silently reject the submission
    if (formData.website) {
      console.log('Spam submission detected and blocked');
      
      // Show success message to avoid alerting bots
      toast.success("Message sent successfully", {
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });
      
      setFormData({ name: '', email: '', message: '', website: '' });
      return;
    }
    
    setIsSubmitting(true);
    
    // Build form data with recipient
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('message', formData.message);
    data.append('_recipient', 'hello@glowgridmedia.com');
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully", {
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });
      setFormData({ name: '', email: '', message: '', website: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        "w-full max-w-md space-y-5",
        className
      )}
    >
      <div className="space-y-3">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="input-field"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="input-field"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          className="input-field"
          rows={4}
          required
        ></textarea>
        
        {/* Honeypot field - hidden from real users but visible to bots */}
        <div className="sr-only" aria-hidden="true">
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "px-6 py-3 w-full rounded-md border border-orange-400 text-white transition-all duration-300 hover:bg-orange-400 font-blink flex items-center justify-center gap-2",
          isSubmitting && "opacity-70 cursor-not-allowed"
        )}
      >
        {isSubmitting ? "Sending..." : "Send"}
        {!isSubmitting && <Send size={18} />}
      </button>
      
      <div className="text-center space-y-2">
        <p className="text-xs text-white/60">
          Serving Los Angeles, The San Gabriel Valley, the surrounding areas and businesses across the United States.
        </p>
        <p className="flex items-center justify-center gap-2 text-sm text-white/80">
          <Mail size={16} className="text-orange-400" />
          <a href="mailto:hello@glowgridmedia.com" className="hover:text-orange-400 transition-colors">
            hello@glowgridmedia.com
          </a>
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
