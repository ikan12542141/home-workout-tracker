"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PROGRAM, dayKey, getPhase } from "@/lib/program";
import { getExercise } from "@/lib/exercises";
import {
  loadProfile,
  loadProgress,
  saveProfile,
  toggleSetComplete,
  toggleDayComplete,
  type Profile,
  type Progress,
} from "@/lib/storage";

const HARI_ID = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

function getTodayIndex() {
  const d = new Date().getDay();
  return (d + 6) % 7;
}

function calcCurrentWeek(startDate: string): number {
  try {
    const start = new Date(startDate);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    const w = Math.floor(diffDays / 7) + 1;
    return Math.max(1, Math.min(24, w));
  } catch {
    return 1;
  }
}

function calcStreak(progress: Progress): number {
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
  return streak;
}

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Profile | null>(null);

  useEffect(() => {
    const p = loadProfile();
    setProfile(p);
    setDraft(p);
    setProgress(loadProgress());
  }, []);

  const todayIndex = useMemo(() => getTodayIndex(), []);
  const currentWeek = useMemo(
    () => (profile ? calcCurrentWeek(profile.startDate) : 1),
    [profile],
  );

  const week = PROGRAM[currentWeek - 1];
  const today = week?.hari[todayIndex];
  const dKey = dayKey(currentWeek, todayIndex);
  const todayDone = !!progress?.completedDays[dKey];
  const phase = getPhase(currentWeek);

  const totalDone = progress
    ? Object.keys(progress.completedDays).length
    : 0;
  const totalDays = PROGRAM.length * 7;
  const pct = Math.round((totalDone / totalDays) * 100);
  const streak = progress ? calcStreak(progress) : 0;

  function setKey(exerciseIdx: number, setIdx: number) {
    return `${dKey}-${exerciseIdx}-${setIdx}`;
  }

  if (!profile || !draft) {
    return <div className="text-[var(--muted)]">Memuat...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Quick Stats Bar */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-3 text-center">
          <div className="text-2xl font-bold text-[var(--accent)]">{streak}</div>
          <div className="text-xs text-[var(--muted)]">Hari Streak</div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-3 text-center">
          <div className="text-2xl font-bold">Mg {currentWeek}</div>
          <div className="text-xs text-[var(--muted)]">dari 24</div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-3 text-center">
          <div className="text-2xl font-bold">{totalDone}</div>
          <div className="text-xs text-[var(--muted)]">Hari Selesai</div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-3 text-center">
          <div className="text-2xl font-bold">{pct}%</div>
          <div className="text-xs text-[var(--muted)]">Total Progres</div>
        </div>
      </section>

      {/* Phase Banner */}
      <div className="bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-2xl px-4 py-3 flex items-center gap-3">
        <span className="text-sm font-semibold text-[var(--accent)]">
          Fase {phase.phase}: {phase.nama}
        </span>
        <span className="text-xs text-[var(--muted)]">— {phase.deskripsi}</span>
      </div>

      {/* MAIN: Hari Ini Lakukan Apa */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Hari Ini Lakukan Apa?
            </h1>
            <p className="text-sm text-[var(--muted)] mt-1">
              {HARI_ID[todayIndex]}, Minggu {currentWeek} · {today?.fokus}
            </p>
          </div>
          {today && !today.isRest && (
            <button
              type="button"
              onClick={() => {
                const p = toggleDayComplete(dKey);
                setProgress({ ...p });
              }}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                todayDone
                  ? "bg-emerald-500 text-black hover:bg-emerald-400"
                  : "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]"
              }`}
            >
              {todayDone ? "Selesai" : "Tandai Selesai"}
            </button>
          )}
        </div>

        {!today ? (
          <p className="text-[var(--muted)]">Tidak ada data minggu ini.</p>
        ) : today.isRest ? (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            <div className="text-4xl mb-3">😴</div>
            <h2 className="text-xl font-bold mb-2">{today.fokus}</h2>
            <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
              {today.catatan ??
                "Hari istirahat. Tubuh tumbuh saat istirahat — gunakan waktu untuk tidur cukup & makan baik."}
            </p>
            {today.latihan.length > 0 && (
              <Link
                href={`/jadwal/${currentWeek}/${todayIndex}`}
                className="inline-block text-sm px-4 py-2 rounded-full bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
              >
                Lihat aktivitas ringan →
              </Link>
            )}
          </div>
        ) : (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
            {/* Header info */}
            <div className="p-5 border-b border-[var(--border)]">
              <div className="flex items-center justify-between gap-3 mb-2">
                <h2 className="text-lg font-bold">{today.fokus}</h2>
                {todayDone && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                    Selesai
                  </span>
                )}
              </div>
              <p className="text-sm text-[var(--muted)]">
                {today.durasiTotal} · {today.latihan.length} latihan
              </p>
              {today.catatan && (
                <p className="text-xs text-amber-300/80 mt-2 bg-amber-500/10 rounded-lg px-3 py-2">
                  {today.catatan}
                </p>
              )}
            </div>

            {/* Pemanasan */}
            {today.pemanasan && today.pemanasan.length > 0 && (
              <div className="px-5 py-3 border-b border-[var(--border)] bg-[var(--background)]/50">
                <div className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">
                  Pemanasan (5 menit)
                </div>
                <ul className="space-y-1">
                  {today.pemanasan.map((p, i) => (
                    <li key={i} className="text-xs text-[var(--muted)]">
                      {i + 1}. {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exercise checklist */}
            <div className="divide-y divide-[var(--border)]">
              {today.latihan.map((s, exerciseIdx) => {
                const ex = getExercise(s.exerciseId);
                if (!ex) return null;
                const allSetsForExercise = Array.from({ length: s.set }).map(
                  (_, setIdx) => setKey(exerciseIdx, setIdx),
                );
                const completedSets = allSetsForExercise.filter(
                  (k) => !!progress?.completedSets[k],
                ).length;
                const allDone = completedSets === s.set;

                return (
                  <div
                    key={`${s.exerciseId}-${exerciseIdx}`}
                    className={`px-5 py-4 ${allDone ? "bg-emerald-500/5" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${allDone ? "text-emerald-400" : ""}`}>
                            {allDone ? "✓ " : ""}{ex.nama}
                          </span>
                        </div>
                        <div className="text-xs text-[var(--muted)] mt-0.5">
                          {s.set} set × {s.reps ?? s.durasi} · rest {s.istirahat}
                        </div>
                      </div>
                      <Link
                        href={`/latihan/${s.exerciseId}`}
                        className="text-xs text-[var(--accent)] hover:underline shrink-0"
                      >
                        cara →
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: s.set }).map((_, setIdx) => {
                        const key = setKey(exerciseIdx, setIdx);
                        const checked = !!progress?.completedSets[key];
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => {
                              const p = toggleSetComplete(key);
                              setProgress({ ...p });
                            }}
                            className={`h-8 px-3 rounded-full text-xs font-medium border transition-all ${
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

            {/* Pendinginan */}
            {today.pendinginan && today.pendinginan.length > 0 && (
              <div className="px-5 py-3 border-t border-[var(--border)] bg-[var(--background)]/50">
                <div className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">
                  Pendinginan (5 menit)
                </div>
                <ul className="space-y-1">
                  {today.pendinginan.map((p, i) => (
                    <li key={i} className="text-xs text-[var(--muted)]">
                      {i + 1}. {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action buttons */}
            <div className="p-5 border-t border-[var(--border)] flex flex-col sm:flex-row gap-3">
              <Link
                href={`/jadwal/${currentWeek}/${todayIndex}`}
                className="flex-1 text-center px-4 py-3 rounded-full bg-[var(--accent)] text-black font-bold text-base hover:bg-[var(--accent-hover)] transition-colors"
              >
                Mulai Latihan Sekarang
              </Link>
              <Link
                href="/jadwal"
                className="flex-1 text-center px-4 py-2.5 rounded-full border border-[var(--border)] hover:border-[var(--accent)] transition-colors text-sm"
              >
                Lihat Jadwal Lengkap
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Quick links */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/rencana"
          className="block bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 hover:border-[var(--accent)] transition-colors text-center"
        >
          <div className="text-xl mb-1">📆</div>
          <h3 className="font-semibold text-sm">Rencana 6 Bulan</h3>
        </Link>
        <Link
          href="/progres"
          className="block bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 hover:border-[var(--accent)] transition-colors text-center"
        >
          <div className="text-xl mb-1">📊</div>
          <h3 className="font-semibold text-sm">Progres</h3>
        </Link>
        <Link
          href="/alat"
          className="block bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 hover:border-[var(--accent)] transition-colors text-center"
        >
          <div className="text-xl mb-1">🛠️</div>
          <h3 className="font-semibold text-sm">Alat DIY</h3>
        </Link>
        <Link
          href="/nutrisi"
          className="block bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 hover:border-[var(--accent)] transition-colors text-center"
        >
          <div className="text-xl mb-1">🥗</div>
          <h3 className="font-semibold text-sm">Nutrisi</h3>
        </Link>
      </section>

      {/* More quick links */}
      <section className="grid sm:grid-cols-2 gap-3">
        <Link
          href="/ukuran"
          className="block bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 hover:border-[var(--accent)] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">📐</span>
            <div>
              <h3 className="font-semibold text-sm">Ukuran Badan</h3>
              <p className="text-xs text-[var(--muted)]">Catat lingkar lengan, dada, pinggang</p>
            </div>
          </div>
        </Link>
        <Link
          href="/jurnal"
          className="block bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 hover:border-[var(--accent)] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">📝</span>
            <div>
              <h3 className="font-semibold text-sm">Jurnal Harian</h3>
              <p className="text-xs text-[var(--muted)]">Catat energi, mood, & catatan hari ini</p>
            </div>
          </div>
        </Link>
      </section>

      {/* Profile section - collapsible at bottom */}
      <section>
        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          className="w-full flex items-center justify-between gap-3 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 hover:border-[var(--accent)] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-black font-bold text-lg">
              {profile.nama.charAt(0).toUpperCase()}
            </span>
            <div className="text-left">
              <div className="font-semibold">{profile.nama}</div>
              <div className="text-xs text-[var(--muted)]">
                {profile.umur} thn · {profile.tinggi} cm · {profile.berat} kg
              </div>
            </div>
          </div>
          <span className="text-xs text-[var(--muted)]">
            {editing ? "Tutup" : "Edit Profil"}
          </span>
        </button>

        {editing && (
          <div className="mt-3 grid sm:grid-cols-2 gap-3 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-[var(--muted)]">Nama</span>
              <input
                value={draft.nama}
                onChange={(e) => setDraft({ ...draft, nama: e.target.value })}
                className="bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 focus:outline-none focus:border-[var(--accent)]"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-[var(--muted)]">Umur</span>
              <input
                type="number"
                value={draft.umur}
                onChange={(e) =>
                  setDraft({ ...draft, umur: Number(e.target.value) })
                }
                className="bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 focus:outline-none focus:border-[var(--accent)]"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-[var(--muted)]">Tinggi (cm)</span>
              <input
                type="number"
                value={draft.tinggi}
                onChange={(e) =>
                  setDraft({ ...draft, tinggi: Number(e.target.value) })
                }
                className="bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 focus:outline-none focus:border-[var(--accent)]"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-[var(--muted)]">Berat (kg)</span>
              <input
                type="number"
                value={draft.berat}
                onChange={(e) =>
                  setDraft({ ...draft, berat: Number(e.target.value) })
                }
                className="bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 focus:outline-none focus:border-[var(--accent)]"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm sm:col-span-2">
              <span className="text-[var(--muted)]">Goal</span>
              <textarea
                value={draft.goal}
                onChange={(e) => setDraft({ ...draft, goal: e.target.value })}
                rows={2}
                className="bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 focus:outline-none focus:border-[var(--accent)]"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm sm:col-span-2">
              <span className="text-[var(--muted)]">Tanggal Mulai Program</span>
              <input
                type="date"
                value={draft.startDate}
                onChange={(e) =>
                  setDraft({ ...draft, startDate: e.target.value })
                }
                className="bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 focus:outline-none focus:border-[var(--accent)]"
              />
            </label>
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  saveProfile(draft);
                  setProfile(draft);
                  setEditing(false);
                }}
                className="px-4 py-2 rounded-full bg-[var(--accent)] text-black font-medium hover:bg-[var(--accent-hover)] transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
