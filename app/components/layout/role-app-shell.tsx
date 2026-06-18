"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChefHat,
  ClipboardList,
  Home,
  Package,
  User,
} from "lucide-react";
import type { ReactNode } from "react";

type Role = "buyer" | "seller";

interface NavItem {
  key: string;
  label: string;
  icon: ReactNode;
  href: string;
}

const buyerNavItems: NavItem[] = [
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

const sellerNavItems: NavItem[] = [
  { key: "home", label: "Beranda", icon: <Home size={18} />, href: "/seller" },
  {
    key: "orders",
    label: "Pesanan",
    icon: <Package size={18} />,
    href: "/seller/pesanan",
  },
  {
    key: "kitchen",
    label: "Dapur",
    icon: <ChefHat size={18} />,
    href: "/seller/dapur",
  },
  {
    key: "profile",
    label: "Profil",
    icon: <User size={18} />,
    href: "/seller/profil",
  },
];

function getBuyerActiveKey(pathname: string) {
  if (pathname === "/buyer") return "home";
  if (pathname.startsWith("/buyer/pesanan")) return "orders";
  if (pathname.startsWith("/buyer/notifikasi")) return "notifications";
  if (pathname.startsWith("/buyer/profil")) return "profile";
  return "home";
}

function getSellerActiveKey(pathname: string) {
  if (pathname === "/seller") return "home";
  if (pathname.startsWith("/seller/pesanan")) return "orders";
  if (pathname.startsWith("/seller/dapur")) return "kitchen";
  if (pathname.startsWith("/seller/profil")) return "profile";
  return "home";
}

function shouldHideBuyerNav(pathname: string) {
  return (
    pathname.includes("/foto-progres") ||
    pathname.includes("/hubungi-seller") ||
    pathname.includes("/ulasan")
  );
}

function shouldHideSellerNav(pathname: string) {
  return (
    pathname.includes("/update") ||
    pathname.includes("/pengemasan") ||
    (pathname.includes("/dapur/") && pathname.split("/").length > 3)
  );
}

export default function RoleAppShell({
  role,
  children,
}: {
  role: Role;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isBuyer = role === "buyer";
  const items = isBuyer ? buyerNavItems : sellerNavItems;
  const activeKey = isBuyer
    ? getBuyerActiveKey(pathname)
    : getSellerActiveKey(pathname);
  const hideNav = isBuyer
    ? shouldHideBuyerNav(pathname)
    : shouldHideSellerNav(pathname);

  return (
    <div className="screen">
      <div className="flex flex-1 flex-col overflow-hidden">{children}</div>

      {!hideNav && (
        <nav className="z-10 flex h-[76px] flex-shrink-0 items-center justify-around border-t border-border bg-surface px-1">
          {items.map((item) => {
            const isActive = activeKey === item.key;

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex h-full flex-1 flex-col items-center justify-center gap-1.5 text-[10px] font-extrabold uppercase no-underline transition-colors ${
                  isActive ? "text-green-dark" : "text-[#94a3a0]"
                }`}
              >
                <span className="flex h-[18px] items-center justify-center">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
