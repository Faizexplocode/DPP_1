'use client';

import type { ChangeEventHandler } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

function SearchInput({
  placeholder = 'Cari...',
  value,
  onChange,
  className = '',
}: SearchInputProps) {
  return (
    <div className={['relative', className].join(' ')}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-12 pl-10 pr-3.5 rounded-[14px] border border-border bg-white text-sm focus:border-orange-main focus:ring-4 focus:ring-orange-main/15 outline-none transition"
      />
    </div>
  );
}

export { SearchInput };
export type { SearchInputProps };
