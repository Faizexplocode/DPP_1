"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrders } from "@/app/context/order-context";
import { getStatusLabel, getStatusVariant } from "@/app/lib/mock-data";
import TopBar from "@/app/components/layout/top-bar";
import { Card } from "@/app/components/ui/card";
import { StatusBadge } from "@/app/components/ui/badge";
import { SearchInput } from "@/app/components/ui/search-input";
import { TabSwitch } from "@/app/components/ui/tab-switch";

export default function BuyerPesanan() {
  const router = useRouter();
  const { getActiveOrders, getHistoryOrders } = useOrders();
  const [activeTab, setActiveTab] = useState("active");
  const [search, setSearch] = useState("");

  const activeOrders = getActiveOrders();
  const historyOrders = getHistoryOrders();

  const currentOrders = activeTab === "active" ? activeOrders : historyOrders;
  const filtered = currentOrders.filter((o) =>
    o.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <TopBar title="Pesanan Saya" onBack={() => router.push("/buyer")} />

      <div className="flex-1 overflow-y-auto p-4">
        <SearchInput
          placeholder="Cari pesanan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3.5"
        />

        <TabSwitch
          tabs={[
            { key: "active", label: "Aktif" },
            { key: "history", label: "Riwayat" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-muted">
          {activeTab === "active" ? "Pesanan Aktif" : "Riwayat"}
        </h3>

        <div className="flex flex-col gap-3">
          {filtered.map((order) => (
            <Link
              key={order.id}
              href={`/buyer/pesanan/${order.id}`}
              className="no-underline"
            >
              <Card onClick={() => {}} className="cursor-pointer">
                <div className="flex items-center justify-between gap-2.5">
                  <div>
                    <h3 className="mb-1 text-lg font-extrabold">
                      {order.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted">
                      {order.seller} &middot; {order.servings} {order.unit}
                    </p>
                    <p className="text-xs text-muted">
                      Antar jam {order.time} &middot; {order.date}
                    </p>
                  </div>
                  <StatusBadge variant={getStatusVariant(order.stage)}>
                    {getStatusLabel(order.stage)}
                  </StatusBadge>
                </div>
              </Card>
            </Link>
          ))}

          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-muted">
              Tidak ada pesanan ditemukan.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
