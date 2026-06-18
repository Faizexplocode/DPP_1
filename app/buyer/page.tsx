"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useOrders } from "@/app/context/order-context";
import { getStatusLabel, getStatusVariant } from "@/app/lib/mock-data";
import { HeroCard } from "@/app/components/ui/card";
import { Card } from "@/app/components/ui/card";
import { StatusBadge } from "@/app/components/ui/badge";
import { ProgressBar } from "@/app/components/ui/progress-bar";
import { Button } from "@/app/components/ui/button";

export default function BuyerDashboard() {
  const { ordersState, getActiveOrders } = useOrders();
  const wisuda = ordersState["wisuda"];
  const activeOrders = getActiveOrders();

  const stageProgress: Record<string, number> = {
    waiting: 0,
    accepted: 25,
    cooking: 50,
    packing: 75,
    delivery: 90,
    done: 100,
  };

  return (
    <>
      {/* Top Bar */}
      <div className="flex h-[60px] flex-shrink-0 items-center justify-between border-b border-border bg-surface px-4">
        <h1 className="text-[17px] font-extrabold text-foreground">
          Halo, Bu Diana
        </h1>
        <Link
          href="/buyer/notifikasi"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-muted transition-colors hover:text-green-dark"
        >
          <Bell size={16} />
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Hero Card - Main Active Order */}
        {wisuda && (
          <HeroCard className="mb-4">
            <h2 className="mb-1.5 text-2xl font-extrabold">{wisuda.title}</h2>
            <p className="mb-2.5 text-[13px] opacity-90">
              {wisuda.servings} {wisuda.unit} &middot; {wisuda.date}
            </p>
            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/20 px-2.5 py-1.5 text-[10px] font-extrabold uppercase text-white">
              {getStatusLabel(wisuda.stage)}
            </span>

            <div className="mt-4">
              <ProgressBar
                value={stageProgress[wisuda.stage] ?? 50}
                className="[&>div]:bg-white [&]:bg-white/20"
              />
              <p className="mt-2 text-xs opacity-90">
                {wisuda.progressText}
              </p>
            </div>

            <Link href={`/buyer/pesanan/${wisuda.id}`}>
              <Button variant="dark" className="mt-4">
                Lihat Status Pesanan
              </Button>
            </Link>
          </HeroCard>
        )}

        {/* Divider */}
        <div className="my-4 border-t border-border" />

        {/* Orders Section */}
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-muted">
            Pesanan Saya
          </h2>
          <Link
            href="/buyer/pesanan"
            className="rounded-[10px] border border-border bg-white px-3 py-1.5 text-[11px] font-extrabold text-green-dark no-underline transition-colors hover:bg-soft"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {activeOrders.map((order) => (
            <Link
              key={order.id}
              href={`/buyer/pesanan/${order.id}`}
              className="no-underline"
            >
              <Card onClick={() => {}} className="cursor-pointer">
                <div className="flex items-center justify-between gap-2.5">
                  <div>
                    <h3 className="mb-1.5 text-lg font-extrabold">
                      {order.title}
                    </h3>
                    <p className="text-xs text-muted">{order.date}</p>
                  </div>
                  <StatusBadge variant={getStatusVariant(order.stage)}>
                    {getStatusLabel(order.stage)}
                  </StatusBadge>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
