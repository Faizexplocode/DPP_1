"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Package, ChefHat, User } from "lucide-react";
import { OrderProvider } from "@/app/context/order-context";
import { ToastProvider } from "@/app/components/ui/toast";

const navItems = [
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

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  function getActiveKey() {
    if (pathname === "/seller") return "home";
    if (pathname.startsWith("/seller/pesanan")) return "orders";
    if (pathname.startsWith("/seller/dapur")) return "kitchen";
    if (pathname.startsWith("/seller/profil")) return "profile";
    return "home";
  }

  const activeKey = getActiveKey();

  // Hide bottom nav on detail sub-pages
  const hideNav =
    pathname.includes("/update") ||
    pathname.includes("/pengemasan") ||
    (pathname.includes("/dapur/") && pathname.split("/").length > 3);

  return (
    <OrderProvider>
      <ToastProvider>
        <div className="screen">
          <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>

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
