"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  exportAllData,
  importAllData,
  type FullBackup,
} from "@/lib/storage";
import {
  loadGDriveConfig,
  saveGDriveConfig,
  clearGDriveConfig,
  syncToGoogleDrive,
  restoreFromGoogleDrive,
  type GDriveConfig,
} from "@/lib/google-drive";

type Status = "idle" | "loading" | "success" | "error";

export default function BackupPage() {
  const [config, setConfig] = useState<GDriveConfig | null>(null);
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const cfg = loadGDriveConfig();
    setConfig(cfg);
    if (cfg?.clientId) setClientId(cfg.clientId);
  }, []);

  function saveClientId() {
    if (!clientId.trim()) return;
    const cfg: GDriveConfig = {
      ...config,
      clientId: clientId.trim(),
    };
    saveGDriveConfig(cfg);
    setConfig(cfg);
    setMessage("Client ID tersimpan!");
    setStatus("success");
    setTimeout(() => setStatus("idle"), 2000);
  }

  async function handleSync() {
    if (!config?.clientId) return;
    setStatus("loading");
    setMessage("Mengirim data ke Google Drive...");
    try {
      const backup = exportAllData();
      const json = JSON.stringify(backup, null, 2);
      const result = await syncToGoogleDrive(config.clientId, json);
      setConfig(loadGDriveConfig());
      setMessage(
        `Berhasil sync ke Google Drive! (${new Date(result.lastSyncAt).toLocaleString("id-ID")})`,
      );
      setStatus("success");
    } catch (err) {
      setMessage(`Gagal sync: ${err instanceof Error ? err.message : String(err)}`);
      setStatus("error");
    }
  }

  async function handleRestore() {
    if (!config?.clientId) return;
    if (
      !confirm(
        "Download backup dari Google Drive akan MENIMPA data lokal. Lanjut?",
      )
    )
      return;
    setStatus("loading");
    setMessage("Mengambil data dari Google Drive...");
    try {
      const result = await restoreFromGoogleDrive(config.clientId);
      const backup = JSON.parse(result.backupJson) as FullBackup;
      if (backup.version !== 1) {
        throw new Error("Versi backup tidak didukung");
      }
      importAllData(backup);
      setConfig(loadGDriveConfig());
      setMessage("Berhasil restore dari Google Drive! Refreshing...");
      setStatus("success");
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      setMessage(
        `Gagal restore: ${err instanceof Error ? err.message : String(err)}`,
      );
      setStatus("error");
    }
  }

  function handleDisconnect() {
    if (!confirm("Hapus koneksi Google Drive? Data lokal tetap aman.")) return;
    clearGDriveConfig();
    setConfig(null);
    setClientId("");
    setMessage("");
    setStatus("idle");
  }

  function toggleAutoSync() {
    if (!config) return;
    const updated: GDriveConfig = {
      ...config,
      autoSync: !config.autoSync,
    };
    saveGDriveConfig(updated);
    setConfig(updated);
  }

  // ---- JSON backup/restore (existing feature, moved here too) ----

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

  const handleImport = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
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
            `Backup dari ${data.exportedAt?.slice(0, 10) ?? "?"}. Data saat ini akan ditimpa. Lanjut?`,
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
    },
    [],
  );

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Backup & Sync
        </h1>
        <p className="text-[var(--muted)] mt-2">
          Lindungi data progres kamu. Sync ke Google Drive atau backup manual ke
          file JSON.
        </p>
      </div>

      {/* =========== GOOGLE DRIVE SECTION =========== */}
      <section className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-xl">
            ☁️
          </div>
          <div>
            <h2 className="text-lg font-semibold">Google Drive Backup</h2>
            <p className="text-xs text-[var(--muted)]">
              Simpan backup otomatis ke Google Drive kamu
            </p>
          </div>
        </div>

        {!config?.clientId ? (
          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-sm space-y-2">
              <p className="font-semibold text-blue-400">
                Setup Google Cloud (1x saja, gratis):
              </p>
              <ol className="list-decimal list-inside space-y-1 text-[var(--muted)]">
                <li>
                  Buka{" "}
                  <a
                    href="https://console.cloud.google.com/projectcreate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    Google Cloud Console — Create Project
                  </a>
                </li>
                <li>
                  Beri nama project (misal: &quot;Workout Tracker&quot;) → Create
                </li>
                <li>
                  Buka{" "}
                  <a
                    href="https://console.cloud.google.com/apis/library/drive.googleapis.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    Google Drive API
                  </a>{" "}
                  → klik <strong>Enable</strong>
                </li>
                <li>
                  Buka{" "}
                  <a
                    href="https://console.cloud.google.com/apis/credentials/oauthclient"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    Credentials → Create OAuth Client ID
                  </a>
                </li>
                <li>
                  Pilih <strong>Web application</strong>
                </li>
                <li>
                  Di &quot;Authorized JavaScript origins&quot; tambahkan:
                  <br />
                  <code className="bg-[var(--border)] px-1.5 py-0.5 rounded text-xs">
                    https://home-workout-tracker-lyart.vercel.app
                  </code>
                  <br />
                  <span className="text-xs">(dan <code className="bg-[var(--border)] px-1.5 py-0.5 rounded text-xs">http://localhost:3000</code> untuk testing lokal)</span>
                </li>
                <li>
                  Copy <strong>Client ID</strong> (format: xxx.apps.googleusercontent.com)
                </li>
                <li>
                  Buka{" "}
                  <a
                    href="https://console.cloud.google.com/apis/credentials/consent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    OAuth consent screen
                  </a>
                  {" "}→ tambahkan email kamu sebagai <strong>Test user</strong>
                </li>
              </ol>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="Paste Client ID di sini..."
                className="flex-1 rounded-xl bg-[var(--background)] border border-[var(--border)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
              <button
                onClick={saveClientId}
                disabled={!clientId.trim()}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium disabled:opacity-50 transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-green-400">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
              Google Drive terhubung
            </div>

            {config.lastSyncAt && (
              <p className="text-xs text-[var(--muted)]">
                Terakhir sync:{" "}
                {new Date(config.lastSyncAt).toLocaleString("id-ID")}
              </p>
            )}

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.autoSync ?? false}
                  onChange={toggleAutoSync}
                  className="h-4 w-4 rounded accent-[var(--accent)]"
                />
                <span className="text-sm">
                  Auto-sync setiap kali data berubah
                </span>
              </label>
            </div>

            {status === "loading" && (
              <div className="flex items-center gap-2 text-sm text-yellow-400">
                <span className="animate-spin">⏳</span>
                {message}
              </div>
            )}
            {status === "success" && (
              <div className="text-sm text-green-400">{message}</div>
            )}
            {status === "error" && (
              <div className="text-sm text-red-400">{message}</div>
            )}

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSync}
                disabled={status === "loading"}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium disabled:opacity-50 transition-colors"
              >
                ↑ Upload ke Drive
              </button>
              <button
                onClick={handleRestore}
                disabled={status === "loading"}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium disabled:opacity-50 transition-colors"
              >
                ↓ Restore dari Drive
              </button>
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/40 text-red-400 text-sm font-medium transition-colors"
              >
                Putuskan
              </button>
            </div>

            <p className="text-xs text-[var(--muted)]">
              Client ID: {config.clientId.slice(0, 20)}...
            </p>
          </div>
        )}
      </section>

      {/* =========== JSON BACKUP SECTION =========== */}
      <section className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-xl">
            💾
          </div>
          <div>
            <h2 className="text-lg font-semibold">Backup Manual (JSON)</h2>
            <p className="text-xs text-[var(--muted)]">
              Download / upload file backup ke komputer kamu
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={downloadBackup}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
          >
            ↓ Download Backup (JSON)
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-xl bg-[var(--border)] hover:bg-[var(--muted)]/20 text-sm font-medium transition-colors"
          >
            ↑ Import dari File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>

        {importMsg && (
          <p
            className={`text-sm ${importMsg.includes("berhasil") ? "text-green-400" : "text-red-400"}`}
          >
            {importMsg}
          </p>
        )}
      </section>

      {/* =========== INFO =========== */}
      <section className="text-xs text-[var(--muted)] space-y-1">
        <p>
          Data disimpan di browser (localStorage). Kalau cache/data browser
          dihapus, data bisa hilang.
        </p>
        <p>
          Backup ke Google Drive menyimpan semua: progres, profil, ukuran, foto,
          jurnal, personal records, & achievements.
        </p>
        <p>
          Google Drive hanya diakses untuk baca/tulis file backup ini —
          tidak ada data lain yang disentuh.
        </p>
      </section>
    </div>
  );
}
