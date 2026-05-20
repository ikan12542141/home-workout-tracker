import Link from "next/link";
import { PHASES, PROGRAM } from "@/lib/program";

export const metadata = {
  title: "Rencana 24 Minggu — Roadmap 6 Bulan",
};

export default function RencanaPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Roadmap 6 Bulan (24 Minggu)
        </h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Program ini dirancang dengan <strong>progressive overload</strong> —
          tiap fase, beban & teknik naik. Goal akhir di minggu 24: 30 push-up
          murni, 10 pull-up, plank 3 menit, dan handstand 60 detik.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">6 Fase Utama</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {PHASES.map((p) => (
            <div
              key={p.phase}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-2"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-bold">
                  Phase {p.phase}: {p.nama}
                </h3>
                <span className="text-xs text-[var(--muted)] font-mono">
                  Minggu {p.weeks[0]}-{p.weeks[1]}
                </span>
              </div>
              <p className="text-sm text-[var(--muted)]">{p.deskripsi}</p>
              <p className="text-sm">
                <span className="text-[var(--muted)]">Goal:</span>{" "}
                <strong className="text-[var(--accent)]">{p.goal}</strong>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Semua Minggu</h2>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {PROGRAM.map((w) => (
            <Link
              key={w.minggu}
              href={`/jadwal?minggu=${w.minggu}`}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 hover:border-[var(--accent)] transition group"
            >
              <p className="font-semibold group-hover:text-[var(--accent)]">
                {w.judul}
              </p>
              <p className="text-xs text-[var(--muted)] line-clamp-2">
                {w.deskripsi}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-3">
        <h2 className="text-xl font-semibold">Tips Sukses Long-Term</h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-[var(--foreground)]">
          <li>
            <strong>Konsistensi {">"} Intensitas</strong> — lebih baik 4×/minggu
            santai daripada 6×/minggu lalu burnout di minggu ke-3.
          </li>
          <li>
            <strong>Track terus</strong> — ukur lengan tiap 2 minggu di{" "}
            <Link href="/ukuran" className="text-[var(--accent)] underline">
              halaman Ukuran
            </Link>
            . Foto bulanan. Lihat angka naik = motivasi.
          </li>
          <li>
            <strong>Catat PR</strong> — kalau bisa push-up lebih banyak dari
            biasanya, langsung input di{" "}
            <Link href="/progres" className="text-[var(--accent)] underline">
              Progres
            </Link>
            .
          </li>
          <li>
            <strong>Tidur 7-9 jam</strong> — otot tumbuh saat tidur, BUKAN saat
            latihan.
          </li>
          <li>
            <strong>Protein 1.2-1.6g per kg berat badan</strong> — untuk 60kg,
            target 80-100g/hari. Lihat menu di{" "}
            <Link href="/nutrisi" className="text-[var(--accent)] underline">
              Nutrisi
            </Link>
            .
          </li>
          <li>
            <strong>Skip kalau sakit</strong> — flu, demam = istirahat total.
            Recovery {">"} forcing.
          </li>
        </ol>
      </section>
    </div>
  );
}
