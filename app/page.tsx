"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useCallback } from "react";
import { PROGRAM, dayKey, isDeloadWeek, applyDeload, getQuickVersion } from "@/lib/program";
import { getExercise } from "@/lib/exercises";
import {
  loadProfile,
  loadProgress,
  saveProfile,
  loadProteinLog,
  toggleProteinItem,
  PROTEIN_ITEMS,
  loadFatigueLog,
  setFatigueLevel,
  getRecentFatigue,
  loadQuickMode,
  saveQuickMode,
  type Profile,
  type Progress,
  type ProteinLog,
  type FatigueLog,
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

const FATIGUE_LABELS = ["", "Segar", "Sedikit pegal", "Pegal", "Sangat pegal", "Tidak kuat"];
const FATIGUE_COLORS = ["", "text-emerald-400", "text-blue-400", "text-yellow-400", "text-orange-400", "text-red-400"];

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Profile | null>(null);
  const [proteinLog, setProteinLog] = useState<ProteinLog>({});
  const [fatigueLog, setFatigueLog] = useState<FatigueLog>({});
  const [quickMode, setQuickMode] = useState(false);

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    const p = loadProfile();
    setProfile(p);
    setDraft(p);
    setProgress(loadProgress());
    setProteinLog(loadProteinLog());
    setFatigueLog(loadFatigueLog());
    setQuickMode(loadQuickMode());
  }, []);

  const todayIndex = useMemo(() => getTodayIndex(), []);
  const currentWeek = useMemo(
    () => (profile ? calcCurrentWeek(profile.startDate) : 1),
    [profile],
  );

  const week = PROGRAM[currentWeek - 1];
  const deload = isDeloadWeek(currentWeek);

  const rawToday = week?.hari[todayIndex];
  const today = useMemo(() => {
    if (!rawToday) return undefined;
    let d = rawToday;
    if (deload) d = applyDeload(d);
    if (quickMode) d = getQuickVersion(d);
    return d;
  }, [rawToday, deload, quickMode]);

  const todayDone = progress?.completedDays[dayKey(currentWeek, todayIndex)];

  const totalDone = progress
    ? Object.keys(progress.completedDays).length
    : 0;
  const totalDays = PROGRAM.length * 7;
  const pct = Math.round((totalDone / totalDays) * 100);

  const todayProtein = proteinLog[todayStr] ?? [];
  const todayFatigue = fatigueLog[todayStr] ?? 0;
  const recentFatigue = useMemo(() => getRecentFatigue(3), [fatigueLog]);

  const handleProteinToggle = useCallback((itemId: string) => {
    const updated = toggleProteinItem(todayStr, itemId);
    setProteinLog({ ...updated });
  }, [todayStr]);

  const handleFatigue = useCallback((level: number) => {
    const updated = setFatigueLevel(todayStr, level);
    setFatigueLog({ ...updated });
  }, [todayStr]);

  const handleQuickModeToggle = useCallback(() => {
    const next = !quickMode;
    setQuickMode(next);
    saveQuickMode(next);
  }, [quickMode]);

  if (!profile || !draft) {
    return <div className="text-[var(--muted)]">Memuat...</div>;
  }

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between gap-4 mb-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Halo, {profile.nama} 👋
          </h1>
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className="text-xs px-3 py-1.5 rounded-full border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
          >
            {editing ? "Batal" : "Edit Profil"}
          </button>
        </div>
        <p className="text-[var(--muted)]">
          {profile.umur} thn · {profile.tinggi} cm · {profile.berat} kg
        </p>

        {editing && (
          <div className="mt-4 grid sm:grid-cols-2 gap-3 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
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

      {/* Fatigue Warning Banner */}
      {recentFatigue.warning && (
        <section className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-semibold text-red-400">Tubuh Butuh Istirahat Ekstra</h3>
              <p className="text-sm text-[var(--muted)] mt-1">
                Rata-rata fatigue kamu 3 hari terakhir: <span className="text-red-400 font-bold">{recentFatigue.avg}/5</span>.
                Pertimbangkan istirahat hari ini atau gunakan <button type="button" onClick={handleQuickModeToggle} className="text-[var(--accent)] underline">Mode Cepat 10 menit</button> supaya tubuh bisa recovery.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Deload Banner */}
      {deload && (
        <section className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔄</span>
            <div>
              <h3 className="font-semibold text-blue-400">Minggu Deload (Recovery)</h3>
              <p className="text-sm text-[var(--muted)] mt-1">
                Volume latihan dikurangi ~50% minggu ini. Fokus form sempurna & recovery penuh supaya minggu depan bisa push lebih keras.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="grid sm:grid-cols-3 gap-3">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
          <div className="text-[var(--muted)] text-xs uppercase tracking-wide">
            Minggu Sekarang
          </div>
          <div className="text-2xl font-bold mt-1">
            {currentWeek} / 24
            {deload && <span className="text-xs font-normal text-blue-400 ml-2">DELOAD</span>}
          </div>
          <div className="text-sm text-[var(--muted)] mt-1">{week?.judul}</div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
          <div className="text-[var(--muted)] text-xs uppercase tracking-wide">
            Hari Diselesaikan
          </div>
          <div className="text-2xl font-bold mt-1">
            {totalDone} <span className="text-[var(--muted)] text-lg">/ {totalDays}</span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--border)] mt-2 overflow-hidden">
            <div
              className="h-full bg-[var(--accent)]"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
          <div className="text-[var(--muted)] text-xs uppercase tracking-wide">
            Goal
          </div>
          <div className="text-sm mt-1">{profile.goal}</div>
        </div>
      </section>

      {/* Quick Mode Toggle */}
      <section className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <h3 className="font-semibold text-sm">Mode Cepat (10 menit)</h3>
            </div>
            <p className="text-xs text-[var(--muted)] mt-1">
              Malas atau capek? Aktifkan untuk latihan singkat 2-3 gerakan utama saja. Lebih baik 10 menit daripada skip!
            </p>
          </div>
          <button
            type="button"
            onClick={handleQuickModeToggle}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none ${
              quickMode
                ? "bg-[var(--accent)] border-[var(--accent)]"
                : "bg-[var(--border)] border-[var(--border)]"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                quickMode ? "translate-x-5" : "translate-x-0"
              }`}
              style={{ width: "1.375rem", height: "1.375rem" }}
            />
          </button>
        </div>
      </section>

      {/* Today's Workout */}
      <section>
        <div className="flex items-end justify-between mb-3">
          <h2 className="text-xl font-bold">Latihan Hari Ini</h2>
          <span className="text-sm text-[var(--muted)]">
            {HARI_ID[todayIndex]}, Minggu {currentWeek}
            {quickMode && " · Quick"}
          </span>
        </div>

        {!today ? (
          <p className="text-[var(--muted)]">Tidak ada data.</p>
        ) : today.isRest ? (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            <div className="text-3xl mb-2">😴</div>
            <h3 className="text-lg font-semibold mb-1">{today.fokus}</h3>
            <p className="text-sm text-[var(--muted)] mb-4">
              {today.catatan ??
                "Hari istirahat. Tubuh tumbuh saat istirahat — gunakan waktu untuk tidur cukup & makan baik."}
            </p>
            {today.latihan.length > 0 && (
              <Link
                href={`/jadwal/${currentWeek}/${todayIndex}`}
                className="inline-block text-sm text-[var(--accent)] hover:underline"
              >
                Lihat aktivitas ringan →
              </Link>
            )}
          </div>
        ) : (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-[var(--border)]">
              <div className="flex items-center justify-between gap-3 mb-1">
                <h3 className="text-lg font-semibold">{today.fokus}</h3>
                <div className="flex items-center gap-2">
                  {quickMode && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                      Quick
                    </span>
                  )}
                  {deload && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400">
                      Deload
                    </span>
                  )}
                  {todayDone && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                      Selesai
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-[var(--muted)]">
                Durasi: {today.durasiTotal} · {today.latihan.length} latihan
              </p>
            </div>
            <ul className="divide-y divide-[var(--border)]">
              {today.latihan.slice(0, 5).map((s, idx) => {
                const ex = getExercise(s.exerciseId);
                return (
                  <li
                    key={`${s.exerciseId}-${idx}`}
                    className="px-5 py-3 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-medium text-sm">{ex?.nama}</div>
                      <div className="text-xs text-[var(--muted)]">
                        {s.set} set × {s.reps ?? s.durasi}
                      </div>
                    </div>
                    <Link
                      href={`/latihan/${s.exerciseId}`}
                      className="text-xs text-[var(--accent)] hover:underline"
                    >
                      detail
                    </Link>
                  </li>
                );
              })}
              {today.latihan.length > 5 && (
                <li className="px-5 py-3 text-xs text-[var(--muted)]">
                  + {today.latihan.length - 5} latihan lainnya
                </li>
              )}
            </ul>
            <div className="p-5 border-t border-[var(--border)] flex flex-col sm:flex-row gap-3">
              <Link
                href={`/jadwal/${currentWeek}/${todayIndex}`}
                className="flex-1 text-center px-4 py-2.5 rounded-full bg-[var(--accent)] text-black font-medium hover:bg-[var(--accent-hover)] transition-colors"
              >
                Mulai Latihan
              </Link>
              <Link
                href="/jadwal"
                className="flex-1 text-center px-4 py-2.5 rounded-full border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
              >
                Lihat Jadwal Lengkap
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Fatigue Tracker */}
      <section className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span>💪</span> Seberapa Pegal Hari Ini?
        </h3>
        <div className="flex gap-2 mb-3">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => handleFatigue(level)}
              className={`flex-1 py-2.5 rounded-xl text-center transition-all ${
                todayFatigue === level
                  ? "bg-[var(--accent)] text-black font-bold scale-105"
                  : "bg-[var(--background)] border border-[var(--border)] hover:border-[var(--accent)]"
              }`}
            >
              <div className="text-lg">{level}</div>
              <div className="text-[10px] leading-tight mt-0.5">{FATIGUE_LABELS[level]}</div>
            </button>
          ))}
        </div>
        {todayFatigue > 0 && (
          <p className={`text-sm ${FATIGUE_COLORS[todayFatigue]}`}>
            Level hari ini: {todayFatigue}/5 — {FATIGUE_LABELS[todayFatigue]}
            {todayFatigue >= 4 && ". Pertimbangkan istirahat atau Mode Cepat."}
          </p>
        )}
        {recentFatigue.avg > 0 && (
          <p className="text-xs text-[var(--muted)] mt-1">
            Rata-rata 3 hari terakhir: {recentFatigue.avg}/5
          </p>
        )}
      </section>

      {/* Protein Reminder */}
      <section className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <span>🍳</span> Protein Hari Ini
          </h3>
          <span className="text-xs text-[var(--muted)]">
            {todayProtein.length}/{PROTEIN_ITEMS.length} item
          </span>
        </div>
        <p className="text-xs text-[var(--muted)] mb-3">
          Gak perlu sempurna — minimal 2-3 item per hari sudah cukup untuk progress.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PROTEIN_ITEMS.map((item) => {
            const checked = todayProtein.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleProteinToggle(item.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-sm transition-all ${
                  checked
                    ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                    : "bg-[var(--background)] border border-[var(--border)] hover:border-[var(--accent)]"
                }`}
              >
                <span className="text-base">{item.emoji}</span>
                <span className="truncate">{item.nama}</span>
                {checked && <span className="ml-auto text-emerald-400">✓</span>}
              </button>
            );
          })}
        </div>
        {todayProtein.length >= 2 && (
          <div className="mt-3 p-2.5 rounded-lg bg-emerald-500/10 text-sm text-emerald-400">
            👍 Bagus! Kamu sudah makan {todayProtein.length} sumber protein hari ini.
          </div>
        )}
        {todayProtein.length === 0 && (
          <div className="mt-3 p-2.5 rounded-lg bg-yellow-500/10 text-sm text-yellow-400">
            Belum ada protein hari ini. Coba minimal 2 telur + 1 tempe!
          </div>
        )}
      </section>

      <section className="grid sm:grid-cols-2 gap-3">
        <Link
          href="/alat"
          className="block bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 hover:border-[var(--accent)] transition-colors"
        >
          <div className="text-xl mb-1">🛠️</div>
          <h3 className="font-semibold mb-1">Alat yang Dibutuhkan</h3>
          <p className="text-sm text-[var(--muted)]">
            Mulai dengan barang yang sudah ada di rumah. Lihat alat opsional
            untuk progres jangka panjang.
          </p>
        </Link>
        <Link
          href="/nutrisi"
          className="block bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 hover:border-[var(--accent)] transition-colors"
        >
          <div className="text-xl mb-1">🥗</div>
          <h3 className="font-semibold mb-1">Panduan Nutrisi</h3>
          <p className="text-sm text-[var(--muted)]">
            Latihan saja tidak cukup — makan yang benar adalah 70% dari hasil.
          </p>
        </Link>
      </section>
    </div>
  );
}
