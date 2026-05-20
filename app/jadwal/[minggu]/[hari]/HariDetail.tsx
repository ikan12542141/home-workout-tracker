"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { PROGRAM, dayKey } from "@/lib/program";
import { getExercise } from "@/lib/exercises";
import {
  loadProgress,
  toggleDayComplete,
  toggleSetComplete,
  type Progress,
} from "@/lib/storage";

export default function HariDetail({
  minggu,
  hari,
}: {
  minggu: string;
  hari: string;
}) {
  const mingguN = Number(minggu);
  const hariN = Number(hari);
  const router = useRouter();

  const week = PROGRAM.find((w) => w.minggu === mingguN);
  const day = week?.hari[hariN];

  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  if (!week || !day || Number.isNaN(mingguN) || Number.isNaN(hariN)) {
    notFound();
  }

  const dKey = dayKey(mingguN, hariN);
  const done = !!progress?.completedDays[dKey];

  function setKey(setIndex: number, exerciseIdx: number) {
    return `${dKey}-${exerciseIdx}-${setIndex}`;
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          type="button"
          onClick={() => router.push("/jadwal")}
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] mb-2"
        >
          ← kembali ke jadwal
        </button>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm text-[var(--muted)]">
              Minggu {mingguN} · {day.hari}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {day.fokus}
            </h1>
            <div className="text-sm text-[var(--muted)] mt-1">
              {day.durasiTotal === "-"
                ? "Istirahat total"
                : `Durasi: ${day.durasiTotal}`}
            </div>
          </div>
          {!day.isRest && (
            <button
              type="button"
              onClick={() => {
                const p = toggleDayComplete(dKey);
                setProgress({ ...p });
              }}
              className={`text-sm px-4 py-2 rounded-full font-medium transition-colors ${
                done
                  ? "bg-emerald-500 text-black hover:bg-emerald-400"
                  : "bg-[var(--accent)] text-black hover:bg-[var(--accent-hover)]"
              }`}
            >
              {done ? "✓ Selesai" : "Tandai Selesai"}
            </button>
          )}
        </div>
      </div>

      {day.catatan && (
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-200 rounded-2xl p-4 text-sm">
          💡 {day.catatan}
        </div>
      )}

      {day.pemanasan && day.pemanasan.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-2">🔥 Pemanasan (5 menit)</h2>
          <ul className="bg-[var(--card)] border border-[var(--border)] rounded-2xl divide-y divide-[var(--border)]">
            {day.pemanasan.map((p, i) => (
              <li key={i} className="px-4 py-3 text-sm flex gap-3">
                <span className="text-[var(--muted)] font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {day.latihan.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-2">
            💪 Latihan Inti ({day.latihan.length})
          </h2>
          <div className="space-y-3">
            {day.latihan.map((s, exerciseIdx) => {
              const ex = getExercise(s.exerciseId);
              if (!ex) return null;
              return (
                <div
                  key={`${s.exerciseId}-${exerciseIdx}`}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--border)]">
                    <div>
                      <Link
                        href={`/latihan/${ex.id}`}
                        className="font-semibold hover:text-[var(--accent)] transition-colors"
                      >
                        {ex.nama}
                      </Link>
                      <div className="text-xs text-[var(--muted)] mt-0.5">
                        {ex.kategori.join(" · ")}
                      </div>
                    </div>
                    <div className="text-sm text-right">
                      <div className="font-mono">
                        {s.set} × {s.reps ?? s.durasi}
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        rest: {s.istirahat}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex flex-wrap gap-2">
                    {Array.from({ length: s.set }).map((_, setIdx) => {
                      const key = setKey(setIdx, exerciseIdx);
                      const checked = !!progress?.completedSets[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            const p = toggleSetComplete(key);
                            setProgress({ ...p });
                          }}
                          className={`h-8 px-3 rounded-full text-xs font-medium border transition-colors ${
                            checked
                              ? "bg-emerald-500 text-black border-transparent"
                              : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)]"
                          }`}
                        >
                          Set {setIdx + 1}
                          {checked ? " ✓" : ""}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {day.pendinginan && day.pendinginan.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-2">🧘 Pendinginan (5 menit)</h2>
          <ul className="bg-[var(--card)] border border-[var(--border)] rounded-2xl divide-y divide-[var(--border)]">
            {day.pendinginan.map((p, i) => (
              <li key={i} className="px-4 py-3 text-sm flex gap-3">
                <span className="text-[var(--muted)] font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!day.isRest && (
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              const p = toggleDayComplete(dKey);
              setProgress({ ...p });
            }}
            className={`w-full px-4 py-3 rounded-full font-medium transition-colors ${
              done
                ? "bg-emerald-500 text-black hover:bg-emerald-400"
                : "bg-[var(--accent)] text-black hover:bg-[var(--accent-hover)]"
            }`}
          >
            {done ? "✓ Hari Ini Selesai" : "Tandai Hari Ini Selesai"}
          </button>
        </div>
      )}
    </div>
  );
}
