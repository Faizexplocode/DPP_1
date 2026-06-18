"use client";

import Link from "next/link";
import { notifications } from "@/app/lib/mock-data";

export default function NotifikasiPage() {
  const today = notifications.filter((n) => !n.read || n.id === "n3");
  const yesterday = notifications.filter((n) => n.id === "n4");

  return (
    <>
      {/* Top Bar */}
      <div className="flex h-[60px] flex-shrink-0 items-center border-b border-border bg-surface px-4">
        <h1 className="text-[17px] font-extrabold text-foreground">
          Notifikasi
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-8">
        {/* Today */}
        <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-muted">
          Hari Ini
        </h3>
        <div className="mb-4 flex flex-col gap-3">
          {today.map((notif) => (
            <Link
              key={notif.id}
              href={
                notif.orderId
                  ? `/buyer/pesanan/${notif.orderId}`
                  : "#"
              }
              className="no-underline"
            >
              <div
                className={`cursor-pointer rounded-[18px] border border-border border-l-[5px] bg-white p-3.5 shadow-sm transition-all hover:shadow-md ${
                  notif.read
                    ? "border-l-[#cbd5c0] opacity-60"
                    : "border-l-green-dark"
                }`}
              >
                <h3 className="mb-1.5 text-lg font-extrabold">
                  {notif.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted">
                  {notif.description}
                </p>
                <p className="mt-1 text-xs text-muted">{notif.timestamp}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Yesterday */}
        <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-muted">
          Kemarin
        </h3>
        {yesterday.map((notif) => (
          <div
            key={notif.id}
            className="rounded-[18px] border border-border border-l-[5px] border-l-[#cbd5c0] bg-white p-3.5 opacity-60 shadow-sm"
          >
            <h3 className="mb-1.5 text-lg font-extrabold">{notif.title}</h3>
            <p className="text-xs text-muted">{notif.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
