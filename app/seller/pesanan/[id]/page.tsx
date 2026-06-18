"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useOrders } from "@/app/context/order-context";
import { getStatusLabel, sellerTimelineStages } from "@/app/lib/mock-data";
import TopBar from "@/app/components/layout/top-bar";
import { Card } from "@/app/components/ui/card";
import { Timeline } from "@/app/components/ui/timeline";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/toast";
import { Rocket } from "lucide-react";
import { Modal } from "@/app/components/ui/modal";
import { useState } from "react";

const stageIndexMap: Record<string, number> = {
  accepted: 0,
  cooking: 1,
  packing: 2,
  ready: 3,
};

export default function SellerOrderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getOrder } = useOrders();
  const { showToast } = useToast();
  const order = getOrder(id);
  const [showDeparture, setShowDeparture] = useState(false);

  if (!order) {
    return (
      <>
        <TopBar
          title="Detail Pesanan"
          onBack={() => router.push("/seller/pesanan")}
        />
        <div className="flex flex-1 items-center justify-center p-4">
          <p className="text-sm text-muted">Pesanan tidak ditemukan.</p>
        </div>
      </>
    );
  }

  const activeIndex = stageIndexMap[order.stage] ?? -1;

  const timelineData = sellerTimelineStages.map((stage, index) => {
    let status: "completed" | "active" | "pending" = "pending";
    if (index < activeIndex) status = "completed";
    if (index === activeIndex) status = "active";

    return {
      label: stage.label,
      status,
      subtitle:
        index === activeIndex
          ? "(Aktif)"
          : index < activeIndex
          ? "Selesai"
          : "Menunggu",
    };
  });

  return (
    <>
      <TopBar
        title="Detail Pesanan"
        onBack={() => router.push("/seller/pesanan")}
      />

      <div className="flex-1 overflow-y-auto p-4">
        {/* Header */}
        <Card>
          <h2 className="mb-1.5 text-[22px] font-extrabold">
            {order.title} — {order.customer}
          </h2>
          <p className="text-xs text-muted">
            {order.servings} {order.unit}
          </p>
          <p className="text-xs text-muted">
            {order.location}, {order.date}, jam {order.time}
          </p>
        </Card>

        <div className="my-4 border-t border-border" />

        {/* Timeline */}
        <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-muted">
          Update Progress
        </h3>
        <Timeline stages={timelineData} />

        <div className="my-4 border-t border-border" />

        {/* Action Buttons */}
        {order.stage === "cooking" && (
          <>
            <Link href={`/seller/pesanan/${order.id}/update`}>
              <Button variant="primary">Kirim Update Sekarang</Button>
            </Link>
            <Link href={`/seller/dapur/${order.id}`}>
              <Button variant="secondary" className="mt-3">
                Lihat Panduan Dapur
              </Button>
            </Link>
          </>
        )}

        {order.stage === "packing" && (
          <>
            <Link href={`/seller/pesanan/${order.id}/pengemasan`}>
              <Button variant="primary">Buka Checklist Pengemasan</Button>
            </Link>
            <Link href={`/seller/pesanan/${order.id}/update`}>
              <Button variant="secondary" className="mt-3">
                Kirim Update Sekarang
              </Button>
            </Link>
          </>
        )}

        {order.stage === "ready" && (
          <>
            <Button
              variant="primary"
              onClick={() => setShowDeparture(true)}
            >
              Buka Departure Gate
            </Button>
            <p className="mt-2 text-center text-[11px] text-muted">
              Kurir belum boleh berangkat sebelum mengisi form ini
            </p>
          </>
        )}

        {order.stage !== "cooking" &&
          order.stage !== "packing" &&
          order.stage !== "ready" && (
            <Button
              variant="secondary"
              onClick={() => router.push("/seller/pesanan")}
            >
              Kembali ke Daftar Pesanan
            </Button>
          )}
      </div>

      <Modal
        isOpen={showDeparture}
        onClose={() => setShowDeparture(false)}
        icon={<Rocket size={34} />}
        title="Kurir Berangkat!"
        description="Pembeli mendapat notifikasi ETA dan live location pengiriman."
        primaryText="Pantau Pengiriman"
        primaryAction={() => {
          showToast("Tracking pengiriman belum dibuat");
          setShowDeparture(false);
        }}
        secondaryText="Kembali ke Beranda"
        secondaryAction={() => router.push("/seller")}
      />
    </>
  );
}
