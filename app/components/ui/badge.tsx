import type { ReactNode } from 'react';

type BadgeVariant = 'processing' | 'packing' | 'ready' | 'waiting' | 'done';

interface StatusBadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  processing:
    'bg-status-processing-bg text-status-processing-text border border-status-processing-border',
  packing:
    'bg-status-packing-bg text-status-packing-text border border-status-packing-border',
  ready:
    'bg-status-ready-bg text-status-ready-text border border-status-ready-border',
  waiting:
    'bg-status-waiting-bg text-status-waiting-text border border-status-waiting-border',
  done:
    'bg-status-done-bg text-status-done-text border border-status-done-border',
};

function StatusBadge({ variant, children, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-2.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide whitespace-nowrap',
        variantStyles[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}

export { StatusBadge };
export type { StatusBadgeProps, BadgeVariant };
