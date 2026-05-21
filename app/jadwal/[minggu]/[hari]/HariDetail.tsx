"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { PROGRAM, dayKey } from "@/lib/program";
import { getExercise } from "@/lib/exercises";
import {
  loadProgress,
  loadRecords,
  submitRecord,
  toggleDayComplete,
  toggleSetComplete,
  loadAltPrefs,
  toggleAltPref,
  type AltPrefs,
  type PersonalRecord,
  type Progress,
} from "@/lib/storage";
import WorkoutTimer from "@/components/WorkoutTimer";
import VideoEmbed from "@/components/VideoEmbed";

function parseRestSeconds(rest: string): number {
  const detik = rest.match(/(\d+)\s*detik/);
  if (detik) return Number(detik[1]);
  const menit = rest.match(/(\d+)\s*menit/);
  if (menit) return Number(menit[1]) * 60;
  return 60;
}

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
  const [records, setRecords] = useState<PersonalRecord[]>([]);
  const [openExercise, setOpenExercise] = useState<string | null>(null);
  const [prInput, setPrInput] = useState<Record<string, string>>({});
  const [prFlash, setPrFlash] = useState<string | null>(null);
  const [altPrefs, setAltPrefs] = useState<AltPrefs>({});

  useEffect(() => {
    setProgress(loadProgress());
    setRecords(loadRecords());
    setAltPrefs(loadAltPrefs());
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

      {prFlash && (
        <div className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 rounded-2xl p-4 text-sm font-medium">
          {prFlash}
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
              const useAlt = !!altPrefs[ex.id] && !!ex.alternatifTanpaAlat;
              const alt = ex.alternatifTanpaAlat;
              const displayName = useAlt && alt ? alt.nama : ex.nama;
              const displayVideo = useAlt && alt?.videoEmbedId ? alt.videoEmbedId : ex.videoEmbedId;
              return (
                <div
                  key={`${s.exerciseId}-${exerciseIdx}`}
                  className={`bg-[var(--card)] border rounded-2xl overflow-hidden ${
                    useAlt ? "border-emerald-500/40" : "border-[var(--border)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--border)]">
                    <div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/latihan/${ex.id}`}
                          className="font-semibold hover:text-[var(--accent)] transition-colors"
                        >
                          {displayName}
                        </Link>
                        {useAlt && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                            alternatif
                          </span>
                        )}
                      </div>
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
                  <div className="px-4 pb-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenExercise(
                          openExercise === ex.id ? null : ex.id,
                        )
                      }
                      className="text-xs px-3 py-1 rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)]"
                    >
                      {openExercise === ex.id ? "➖ Tutup" : "⏱️ Timer + Video"}
                    </button>
                    {alt && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = toggleAltPref(ex.id);
                          setAltPrefs({ ...updated });
                        }}
                        className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                          useAlt
                            ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25"
                            : "border-[var(--border)] text-[var(--muted)] hover:text-emerald-400 hover:border-emerald-500/40"
                        }`}
                      >
                        {useAlt ? "↩ Pakai Versi Asli" : "🔄 Tanpa Alat"}
                      </button>
                    )}
                    {ex.prMetric && (
                      <span className="text-xs px-2 py-1 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--muted)] font-mono">
                        PR: {records.find((r) => r.exerciseId === ex.id)?.value ?? "-"}{" "}
                        {ex.prMetric === "reps" ? "reps" : "detik"}
                      </span>
                    )}
                  </div>
                  {openExercise === ex.id && (
                    <div className="px-4 pb-4 space-y-3 border-t border-[var(--border)] pt-4">
                      <WorkoutTimer
                        initialSeconds={parseRestSeconds(s.istirahat)}
                        label={`Istirahat: ${s.istirahat}`}
                      />
                      {useAlt && alt && (
                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 space-y-2">
                          <p className="text-xs font-semibold text-emerald-400">Alternatif: {alt.nama}</p>
                          <p className="text-xs text-[var(--muted)]">{alt.deskripsi}</p>
                          <ol className="space-y-1">
                            {alt.langkah.map((l, i) => (
                              <li key={i} className="text-xs text-[var(--muted)] flex gap-2">
                                <span className="text-emerald-400 font-mono shrink-0">{i + 1}.</span>
                                <span>{l}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                      {displayVideo && (
                        <VideoEmbed videoId={displayVideo} title={displayName} />
                      )}
                      {ex.prMetric && (
                        <div className="space-y-2">
                          <p className="text-xs text-[var(--muted)]">
                            Catat Personal Record (max{" "}
                            {ex.prMetric === "reps" ? "reps" : "detik"} hari ini):
                          </p>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={prInput[ex.id] ?? ""}
                              onChange={(e) =>
                                setPrInput((p) => ({
                                  ...p,
                                  [ex.id]: e.target.value,
                                }))
                              }
                              placeholder={
                                ex.prMetric === "reps" ? "mis. 15" : "mis. 60"
                              }
                              className="flex-1 rounded-md border border-[var(--border)] bg-transparent px-2 py-1 text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const val = Number(prInput[ex.id]);
                                if (!val || val <= 0) return;
                                const { records: newRecs, isNewPR } =
                                  submitRecord({
                                    exerciseId: ex.id,
                                    value: val,
                                    unit:
                                      ex.prMetric === "reps"
                                        ? "reps"
                                        : "detik",
                                    tanggal: new Date()
                                      .toISOString()
                                      .slice(0, 10),
                                  });
                                setRecords(newRecs);
                                setPrInput((p) => ({ ...p, [ex.id]: "" }));
                                setPrFlash(
                                  isNewPR
                                    ? `🏆 PR baru untuk ${ex.nama}: ${val}!`
                                    : `Belum lebih dari PR sebelumnya (${
                                        records.find(
                                          (r) => r.exerciseId === ex.id,
                                        )?.value
                                      }). Tetap semangat!`,
                                );
                                setTimeout(() => setPrFlash(null), 4000);
                              }}
                              className="rounded-md bg-[var(--accent)] px-3 py-1 text-sm font-semibold text-black"
                            >
                              Simpan PR
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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
