"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Camera, MapPin, CircleCheck, MessageSquare } from "lucide-react";
import { useOrders } from "@/app/context/order-context";
import { getStatusLabel, buyerTimelineStages } from "@/app/lib/mock-data";
import TopBar from "@/app/components/layout/top-bar";
import { Card } from "@/app/components/ui/card";
import { Timeline } from "@/app/components/ui/timeline";
import { Button } from "@/app/components/ui/button";

const stageIndexMap: Record<string, number> = {
  waiting: -1,
  cooking: 1,
  packing: 2,
  delivery: 3,
  done: 4,
};

export default function BuyerOrderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getOrder } = useOrders();
  const order = getOrder(id);

  if (!order) {
    return (
      <>
        <TopBar title="Detail Pesanan" onBack={() => router.push("/buyer/pesanan")} />
        <div className="flex flex-1 items-center justify-center p-4">
          <p className="text-sm text-muted">Pesanan tidak ditemukan.</p>
        </div>
      </>
    );
  }

  const activeIndex = stageIndexMap[order.stage] ?? -1;

  const timelineData = buyerTimelineStages.map((stage, index) => {
    let status: "completed" | "active" | "pending" = "pending";
    if (index <= activeIndex && activeIndex >= 0) status = "completed";
    if (index === activeIndex && order.stage !== "done") status = "active";

    let subtitle = "";
    if (index === activeIndex && order.stage !== "done")
      subtitle = "(sedang berlangsung)";
    if (order.stage === "done" && index === 4) subtitle = "(pesanan selesai)";

    return {
      label: stage.label,
      time: stage.time,
      status,
      subtitle,
    };
  });

  return (
    <>
      <TopBar
        title="Detail Pesanan"
        onBack={() => router.push("/buyer/pesanan")}
      />

      <div className="flex-1 overflow-y-auto p-5 pb-8">
        {/* Order Info */}
        <Card>
          <h2 className="mb-1.5 text-lg font-extrabold">
            {order.title} — {order.seller}
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
          Status Pesanan
        </h3>
        <Timeline stages={timelineData} />

        {/* Photo/Action Box */}
        {(order.stage === "cooking" || order.stage === "packing") && (
          <Link
            href={`/buyer/pesanan/${order.id}/foto-progres`}
            className="no-underline"
          >
            <div className="my-4 flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-dashed border-green-dark/30 bg-soft/50 p-3.5 transition-colors hover:bg-soft">
              <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] border border-border bg-white">
                <Camera size={20} className="text-green-dark" />
              </div>
              <div>
                <p className="text-sm font-bold">
                  Foto dikirim seller — tap untuk lihat
                </p>
                <p className="text-xs text-muted">
                  Update kualitas dari dapur seller
                </p>
              </div>
            </div>
          </Link>
        )}

        {order.stage === "delivery" && (
          <div className="my-4 flex items-center gap-3 rounded-2xl border-2 border-dashed border-green-dark/30 bg-soft/50 p-3.5">
            <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] border border-border bg-white">
              <MapPin size={20} className="text-green-dark" />
            </div>
            <div>
              <p className="text-sm font-bold">Pengiriman Live</p>
              <p className="text-xs text-muted">
                Pantau lokasi kurir secara real-time
              </p>
            </div>
          </div>
        )}

        {order.stage === "done" && (
          <Link
            href={`/buyer/pesanan/${order.id}/ulasan`}
            className="no-underline"
          >
            <div className="my-4 flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-dashed border-green-dark/30 bg-soft/50 p-3.5 transition-colors hover:bg-soft">
              <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] border border-border bg-white">
                <CircleCheck size={20} className="text-green-dark" />
              </div>
              <div>
                <p className="text-sm font-bold">Pesanan sudah selesai</p>
                <p className="text-xs text-muted">
                  Konfirmasi pesanan tiba dan beri ulasan
                </p>
              </div>
            </div>
          </Link>
        )}

        <div className="my-4 border-t border-border" />

        {/* ETA */}
        <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-muted">
          Estimasi Kedatangan
        </h3>
        <div className="rounded-[18px] border border-border bg-white p-4 text-center">
          {order.stage === "done" ? (
            <>
              <p className="my-2 text-3xl font-extrabold leading-tight">
                SAMPAI PADA
                <br />
                11:00 WIB
              </p>
              <p className="text-xs text-muted">
                Pesanan telah sampai ke lokasi tujuan
              </p>
            </>
          ) : order.stage === "waiting" ? (
            <>
              <p className="my-2 text-[28px] font-extrabold">MENUNGGU</p>
              <p className="text-xs text-muted">
                Estimasi tampil setelah seller mengonfirmasi pesanan
              </p>
            </>
          ) : (
            <>
              <p className="my-2 text-4xl font-extrabold">{order.eta}</p>
              <p className="text-xs text-muted">
                Estimasi tiba berdasarkan lokasi seller
                <br />
                Belum berangkat
              </p>
            </>
          )}
        </div>

        {/* Contact Seller */}
        <Link href={`/buyer/pesanan/${order.id}/hubungi-seller`}>
          <Button variant="secondary" className="mt-3.5">
            <MessageSquare size={16} className="mr-2" />
            Hubungi Seller
          </Button>
        </Link>
      </div>
    </>
  );
}
