import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home Workout Tracker — Bentuk Tubuh di Rumah 6 Bulan",
  description:
    "Program olahraga 24 minggu untuk pemula. Fokus lengan, bisep, dan perut. Bisa dilakukan di rumah dengan alat seadanya atau alat DIY murah.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

const NAV_ITEMS = [
  { href: "/", label: "Beranda" },
  { href: "/jadwal", label: "Jadwal" },
  { href: "/rencana", label: "Rencana" },
  { href: "/progres", label: "Progres" },
  { href: "/ukuran", label: "Ukuran" },
  { href: "/jurnal", label: "Jurnal" },
  { href: "/alat", label: "Alat" },
  { href: "/nutrisi", label: "Nutrisi" },
  { href: "/backup", label: "Backup" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <header className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur sticky top-0 z-40">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold tracking-tight text-base sm:text-lg"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)] text-black font-bold">
                HW
              </span>
              <span className="hidden xs:inline">Home Workout</span>
              <span className="text-[var(--muted)] hidden sm:inline">
                · Tracker
              </span>
            </Link>
            <nav className="flex items-center gap-1 overflow-x-auto -mx-2 px-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-2.5 sm:px-3 py-1.5 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1 w-full">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-10">
            {children}
          </div>
        </main>
        <footer className="border-t border-[var(--border)] mt-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 text-xs text-[var(--muted)] flex flex-col sm:flex-row sm:justify-between gap-2">
            <span>
              Home Workout Tracker — Dirancang untuk pemula yang ingin
              berubah.
            </span>
            <span>Data progres tersimpan di browser kamu.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
