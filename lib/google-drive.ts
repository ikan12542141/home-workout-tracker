"use client";

const GDRIVE_CONFIG_KEY = "hwt-gdrive-config";
const GDRIVE_FILE_NAME = "home-workout-tracker-backup.json";
const SCOPES = "https://www.googleapis.com/auth/drive.file";

export type GDriveConfig = {
  clientId: string;
  fileId?: string;
  lastSyncAt?: string;
  autoSync?: boolean;
};

export function loadGDriveConfig(): GDriveConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(GDRIVE_CONFIG_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GDriveConfig;
  } catch {
    return null;
  }
}

export function saveGDriveConfig(cfg: GDriveConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(GDRIVE_CONFIG_KEY, JSON.stringify(cfg));
}

export function clearGDriveConfig(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(GDRIVE_CONFIG_KEY);
}

/** Load Google Identity Services script dynamically */
function loadGisScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById("gis-script")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = "gis-script";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Gagal memuat Google Identity Services"));
    document.head.appendChild(script);
  });
}

type TokenResponse = {
  access_token: string;
  error?: string;
};

/** Get an OAuth2 access token via popup consent */
export async function getAccessToken(clientId: string): Promise<string> {
  await loadGisScript();

  return new Promise((resolve, reject) => {
    const g = (window as unknown as Record<string, unknown>).google as {
      accounts: {
        oauth2: {
          initTokenClient: (cfg: {
            client_id: string;
            scope: string;
            callback: (resp: TokenResponse) => void;
            error_callback: (err: { type: string; message?: string }) => void;
          }) => { requestAccessToken: () => void };
        };
      };
    };

    if (!g?.accounts?.oauth2) {
      reject(new Error("Google Identity Services belum dimuat"));
      return;
    }

    const client = g.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: SCOPES,
      callback: (resp) => {
        if (resp.error) {
          reject(new Error(resp.error));
        } else {
          resolve(resp.access_token);
        }
      },
      error_callback: (err) => {
        reject(new Error(err.message ?? err.type ?? "OAuth error"));
      },
    });

    client.requestAccessToken();
  });
}

/** Search for existing backup file in Drive */
async function findBackupFile(
  token: string,
): Promise<{ id: string; modifiedTime: string } | null> {
  const q = encodeURIComponent(
    `name='${GDRIVE_FILE_NAME}' and trashed=false`,
  );
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,modifiedTime)&spaces=drive`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) throw new Error(`Drive API error: ${res.status}`);
  const data = (await res.json()) as {
    files: { id: string; name: string; modifiedTime: string }[];
  };
  if (data.files.length === 0) return null;
  return { id: data.files[0].id, modifiedTime: data.files[0].modifiedTime };
}

/** Upload backup data to Google Drive (create or update) */
export async function uploadToDrive(
  token: string,
  backupJson: string,
  existingFileId?: string,
): Promise<{ fileId: string; modifiedTime: string }> {
  const metadata = {
    name: GDRIVE_FILE_NAME,
    mimeType: "application/json",
  };

  const boundary = "hwt_boundary_" + Date.now();
  const body =
    `--${boundary}\r\n` +
    `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
    `${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: application/json\r\n\r\n` +
    `${backupJson}\r\n` +
    `--${boundary}--`;

  let url: string;
  let method: string;
  if (existingFileId) {
    url = `https://www.googleapis.com/upload/drive/v3/files/${existingFileId}?uploadType=multipart&fields=id,modifiedTime`;
    method = "PATCH";
  } else {
    url = `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,modifiedTime`;
    method = "POST";
  }

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/related; boundary=${boundary}`,
    },
    body,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Upload gagal (${res.status}): ${txt}`);
  }

  const data = (await res.json()) as { id: string; modifiedTime: string };
  return { fileId: data.id, modifiedTime: data.modifiedTime };
}

/** Download backup data from Google Drive */
export async function downloadFromDrive(
  token: string,
  fileId: string,
): Promise<string> {
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) throw new Error(`Download gagal (${res.status})`);
  return res.text();
}

/** Full sync flow: upload local data to Drive */
export async function syncToGoogleDrive(
  clientId: string,
  backupJson: string,
): Promise<{ fileId: string; lastSyncAt: string }> {
  const token = await getAccessToken(clientId);
  const existing = await findBackupFile(token);
  const result = await uploadToDrive(token, backupJson, existing?.id);

  const cfg: GDriveConfig = {
    clientId,
    fileId: result.fileId,
    lastSyncAt: new Date().toISOString(),
    autoSync: loadGDriveConfig()?.autoSync ?? false,
  };
  saveGDriveConfig(cfg);

  return { fileId: result.fileId, lastSyncAt: cfg.lastSyncAt! };
}

/** Full restore flow: download from Drive and return backup JSON string */
export async function restoreFromGoogleDrive(
  clientId: string,
): Promise<{ backupJson: string; fileId: string }> {
  const token = await getAccessToken(clientId);
  const existing = await findBackupFile(token);
  if (!existing) {
    throw new Error("Tidak ada backup ditemukan di Google Drive");
  }

  const backupJson = await downloadFromDrive(token, existing.id);

  const cfg: GDriveConfig = {
    clientId,
    fileId: existing.id,
    lastSyncAt: loadGDriveConfig()?.lastSyncAt,
    autoSync: loadGDriveConfig()?.autoSync ?? false,
  };
  saveGDriveConfig(cfg);

  return { backupJson, fileId: existing.id };
}
