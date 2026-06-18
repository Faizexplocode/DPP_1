// ============================================================
// PawonSync - Mock Data (to be replaced with Supabase later)
// ============================================================

import type { Order, Notification, UserProfile, Ingredient, TimelineStage } from "@/app/types";

// ── Orders ──────────────────────────────────────────────────

export const orders: Record<string, Order> = {
  wisuda: {
    id: "wisuda",
    title: "Wisuda ITS",
    customer: "Bu Diana",
    seller: "Pawon Lestari",
    servings: 150,
    unit: "porsi nasi kotak",
    date: "12 Jun 2026",
    time: "11.00",
    location: "Graha ITS",
    stage: "cooking",
    eta: "11:00 WIB",
    progressText: "2 dari 4 tahap selesai",
    packaged: 90,
    target: 150,
    today: true,
  },
  arisan: {
    id: "arisan",
    title: "Arisan RT 05",
    customer: "Ibu Santi",
    seller: "Pawon Lestari",
    servings: 50,
    unit: "porsi",
    date: "15 Jun 2026",
    time: "16.00",
    location: "Balai RT 05",
    stage: "waiting",
    eta: "-",
    progressText: "Menunggu konfirmasi",
    packaged: 0,
    target: 50,
    today: false,
  },
  seminar: {
    id: "seminar",
    title: "Seminar FEB",
    customer: "Pak Reza",
    seller: "Pawon Lestari",
    servings: 80,
    unit: "porsi",
    date: "1 Jun 2026",
    time: "10.00",
    location: "Graha FEB",
    stage: "done",
    eta: "Selesai",
    progressText: "Selesai",
    packaged: 80,
    target: 80,
    today: true,
  },
};

// ── Notifications ───────────────────────────────────────────

export const notifications: Notification[] = [
  {
    id: "n1",
    title: "Pesanan Wisuda ITS diperbarui",
    description: "Seller mengonfirmasi: Bahan siap dimasak",
    timestamp: "10:15 WIB",
    read: false,
    orderId: "wisuda",
    type: "update",
  },
  {
    id: "n2",
    title: "Foto progres baru tersedia",
    description: "Seller mengirim foto tahap pengemasan",
    timestamp: "11:00 WIB",
    read: false,
    orderId: "wisuda",
    type: "photo",
  },
  {
    id: "n3",
    title: "Pesanan Wisuda ITS dikonfirmasi",
    description: "Pawon Lestari menerima pesananmu",
    timestamp: "08:00 WIB",
    read: true,
    orderId: "wisuda",
    type: "confirmed",
  },
  {
    id: "n4",
    title: "Pesanan Arisan RT 05 dibuat",
    description: "14 Jun 2026",
    timestamp: "15:30 WIB",
    read: true,
    orderId: "arisan",
    type: "created",
  },
];

// ── User Profiles ───────────────────────────────────────────

export const buyerProfile: UserProfile = {
  name: "Bu Diana",
  role: "buyer",
  email: "diana@email.com",
  phone: "0812-0000-0000",
  address: "Surabaya",
};

export const sellerProfile: UserProfile = {
  name: "Naomy",
  role: "seller",
  email: "seller@pawonsync.com",
  phone: "0812-3456-7890",
  address: "Surabaya",
  businessName: "Pawon Lestari",
};

// ── Timeline Stages ─────────────────────────────────────────

export const buyerTimelineStages: TimelineStage[] = [
  { key: "accepted", label: "Pesanan Diterima", time: "08.00" },
  { key: "cooking", label: "Bahan Siap Dimasak", time: "09.30" },
  { key: "packing", label: "Dikemas", time: "10.15" },
  { key: "delivery", label: "Diantar", time: "10.30" },
  { key: "done", label: "Selesai", time: "11.00" },
];

export const sellerTimelineStages: TimelineStage[] = [
  { key: "accepted", label: "Pesanan diterima" },
  { key: "cooking", label: "Bahan siap dimasak" },
  { key: "packing", label: "Sedang dikemas" },
  { key: "ready", label: "Siap berangkat" },
];

// ── Kitchen / Ingredients ───────────────────────────────────

export const standardIngredients: Ingredient[] = [
  { name: "Beras", perServing: 200, unit: "g" },
  { name: "Ayam", perServing: 100, unit: "g" },
  { name: "Sayur", perServing: 80, unit: "g" },
  { name: "Telur", perServing: 1, unit: "butir" },
];

export const plateComponents = ["NASI", "AYAM", "SAYUR"];

// ── Helpers ─────────────────────────────────────────────────

export function getStatusLabel(stage: string): string {
  const map: Record<string, string> = {
    waiting: "Menunggu Konfirmasi",
    accepted: "Diterima",
    cooking: "Sedang Dimasak",
    packing: "Sedang Dikemas",
    delivery: "Diantar",
    ready: "Siap Kirim",
    done: "Selesai",
    upcoming: "Mendatang",
  };
  return map[stage] ?? "Aktif";
}

export function getStatusVariant(stage: string): "processing" | "packing" | "ready" | "waiting" | "done" {
  const map: Record<string, "processing" | "packing" | "ready" | "waiting" | "done"> = {
    waiting: "waiting",
    cooking: "processing",
    packing: "packing",
    delivery: "packing",
    ready: "ready",
    done: "done",
    upcoming: "waiting",
  };
  return map[stage] ?? "processing";
}
