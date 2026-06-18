"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  ClipboardList,
  Bell,
  User,
} from "lucide-react";
import { OrderProvider } from "@/app/context/order-context";
import { ToastProvider } from "@/app/components/ui/toast";

const navItems = [
  { key: "home", label: "Beranda", icon: <Home size={18} />, href: "/buyer" },
  {
    key: "orders",
    label: "Pesanan",
    icon: <ClipboardList size={18} />,
    href: "/buyer/pesanan",
  },
  {
    key: "notifications",
    label: "Notifikasi",
    icon: <Bell size={18} />,
    href: "/buyer/notifikasi",
  },
  {
    key: "profile",
    label: "Profil",
    icon: <User size={18} />,
    href: "/buyer/profil",
  },
];

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  function getActiveKey() {
    if (pathname === "/buyer") return "home";
    if (pathname.startsWith("/buyer/pesanan")) return "orders";
    if (pathname.startsWith("/buyer/notifikasi")) return "notifications";
    if (pathname.startsWith("/buyer/profil")) return "profile";
    return "home";
  }

  const activeKey = getActiveKey();

  // Hide bottom nav on detail sub-pages (foto-progres, hubungi-seller, ulasan)
  const hideNav =
    pathname.includes("/foto-progres") ||
    pathname.includes("/hubungi-seller") ||
    pathname.includes("/ulasan");

  return (
    <OrderProvider>
      <ToastProvider>
        <div className="screen">
          <div className="flex flex-1 flex-col overflow-hidden">{children}</div>

          {!hideNav && (
            <nav className="flex-shrink-0 flex h-[76px] items-center justify-around border-t border-border bg-surface z-10">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`flex h-full flex-1 flex-col items-center justify-center gap-1.5 text-[10px] font-extrabold uppercase no-underline transition-colors ${
                    activeKey === item.key
                      ? "text-green-dark"
                      : "text-[#94a3a0]"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          )}
        </div>
      </ToastProvider>
    </OrderProvider>
  );
}
