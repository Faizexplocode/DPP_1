"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { useOrders } from "@/app/context/order-context";
import { standardIngredients } from "@/app/lib/mock-data";
import TopBar from "@/app/components/layout/top-bar";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/toast";

export default function BahanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getOrder, changeServings } = useOrders();
  const { showToast } = useToast();
  const order = getOrder(id);

  if (!order) return null;

  return (
    <>
      <TopBar
        title="Total Bahan"
        onBack={() => router.push(`/seller/dapur/${id}`)}
      />

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-8">
        {/* Servings Counter */}
        <h3 className="text-center text-xs font-extrabold uppercase tracking-widest text-muted">
          Jumlah Porsi
        </h3>
        <div className="my-3.5 flex items-center justify-center gap-5">
          <button
            className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-green-dark bg-white text-green-dark transition-colors hover:bg-soft"
            onClick={() => changeServings(id, -1)}
          >
            <Minus size={24} />
          </button>
          <div className="min-w-[96px] text-center text-[56px] font-extrabold leading-none text-foreground">
            {order.servings}
          </div>
          <button
            className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-green-dark bg-white text-green-dark transition-colors hover:bg-soft"
            onClick={() => changeServings(id, 1)}
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="mb-4 rounded-[14px] border border-border bg-[#f1f5ed] p-3.5 text-center text-xs leading-relaxed text-muted">
          Ubah jumlah porsi jika ada perubahan pesanan mendadak.
        </div>

        <div className="my-4 border-t border-border" />

        {/* Ingredient List */}
        <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-muted">
          Total Bahan yang Harus Disiapkan
        </h3>
        <div className="rounded-[18px] border border-border bg-white">
          {standardIngredients.map((ing, idx) => {
            const total = ing.perServing * order.servings;
            let display: string;
            if (ing.unit === "butir") {
              display = `${total} butir`;
            } else {
              display = `${(total / 1000).toFixed(0)} kg`;
            }

            return (
              <div
                key={ing.name}
                className={`flex items-center justify-between px-3.5 py-3 text-sm ${
                  idx < standardIngredients.length - 1
                    ? "border-b border-[#e6eadf]"
                    : ""
                }`}
              >
                <span>{ing.name}</span>
                <span className="font-bold">{display}</span>
              </div>
            );
          })}
        </div>

        <p className="mt-2 text-center text-[11px] leading-relaxed text-muted">
          Dihitung otomatis berdasarkan standar 1 porsi &times; jumlah porsi
        </p>

        <Button
          variant="secondary"
          className="mt-4"
          onClick={() => showToast("Disimpan ke catatan dapur")}
        >
          Simpan ke Catatan
        </Button>
        <Button
          variant="primary"
          className="mt-3"
          onClick={() => router.push(`/seller/pesanan/${id}`)}
        >
          Kembali ke Detail Pesanan
        </Button>
      </div>
    </>
  );
}
