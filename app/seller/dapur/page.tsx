"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useOrders } from "@/app/context/order-context";
import { Card } from "@/app/components/ui/card";

export default function DapurPage() {
  const { getActiveOrders } = useOrders();
  const activeOrders = getActiveOrders();

  return (
    <>
      {/* Top Bar */}
      <div className="flex h-[60px] flex-shrink-0 items-center border-b border-border bg-surface px-4">
        <h1 className="text-[17px] font-extrabold text-foreground">Dapur</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-8">
        {/* Active Order Stats */}
        <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-muted">
          Pesanan Aktif Hari Ini
        </h3>
        <div className="mb-4 flex gap-3">
          {activeOrders.map((order) => (
            <div
              key={order.id}
              className="flex-1 rounded-[18px] border border-border bg-white p-4"
              style={{ minHeight: 80 }}
            >
              <p className="mb-1.5 text-xs font-extrabold uppercase text-muted">
                {order.title}
              </p>
              <p className="text-[28px] font-extrabold leading-none text-green-dark">
                {order.servings}
              </p>
              <p className="mt-1 text-[11px] font-extrabold uppercase text-muted">
                {order.unit}
              </p>
            </div>
          ))}
        </div>

        {/* Order Selection */}
        <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-muted">
          Pilih Pesanan untuk Panduan Dapur
        </h3>
        <div className="flex flex-col gap-3">
          {activeOrders.map((order) => (
            <Link
              key={order.id}
              href={`/seller/dapur/${order.id}`}
              className="no-underline"
            >
              <Card onClick={() => {}} className="cursor-pointer">
                <div className="flex items-center justify-between gap-2.5">
                  <div>
                    <h3 className="mb-1 text-lg font-extrabold">
                      {order.title}
                    </h3>
                    <p className="text-xs text-muted">
                      {order.servings} {order.unit}
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-green-dark" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Note */}
        <div className="mt-4 rounded-[14px] border border-border bg-[#f1f5ed] p-3.5 text-xs leading-relaxed text-muted">
          Pilih pesanan untuk melihat Dummy Plate dan kalkulasi bahan otomatis.
        </div>
      </div>
    </>
  );
}
