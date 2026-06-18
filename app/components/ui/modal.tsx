'use client';

import { useEffect, type ReactNode } from 'react';
import { Button } from '@/app/components/ui/button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon?: ReactNode;
  title: string;
  description?: string;
  primaryText: string;
  primaryAction: () => void;
  secondaryText?: string;
  secondaryAction?: () => void;
}

function Modal({
  isOpen,
  onClose,
  icon,
  title,
  description,
  primaryText,
  primaryAction,
  secondaryText,
  secondaryAction,
}: ModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full max-w-[310px] bg-white rounded-[24px] p-6 shadow-xl text-center border border-border animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        {icon && (
          <div className="w-[74px] h-[74px] rounded-full bg-green-dark text-white flex items-center justify-center mx-auto mb-4 text-3xl">
            {icon}
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl font-extrabold mb-2.5">{title}</h2>

        {/* Description */}
        {description && (
          <p className="text-[13px] text-muted leading-relaxed mb-4">
            {description}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Button variant="primary" onClick={primaryAction}>
            {primaryText}
          </Button>

          {secondaryText && (
            <Button
              variant="outline"
              onClick={secondaryAction ?? onClose}
            >
              {secondaryText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export { Modal };
export type { ModalProps };
