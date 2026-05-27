"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PROGRAM, dayKey } from "@/lib/program";
import { getExercise } from "@/lib/exercises";
import {
  exportAllData,
  importAllData,
  loadAchievements,
  loadJournal,
  loadMeasurements,
  loadProgress,
  loadRecords,
  resetProgress,
  unlockAchievement,
  type FullBackup,
  type PersonalRecord,
  type Progress,
} from "@/lib/storage";
import {
  ACHIEVEMENTS,
  type Achievement,
  checkNewlyUnlocked,
} from "@/lib/achievements";

const HARI_SINGKAT = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

export default function ProgresPage() {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [records, setRecords] = useState<PersonalRecord[]>([]);
  const [unlocked, setUnlocked] = useState<Record<string, { unlockedAt: string }>>(
    {},
  );
  const [confirmReset, setConfirmReset] = useState(false);
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const p = loadProgress();
    const r = loadRecords();
    const m = loadMeasurements();
    const j = loadJournal();
    let u = loadAchievements();
    const newly = checkNewlyUnlocked(
      { progress: p, records: r, journal: j, measurements: m },
      u,
    );
    newly.forEach((a) => unlockAchievement(a.id));
    u = loadAchievements();
    setProgress(p);
    setRecords(r);
    setUnlocked(u);
  }, []);

  const totalDone = progress ? Object.keys(progress.completedDays).length : 0;
  const totalDays = PROGRAM.length * 7;
  const pct = Math.round((totalDone / totalDays) * 100);
  const streakDays = countStreak(progress);

  function downloadBackup() {
    const data = exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const date = new Date().toISOString().slice(0, 10);
    a.download = `hwt-backup-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text) as FullBackup;
      if (data.version !== 1) {
        setImportMsg("Versi backup tidak didukung");
        return;
      }
      if (
        !confirm(
          `Backup ini dari ${data.exportedAt?.slice(0, 10) ?? "?"}. Data saat ini akan ditimpa. Lanjut?`,
        )
      )
        return;
      importAllData(data);
      setImportMsg("Backup berhasil di-restore. Refreshing...");
      setTimeout(() => window.location.reload(), 1200);
    } catch (err) {
      console.error(err);
      setImportMsg("File tidak valid");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  const unlockedAch = ACHIEVEMENTS.filter((a) => unlocked[a.id]);
  const lockedAch = ACHIEVEMENTS.filter((a) => !unlocked[a.id]);

  return (
    <div className="space-y-10">
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
            Badge Unlocked
          </div>
          <div className="text-3xl font-bold mt-1">
            {unlockedAch.length}
            <span className="text-base text-[var(--muted)]">
              {" "}
              / {ACHIEVEMENTS.length}
            </span>
          </div>
          <div className="text-xs text-[var(--muted)] mt-1">
            achievement terbuka
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-bold">Personal Records</h2>
          <Link
            href="/jadwal"
            className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            input PR di halaman jadwal →
          </Link>
        </div>
        {records.length === 0 ? (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 text-sm text-[var(--muted)]">
            Belum ada PR tercatat. Buka halaman jadwal, expand latihan, dan
            input record terbaik kamu setelah selesai.
          </div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {records.map((r) => {
              const ex = getExercise(r.exerciseId);
              if (!ex) return null;
              return (
                <div
                  key={r.exerciseId}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3"
                >
                  <p className="text-xs text-[var(--muted)] truncate">
                    {ex.nama}
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    {r.value}
                    <span className="text-sm text-[var(--muted)] ml-1">
                      {r.unit}
                    </span>
                  </p>
                  <p className="text-[10px] text-[var(--muted)] font-mono mt-1">
                    {r.tanggal}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Progressive Overload Graph */}
      {records.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Grafik Progressive Overload</h2>
          <p className="text-sm text-[var(--muted)]">
            Lihat kekuatan kamu naik dari waktu ke waktu. Setiap card menunjukkan PR terbaik dan target berikutnya.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {records.map((r) => {
              const ex = getExercise(r.exerciseId);
              if (!ex) return null;
              const targetValue = Math.ceil(r.value * 1.2);
              const pctProgress = Math.round((r.value / targetValue) * 100);
              return (
                <div
                  key={r.exerciseId}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold truncate">{ex.nama}</p>
                    <span className="text-[10px] font-mono text-[var(--muted)]">{r.tanggal}</span>
                  </div>
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-3xl font-bold text-[var(--accent)]">{r.value}</span>
                    <span className="text-sm text-[var(--muted)]">{r.unit}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-[var(--muted)]">
                      <span>Progress ke target berikutnya</span>
                      <span>{targetValue} {r.unit}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-[var(--border)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--accent)] transition-all"
                        style={{ width: `${Math.min(100, pctProgress)}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-[var(--muted)]">
                      Target +20%: {targetValue} {r.unit} (kurang {targetValue - r.value})
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <h2 className="text-lg font-bold">
          Achievements ({unlockedAch.length}/{ACHIEVEMENTS.length})
        </h2>
        {unlockedAch.length > 0 && (
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {unlockedAch.map((a) => (
              <BadgeCard key={a.id} a={a} unlocked />
            ))}
          </div>
        )}
        <details className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
          <summary className="cursor-pointer text-sm font-semibold">
            Lihat badge yang belum terbuka ({lockedAch.length})
          </summary>
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-3">
            {lockedAch.map((a) => (
              <BadgeCard key={a.id} a={a} unlocked={false} />
            ))}
          </div>
        </details>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold">Heatmap 24 Minggu</h2>
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
                    <Link
                      key={idx}
                      href={`/jadwal/${week.minggu}/${idx}`}
                      className={`aspect-square rounded-md flex flex-col items-center justify-center text-xs hover:ring-2 hover:ring-[var(--accent)] transition ${
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
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 space-y-3">
        <h2 className="font-bold">Backup & Restore Data</h2>
        <p className="text-sm text-[var(--muted)]">
          Data progres tersimpan di browser ini. Untuk amannya, download
          backup berkala — bisa di-restore kalau browser di-reset / ganti HP.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={downloadBackup}
            className="text-sm px-4 py-2 rounded-full bg-[var(--accent)] text-black font-medium hover:opacity-90"
          >
            ⬇ Download Backup (JSON)
          </button>
          <label className="text-sm px-4 py-2 rounded-full border border-[var(--border)] hover:border-[var(--accent)] cursor-pointer">
            ⬆ Restore dari Backup
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
        {importMsg && (
          <p className="text-sm text-[var(--accent)]">{importMsg}</p>
        )}
      </section>

      <section className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5">
        <h2 className="font-bold mb-2">Reset Progres</h2>
        <p className="text-sm text-[var(--muted)] mb-3">
          Hapus checklist hari & set saja. Ukuran, foto, jurnal, PR, dan
          badge tetap aman.
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
              Yakin, hapus
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

      <section className="bg-red-500/5 border border-red-500/30 rounded-2xl p-5">
        <h2 className="font-bold mb-2 text-red-300">Hapus Semua Data</h2>
        <p className="text-sm text-[var(--muted)] mb-3">
          Hapus progres, ukuran, foto, jurnal, PR, badge — semua. Cocok kalau
          ingin mulai dari nol total.
        </p>
        <button
          type="button"
          onClick={() => {
            if (
              !confirm(
                "Yakin hapus SEMUA data (progres, ukuran, foto, jurnal, PR, badge)? Tidak bisa dikembalikan.",
              )
            )
              return;
            localStorage.clear();
            window.location.reload();
          }}
          className="text-sm px-4 py-2 rounded-full border border-red-500 text-red-300 hover:bg-red-500 hover:text-white transition-colors"
        >
          Hapus Semua
        </button>
      </section>
    </div>
  );
}

function BadgeCard({ a, unlocked }: { a: Achievement; unlocked: boolean }) {
  return (
    <div
      className={`rounded-lg border p-3 text-center ${
        unlocked
          ? "border-[var(--accent)] bg-[var(--accent)]/10"
          : "border-[var(--border)] bg-[var(--card)] opacity-50"
      }`}
      title={a.deskripsi}
    >
      <div className={`text-2xl ${unlocked ? "" : "grayscale"}`}>{a.icon}</div>
      <p className="text-xs font-semibold mt-1 line-clamp-2">{a.nama}</p>
      <p className="text-[10px] text-[var(--muted)] line-clamp-2 mt-0.5">
        {a.deskripsi}
      </p>
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
  const lastDate = new Date(unique[unique.length - 1]);
  const today = new Date();
  const diffFromToday = Math.round(
    (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffFromToday > 1) return 0;
  return streak;
}
