
import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ContactFormData } from '@/utils/formSchemas';
import FormField from './FormField';
import { cn } from '@/lib/utils';

interface ContactFormFieldsProps {
  register: UseFormRegister<ContactFormData>;
  errors: FieldErrors<ContactFormData>;
}

const ContactFormFields = ({ register, errors }: ContactFormFieldsProps) => {
  return (
    <>
      <FormField id="name" label="Name" error={errors.name?.message} required>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={cn(
            'input-field',
            errors.name && 'border-red-500 focus:ring-red-500'
          )}
          placeholder="Your name"
        />
      </FormField>

      <FormField id="email" label="Email" error={errors.email?.message} required>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={cn(
            'input-field',
            errors.email && 'border-red-500 focus:ring-red-500'
          )}
          placeholder="Your email"
        />
      </FormField>

      <FormField id="message" label="Message" error={errors.message?.message} required>
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          className={cn(
            'input-field',
            errors.message && 'border-red-500 focus:ring-red-500'
          )}
          placeholder="Your message"
        />
      </FormField>

      {/* Honeypot field - hidden from users, only bots will fill this */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          {...register('website')}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
    </>
  );
};

export default ContactFormFields;
