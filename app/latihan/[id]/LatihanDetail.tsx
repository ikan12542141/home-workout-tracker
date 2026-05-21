"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { getExercise } from "@/lib/exercises";
import VideoEmbed from "@/components/VideoEmbed";

export default function LatihanDetail({ id }: { id: string }) {
  const ex = getExercise(id);

  if (!ex) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/jadwal"
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          ← kembali
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2">
          {ex.nama}
        </h1>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {ex.kategori.map((k) => (
            <span
              key={k}
              className="text-xs px-2 py-0.5 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--muted)]"
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      <p className="text-[var(--muted)] leading-relaxed">{ex.deskripsi}</p>

      {ex.videoEmbedId && (
        <section>
          <h2 className="text-lg font-bold mb-2">🎥 Video Demo</h2>
          <VideoEmbed videoId={ex.videoEmbedId} title={ex.nama} />
        </section>
      )}

      <section>
        <h2 className="text-lg font-bold mb-2">📋 Cara Melakukan</h2>
        <ol className="space-y-2">
          {ex.langkah.map((l, i) => {
            const isHeader = /^[A-Z ]+:/.test(l);
            return (
              <li
                key={i}
                className={`flex gap-3 rounded-xl p-3 ${
                  isHeader
                    ? "bg-[var(--accent)]/10 border border-[var(--accent)]/30"
                    : "bg-[var(--card)] border border-[var(--border)]"
                }`}
              >
                <span className="font-mono text-sm text-[var(--accent)] shrink-0">
                  {i + 1}
                </span>
                <span className={`text-sm ${isHeader ? "font-semibold" : ""}`}>
                  {l}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      {ex.kesalahanUmum && ex.kesalahanUmum.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-2">⚠️ Kesalahan Umum</h2>
          <ul className="space-y-2">
            {ex.kesalahanUmum.map((k, i) => (
              <li
                key={i}
                className="flex gap-3 bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl p-3"
              >
                <span className="shrink-0">✕</span>
                <span className="text-sm">{k}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-lg font-bold mb-2">💡 Tips</h2>
        <ul className="space-y-2">
          {ex.tips.map((t, i) => (
            <li
              key={i}
              className="flex gap-3 bg-amber-500/10 border border-amber-500/30 text-amber-100 rounded-xl p-3"
            >
              <span className="shrink-0">→</span>
              <span className="text-sm">{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-2">🛠️ Alat</h2>
        <div className="flex flex-wrap gap-2">
          {ex.alat.map((a) => (
            <span
              key={a}
              className="text-xs px-3 py-1 rounded-full bg-[var(--card)] border border-[var(--border)]"
            >
              {a}
            </span>
          ))}
        </div>
      </section>

      {ex.videoUrl && (
        <a
          href={ex.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-[var(--accent)] text-black font-medium text-center px-4 py-3 rounded-full hover:bg-[var(--accent-hover)] transition-colors"
        >
          ▶ Tonton tutorial video (YouTube)
        </a>
      )}
    </div>
  );
}
