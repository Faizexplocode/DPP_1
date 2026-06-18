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
      <div>
        <div
          className="w-[92px] h-[92px] rounded-[26px] mx-auto mb-6 flex items-center justify-center font-extrabold text-white text-lg shadow-lg"
          style={{ background: 'linear-gradient(145deg, #468432, #9AD872)' }}
        >
          PS
        </div>

        <h1 className="text-[38px] font-extrabold text-center text-green-dark tracking-tighter mb-2">
          Pawon<span className="text-orange-main">Sync</span>
        </h1>

        <p className="text-center text-[13px] text-muted leading-relaxed">
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
