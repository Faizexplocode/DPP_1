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
import { useToast } from "@/app/components/ui/toast";

export default function SellerPesanan() {
  const router = useRouter();
  const { getTodayOrders, getUpcomingOrders } = useOrders();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");

  const todayOrders = getTodayOrders();
  const upcomingOrders = getUpcomingOrders();

  const filterOrders = (list: typeof todayOrders) =>
    list.filter((o) => o.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <TopBar title="Pesanan Aktif" onBack={() => router.push("/seller")} />

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-8">
        <SearchInput
          placeholder="Cari pesanan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3"
        />

        {/* Today */}
        <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-muted">
          Hari Ini
        </h3>
        <div className="mb-4 flex flex-col gap-3">
          {filterOrders(todayOrders).map((order) => (
            <Link
              key={order.id}
              href={`/seller/pesanan/${order.id}`}
              className="no-underline"
            >
              <Card onClick={() => {}} className="cursor-pointer">
                <div className="flex items-center justify-between gap-2.5">
                  <div>
                    <h3 className="mb-1 text-lg font-extrabold">
                      {order.title}
                    </h3>
                    <p className="text-xs text-muted">
                      {order.customer} &middot; {order.servings} {order.unit}
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

        {/* Upcoming */}
        <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-muted">
          Mendatang
        </h3>
        <div className="flex flex-col gap-3">
          {filterOrders(upcomingOrders).map((order) => (
            <Card
              key={order.id}
              onClick={() =>
                showToast("Pesanan mendatang belum masuk workflow aktif")
              }
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2.5">
                <div>
                  <h3 className="mb-1 text-lg font-extrabold">
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
          ))}
        </div>
      </div>
    </>
  );
}
