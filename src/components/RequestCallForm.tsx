
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone, Send } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const callRequestSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  callTime: z.string().min(2, { message: "Please provide a preferred call time" }),
  message: z.string().optional(),
});

type CallRequestFormValues = z.infer<typeof callRequestSchema>;

interface RequestCallFormProps {
  className?: string;
}

const RequestCallForm = ({ className }: RequestCallFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const recaptchaRef = React.useRef<ReCAPTCHA>(null);

  const form = useForm<CallRequestFormValues>({
    resolver: zodResolver(callRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      callTime: '',
      message: '',
    },
  });

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaVerified(!!token);
  };

  const onSubmit = (data: CallRequestFormValues) => {
    if (!captchaVerified) {
      toast.error("Please verify you're human", {
        duration: 3000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Call request received!", {
        description: "We'll be in touch soon to schedule a time that works for you.",
        duration: 5000,
      });
      
      form.reset();
      setIsSubmitting(false);
      setCaptchaVerified(false);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }, 1500);
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "w-full space-y-5",
          className
        )}
      >
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Full Name"
                    className="input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    className="input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Phone (optional)"
                    type="tel"
                    className="input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="callTime"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Preferred Call Time (e.g. Weekdays 2-5pm PST)"
                    className="input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Any specific topics you'd like to discuss? (optional)"
                    className="input-field min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-center opacity-70 scale-75 transform transition-all hover:opacity-90">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Test key - replace with actual key in production
            onChange={handleCaptchaChange}
            theme="dark"
            size="compact"
          />
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="gradient"
          className="w-full flex items-center justify-center gap-2"
        >
          {isSubmitting ? "Submitting..." : "Request a Call"}
          {!isSubmitting && <Phone size={18} />}
        </Button>
        
        <p className="text-xs text-white/60 text-center">
          We typically respond within 24-48 hours to schedule your consultation.
        </p>
      </form>
    </Form>
  );
};

export default RequestCallForm;
