'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';

export default function SplashPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 justify-between">
      {/* Top spacer */}
      <div />

      {/* Center — branding */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative mx-auto mb-10 w-28 h-28">
          {/* Outer glow */}
          <div className="absolute inset-0 bg-green-dark blur-2xl opacity-40 animate-pulse rounded-full"></div>
          
          {/* Icon box */}
          <div
            className="relative w-full h-full rounded-[32px] flex items-center justify-center font-extrabold text-white text-4xl shadow-2xl border border-white/30 transition-transform duration-700 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #468432 0%, #9AD872 100%)',
              boxShadow: 'inset 0 4px 12px rgba(255,255,255,0.4), 0 16px 32px -8px rgba(70, 132, 50, 0.6)'
            }}
          >
            PS
          </div>
        </div>

        <h1 className="text-[44px] font-extrabold text-center tracking-tighter mb-3 text-foreground leading-none">
          Pawon<span className="text-orange-main">Sync</span>
        </h1>

        <p className="text-center text-[15px] text-muted font-medium leading-relaxed max-w-[240px] mx-auto">
          Ketenangan dari Dapur hingga Venue
        </p>
      </div>

      {/* Bottom — actions */}
      <div>
        <Button
          variant="primary"
          onClick={() => router.push('/login/seller')}
        >
          Masuk sebagai Seller
        </Button>

        <Button
          variant="secondary"
          className="mt-3"
          onClick={() => router.push('/login/buyer')}
        >
          Masuk sebagai Buyer
        </Button>

        <p className="text-center mt-4 text-[13px] text-muted">
          Belum punya akun?{' '}
          <span className="text-green-dark font-extrabold cursor-pointer">
            Daftar
          </span>
        </p>
      </div>
    </div>
  );
}
