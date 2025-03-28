
import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { RequestCallFormData } from '@/utils/formSchemas';
import FormField from './FormField';
import { cn } from '@/lib/utils';

interface RequestCallFormFieldsProps {
  register: UseFormRegister<RequestCallFormData>;
  errors: FieldErrors<RequestCallFormData>;
}

const RequestCallFormFields = ({ register, errors }: RequestCallFormFieldsProps) => {
  return (
    <>
      <FormField id="name" label="Full Name" error={errors.name?.message} required>
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
      </FormField>

      <FormField id="email" label="Email Address" error={errors.email?.message} required>
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
      </FormField>

      <FormField id="phone" label="Phone Number" error={errors.phone?.message}>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
        />
      </FormField>

      <FormField id="preferredTime" label="Preferred Call Time" error={errors.preferredTime?.message}>
        <input
          id="preferredTime"
          type="text"
          placeholder="e.g., Weekdays 2-5pm PST"
          {...register('preferredTime')}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
        />
      </FormField>

      <FormField id="message" label="Message" error={errors.message?.message} required>
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
      </FormField>

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
    </>
  );
};

export default RequestCallFormFields;
