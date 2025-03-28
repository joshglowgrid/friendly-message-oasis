
import { z } from 'zod';

export const requestCallFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().min(5, { message: 'Message must be at least 5 characters.' }),
  // Honeypot field - should remain empty
  website: z.string().max(0, { message: 'This field should be empty.' }).optional(),
});

export type RequestCallFormData = z.infer<typeof requestCallFormSchema>;
