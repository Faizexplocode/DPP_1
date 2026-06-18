import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PawonSync - Ketenangan dari Dapur hingga Venue",
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
    <html lang="id">
      <body>
        {/* Desktop side branding */}
        <aside className="desktop-shell">
          <div className="mb-8">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-extrabold text-white shadow-xl shadow-green-dark/20"
              style={{
                background: "linear-gradient(135deg, #468432 0%, #9AD872 100%)",
                boxShadow: "0 12px 24px -6px rgba(70, 132, 50, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)"
              }}
            >
              PS
            </div>
          </div>
          
          <h1 className="mb-3 text-[42px] leading-tight font-extrabold tracking-tighter text-foreground">
            Pawon<span className="text-orange-main">Sync</span><br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-dark to-green-light">Platform</span>
          </h1>
          
          <p className="mb-16 text-[15px] leading-relaxed text-muted font-medium max-w-[90%]">
            Sistem manajemen pesanan katering terpadu. Pantau progress pesanan secara real-time dari dapur hingga tiba di lokasi acara Anda dengan ketenangan penuh.
          </p>
          
          <div className="flex flex-col gap-6 text-[13px] font-bold text-foreground">
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm transition-all hover:scale-[1.02] hover:bg-white/80">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-light/20 text-green-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              Pantau Pesanan Real-Time
            </div>
            
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm transition-all hover:scale-[1.02] hover:bg-white/80">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-main/15 text-orange-main">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="10" y2="10"/><line x1="12" x2="12" y1="10" y2="10"/><line x1="8" x2="8" y1="10" y2="10"/><line x1="16" x2="16" y1="14" y2="14"/><line x1="12" x2="12" y1="14" y2="14"/><line x1="8" x2="8" y1="14" y2="14"/><line x1="16" x2="16" y1="18" y2="18"/><line x1="12" x2="12" y1="18" y2="18"/><line x1="8" x2="8" y1="18" y2="18"/></svg>
              </div>
              Kalkulasi Bahan Otomatis
            </div>
            
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm transition-all hover:scale-[1.02] hover:bg-white/80">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f2937]/10 text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
              </div>
              Manajemen Dapur & Pengemasan
            </div>
          </div>
        </aside>

        {/* App container */}
        <div className="app-container">{children}</div>
      </body>
    </html>
  );
}
