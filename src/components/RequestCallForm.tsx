
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import FormSuccess from '@/components/forms/FormSuccess';
import RequestCallFormFields from '@/components/forms/RequestCallFormFields';
import { requestCallFormSchema, type RequestCallFormData } from '@/utils/formSchemas';

const RequestCallForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [status, setStatus] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RequestCallFormData>({
    resolver: zodResolver(requestCallFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      preferredTime: '',
      message: '',
      website: '', // Honeypot field
    },
  });

  const onSubmit = async (data: RequestCallFormData) => {
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
    setStatus('');

    try {
      const formData = new FormData();
      
      // Add form fields to formData
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'website') { // Skip honeypot field
          formData.append(key, value || 'Not provided');
        }
      });
      
      // Add metadata
      formData.append('form_name', 'GlowGrid Call Request');
      formData.append('_subject', 'New Call Request Submission');
      
      const response = await fetch('https://formsubmit.co/hello@glowgridmedia.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Show success message
        setIsSuccess(true);
        toast({
          title: 'Request sent!',
          description: 'We will contact you soon to schedule a call.',
        });
        
        // Reset form after successful submission
        reset();
      } else {
        setStatus("There was a problem submitting your form");
        
        toast({
          title: 'Error',
          description: 'There was an error sending your message. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus("There was a problem submitting your form");
      toast({
        title: 'Error',
        description: 'There was an error sending your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => setIsSuccess(false);

  return (
    <div className="w-full max-w-lg mx-auto">
      {isSuccess ? (
        <FormSuccess onReset={handleReset} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <RequestCallFormFields register={register} errors={errors} />
          
          {status && <p className="text-sm text-red-400 text-center">{status}</p>}
          
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
