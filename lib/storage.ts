"use client";

const STORAGE_KEY = "hwt-progress-v1";
const PROFILE_KEY = "hwt-profile-v1";

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

export function loadProgress(): Progress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Progress;
    return {
      completedDays: parsed.completedDays ?? {},
      completedSets: parsed.completedSets ?? {},
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(p: Progress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
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
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}
