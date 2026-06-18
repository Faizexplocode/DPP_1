"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, Check } from "lucide-react";
import { useOrders } from "@/app/context/order-context";
import TopBar from "@/app/components/layout/top-bar";
import { ProgressBar } from "@/app/components/ui/progress-bar";
import { Button } from "@/app/components/ui/button";
import { Modal } from "@/app/components/ui/modal";

export default function PengemasanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getOrder, changePackaging, updateOrderStage } = useOrders();
  const order = getOrder(id);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!order) return null;

  const percentage = Math.min((order.packaged / order.target) * 100, 100);

  function handleFinish() {
    if (!order) return;
    // Set packaged to target and stage to ready
    const diff = order.target - order.packaged;
    if (diff > 0) changePackaging(id, diff);
    updateOrderStage(id, "ready");
    setShowSuccess(true);
  }

  return (
    <>
      <TopBar
        title="Pengemasan"
        onBack={() => router.push(`/seller/pesanan/${id}`)}
      />

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-8">
        <div className="mb-4 text-center">
          <h3 className="text-lg font-extrabold">
            {order.title} - Target: {order.target} kotak
          </h3>
        </div>

        <div className="my-4 border-t border-border" />

        {/* Progress */}
        <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-muted">
          Progress Pengemasan
        </h3>
        <ProgressBar value={percentage} />
        <div className="mt-2.5 mb-4 flex items-center justify-between">
          <span className="text-xs text-muted">Kotak selesai</span>
          <span className="text-sm font-bold">
            {order.packaged} / {order.target} kotak
          </span>
        </div>

        <div className="my-4 border-t border-border" />

        {/* Counter */}
        <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-muted">
          Counter Kotak
        </h3>
        <div className="my-7 flex items-center justify-center gap-5">
          <button
            className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-green-dark bg-white text-green-dark transition-colors hover:bg-soft"
            onClick={() => changePackaging(id, -1)}
          >
            <Minus size={24} />
          </button>
          <div className="min-w-[96px] text-center text-[64px] font-extrabold leading-none text-foreground">
            {order.packaged}
          </div>
          <button
            className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-green-dark bg-white text-green-dark transition-colors hover:bg-soft"
            onClick={() => changePackaging(id, 1)}
          >
            <Plus size={24} />
          </button>
        </div>

        {/* Note */}
        <div className="rounded-[14px] border border-border bg-[#f1f5ed] p-3.5 text-xs leading-relaxed text-muted">
          Setiap kali 1 kotak selesai dikemas, tekan tombol + untuk menghitung
          progres.
        </div>

        <Button variant="primary" className="mt-5" onClick={handleFinish}>
          Selesai Kemas - Kirim Update
        </Button>
      </div>

      <Modal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        icon={<Check size={34} />}
        title="Update Terkirim!"
        description="Status pengemasan selesai. Buyer menerima notifikasi bahwa pesanan siap berangkat."
        primaryText="Kembali ke Detail Pesanan"
        primaryAction={() => router.push(`/seller/pesanan/${id}`)}
      />
    </>
  );
}
