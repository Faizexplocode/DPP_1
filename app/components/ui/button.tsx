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
    'bg-gradient-to-r from-[#468432] to-[#519c39] text-white shadow-[0_8px_20px_-6px_rgba(70,132,50,0.5)] hover:shadow-[0_12px_24px_-6px_rgba(70,132,50,0.6)] border border-[#529e3a]/20',
  secondary:
    'bg-white text-green-dark shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.15)] border border-border/80',
  dark:
    'bg-gradient-to-r from-foreground to-[#2a2a2a] text-white shadow-lg shadow-black/20',
  outline:
    'bg-transparent text-green-dark border-2 border-green-dark/20 hover:border-green-dark hover:bg-green-dark/5',
  ghost:
    'bg-transparent text-green-dark hover:bg-green-dark/10',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-[36px] px-3.5 text-xs',
  md: 'h-[46px] px-5 text-[13px]',
  lg: 'h-[52px] px-6 text-[15px]',
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
          'w-full rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2',
          variantStyles[variant],
          sizeStyles[size],
          isDisabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:-translate-y-[2px] active:translate-y-[1px] active:scale-[0.98]',
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
