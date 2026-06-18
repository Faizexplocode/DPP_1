'use client';

import { useRouter } from 'next/navigation';
import TopBar from '@/app/components/layout/top-bar';
import { Button } from '@/app/components/ui/button';
import { Input, PasswordInput } from '@/app/components/ui/input';
import { HeroCard } from '@/app/components/ui/card';

export default function SellerLoginPage() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push('/seller');
  }

  return (
    <>
      <TopBar title="Masuk - Seller" onBack={() => router.push('/')} />

      <div className="px-6 py-8 flex-1 overflow-y-auto">
        <HeroCard className="mb-6">
          <span className="inline-flex items-center px-2.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-extrabold mb-3">
            Akun Seller
          </span>
          <h2 className="text-[26px] font-extrabold mb-2">
            Selamat Datang Kembali
          </h2>
          <p className="text-[13px] leading-relaxed opacity-90">
            Kelola operasional katering, update progress, dan pantau pesanan
            dengan mudah.
          </p>
        </HeroCard>

        <form onSubmit={handleSubmit}>
          <Input
            label="Nama Katering"
            placeholder="Pawon Lestari"
            required
            className="mb-3.5"
          />
          <Input
            label="No. HP / Email"
            placeholder="08xxxxxxxxxx"
            required
            className="mb-3.5"
          />
          <PasswordInput
            label="Password"
            placeholder="••••••••"
            required
            className="mb-4"
          />
          <Button type="submit" variant="primary">
            MASUK
          </Button>
        </form>

        <p className="text-center mt-4 text-[13px] text-muted">
          <span className="text-green-dark font-extrabold cursor-pointer">
            Lupa password?
          </span>
        </p>

        <p className="text-center mt-2 text-[13px] text-muted">
          Belum punya akun katering?{' '}
          <span className="text-green-dark font-extrabold cursor-pointer">
            Daftar Sekarang
          </span>
        </p>
      </div>
    </>
  );
}
