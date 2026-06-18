"use client";

import { useRouter } from "next/navigation";
import { LogOut, Edit } from "lucide-react";
import { buyerProfile } from "@/app/lib/mock-data";
import { HeroCard } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/toast";

export default function BuyerProfil() {
  const router = useRouter();
  const { showToast } = useToast();

  return (
    <>
      {/* Top Bar */}
      <div className="flex h-[60px] flex-shrink-0 items-center border-b border-border bg-surface px-4">
        <h1 className="text-[17px] font-extrabold text-foreground">Profil</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-5 pb-8">
        <HeroCard className="mb-4">
          <h2 className="text-[26px] font-extrabold">{buyerProfile.name}</h2>
          <p className="text-[13px] opacity-90">Buyer PawonSync</p>
        </HeroCard>

        <div className="rounded-[18px] border border-border bg-white">
          <div className="flex items-center justify-between border-b border-border px-3.5 py-3">
            <span className="text-xs text-muted">Email</span>
            <span className="text-sm font-bold">{buyerProfile.email}</span>
          </div>
          <div className="flex items-center justify-between border-b border-border px-3.5 py-3">
            <span className="text-xs text-muted">No. HP</span>
            <span className="text-sm font-bold">{buyerProfile.phone}</span>
          </div>
          <div className="flex items-center justify-between px-3.5 py-3">
            <span className="text-xs text-muted">Alamat</span>
            <span className="text-sm font-bold">{buyerProfile.address}</span>
          </div>
        </div>

        <Button
          variant="secondary"
          className="mt-4"
          onClick={() => showToast("Fitur edit profil belum dibuat")}
        >
          <Edit size={16} className="mr-2" />
          Edit Profil
        </Button>
        <Button
          variant="primary"
          className="mt-3"
          onClick={() => router.push("/")}
        >
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </div>
    </>
  );
}
