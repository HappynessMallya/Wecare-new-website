'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/validations/contact';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';

const inquiryOptions = [
  { value: '', label: 'Select type' },
  { value: 'Partnership', label: 'Partnership' },
  { value: 'Funding', label: 'Funding' },
  { value: 'Volunteer', label: 'Volunteering' },
  { value: 'General', label: 'General inquiry' },
] as const;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      organization: '',
      inquiryType: undefined,
      message: '',
    },
  });

  async function onSubmit(data: ContactFormData) {
    await new Promise((r) => setTimeout(r, 800));
    console.log(data);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
      aria-label="Contact form"
    >
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-neutral-800">
          Name
        </label>
        <Input
          id="name"
          {...register('name')}
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-cta" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-neutral-800">
          Email
        </label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-cta" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="organization" className="mb-2 block text-sm font-medium text-neutral-800">
          Organization
        </label>
        <Input
          id="organization"
          {...register('organization')}
          autoComplete="organization"
        />
      </div>

      <div>
        <label htmlFor="inquiryType" className="mb-2 block text-sm font-medium text-neutral-800">
          Inquiry Type
        </label>
        <Select
          id="inquiryType"
          {...register('inquiryType')}
          aria-invalid={!!errors.inquiryType}
          aria-describedby={errors.inquiryType ? 'inquiryType-error' : undefined}
        >
          {inquiryOptions.map((opt) => (
            <option key={opt.value || 'placeholder'} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
        {errors.inquiryType && (
          <p id="inquiryType-error" className="mt-1 text-sm text-cta" role="alert">
            {errors.inquiryType.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-neutral-800">
          Message
        </label>
        <Textarea
          id="message"
          {...register('message')}
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-cta" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? 'Sending…' : 'Submit'}
      </Button>
    </form>
  );
}
