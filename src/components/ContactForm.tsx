
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Send } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ContactFormProps {
  className?: string;
}

const ContactForm = ({ className }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaVerified(!!token);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaVerified) {
      toast.error("Please verify you're human", {
        duration: 3000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Build form data with hidden recipient
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('message', formData.message);
    data.append('_recipient', 'hello@glowgridmedia.com');
    
    // Simulate form submission
    // In a real implementation, you would send this to a server endpoint
    // that handles the email forwarding with proper spam protection
    setTimeout(() => {
      toast.success("Message sent successfully", {
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      setCaptchaVerified(false);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
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
      </div>
      
      <div className="flex justify-center opacity-70 scale-75 transform transition-all hover:opacity-90">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // This is a test key - replace with your actual key in production
          onChange={handleCaptchaChange}
          theme="dark"
          size="compact"
        />
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
      
      <p className="text-xs text-white/60 text-center">
        Serving Los Angeles, The San Gabriel Valley, the surrounding areas and businesses across the United States.
      </p>
    </form>
  );
};

export default ContactForm;
