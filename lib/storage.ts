"use client";

import { triggerAutoSync } from "./auto-sync";

const STORAGE_KEY = "hwt-progress-v1";
const PROFILE_KEY = "hwt-profile-v1";
const MEASUREMENTS_KEY = "hwt-measurements-v1";
const PHOTOS_KEY = "hwt-photos-v1";
const JOURNAL_KEY = "hwt-journal-v1";
const RECORDS_KEY = "hwt-records-v1";
const ACHIEVEMENTS_KEY = "hwt-achievements-v1";

export type Progress = {
  completedDays: Record<string, string>;
  completedSets: Record<string, boolean>;
};

export type Profile = {
  nama: string;
  umur: number;
  tinggi: number;
  berat: number;
  goal: string;
  startDate: string;
};

export type Measurement = {
  /** ISO date string (YYYY-MM-DD) */
  tanggal: string;
  berat?: number;
  lenganKiri?: number;
  lenganKanan?: number;
  dada?: number;
  pinggang?: number;
  paha?: number;
  catatan?: string;
};

export type Photo = {
  id: string;
  tanggal: string;
  dataUrl: string;
  catatan?: string;
};

export type JournalEntry = {
  tanggal: string;
  energi: number;
  mood: string;
  catatan: string;
};

export type PersonalRecord = {
  exerciseId: string;
  value: number;
  unit: "reps" | "detik";
  tanggal: string;
};

const DEFAULT_PROGRESS: Progress = {
  completedDays: {},
  completedSets: {},
};

const DEFAULT_PROFILE: Profile = {
  nama: "Ikan",
  umur: 21,
  tinggi: 170,
  berat: 60,
  goal: "Bentuk lengan, bisep, dan perut. Bangun kebiasaan rutin olahraga.",
  startDate: new Date().toISOString().slice(0, 10),
};

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// =========== PROGRESS ===========

export function loadProgress(): Progress {
  const p = readJSON<Partial<Progress>>(STORAGE_KEY, DEFAULT_PROGRESS);
  return {
    completedDays: p.completedDays ?? {},
    completedSets: p.completedSets ?? {},
  };
}

export function saveProgress(p: Progress): void {
  writeJSON(STORAGE_KEY, p);
  triggerAutoSync();
}

export function toggleDayComplete(dayKey: string): Progress {
  const p = loadProgress();
  if (p.completedDays[dayKey]) {
    delete p.completedDays[dayKey];
  } else {
    p.completedDays[dayKey] = new Date().toISOString();
  }
  saveProgress(p);
  return p;
}

export function toggleSetComplete(setKey: string): Progress {
  const p = loadProgress();
  p.completedSets[setKey] = !p.completedSets[setKey];
  saveProgress(p);
  return p;
}

export function resetProgress(): Progress {
  saveProgress(DEFAULT_PROGRESS);
  return DEFAULT_PROGRESS;
}

// =========== PROFILE ===========

export function loadProfile(): Profile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...(JSON.parse(raw) as Partial<Profile>) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(p: Profile): void {
  writeJSON(PROFILE_KEY, p);
  triggerAutoSync();
}

// =========== MEASUREMENTS ===========

export function loadMeasurements(): Measurement[] {
  return readJSON<Measurement[]>(MEASUREMENTS_KEY, []);
}

export function saveMeasurements(arr: Measurement[]): void {
  writeJSON(MEASUREMENTS_KEY, arr);
  triggerAutoSync();
}

export function addMeasurement(m: Measurement): Measurement[] {
  const all = loadMeasurements();
  const existing = all.findIndex((x) => x.tanggal === m.tanggal);
  if (existing >= 0) {
    all[existing] = m;
  } else {
    all.push(m);
  }
  all.sort((a, b) => a.tanggal.localeCompare(b.tanggal));
  saveMeasurements(all);
  return all;
}

export function deleteMeasurement(tanggal: string): Measurement[] {
  const all = loadMeasurements().filter((m) => m.tanggal !== tanggal);
  saveMeasurements(all);
  return all;
}

// =========== PHOTOS ===========

export function loadPhotos(): Photo[] {
  return readJSON<Photo[]>(PHOTOS_KEY, []);
}

export function savePhotos(arr: Photo[]): void {
  writeJSON(PHOTOS_KEY, arr);
  triggerAutoSync();
}

export function addPhoto(p: Photo): Photo[] {
  const all = loadPhotos();
  all.push(p);
  all.sort((a, b) => a.tanggal.localeCompare(b.tanggal));
  savePhotos(all);
  return all;
}

export function deletePhoto(id: string): Photo[] {
  const all = loadPhotos().filter((p) => p.id !== id);
  savePhotos(all);
  return all;
}

// =========== JOURNAL ===========

