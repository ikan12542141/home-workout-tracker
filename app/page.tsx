"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PROGRAM, dayKey } from "@/lib/program";
import { getExercise } from "@/lib/exercises";
import {
  loadProfile,
  loadProgress,
  saveProfile,
  type Profile,
  type Progress,
} from "@/lib/storage";

const HARI_ID = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

function getTodayIndex() {
  // Date.getDay: 0=Minggu, 1=Senin, ..., 6=Sabtu. Convert to 0=Senin..6=Minggu.
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
  const todayDone = progress?.completedDays[dayKey(currentWeek, todayIndex)];

  const totalDone = progress
    ? Object.keys(progress.completedDays).length
    : 0;
  const totalDays = PROGRAM.length * 7;
  const pct = Math.round((totalDone / totalDays) * 100);

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

      <section className="grid sm:grid-cols-3 gap-3">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
          <div className="text-[var(--muted)] text-xs uppercase tracking-wide">
            Minggu Sekarang
          </div>
          <div className="text-2xl font-bold mt-1">{currentWeek} / 4</div>
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

      <section>
        <div className="flex items-end justify-between mb-3">
          <h2 className="text-xl font-bold">Latihan Hari Ini</h2>
          <span className="text-sm text-[var(--muted)]">
            {HARI_ID[todayIndex]}, Minggu {currentWeek}
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
                {todayDone && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                    Selesai
                  </span>
                )}
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
