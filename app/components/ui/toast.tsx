'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

/* ── Context ───────────────────────────────────────────────── */

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/* ── Hook ──────────────────────────────────────────────────── */

function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used inside <ToastProvider>');
  }
  return ctx;
}

/* ── Toast display ─────────────────────────────────────────── */

function ToastDisplay({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-[400px] md:w-auto bg-green-dark text-white p-3.5 rounded-[14px] text-[13px] text-center shadow-lg z-[70] animate-slide-up">
      {message}
    </div>
  );
}

/* ── Provider ──────────────────────────────────────────────── */

interface ToastProviderProps {
  children: ReactNode;
}

function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
  }, []);

  const handleDone = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <ToastDisplay message={toast} onDone={handleDone} />}
    </ToastContext.Provider>
  );
}

export { ToastProvider, useToast };
