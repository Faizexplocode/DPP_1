"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useOrders } from "@/app/context/order-context";
import { standardIngredients, plateComponents } from "@/app/lib/mock-data";
import TopBar from "@/app/components/layout/top-bar";
import { Button } from "@/app/components/ui/button";

export default function DummyPlatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getOrder } = useOrders();
  const order = getOrder(id);

  if (!order) return null;

  return (
    <>
      <TopBar
        title="Dummy Plate"
        onBack={() => router.push("/seller/dapur")}
      />

      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="mt-2 text-center text-lg font-extrabold">
          {order.title.toUpperCase()} &middot; {order.servings} PORSI
        </h3>

        {/* Plate Visualization */}
        <div className="relative mx-auto my-4 flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-2 border-foreground bg-white">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2 bg-foreground" />
          {/* Horizontal line (right half) */}
          <div className="absolute top-1/2 right-0 left-1/2 h-[2px] -translate-y-1/2 bg-foreground" />

          {/* Labels */}
          <span className="absolute top-5 left-1/2 -translate-x-1/2 text-xs font-extrabold">
            NASI
          </span>
          <span className="absolute bottom-6 left-[26px] text-xs font-extrabold">
            AYAM
          </span>
          <span className="absolute bottom-6 right-[22px] text-xs font-extrabold">
            SAYUR
          </span>
        </div>

        {/* Chips */}
        <div className="mb-4 flex justify-center gap-2">
          {plateComponents.map((comp) => (
            <span
              key={comp}
              className="rounded-[10px] border border-border bg-white px-2.5 py-1.5 text-[11px] font-extrabold"
            >
              {comp}
            </span>
          ))}
        </div>

        <div className="my-4 border-t border-border" />

        {/* Standard Per Serving */}
        <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-muted">
          Standar 1 Porsi
        </h3>
        <div className="rounded-[18px] border border-border bg-white">
          {standardIngredients.map((ing, idx) => (
            <div
              key={ing.name}
              className={`flex items-center justify-between px-3.5 py-3 text-sm ${
                idx < standardIngredients.length - 1
                  ? "border-b border-[#e6eadf]"
                  : ""
              }`}
            >
              <span>{ing.name === "Beras" ? "Nasi" : ing.name === "Ayam" ? "Ayam goreng" : ing.name}</span>
              <span className="font-bold">
                {ing.name === "Telur"
                  ? `${ing.perServing} ${ing.unit}`
                  : ing.name === "Ayam"
                  ? `1 potong (${ing.perServing}g)`
                  : `${ing.perServing} ${ing.unit}`}
              </span>
            </div>
          ))}
        </div>

        <Link href={`/seller/dapur/${id}/bahan`}>
          <Button variant="primary" className="mt-5">
            Lihat Total Bahan
          </Button>
        </Link>
      </div>
    </>
  );
}
