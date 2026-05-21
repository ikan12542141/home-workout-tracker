"use client";

import { exportAllData } from "./storage";
import { loadGDriveConfig, syncToGoogleDrive } from "./google-drive";

let syncTimer: ReturnType<typeof setTimeout> | null = null;
let isSyncing = false;

/**
 * Debounced auto-sync to Google Drive.
 * Call after any data mutation. Waits 5 seconds of inactivity before syncing.
 */
export function triggerAutoSync(): void {
  if (typeof window === "undefined") return;

  const cfg = loadGDriveConfig();
  if (!cfg?.clientId || !cfg.autoSync) return;

  if (syncTimer) clearTimeout(syncTimer);

  syncTimer = setTimeout(async () => {
    if (isSyncing) return;
    isSyncing = true;
    try {
      const backup = exportAllData();
      const json = JSON.stringify(backup);
      await syncToGoogleDrive(cfg.clientId, json);
    } catch {
      // Silent fail for auto-sync — user can manually sync from backup page
    } finally {
      isSyncing = false;
    }
  }, 5000);
}
