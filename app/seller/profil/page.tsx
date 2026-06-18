"use client";

import { useRouter } from "next/navigation";
import { LogOut, Edit, UserCircle } from "lucide-react";
import { sellerProfile } from "@/app/lib/mock-data";
import { HeroCard } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/toast";

export default function SellerProfil() {
  const router = useRouter();
  const { showToast } = useToast();

  return (
    <>
      {/* Top Bar */}
      <div className="flex h-[60px] flex-shrink-0 items-center justify-center border-b border-border bg-surface px-4">
        <h1 className="text-[15px] font-extrabold uppercase tracking-wide text-foreground">
          Profil Seller
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <HeroCard className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90">Seller</p>
              <h2 className="text-[26px] font-extrabold">
                {sellerProfile.businessName}
              </h2>
            </div>
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-white/20">
              <UserCircle size={28} className="text-white" />
            </div>
          </div>
        </HeroCard>

        <div className="rounded-[18px] border border-border bg-white">
          <div className="flex items-center justify-between border-b border-[#e6eadf] px-3.5 py-3 text-sm">
            <span className="text-muted">Nama Pemilik</span>
            <span className="font-bold">{sellerProfile.name}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#e6eadf] px-3.5 py-3 text-sm">
            <span className="text-muted">Email</span>
            <span className="font-bold">{sellerProfile.email}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#e6eadf] px-3.5 py-3 text-sm">
            <span className="text-muted">No. HP</span>
            <span className="font-bold">{sellerProfile.phone}</span>
          </div>
          <div className="flex items-center justify-between px-3.5 py-3 text-sm">
            <span className="text-muted">Alamat Dapur</span>
            <span className="font-bold">{sellerProfile.address}</span>
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
