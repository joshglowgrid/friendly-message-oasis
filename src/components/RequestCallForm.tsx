
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import FormSuccess from '@/components/forms/FormSuccess';
import RequestCallFormFields from '@/components/forms/RequestCallFormFields';
import { requestCallFormSchema, type RequestCallFormData } from '@/utils/formSchemas';
import { submitForm } from '@/utils/submissionService';

const RequestCallForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

    try {
      const success = await submitForm(data, 'call_request');
      
      if (!success) {
        throw new Error('Failed to submit form');
      }
      
      // Show success message
      setIsSuccess(true);
      toast({
        title: 'Request sent!',
        description: 'We will contact you soon to schedule a call.',
      });
      
      // Reset form after successful submission
      reset();
      
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

  const handleReset = () => setIsSuccess(false);

  return (
    <div className="w-full max-w-lg mx-auto">
      {isSuccess ? (
        <FormSuccess onReset={handleReset} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <RequestCallFormFields register={register} errors={errors} />
          
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
