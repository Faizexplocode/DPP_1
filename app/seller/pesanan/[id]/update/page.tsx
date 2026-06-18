"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Check } from "lucide-react";
import { useOrders } from "@/app/context/order-context";
import { getStatusLabel } from "@/app/lib/mock-data";
import TopBar from "@/app/components/layout/top-bar";
import { Button } from "@/app/components/ui/button";
import { Modal } from "@/app/components/ui/modal";
import { useToast } from "@/app/components/ui/toast";
import type { OrderStage } from "@/app/types";

export default function UpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getOrder, updateOrderStage } = useOrders();
  const { showToast } = useToast();
  const order = getOrder(id);

  const [showSuccess, setShowSuccess] = useState(false);

  if (!order) return null;

  // Determine available update options based on current stage
  let options: { key: OrderStage; label: string }[] = [];
  let defaultSelected: OrderStage = "packing";

  if (order.stage === "cooking") {
    options = [
      { key: "cooking", label: "Bahan siap dimasak" },
      { key: "packing", label: "Sedang dikemas" },
    ];
    defaultSelected = "packing";
  } else if (order.stage === "packing") {
    options = [
      { key: "packing", label: "Sedang dikemas" },
      { key: "ready", label: "Siap berangkat" },
    ];
    defaultSelected = "ready";
  } else {
    options = [{ key: order.stage as OrderStage, label: getStatusLabel(order.stage) }];
    defaultSelected = order.stage as OrderStage;
  }

  const [selected, setSelected] = useState<OrderStage>(defaultSelected);

  function handleSubmit() {
    updateOrderStage(id, selected);
    setShowSuccess(true);
  }

  return (
    <>
      <TopBar
        title="Kirim Update"
        onBack={() => router.push(`/seller/pesanan/${id}`)}
      />

      <div className="flex-1 overflow-y-auto p-5 pb-8">
        {/* Info Note */}
        <div className="mb-4 rounded-[14px] border border-border bg-[#f1f5ed] p-3.5 text-xs leading-relaxed text-muted">
          Update ini akan dikirim otomatis ke pembeli sebagai notifikasi
          progress pesanan.
        </div>

        <div className="my-4 border-t border-border" />

        {/* Status Options */}
        <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-muted">
          Pilih Status Saat Ini
        </h3>
        <div className="mb-4 flex flex-col gap-3">
          {options.map((option) => (
            <div
              key={option.key}
              className={`flex cursor-pointer items-center gap-2.5 rounded-[14px] border-[1.5px] bg-white p-3.5 transition-all ${
                selected === option.key
                  ? "border-green-dark bg-soft"
                  : "border-border"
              }`}
              onClick={() => setSelected(option.key)}
            >
              <span
                className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border-2 ${
                  selected === option.key
                    ? "border-green-dark"
                    : "border-[#bec8b6]"
                }`}
              >
                {selected === option.key && (
                  <span className="block h-2 w-2 rounded-full bg-green-dark" />
                )}
              </span>
              <span className="text-sm font-extrabold uppercase">
                {option.label}
              </span>
            </div>
          ))}
        </div>

        {/* Photo Upload */}
        <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-muted">
          Foto Bukti Opsional
        </h3>
        <div
          className="flex h-[120px] cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-[#d3dccb] bg-[#fafcf8] text-center text-xs font-bold text-muted"
          onClick={() => showToast("Simulasi upload foto")}
        >
          <div>
            <Camera size={24} className="mx-auto mb-1.5 text-muted" />
            <span>Tambah Foto</span>
          </div>
        </div>

        <Button variant="primary" className="mt-4" onClick={handleSubmit}>
          Kirim Update ke Buyer
        </Button>
      </div>

      <Modal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        icon={<Check size={34} />}
        title="Update Terkirim!"
        description="Pembeli sudah menerima notifikasi progress pesanan."
        primaryText="Kembali ke Detail Pesanan"
        primaryAction={() => router.push(`/seller/pesanan/${id}`)}
      />
    </>
  );
}
