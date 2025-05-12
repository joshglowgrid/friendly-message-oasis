
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { Send, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { contactFormSchema, type ContactFormData } from '@/utils/formSchemas';
import { submitForm } from '@/utils/submissionService';
import ContactFormFields from '@/components/forms/ContactFormFields';
import FormSuccess from '@/components/forms/FormSuccess';

interface ContactFormProps {
  className?: string;
}

const ContactForm = ({ className }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      website: '', // Honeypot field
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Check if honeypot field is filled (bot detection)
    if (data.website && data.website.length > 0) {
      console.log('Bot detected. Form not submitted.');
      // Fake success to avoid bot detection
      toast.success("Message sent successfully", {
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });
      reset();
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await submitForm(data, 'contact_form');
      
      if (!success) {
        throw new Error('Failed to submit form');
      }
      
      toast.success("Message sent successfully", {
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });
      
      setIsSuccess(true);
      reset();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to send message", {
        description: "Please try again later or contact us directly.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => setIsSuccess(false);

  return (
    <div className={cn("w-full max-w-md", className)}>
      {isSuccess ? (
        <FormSuccess onReset={handleReset} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
          <div className="space-y-3">
            <ContactFormFields register={register} errors={errors} />
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
            <p className="text-xs flex items-center justify-center gap-1 text-white/80">
              <Mail size={12} /> <a href="mailto:hello@glowgridmedia.com" className="hover:text-orange-400 transition-colors">hello@glowgridmedia.com</a>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