export function loadJournal(): JournalEntry[] {
  return readJSON<JournalEntry[]>(JOURNAL_KEY, []);
}

export function saveJournal(arr: JournalEntry[]): void {
  writeJSON(JOURNAL_KEY, arr);
  triggerAutoSync();
}

export function addJournalEntry(e: JournalEntry): JournalEntry[] {
  const all = loadJournal();
  const existing = all.findIndex((x) => x.tanggal === e.tanggal);
  if (existing >= 0) {
    all[existing] = e;
  } else {
    all.push(e);
  }
  all.sort((a, b) => b.tanggal.localeCompare(a.tanggal));
  saveJournal(all);
  return all;
}

export function deleteJournalEntry(tanggal: string): JournalEntry[] {
  const all = loadJournal().filter((e) => e.tanggal !== tanggal);
  saveJournal(all);
  return all;
}

// =========== PERSONAL RECORDS ===========

export function loadRecords(): PersonalRecord[] {
  return readJSON<PersonalRecord[]>(RECORDS_KEY, []);
}

export function saveRecords(arr: PersonalRecord[]): void {
  writeJSON(RECORDS_KEY, arr);
  triggerAutoSync();
}

/** Submit a new record. If it's better than existing for this exercise, update. Returns the updated list and a flag. */
export function submitRecord(r: PersonalRecord): {
  records: PersonalRecord[];
  isNewPR: boolean;
} {
  const all = loadRecords();
  const existingIdx = all.findIndex((x) => x.exerciseId === r.exerciseId);
  if (existingIdx < 0) {
    all.push(r);
    saveRecords(all);
    return { records: all, isNewPR: true };
  }
  const existing = all[existingIdx];
  if (r.value > existing.value) {
    all[existingIdx] = r;
    saveRecords(all);
    return { records: all, isNewPR: true };
  }
  return { records: all, isNewPR: false };
}

export function deleteRecord(exerciseId: string): PersonalRecord[] {
  const all = loadRecords().filter((r) => r.exerciseId !== exerciseId);
  saveRecords(all);
  return all;
}

// =========== ACHIEVEMENTS ===========

export type AchievementUnlock = {
  id: string;
  unlockedAt: string;
};

export function loadAchievements(): Record<string, AchievementUnlock> {
  return readJSON<Record<string, AchievementUnlock>>(ACHIEVEMENTS_KEY, {});
}

export function saveAchievements(map: Record<string, AchievementUnlock>): void {
  writeJSON(ACHIEVEMENTS_KEY, map);
  triggerAutoSync();
}

export function unlockAchievement(id: string): boolean {
  const all = loadAchievements();
  if (all[id]) return false;
  all[id] = { id, unlockedAt: new Date().toISOString() };
  saveAchievements(all);
  return true;
}

// =========== ALTERNATIVE EXERCISE PREFERENCES ===========

const ALT_PREFS_KEY = "hwt-alt-prefs-v1";

/** Map of exerciseId → true if user prefers the no-equipment alternative */
export type AltPrefs = Record<string, boolean>;

export function loadAltPrefs(): AltPrefs {
  return readJSON<AltPrefs>(ALT_PREFS_KEY, {});
}

export function saveAltPrefs(prefs: AltPrefs): void {
  writeJSON(ALT_PREFS_KEY, prefs);
  triggerAutoSync();
}

export function toggleAltPref(exerciseId: string): AltPrefs {
  const prefs = loadAltPrefs();
  prefs[exerciseId] = !prefs[exerciseId];
  saveAltPrefs(prefs);
  return prefs;
}

// =========== EXPORT / IMPORT ===========

export type FullBackup = {
  version: 1;
  exportedAt: string;
  progress: Progress;
  profile: Profile;
  measurements: Measurement[];
  photos: Photo[];
  journal: JournalEntry[];
  records: PersonalRecord[];
  achievements: Record<string, AchievementUnlock>;
  altPrefs?: AltPrefs;
};

export function exportAllData(): FullBackup {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    progress: loadProgress(),
    profile: loadProfile(),
    measurements: loadMeasurements(),
    photos: loadPhotos(),
    journal: loadJournal(),
    records: loadRecords(),
    achievements: loadAchievements(),
    altPrefs: loadAltPrefs(),
  };
}

export function importAllData(backup: FullBackup): void {
  if (backup.version !== 1) throw new Error("Versi backup tidak didukung");
  saveProgress(backup.progress);
  saveProfile(backup.profile);
  saveMeasurements(backup.measurements);
  savePhotos(backup.photos);
  saveJournal(backup.journal);
  saveRecords(backup.records);
  saveAchievements(backup.achievements);
  if (backup.altPrefs) saveAltPrefs(backup.altPrefs);
}
