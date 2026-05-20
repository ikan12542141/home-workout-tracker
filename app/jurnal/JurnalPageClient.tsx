"use client";

import { useEffect, useState } from "react";
import {
  addJournalEntry,
  deleteJournalEntry,
  loadJournal,
  type JournalEntry,
} from "@/lib/storage";

const MOODS = ["😄 Bagus", "😊 Oke", "😐 Biasa", "😴 Capek", "😞 Lemes", "🔥 Fired up"];

export default function JurnalPageClient() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [form, setForm] = useState<JournalEntry>({
    tanggal: new Date().toISOString().slice(0, 10),
    energi: 7,
    mood: "😊 Oke",
    catatan: "",
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setEntries(loadJournal());
    setHydrated(true);
  }, []);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const next = addJournalEntry(form);
    setEntries(next);
    setForm({
      tanggal: new Date().toISOString().slice(0, 10),
      energi: 7,
      mood: "😊 Oke",
      catatan: "",
    });
  }

  function handleDelete(tanggal: string) {
    if (!confirm("Hapus jurnal ini?")) return;
    setEntries(deleteJournalEntry(tanggal));
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Jurnal Harian</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Catat energi, mood, dan kendala tiap hari. 1-2 menit/hari. Bantu kamu
          identifikasi pola — misal hari kurang tidur = latihan berat = burnout.
        </p>
      </header>

      <form
        onSubmit={handleSave}
        className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-4"
      >
        <h2 className="text-lg font-semibold">Catat Hari Ini</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1 text-sm">
            <span className="text-[var(--muted)]">Tanggal</span>
            <input
              type="date"
              required
              value={form.tanggal}
              onChange={(e) =>
                setForm((f) => ({ ...f, tanggal: e.target.value }))
              }
              className="w-full rounded-md border border-[var(--border)] bg-transparent px-2 py-1.5 text-sm"
            />
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-[var(--muted)]">Energi: {form.energi}/10</span>
            <input
              type="range"
              min={1}
              max={10}
              value={form.energi}
              onChange={(e) =>
                setForm((f) => ({ ...f, energi: Number(e.target.value) }))
              }
              className="w-full accent-[var(--accent)]"
            />
          </label>
        </div>

        <div className="space-y-1">
          <span className="text-sm text-[var(--muted)]">Mood</span>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setForm((f) => ({ ...f, mood: m }))}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  form.mood === m
                    ? "bg-[var(--accent)] text-black font-semibold"
                    : "bg-[var(--background)] text-[var(--muted)] border border-[var(--border)] hover:text-[var(--foreground)]"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <label className="space-y-1 text-sm block">
          <span className="text-[var(--muted)]">Catatan</span>
          <textarea
            rows={3}
            value={form.catatan}
            onChange={(e) =>
              setForm((f) => ({ ...f, catatan: e.target.value }))
            }
            placeholder="Apa yang berjalan baik hari ini? Apa kendalanya? Bagaimana latihan tadi?"
            className="w-full rounded-md border border-[var(--border)] bg-transparent px-2 py-1.5 text-sm"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
        >
          Simpan Jurnal
        </button>
      </form>

      {hydrated && entries.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Riwayat ({entries.length})</h2>
          <div className="space-y-2">
            {entries.map((e) => (
              <div
                key={e.tanggal}
                className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 space-y-1"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <span className="font-mono text-sm text-[var(--muted)]">
                      {e.tanggal}
                    </span>
                    <span className="ml-3 font-semibold">{e.mood}</span>
                    <span className="ml-3 text-sm text-[var(--accent)]">
                      Energi {e.energi}/10
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(e.tanggal)}
                    className="text-xs text-red-400 hover:underline"
                  >
                    Hapus
                  </button>
                </div>
                {e.catatan && (
                  <p className="text-sm text-[var(--foreground)] whitespace-pre-wrap">
                    {e.catatan}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
