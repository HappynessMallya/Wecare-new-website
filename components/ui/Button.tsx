'use client';

import { forwardRef, cloneElement, isValidElement } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'lg';
  asChild?: boolean;
}

const buttonVariants = (
  variant: ButtonProps['variant'],
  size: ButtonProps['size'],
  className?: string
) =>
  cn(
    'inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_.arr]:transition-transform [&:hover_.arr]:translate-x-1',
    variant === 'primary' && 'bg-rose text-white border-2 border-transparent hover:bg-[#c82e84] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(230,57,154,0.38)]',
    variant === 'secondary' && 'bg-primary text-white border-2 border-transparent hover:bg-[#082a6e] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(10,52,135,0.3)]',
    variant === 'outline' && 'border-2 border-primary text-primary bg-transparent hover:bg-primary/5',
    variant === 'ghost' && 'border-2 border-white/50 text-white bg-transparent hover:bg-white/10 hover:border-white',
    size === 'default' && 'h-11 px-6 py-2 text-[13px]',
    size === 'lg' && 'h-12 px-8 py-3 text-[13px]',
    className
  );

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', asChild, children, ...props }, ref) => {
    const computed = buttonVariants(variant, size, className);
    if (asChild && isValidElement(children)) {
      return cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: cn(computed, (children as React.ReactElement<{ className?: string }>).props?.className),
      });
    }
    return (
      <button ref={ref} className={computed} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
