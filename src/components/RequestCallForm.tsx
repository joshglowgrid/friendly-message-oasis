
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().min(5, { message: 'Message must be at least 5 characters.' }),
  // Honeypot field - should remain empty
  website: z.string().max(0, { message: 'This field should be empty.' }).optional(),
});

type FormData = z.infer<typeof formSchema>;

const RequestCallForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      preferredTime: '',
      message: '',
      website: '', // Honeypot field
    },
  });

  const onSubmit = async (data: FormData) => {
    // Check if honeypot field is filled (bot detection)
    if (data.website && data.website.length > 0) {
      console.log('Bot detected. Form not submitted.');
      // Fake success to avoid bot detection
      toast({
        title: 'Message sent!',
        description: 'We will contact you soon.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, you'd send the data to your backend
      // For demo purposes, we're simulating a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', data);
      
      // Show success message
      setIsSuccess(true);
      toast({
        title: 'Message sent!',
        description: 'We will contact you soon.',
      });
      
      // Reset form after successful submission
      reset();
      
      // Reset success state after a delay
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'There was an error sending your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {isSuccess ? (
        <div className="glass-panel p-8 text-center animate-fade-in">
          <div className="orange-gradient-text text-4xl mb-4">✓</div>
          <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
          <p className="text-white/80 mb-4">
            We've received your request and will get back to you shortly.
          </p>
          <Button
            variant="outline"
            onClick={() => setIsSuccess(false)}
            className="mt-4"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name <span className="text-orange-400">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={cn(
                'w-full px-4 py-2 bg-white/10 border rounded-md focus:outline-none focus:ring-2 transition-all duration-300',
                errors.name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-white/20 focus:ring-orange-400'
              )}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address <span className="text-orange-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={cn(
                'w-full px-4 py-2 bg-white/10 border rounded-md focus:outline-none focus:ring-2 transition-all duration-300',
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-white/20 focus:ring-orange-400'
              )}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number (Optional)
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
            />
          </div>

          <div>
            <label htmlFor="preferredTime" className="block text-sm font-medium mb-1">
              Preferred Call Time (Optional)
            </label>
            <input
              id="preferredTime"
              type="text"
              placeholder="e.g., Weekdays 2-5pm PST"
              {...register('preferredTime')}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message <span className="text-orange-400">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              {...register('message')}
              className={cn(
                'w-full px-4 py-2 bg-white/10 border rounded-md focus:outline-none focus:ring-2 transition-all duration-300',
                errors.message
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-white/20 focus:ring-orange-400'
              )}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
            )}
          </div>

          {/* Honeypot field - hidden from users, only bots will fill this */}
          <div className="hidden">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              {...register('website')}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              variant="gradient"
              disabled={isSubmitting}
              className="w-full py-3 h-auto"
            >
              {isSubmitting ? 'Sending...' : 'Request a Call'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RequestCallForm;
