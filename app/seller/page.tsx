"use client";

import Link from "next/link";
import { Bell, Plus, UserCircle } from "lucide-react";
import { useOrders } from "@/app/context/order-context";
import { getStatusLabel, getStatusVariant } from "@/app/lib/mock-data";
import { HeroCard, Card } from "@/app/components/ui/card";
import { StatusBadge } from "@/app/components/ui/badge";
import { useToast } from "@/app/components/ui/toast";

export default function SellerDashboard() {
  const { getActiveOrders } = useOrders();
  const { showToast } = useToast();
  const activeOrders = getActiveOrders();
  const shipToday = activeOrders.filter((o) => o.stage === "ready").length;

  return (
    <>
      {/* Top Bar */}
      <div className="flex h-[60px] flex-shrink-0 items-center justify-center border-b border-border bg-surface px-4 relative">
        <h1 className="text-[15px] font-extrabold uppercase tracking-wide text-foreground">
          Dashboard Seller
        </h1>
        <button
          className="absolute right-3.5 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-muted transition-colors hover:text-green-dark"
          onClick={() => showToast("Notifikasi seller")}
        >
          <Bell size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 pb-8">
        {/* Hero Card */}
        <HeroCard className="mb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90">Halo,</p>
              <h2 className="text-[28px] font-extrabold">Naomy</h2>
            </div>
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white/20">
              <UserCircle size={28} className="text-white" />
            </div>
          </div>
          <p className="mt-3 text-[13px] opacity-90">
            Pantau pesanan aktif dan kelola alur produksi hari ini.
          </p>
        </HeroCard>

        {/* Stats */}
        <div className="mb-5 flex gap-4">
          <div className="flex-1 rounded-[18px] border border-border bg-white p-4">
            <p className="mb-2 text-3xl font-extrabold leading-none text-green-dark">
              {activeOrders.length}
            </p>
            <p className="text-[11px] font-extrabold uppercase leading-tight text-muted">
              Pesanan Aktif
            </p>
          </div>
          <div className="flex-1 rounded-[18px] border border-border bg-white p-4">
            <p className="mb-2 text-3xl font-extrabold leading-none text-green-dark">
              {shipToday}
            </p>
            <p className="text-[11px] font-extrabold uppercase leading-tight text-muted">
              Kirim Hari Ini
            </p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-muted">
            Pesanan Terbaru
          </h2>
          <Link
            href="/seller/pesanan"
            className="rounded-[10px] border border-border bg-white px-3 py-1.5 text-[11px] font-extrabold text-green-dark no-underline transition-colors hover:bg-soft"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="mb-5 flex flex-col gap-4">
          {activeOrders.map((order) => (
            <Link
              key={order.id}
              href={`/seller/pesanan/${order.id}`}
              className="no-underline"
            >
              <Card onClick={() => {}} className="cursor-pointer">
                <div className="flex items-center justify-between gap-2.5">
                  <div>
                    <h3 className="mb-1.5 text-lg font-extrabold">
                      {order.title}
                    </h3>
                    <p className="text-xs text-muted">
                      {order.servings} {order.unit} &middot; {order.date}
                    </p>
                  </div>
                  <StatusBadge variant={getStatusVariant(order.stage)}>
                    {getStatusLabel(order.stage)}
                  </StatusBadge>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="my-4 border-t border-border" />

        {/* CTA */}
        <div
          className="flex h-[92px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[18px] border border-dashed border-green-dark/25 text-center transition-colors hover:bg-soft"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,160,46,.15), rgba(255,239,145,.4))",
          }}
          onClick={() => showToast("Fitur buat pesanan baru belum dibuat")}
        >
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-green-dark text-white">
            <Plus size={20} />
          </div>
          <span className="text-sm font-bold">Buat Pesanan Baru</span>
        </div>
      </div>
    </>
  );
}
