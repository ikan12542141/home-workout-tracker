"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PROGRAM, dayKey } from "@/lib/program";
import {
  loadProfile,
  loadProgress,
  loadProteinLog,
  loadFatigueLog,
  loadSleepLog,
  loadHydrationLog,
  loadRecords,
  PROTEIN_ITEMS,
  type Profile,
  type Progress,
  type ProteinLog,
  type FatigueLog,
  type SleepLog,
  type HydrationLog,
  type PersonalRecord,
} from "@/lib/storage";

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

function getWeekDates(weekNum: number, startDate: string): string[] {
  const start = new Date(startDate);
  const weekStart = new Date(start);
  weekStart.setDate(weekStart.getDate() + (weekNum - 1) * 7);
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export default function LaporanPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [proteinLog, setProteinLog] = useState<ProteinLog>({});
  const [fatigueLog, setFatigueLog] = useState<FatigueLog>({});
  const [sleepLog, setSleepLog] = useState<SleepLog>({});
  const [hydrationLog, setHydrationLog] = useState<HydrationLog>({});
  const [records, setRecords] = useState<PersonalRecord[]>([]);

  useEffect(() => {
    setProfile(loadProfile());
    setProgress(loadProgress());
    setProteinLog(loadProteinLog());
    setFatigueLog(loadFatigueLog());
    setSleepLog(loadSleepLog());
    setHydrationLog(loadHydrationLog());
    setRecords(loadRecords());
  }, []);

  const currentWeek = useMemo(
    () => (profile ? calcCurrentWeek(profile.startDate) : 1),
    [profile],
  );

  const [selectedWeek, setSelectedWeek] = useState(0);
  useEffect(() => {
    if (currentWeek > 0) setSelectedWeek(currentWeek);
  }, [currentWeek]);

  const weekDates = useMemo(
    () => (profile ? getWeekDates(selectedWeek, profile.startDate) : []),
    [selectedWeek, profile],
  );

  const stats = useMemo(() => {
    if (!progress || weekDates.length === 0) return null;

    let workoutDays = 0;
    for (let i = 0; i < 7; i++) {
      if (progress.completedDays[dayKey(selectedWeek, i)]) workoutDays++;
    }

    let proteinDays = 0;
    let totalProteinItems = 0;
    for (const date of weekDates) {
      const items = proteinLog[date] ?? [];
      totalProteinItems += items.length;
      if (items.length >= 2) proteinDays++;
    }

    let sleepTotal = 0;
    let sleepCount = 0;
    let sleepQualTotal = 0;
    for (const date of weekDates) {
      const entry = sleepLog[date];
      if (entry) {
        sleepTotal += entry.jam;
        sleepQualTotal += entry.kualitas;
        sleepCount++;
      }
    }

    let fatigueTotal = 0;
    let fatigueCount = 0;
    for (const date of weekDates) {
      const level = fatigueLog[date];
      if (level) {
        fatigueTotal += level;
        fatigueCount++;
      }
    }

    let waterTotal = 0;
    let waterDays = 0;
    for (const date of weekDates) {
      const glasses = hydrationLog[date] ?? 0;
      waterTotal += glasses;
      if (glasses >= 8) waterDays++;
    }

    const weekRecords = records.filter((r) =>
      weekDates.includes(r.tanggal),
    );

    return {
      workoutDays,
      proteinDays,
      avgProteinItems: weekDates.length > 0 ? Math.round((totalProteinItems / 7) * 10) / 10 : 0,
      avgSleep: sleepCount > 0 ? Math.round((sleepTotal / sleepCount) * 10) / 10 : 0,
      avgSleepQuality: sleepCount > 0 ? Math.round((sleepQualTotal / sleepCount) * 10) / 10 : 0,
      sleepLoggedDays: sleepCount,
      avgFatigue: fatigueCount > 0 ? Math.round((fatigueTotal / fatigueCount) * 10) / 10 : 0,
      fatigueLoggedDays: fatigueCount,
      waterTotal,
      waterDays,
      avgWater: Math.round((waterTotal / 7) * 10) / 10,
      newPRs: weekRecords,
    };
  }, [progress, weekDates, proteinLog, sleepLog, fatigueLog, hydrationLog, records, selectedWeek]);

  if (!profile) {
    return <div className="text-[var(--muted)]">Memuat...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] mb-2 inline-block">
          ← kembali ke beranda
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Laporan Mingguan
        </h1>
        <p className="text-[var(--muted)] mt-1">
          Rangkuman progres latihan, recovery, dan nutrisi per minggu.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
        {Array.from({ length: 24 }, (_, i) => i + 1).map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => setSelectedWeek(w)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              selectedWeek === w
                ? "bg-[var(--accent)] text-black border-transparent"
                : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)]"
            }`}
          >
            M{w}
          </button>
        ))}
      </div>

      {stats && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Minggu {selectedWeek}</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
              emoji="💪"
              label="Hari Latihan"
              value={`${stats.workoutDays}/7`}
              color={stats.workoutDays >= 5 ? "emerald" : stats.workoutDays >= 3 ? "yellow" : "red"}
            />
            <StatCard
              emoji="😴"
              label="Avg Tidur"
              value={stats.sleepLoggedDays > 0 ? `${stats.avgSleep} jam` : "-"}
              sub={stats.sleepLoggedDays > 0 ? `Kualitas: ${stats.avgSleepQuality}/5` : "Belum ada data"}
              color={stats.avgSleep >= 7 ? "emerald" : stats.avgSleep >= 6 ? "yellow" : "red"}
            />
            <StatCard
              emoji="🍳"
              label="Hari Protein Cukup"
              value={`${stats.proteinDays}/7`}
              sub={`Avg: ${stats.avgProteinItems} item/hari`}
              color={stats.proteinDays >= 5 ? "emerald" : stats.proteinDays >= 3 ? "yellow" : "red"}
            />
            <StatCard
              emoji="💧"
              label="Hari Hidrasi Cukup"
              value={`${stats.waterDays}/7`}
              sub={`Avg: ${stats.avgWater} gelas/hari`}
              color={stats.waterDays >= 5 ? "emerald" : stats.waterDays >= 3 ? "yellow" : "red"}
            />
          </div>

          {stats.avgFatigue > 0 && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
              <h3 className="font-semibold text-sm mb-2">Fatigue Rata-rata</h3>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 rounded-full bg-[var(--border)] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      stats.avgFatigue >= 4 ? "bg-red-500" : stats.avgFatigue >= 3 ? "bg-yellow-500" : "bg-emerald-500"
                    }`}
                    style={{ width: `${(stats.avgFatigue / 5) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-mono">{stats.avgFatigue}/5</span>
              </div>
              {stats.avgFatigue >= 4 && (
                <p className="text-xs text-red-400 mt-2">Fatigue tinggi minggu ini. Pertimbangkan lebih banyak istirahat.</p>
              )}
            </div>
          )}

          {stats.newPRs.length > 0 && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
              <h3 className="font-semibold text-sm mb-2">Personal Records Baru Minggu Ini</h3>
              <div className="space-y-2">
                {stats.newPRs.map((pr) => (
                  <div key={pr.exerciseId} className="flex items-center justify-between text-sm">
                    <span>{pr.exerciseId}</span>
                    <span className="font-mono text-[var(--accent)]">
                      {pr.value} {pr.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
            <h3 className="font-semibold text-sm mb-3">Detail Harian</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-[var(--muted)] border-b border-[var(--border)]">
                    <th className="py-2 text-left">Tanggal</th>
                    <th className="py-2 text-center">Latihan</th>
                    <th className="py-2 text-center">Tidur</th>
                    <th className="py-2 text-center">Protein</th>
                    <th className="py-2 text-center">Air</th>
                    <th className="py-2 text-center">Fatigue</th>
                  </tr>
                </thead>
                <tbody>
                  {weekDates.map((date, idx) => {
                    const workout = !!progress?.completedDays[dayKey(selectedWeek, idx)];
                    const sleep = sleepLog[date];
                    const protein = proteinLog[date] ?? [];
                    const water = hydrationLog[date] ?? 0;
                    const fatigue = fatigueLog[date] ?? 0;
                    return (
                      <tr key={date} className="border-b border-[var(--border)]/50">
                        <td className="py-2">{date}</td>
                        <td className="py-2 text-center">{workout ? "✓" : "-"}</td>
                        <td className="py-2 text-center">{sleep ? `${sleep.jam}h` : "-"}</td>
                        <td className="py-2 text-center">{protein.length > 0 ? `${protein.length}/${PROTEIN_ITEMS.length}` : "-"}</td>
                        <td className="py-2 text-center">{water > 0 ? `${water}/8` : "-"}</td>
                        <td className="py-2 text-center">{fatigue > 0 ? `${fatigue}/5` : "-"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
            <h3 className="font-semibold text-sm mb-2">Skor Minggu Ini</h3>
            {(() => {
              let score = 0;
              score += Math.min(30, stats.workoutDays * (30 / 6));
              if (stats.sleepLoggedDays > 0) score += stats.avgSleep >= 7 ? 20 : (stats.avgSleep / 7) * 20;
              score += Math.min(20, stats.proteinDays * (20 / 5));
              score += Math.min(15, stats.waterDays * (15 / 5));
              if (stats.fatigueLoggedDays > 0) score += stats.avgFatigue <= 3 ? 15 : Math.max(0, 15 - (stats.avgFatigue - 3) * 7.5);
              score = Math.round(score);
              const grade = score >= 80 ? "A" : score >= 60 ? "B" : score >= 40 ? "C" : "D";
              const gradeColor = score >= 80 ? "text-emerald-400" : score >= 60 ? "text-blue-400" : score >= 40 ? "text-yellow-400" : "text-red-400";
              return (
                <div className="flex items-center gap-4">
                  <div className={`text-4xl font-bold ${gradeColor}`}>{grade}</div>
                  <div className="flex-1">
                    <div className="h-3 rounded-full bg-[var(--border)] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-blue-500" : score >= 40 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <p className="text-xs text-[var(--muted)] mt-1">{score}/100 poin</p>
                  </div>
                </div>
              );
            })()}
            <p className="text-xs text-[var(--muted)] mt-2">
              Skor dihitung dari: latihan (30%), tidur (20%), protein (20%), hidrasi (15%), recovery (15%).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  emoji,
  label,
  value,
  sub,
  color,
}: {
  emoji: string;
  label: string;
  value: string;
  sub?: string;
  color: "emerald" | "yellow" | "red";
}) {
  const borderColor =
    color === "emerald"
      ? "border-emerald-500/40"
      : color === "yellow"
      ? "border-yellow-500/40"
      : "border-red-500/40";
  return (
    <div className={`bg-[var(--card)] border ${borderColor} rounded-2xl p-4`}>
      <div className="text-lg mb-1">{emoji}</div>
      <div className="text-xs text-[var(--muted)] uppercase tracking-wide">{label}</div>
      <div className="text-xl font-bold mt-1">{value}</div>
      {sub && <div className="text-xs text-[var(--muted)] mt-0.5">{sub}</div>}
    </div>
  );
}
