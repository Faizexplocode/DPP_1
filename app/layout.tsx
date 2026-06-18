import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PawonSync — Ketenangan dari Dapur hingga Venue",
  description:
    "Aplikasi manajemen pesanan katering yang menghubungkan seller dan buyer. Pantau progress pesanan secara real-time dari dapur hingga lokasi acara.",
  keywords: ["katering", "pesanan", "catering", "PawonSync", "manajemen"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <body>
        {/* Desktop side branding */}
        <aside className="desktop-shell">
          <div className="mb-6">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-extrabold text-white"
              style={{
                background: "linear-gradient(145deg, #468432, #9AD872)",
              }}
            >
              PS
            </div>
          </div>
          <h1 className="mb-1 text-3xl font-extrabold tracking-tight text-green-dark">
            Pawon<span className="text-orange-main">Sync</span>
          </h1>
          <p className="mb-6 text-sm leading-relaxed text-muted">
            Ketenangan dari Dapur hingga Venue
          </p>
          <div className="flex flex-col gap-3 text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-soft text-green-dark">
                ✓
              </span>
              Pantau pesanan real-time
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-soft text-green-dark">
                ✓
              </span>
              Kalkulasi bahan otomatis
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-soft text-green-dark">
                ✓
              </span>
              Manajemen pengemasan
            </div>
          </div>
        </aside>

        {/* App container */}
        <div className="app-container">{children}</div>
      </body>
    </html>
  );
}
