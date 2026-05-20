import { Suspense } from "react";
import JadwalContent from "./JadwalContent";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="text-[var(--muted)] text-sm">Memuat jadwal...</div>
      }
    >
      <JadwalContent />
    </Suspense>
  );
}
