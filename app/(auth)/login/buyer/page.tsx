'use client';

import { useRouter } from 'next/navigation';
import TopBar from '@/app/components/layout/top-bar';
import { Button } from '@/app/components/ui/button';
import { Input, PasswordInput } from '@/app/components/ui/input';
import { HeroCard } from '@/app/components/ui/card';

export default function BuyerLoginPage() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push('/buyer');
  }

  return (
    <>
      <TopBar title="Masuk — Pembeli" onBack={() => router.push('/')} />

      <div className="p-4 flex-1 overflow-y-auto">
        <HeroCard className="mb-4">
          <span className="inline-flex items-center px-2.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-extrabold mb-3">
            Akun Pembeli
          </span>
          <h2 className="text-[26px] font-extrabold mb-2">
            Masuk Sebagai Pembeli
          </h2>
          <p className="text-[13px] leading-relaxed opacity-90">
            Pantau status pesanan katering secara real-time dari dapur hingga
            lokasi acara.
          </p>
        </HeroCard>

        <form onSubmit={handleSubmit}>
          <Input
            label="Nama Lengkap"
            placeholder="contoh: Bu Diana"
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
            Masuk
          </Button>
        </form>

        <p className="text-center mt-4 text-[13px] text-muted">
          <span className="text-green-dark font-extrabold cursor-pointer">
            Lupa password?
          </span>
        </p>
      </div>
    </>
  );
}
