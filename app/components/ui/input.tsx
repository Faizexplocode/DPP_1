'use client';

import { useState, type ChangeEventHandler } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/* ── Input ─────────────────────────────────────────────────── */

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  name?: string;
}

function Input({
  label,
  placeholder,
  type = 'text',
  required,
  value,
  onChange,
  className = '',
  name,
}: InputProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-[12px] font-extrabold uppercase tracking-wide text-foreground mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full h-[52px] rounded-[14px] border border-border px-3.5 bg-white text-sm focus:border-orange-main focus:ring-4 focus:ring-orange-main/15 outline-none transition"
      />
    </div>
  );
}

/* ── PasswordInput ─────────────────────────────────────────── */

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  name?: string;
}

function PasswordInput({
  label,
  placeholder,
  required,
  value,
  onChange,
  className = '',
  name,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={className}>
      {label && (
        <label className="block text-[12px] font-extrabold uppercase tracking-wide text-foreground mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full h-[52px] rounded-[14px] border border-border px-3.5 pr-11 bg-white text-sm focus:border-orange-main focus:ring-4 focus:ring-orange-main/15 outline-none transition"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? (
            <EyeOff className="h-[18px] w-[18px]" />
          ) : (
            <Eye className="h-[18px] w-[18px]" />
          )}
        </button>
      </div>
    </div>
  );
}

export { Input, PasswordInput };
export type { InputProps, PasswordInputProps };
