"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PROGRAM, dayKey, getPhase, isDeloadWeek } from "@/lib/program";
import { loadProgress, type Progress } from "@/lib/storage";

const HARI_SINGKAT = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

export default function JadwalContent() {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [activeWeek, setActiveWeek] = useState(1);
  const searchParams = useSearchParams();

  useEffect(() => {
    setProgress(loadProgress());
    const m = Number(searchParams.get("minggu"));
    if (m >= 1 && m <= 24) setActiveWeek(m);
  }, [searchParams]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Jadwal Latihan 24 Minggu
        </h1>
        <p className="text-[var(--muted)] mt-2 max-w-2xl">
          Program progresif 6 bulan untuk pemula. Tiap fase — 4 minggu, beban
          naik bertahap. Buka{" "}
          <Link href="/rencana" className="text-[var(--accent)] underline">
            Rencana
          </Link>{" "}
          untuk roadmap lengkap.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
        {PROGRAM.map((w) => {
          const phase = getPhase(w.minggu);
          return (
            <button
              key={w.minggu}
              type="button"
              onClick={() => setActiveWeek(w.minggu)}
              title={`Phase ${phase.phase}: ${phase.nama}`}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                activeWeek === w.minggu
                  ? "bg-[var(--accent)] text-black border-transparent"
                  : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)]"
              }`}
            >
              M{w.minggu}
            </button>
          );
        })}
      </div>

      {(() => {
        const phase = getPhase(activeWeek);
        return (
          <div className="text-xs text-[var(--muted)]">
            Phase {phase.phase}:{" "}
            <span className="text-[var(--accent)] font-semibold">
              {phase.nama}
            </span>{" "}
            (minggu {phase.weeks[0]}-{phase.weeks[1]}) — {phase.deskripsi}
          </div>
        );
      })()}

      {PROGRAM.filter((w) => w.minggu === activeWeek).map((week) => (
        <div key={week.minggu} className="space-y-4">
          <div className={`bg-[var(--card)] border rounded-2xl p-5 ${isDeloadWeek(week.minggu) ? "border-blue-500/40" : "border-[var(--border)]"}`}>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{week.judul}</h2>
              {isDeloadWeek(week.minggu) && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-medium">
                  Deload
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--muted)] mt-1">
              {week.deskripsi}
              {isDeloadWeek(week.minggu) && " Volume dikurangi 50% untuk recovery."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {week.hari.map((day, idx) => {
              const done = progress?.completedDays[dayKey(week.minggu, idx)];
              return (
                <Link
                  key={`${week.minggu}-${idx}`}
                  href={`/jadwal/${week.minggu}/${idx}`}
                  className="block bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 hover:border-[var(--accent)] transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[var(--muted)]">
                        {HARI_SINGKAT[idx]}
                      </span>
                      <span className="font-semibold">{day.hari}</span>
                    </div>
                    {done ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                        ✓
                      </span>
                    ) : day.isRest ? (
                      <span className="text-xs text-[var(--muted)]">rest</span>
                    ) : null}
                  </div>
                  <div className="font-medium text-sm">{day.fokus}</div>
                  <div className="text-xs text-[var(--muted)] mt-1">
                    {day.isRest
                      ? day.durasiTotal === "-"
                        ? "Istirahat total"
                        : day.durasiTotal
                      : `${day.durasiTotal} · ${day.latihan.length} latihan`}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
