import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  organization: z.string().optional(),
  inquiryType: z
    .string()
    .refine((v) => ['Partnership', 'Funding', 'Volunteer', 'General'].includes(v), {
      message: 'Please select an inquiry type',
    }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
