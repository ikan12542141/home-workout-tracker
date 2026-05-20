"use client";

import { useEffect, useState } from "react";
import { PROGRAM, dayKey } from "@/lib/program";
import {
  loadProgress,
  resetProgress,
  type Progress,
} from "@/lib/storage";

const HARI_SINGKAT = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

export default function ProgresPage() {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const totalDone = progress
    ? Object.keys(progress.completedDays).length
    : 0;
  const totalDays = PROGRAM.length * 7;
  const pct = Math.round((totalDone / totalDays) * 100);

  const streakDays = countStreak(progress);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Progres Kamu
        </h1>
        <p className="text-[var(--muted)] mt-2">
          Setiap kotak hijau adalah hari kamu memilih untuk berubah.
        </p>
      </div>

      <section className="grid sm:grid-cols-3 gap-3">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
          <div className="text-[var(--muted)] text-xs uppercase tracking-wide">
            Total Selesai
          </div>
          <div className="text-3xl font-bold mt-1">
            {totalDone}
            <span className="text-base text-[var(--muted)]"> / {totalDays}</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--border)] mt-2 overflow-hidden">
            <div
              className="h-full bg-[var(--accent)]"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="text-xs text-[var(--muted)] mt-1">{pct}%</div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
          <div className="text-[var(--muted)] text-xs uppercase tracking-wide">
            Streak Beruntun
          </div>
          <div className="text-3xl font-bold mt-1">
            {streakDays}
            <span className="text-base text-[var(--muted)]"> hari</span>
          </div>
          <div className="text-xs text-[var(--muted)] mt-1">
            {streakDays >= 7
              ? "🔥 Mantap, terus!"
              : streakDays >= 3
                ? "Bagus, jaga momentum"
                : "Mulai bangun streak baru"}
          </div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
          <div className="text-[var(--muted)] text-xs uppercase tracking-wide">
            Set Diselesaikan
          </div>
          <div className="text-3xl font-bold mt-1">
            {progress
              ? Object.values(progress.completedSets).filter(Boolean).length
              : 0}
          </div>
          <div className="text-xs text-[var(--muted)] mt-1">total set tercatat</div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold">Heatmap 4 Minggu</h2>
        <div className="space-y-3">
          {PROGRAM.map((week) => (
            <div
              key={week.minggu}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-semibold text-sm">{week.judul}</div>
                  <div className="text-xs text-[var(--muted)]">
                    {
                      week.hari.filter(
                        (_, i) =>
                          progress?.completedDays[dayKey(week.minggu, i)],
                      ).length
                    }{" "}
                    / 7 selesai
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {week.hari.map((day, idx) => {
                  const isDone =
                    !!progress?.completedDays[dayKey(week.minggu, idx)];
                  return (
                    <div
                      key={idx}
                      className={`aspect-square rounded-md flex flex-col items-center justify-center text-xs ${
                        isDone
                          ? "bg-emerald-500 text-black"
                          : day.isRest
                            ? "bg-[var(--border)]/40 text-[var(--muted)]"
                            : "bg-[var(--border)] text-[var(--muted)]"
                      }`}
                      title={`${day.hari} — ${day.fokus}`}
                    >
                      <span className="text-[10px] font-mono opacity-70">
                        {HARI_SINGKAT[idx]}
                      </span>
                      {isDone && <span className="text-[10px]">✓</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5">
        <h2 className="font-bold mb-2">Reset Data</h2>
        <p className="text-sm text-[var(--muted)] mb-3">
          Hapus semua data progres yang tersimpan di browser ini. Tidak bisa
          dikembalikan.
        </p>
        {!confirmReset ? (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="text-sm px-4 py-2 rounded-full border border-[var(--border)] hover:border-red-500 hover:text-red-400 transition-colors"
          >
            Reset progres
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                const p = resetProgress();
                setProgress({ ...p });
                setConfirmReset(false);
              }}
              className="text-sm px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              Yakin, hapus semua
            </button>
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="text-sm px-4 py-2 rounded-full border border-[var(--border)]"
            >
              Batal
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function countStreak(progress: Progress | null): number {
  if (!progress) return 0;
  const dates = Object.values(progress.completedDays)
    .map((iso) => new Date(iso).toISOString().slice(0, 10))
    .sort();
  if (dates.length === 0) return 0;
  const unique = Array.from(new Set(dates)).sort();
  let streak = 1;
  for (let i = unique.length - 1; i > 0; i--) {
    const cur = new Date(unique[i]);
    const prev = new Date(unique[i - 1]);
    const diff = Math.round(
      (cur.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diff === 1) streak++;
    else break;
  }
  // Check streak still relevant (last entry within last 2 days)
  const lastDate = new Date(unique[unique.length - 1]);
  const today = new Date();
  const diffFromToday = Math.round(
    (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffFromToday > 1) return 0;
  return streak;
}
