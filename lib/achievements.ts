import type {
  Progress,
  PersonalRecord,
  JournalEntry,
  Measurement,
} from "./storage";

export type AchievementCategory =
  | "konsistensi"
  | "kekuatan"
  | "ketahanan"
  | "tracking";

export type Achievement = {
  id: string;
  nama: string;
  deskripsi: string;
  icon: string;
  kategori: AchievementCategory;
  check: (ctx: AchievementContext) => boolean;
};

export type AchievementContext = {
  progress: Progress;
  records: PersonalRecord[];
  journal: JournalEntry[];
  measurements: Measurement[];
};

function dayStreak(progress: Progress): number {
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

function totalDaysDone(progress: Progress): number {
  return Object.keys(progress.completedDays).length;
}

function recordValue(records: PersonalRecord[], exerciseId: string): number {
  return records.find((r) => r.exerciseId === exerciseId)?.value ?? 0;
}

export const ACHIEVEMENTS: Achievement[] = [
  // Konsistensi
  {
    id: "first-day",
    nama: "Langkah Pertama",
    deskripsi: "Selesaikan 1 hari latihan",
    icon: "🌱",
    kategori: "konsistensi",
    check: (c) => totalDaysDone(c.progress) >= 1,
  },
  {
    id: "streak-3",
    nama: "Triple Strike",
    deskripsi: "Streak 3 hari beruntun",
    icon: "🔥",
    kategori: "konsistensi",
    check: (c) => dayStreak(c.progress) >= 3,
  },
  {
    id: "streak-7",
    nama: "Satu Minggu Konsisten",
    deskripsi: "Streak 7 hari beruntun",
    icon: "🔥🔥",
    kategori: "konsistensi",
    check: (c) => dayStreak(c.progress) >= 7,
  },
  {
    id: "streak-21",
    nama: "Habit Builder",
    deskripsi: "Streak 21 hari (kebiasaan terbentuk)",
    icon: "💪",
    kategori: "konsistensi",
    check: (c) => dayStreak(c.progress) >= 21,
  },
  {
    id: "days-10",
    nama: "10 Hari Total",
    deskripsi: "Selesaikan 10 hari latihan",
    icon: "✅",
    kategori: "konsistensi",
    check: (c) => totalDaysDone(c.progress) >= 10,
  },
  {
    id: "days-50",
    nama: "50 Hari Total",
    deskripsi: "Selesaikan 50 hari latihan",
    icon: "🏅",
    kategori: "konsistensi",
    check: (c) => totalDaysDone(c.progress) >= 50,
  },
  {
    id: "days-100",
    nama: "Century Club",
    deskripsi: "Selesaikan 100 hari latihan",
    icon: "🏆",
    kategori: "konsistensi",
    check: (c) => totalDaysDone(c.progress) >= 100,
  },
  // Kekuatan — Push-up
  {
    id: "pushup-10",
    nama: "Push-up 10 Reps",
    deskripsi: "10 push-up murni dalam satu set",
    icon: "👊",
    kategori: "kekuatan",
    check: (c) => recordValue(c.records, "push-up") >= 10,
  },
  {
    id: "pushup-20",
    nama: "Push-up 20 Reps",
    deskripsi: "20 push-up murni dalam satu set",
    icon: "💪",
    kategori: "kekuatan",
    check: (c) => recordValue(c.records, "push-up") >= 20,
  },
  {
    id: "pushup-30",
    nama: "Push-up 30 Reps",
    deskripsi: "30 push-up murni — GOAL utama!",
    icon: "🦾",
    kategori: "kekuatan",
    check: (c) => recordValue(c.records, "push-up") >= 30,
  },
  {
    id: "pushup-50",
    nama: "Push-up Master",
    deskripsi: "50 push-up murni — level athlet",
    icon: "🏆",
    kategori: "kekuatan",
    check: (c) => recordValue(c.records, "push-up") >= 50,
  },
  // Kekuatan — Pull-up
  {
    id: "pullup-1",
    nama: "Pull-up Pertama",
    deskripsi: "1 pull-up murni — momen besar",
    icon: "🎯",
    kategori: "kekuatan",
    check: (c) => recordValue(c.records, "pull-up") >= 1,
  },
  {
    id: "pullup-5",
    nama: "5 Pull-ups",
    deskripsi: "5 pull-up dalam 1 set",
    icon: "💪",
    kategori: "kekuatan",
    check: (c) => recordValue(c.records, "pull-up") >= 5,
  },
  {
    id: "pullup-10",
    nama: "10 Pull-ups",
    deskripsi: "10 pull-up — level advanced",
    icon: "🏆",
    kategori: "kekuatan",
    check: (c) => recordValue(c.records, "pull-up") >= 10,
  },
  // Kekuatan — Curl
  {
    id: "curl-15",
    nama: "Bisep Builder",
    deskripsi: "15 bicep curl per sisi",
    icon: "💪",
    kategori: "kekuatan",
    check: (c) => recordValue(c.records, "bicep-curl-botol") >= 15,
  },
  // Ketahanan — Plank
  {
    id: "plank-60",
    nama: "Plank 1 Menit",
    deskripsi: "Plank tahan 60 detik",
    icon: "⏱️",
    kategori: "ketahanan",
    check: (c) => recordValue(c.records, "plank") >= 60,
  },
  {
    id: "plank-120",
    nama: "Plank 2 Menit",
    deskripsi: "Plank tahan 120 detik",
    icon: "🏅",
    kategori: "ketahanan",
    check: (c) => recordValue(c.records, "plank") >= 120,
  },
  {
    id: "plank-180",
    nama: "Plank Master",
    deskripsi: "Plank tahan 3 menit — GOAL utama!",
    icon: "🏆",
    kategori: "ketahanan",
    check: (c) => recordValue(c.records, "plank") >= 180,
  },
  {
    id: "hollow-60",
    nama: "Hollow Hold 1 Menit",
    deskripsi: "Hollow body hold 60 detik",
    icon: "🍌",
    kategori: "ketahanan",
    check: (c) => recordValue(c.records, "hollow-hold") >= 60,
  },
  // Tracking
  {
    id: "first-measurement",
    nama: "Mulai Tracking",
    deskripsi: "Catat ukuran badan pertama",
    icon: "📏",
    kategori: "tracking",
    check: (c) => c.measurements.length >= 1,
  },
  {
    id: "measure-4",
    nama: "4 Pengukuran",
    deskripsi: "Catat ukuran badan minimal 4 kali (bulanan)",
    icon: "📊",
    kategori: "tracking",
    check: (c) => c.measurements.length >= 4,
  },
  {
    id: "journal-7",
    nama: "Jurnal Seminggu",
    deskripsi: "Catat jurnal 7 hari",
    icon: "📝",
    kategori: "tracking",
    check: (c) => c.journal.length >= 7,
  },
  {
    id: "journal-30",
    nama: "Jurnal Sebulan",
    deskripsi: "Catat jurnal 30 hari",
    icon: "📖",
    kategori: "tracking",
    check: (c) => c.journal.length >= 30,
  },
];

export function checkNewlyUnlocked(
  ctx: AchievementContext,
  alreadyUnlocked: Record<string, unknown>,
): Achievement[] {
  return ACHIEVEMENTS.filter(
    (a) => !alreadyUnlocked[a.id] && a.check(ctx),
  );
}
