"use client";

import { useEffect, useState } from "react";
import {
  addMeasurement,
  addPhoto,
  deleteMeasurement,
  deletePhoto,
  loadMeasurements,
  loadPhotos,
  type Measurement,
  type Photo,
} from "@/lib/storage";

export default function UkuranPageClient() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [form, setForm] = useState<Measurement>({
    tanggal: new Date().toISOString().slice(0, 10),
  });
  const [photoCatatan, setPhotoCatatan] = useState("");
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setMeasurements(loadMeasurements());
    setPhotos(loadPhotos());
    setHydrated(true);
  }, []);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.tanggal) return;
    const next = addMeasurement(form);
    setMeasurements(next);
    setForm({ tanggal: new Date().toISOString().slice(0, 10) });
  }

  async function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const compressed = await compressImage(file, 800, 0.7);
      const photo: Photo = {
        id: Math.random().toString(36).slice(2) + Date.now(),
        tanggal: new Date().toISOString().slice(0, 10),
        dataUrl: compressed,
        catatan: photoCatatan || undefined,
      };
      const next = addPhoto(photo);
      setPhotos(next);
      setPhotoCatatan("");
      if (e.target) e.target.value = "";
    } catch (err) {
      console.error(err);
      alert("Gagal memproses foto");
    } finally {
      setLoading(false);
    }
  }

  function handleDeleteMeasurement(tanggal: string) {
    if (!confirm("Hapus pengukuran ini?")) return;
    setMeasurements(deleteMeasurement(tanggal));
  }

  function handleDeletePhoto(id: string) {
    if (!confirm("Hapus foto ini?")) return;
    setPhotos(deletePhoto(id));
  }

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Ukuran Badan</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Ukur tiap 2 minggu — pakai pita ukur (meteran kain). Catat lingkar
          bisep saat dikontraksikan (flex). Upload foto bulanan untuk progres
          visual.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={handleSave}
          className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-3"
        >
          <h2 className="text-lg font-semibold">Catat Pengukuran</h2>
          <div className="grid grid-cols-2 gap-3">
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
              <span className="text-[var(--muted)]">Berat (kg)</span>
              <input
                type="number"
                step="0.1"
                value={form.berat ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    berat: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
                className="w-full rounded-md border border-[var(--border)] bg-transparent px-2 py-1.5 text-sm"
              />
            </label>
            <label className="space-y-1 text-sm">
              <span className="text-[var(--muted)]">Lengan kiri (cm)</span>
              <input
                type="number"
                step="0.1"
                value={form.lenganKiri ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    lenganKiri: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  }))
                }
                className="w-full rounded-md border border-[var(--border)] bg-transparent px-2 py-1.5 text-sm"
              />
            </label>
            <label className="space-y-1 text-sm">
              <span className="text-[var(--muted)]">Lengan kanan (cm)</span>
              <input
                type="number"
                step="0.1"
                value={form.lenganKanan ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    lenganKanan: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  }))
                }
                className="w-full rounded-md border border-[var(--border)] bg-transparent px-2 py-1.5 text-sm"
              />
            </label>
            <label className="space-y-1 text-sm">
              <span className="text-[var(--muted)]">Dada (cm)</span>
              <input
                type="number"
                step="0.1"
                value={form.dada ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    dada: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
                className="w-full rounded-md border border-[var(--border)] bg-transparent px-2 py-1.5 text-sm"
              />
            </label>
            <label className="space-y-1 text-sm">
              <span className="text-[var(--muted)]">Pinggang (cm)</span>
              <input
                type="number"
                step="0.1"
                value={form.pinggang ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    pinggang: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  }))
                }
                className="w-full rounded-md border border-[var(--border)] bg-transparent px-2 py-1.5 text-sm"
              />
            </label>
            <label className="space-y-1 text-sm col-span-2">
              <span className="text-[var(--muted)]">Paha (cm) — opsional</span>
              <input
                type="number"
                step="0.1"
                value={form.paha ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    paha: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
                className="w-full rounded-md border border-[var(--border)] bg-transparent px-2 py-1.5 text-sm"
              />
            </label>
            <label className="space-y-1 text-sm col-span-2">
              <span className="text-[var(--muted)]">Catatan</span>
              <input
                type="text"
                value={form.catatan ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, catatan: e.target.value }))
                }
                placeholder="mis. bangun tidur, perut kosong"
                className="w-full rounded-md border border-[var(--border)] bg-transparent px-2 py-1.5 text-sm"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
          >
            Simpan
          </button>
        </form>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-3">
          <h2 className="text-lg font-semibold">Upload Foto Progres</h2>
          <p className="text-xs text-[var(--muted)]">
            Foto cermin (depan, samping, belakang) — pakai celana sama, pose
            sama, jam yang sama. Disimpan di browser kamu, tidak diupload ke
            internet.
          </p>
          <input
            type="text"
            placeholder="Catatan foto (mis. depan, minggu 4)"
            value={photoCatatan}
            onChange={(e) => setPhotoCatatan(e.target.value)}
            className="w-full rounded-md border border-[var(--border)] bg-transparent px-2 py-1.5 text-sm"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            disabled={loading}
            className="w-full text-sm text-[var(--muted)] file:mr-3 file:rounded-md file:border-0 file:bg-[var(--accent)] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-black"
          />
          {loading && (
            <p className="text-xs text-[var(--muted)]">Mengompres foto...</p>
          )}
        </div>
      </section>

      {hydrated && measurements.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Riwayat Pengukuran</h2>
          <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <table className="w-full text-sm">
              <thead className="bg-[var(--background)] text-xs text-[var(--muted)]">
                <tr>
                  <th className="px-3 py-2 text-left">Tanggal</th>
                  <th className="px-3 py-2 text-right">Berat</th>
                  <th className="px-3 py-2 text-right">L. Kiri</th>
                  <th className="px-3 py-2 text-right">L. Kanan</th>
                  <th className="px-3 py-2 text-right">Dada</th>
                  <th className="px-3 py-2 text-right">Pinggang</th>
                  <th className="px-3 py-2 text-right">Paha</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {[...measurements].reverse().map((m) => (
                  <tr
                    key={m.tanggal}
                    className="border-t border-[var(--border)]"
                  >
                    <td className="px-3 py-2 font-mono">{m.tanggal}</td>
                    <td className="px-3 py-2 text-right">{m.berat ?? "-"}</td>
                    <td className="px-3 py-2 text-right">
                      {m.lenganKiri ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {m.lenganKanan ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-right">{m.dada ?? "-"}</td>
                    <td className="px-3 py-2 text-right">
                      {m.pinggang ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-right">{m.paha ?? "-"}</td>
                    <td className="px-3 py-2 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteMeasurement(m.tanggal)}
                        className="text-red-400 hover:underline text-xs"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {hydrated && photos.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Galeri Foto Progres</h2>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {photos.map((p) => (
              <div
                key={p.id}
                className="rounded-lg border border-[var(--border)] overflow-hidden bg-[var(--card)] group relative"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.dataUrl}
                  alt={p.catatan ?? p.tanggal}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-2 text-xs">
                  <p className="font-mono text-[var(--muted)]">{p.tanggal}</p>
                  {p.catatan && (
                    <p className="text-[var(--foreground)] mt-1">
                      {p.catatan}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleDeletePhoto(p.id)}
                  className="absolute top-1 right-1 bg-black/60 text-red-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

async function compressImage(
  file: File,
  maxWidth: number,
  quality: number,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ratio = Math.min(1, maxWidth / img.width);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => reject(new Error("Gagal load gambar"));
    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("Gagal baca file"));
    reader.readAsDataURL(file);
  });
}
