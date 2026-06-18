'use client';

import { ChevronLeft } from 'lucide-react';

interface TopBarProps {
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  leftAlign?: boolean;
}

export default function TopBar({ title, onBack, rightAction, leftAlign }: TopBarProps) {
  return (
    <div
      className={`h-[60px] px-5 bg-surface border-b border-border flex items-center relative flex-shrink-0 ${
        leftAlign ? 'justify-start' : 'justify-center'
      } ${leftAlign && onBack ? 'pl-12' : ''}`}
    >
      {onBack && (
        <button
          onClick={onBack}
          className="absolute left-3.5 w-9 h-9 rounded-full bg-soft text-green-dark flex items-center justify-center"
          aria-label="Go back"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <span
        className={`font-extrabold tracking-wide text-foreground ${
          leftAlign ? 'text-[17px]' : 'text-[15px]'
        }`}
      >
        {title}
      </span>

      {rightAction && (
        <div className="absolute right-3.5">{rightAction}</div>
      )}
    </div>
  );
}
