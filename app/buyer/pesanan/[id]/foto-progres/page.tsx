"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Camera, Clock } from "lucide-react";
import { useOrders } from "@/app/context/order-context";
import { getStatusLabel } from "@/app/lib/mock-data";
import TopBar from "@/app/components/layout/top-bar";
import { Button } from "@/app/components/ui/button";

export default function FotoProgres({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getOrder } = useOrders();
  const order = getOrder(id);

  if (!order) return null;

  return (
    <>
      <TopBar
        title="Foto Progres"
        onBack={() => router.push(`/buyer/pesanan/${id}`)}
      />

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-8">
        <p className="mb-3 text-center text-xs text-muted">
          {order.title} &middot; Tahap: {getStatusLabel(order.stage)}
        </p>

        {/* Main Photo Area */}
        <div className="mb-2.5 flex h-[210px] items-center justify-center rounded-[18px] border-2 border-dashed border-green-dark bg-soft/50 text-center">
          <div>
            <Camera size={32} className="mx-auto mb-2.5 text-green-dark" />
            <p className="text-sm font-bold">Foto dari Seller</p>
            <p className="mt-1.5 text-xs text-muted">
              Dikirim oleh Pawon Lestari &middot; 10:15 WIB
            </p>
          </div>
        </div>

        <div className="my-4 border-t border-border" />

        {/* Thumbnails */}
        <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-muted">
          Semua Foto Progres
        </h3>
        <div className="mb-4 flex gap-3">
          <div className="flex min-h-[82px] flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[14px] border border-border bg-white text-[11px] font-extrabold text-muted">
            <Camera size={20} className="text-muted" />
            <span>Bahan Siap</span>
          </div>
          <div className="flex min-h-[82px] flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[14px] border-2 border-green-dark bg-soft text-[11px] font-extrabold text-green-dark">
            <Camera size={20} />
            <span>Dikemas</span>
          </div>
          <div className="flex min-h-[82px] flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[14px] border border-border bg-white text-[11px] font-extrabold text-muted">
            <Clock size={20} />
            <span>Belum ada</span>
          </div>
        </div>

        {/* Note */}
        <div className="rounded-[14px] border border-border bg-[#f1f5ed] p-3.5 text-xs leading-relaxed text-muted">
          Foto dikirim otomatis oleh seller di setiap tahap penting untuk
          menjaga kualitas pesanan Anda.
        </div>

        <Button
          variant="secondary"
          className="mt-4"
          onClick={() => router.push(`/buyer/pesanan/${id}`)}
        >
          Kembali ke Status Pesanan
        </Button>
      </div>
    </>
  );
}
