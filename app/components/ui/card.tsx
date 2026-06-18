import type { ReactNode, MouseEventHandler } from 'react';

/* ── Card ──────────────────────────────────────────────────── */

interface CardProps {
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

function Card({ className = '', children, onClick }: CardProps) {
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
              }
            }
          : undefined
      }
      className={[
        'bg-card border border-border rounded-[18px] p-3.5 shadow-sm',
        onClick
          ? 'cursor-pointer hover:shadow-lg hover:-translate-y-[2px] transition-all'
          : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

/* ── HeroCard ──────────────────────────────────────────────── */

interface HeroCardProps {
  className?: string;
  children: ReactNode;
}

function HeroCard({ className = '', children }: HeroCardProps) {
  return (
    <div
      className={[
        'gradient-hero text-white border-none rounded-[18px] p-3.5 shadow-lg',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export { Card, HeroCard };
export type { CardProps, HeroCardProps };
