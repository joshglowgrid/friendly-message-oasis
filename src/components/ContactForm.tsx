
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully", {
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        "w-full max-w-md space-y-5 opacity-0 animate-scale [animation-delay:0.3s]",
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
          className="input-field opacity-0 animate-fade-in [animation-delay:0.4s]"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="input-field opacity-0 animate-fade-in [animation-delay:0.5s]"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          className="input-field opacity-0 animate-fade-in [animation-delay:0.6s]"
          rows={4}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "button-primary w-full opacity-0 animate-fade-in [animation-delay:0.7s]",
          isSubmitting && "opacity-70 cursor-not-allowed"
        )}
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default ContactForm;
