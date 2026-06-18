"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Phone, MessageSquare } from "lucide-react";
import { useOrders } from "@/app/context/order-context";
import { useToast } from "@/app/components/ui/toast";
import TopBar from "@/app/components/layout/top-bar";
import { Card } from "@/app/components/ui/card";

export default function HubungiSeller({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getOrder } = useOrders();
  const { showToast } = useToast();
  const order = getOrder(id);

  if (!order) return null;

  return (
    <>
      <TopBar
        title="Hubungi Seller"
        onBack={() => router.push(`/buyer/pesanan/${id}`)}
      />

      <div className="flex-1 overflow-y-auto p-4">
        <Card className="mb-4">
          <h2 className="mb-1.5 text-lg font-extrabold">{order.seller}</h2>
          <p className="text-xs text-muted">
            Seller pesanan {order.title}
          </p>
        </Card>

        <div className="my-4 border-t border-border" />

        <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-muted">
          Pilih Cara Menghubungi
        </h3>

        <div className="flex flex-col gap-3">
          <div
            className="flex cursor-pointer items-center gap-3.5 rounded-2xl border border-border bg-white p-4 transition-colors hover:bg-soft"
            onClick={() => showToast("Simulasi telepon seller")}
          >
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-soft text-green-dark">
              <Phone size={20} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold">Telepon</h3>
              <p className="text-xs text-muted">
                Hubungi langsung via telepon
              </p>
            </div>
          </div>

          <div
            className="flex cursor-pointer items-center gap-3.5 rounded-2xl border border-border bg-white p-4 transition-colors hover:bg-soft"
            onClick={() => showToast("Chat aplikasi belum dibuat")}
          >
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-soft text-green-dark">
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold">Chat di Aplikasi</h3>
              <p className="text-xs text-muted">
                Kirim pesan teks ke seller
              </p>
            </div>
          </div>
        </div>

        <div className="my-4 border-t border-border" />

        <div className="rounded-[14px] border border-border bg-[#f1f5ed] p-3.5 text-xs leading-relaxed text-muted">
          Gunakan fitur ini hanya jika ada kendala. Status pesanan sudah
          otomatis diperbarui.
        </div>
      </div>
    </>
  );
}
