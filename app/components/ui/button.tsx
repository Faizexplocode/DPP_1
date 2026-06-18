'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-green-dark text-white shadow-lg hover:brightness-110',
  secondary:
    'bg-white text-green-dark border-[1.5px] border-green-dark',
  dark:
    'bg-foreground text-white',
  outline:
    'bg-white text-green-dark border border-border',
  ghost:
    'bg-transparent text-green-dark',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-[36px] px-3.5 text-xs',
  md: 'h-[50px] px-5 text-sm',
  lg: 'h-[54px] px-6 text-base',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      className = '',
      children,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          'w-full rounded-[14px] font-bold transition-all duration-200 flex items-center justify-center gap-2',
          variantStyles[variant],
          sizeStyles[size],
          isDisabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:-translate-y-[1px] active:translate-y-0',
          className,
        ].join(' ')}
        {...rest}
      >
        {loading && (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
