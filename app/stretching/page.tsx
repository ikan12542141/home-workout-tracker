"use client";

import Link from "next/link";
import { useState } from "react";
import VideoEmbed from "@/components/VideoEmbed";

type StretchExercise = {
  nama: string;
  durasi: string;
  target: string;
  langkah: string[];
  videoId?: string;
};

type StretchRoutine = {
  id: string;
  nama: string;
  emoji: string;
  deskripsi: string;
  durasi: string;
  kapan: string;
  latihan: StretchExercise[];
};

const ROUTINES: StretchRoutine[] = [
  {
    id: "pagi",
    nama: "Morning Mobility",
    emoji: "🌅",
    deskripsi: "Bangunkan tubuh setelah tidur. Cocok dilakukan segera setelah bangun.",
    durasi: "~8 menit",
    kapan: "Setiap pagi setelah bangun tidur",
    latihan: [
      {
        nama: "Cat-Cow Stretch",
        durasi: "60 detik (10 siklus)",
        target: "Tulang belakang, core",
        langkah: [
          "Posisi merangkak: tangan di bawah bahu, lutut di bawah pinggul.",
          "INHALE (Cow): Turunkan perut ke arah lantai, angkat kepala dan tailbone ke atas.",
          "EXHALE (Cat): Bulatkan punggung ke atas, tarik dagu ke dada, kencangkan perut.",
          "Lakukan perlahan, rasakan gerakan di setiap ruas tulang belakang.",
        ],
        videoId: "kqnua4rHVVA",
      },
      {
        nama: "World's Greatest Stretch",
        durasi: "60 detik per sisi",
        target: "Hip flexor, dada, hamstring, thoracic",
        langkah: [
          "Mulai dari posisi lunge kiri depan (kaki kanan di belakang).",
          "Taruh tangan kiri di samping kaki kiri.",
          "Putar badan ke kiri, tangan kiri ke atas (buka dada).",
          "Tahan 3 detik, kembali. Ulangi 5x per sisi.",
        ],
        videoId: "CxELEiDIFBk",
      },
      {
        nama: "Arm Circles + Shoulder Roll",
        durasi: "60 detik",
        target: "Bahu, rotator cuff",
        langkah: [
          "Berdiri tegak, rentangkan tangan ke samping.",
          "Buat lingkaran kecil ke depan 15x.",
          "Buat lingkaran kecil ke belakang 15x.",
          "Angkat bahu ke telinga, putar ke belakang, turunkan. 10x.",
        ],
        videoId: "QFOiDiD51HA",
      },
      {
        nama: "Standing Quad + Hip Flexor Stretch",
        durasi: "30 detik per kaki",
        target: "Quadricep, hip flexor",
        langkah: [
          "Berdiri satu kaki, pegang pergelangan kaki yang ditekuk ke belakang.",
          "Tarik tumit ke pantat, lutut sejajar.",
          "Dorong pinggul sedikit ke depan untuk peregangan lebih.",
          "Tahan 30 detik. Ganti kaki.",
        ],
        videoId: "YQmpO9VT2X4",
      },
      {
        nama: "Standing Hamstring Stretch",
        durasi: "30 detik per kaki",
        target: "Hamstring, lower back",
        langkah: [
          "Berdiri, taruh satu kaki di depan dengan tumit di lantai, jari kaki ke atas.",
          "Tekuk badan ke depan dari pinggul (bukan punggung).",
          "Rasakan peregangan di belakang paha.",
          "Tahan 30 detik. Ganti kaki.",
        ],
        videoId: "FDwpEdBbFxg",
      },
      {
        nama: "Neck Rolls",
        durasi: "60 detik",
        target: "Leher, trapezius",
        langkah: [
          "Miringkan kepala ke kanan, tahan 10 detik.",
          "Miringkan ke kiri, tahan 10 detik.",
          "Putar leher perlahan searah jarum jam 5x.",
          "Putar berlawanan arah 5x.",
        ],
      },
    ],
  },
  {
    id: "pasca-latihan",
    nama: "Post-Workout Cooldown",
    emoji: "🧘",
    deskripsi: "Peregangan setelah latihan untuk mempercepat recovery dan mengurangi DOMS (nyeri otot).",
    durasi: "~10 menit",
    kapan: "Segera setelah latihan selesai",
    latihan: [
      {
        nama: "Chest Doorway Stretch",
        durasi: "30 detik per sisi",
        target: "Dada, bahu depan",
        langkah: [
          "Berdiri di samping kusen pintu atau tembok.",
          "Taruh lengan bawah di tembok, siku setinggi bahu (90 derajat).",
          "Langkah kaki depan melewati tembok sampai dada terbuka.",
          "Tahan 30 detik. Ganti sisi.",
        ],
        videoId: "hb0Vmnb0gVY",
      },
      {
        nama: "Tricep Overhead Stretch",
        durasi: "30 detik per tangan",
        target: "Tricep, bahu",
        langkah: [
          "Angkat satu tangan ke atas, tekuk siku ke belakang kepala.",
          "Tangan lain pegang siku dan tarik perlahan.",
          "Tahan 30 detik. Ganti tangan.",
        ],
      },
      {
        nama: "Cross-body Shoulder Stretch",
        durasi: "30 detik per tangan",
        target: "Bahu belakang, deltoid",
        langkah: [
          "Tarik satu tangan menyilang depan dada.",
          "Tangan lain tekan di atas siku (bukan di siku).",
          "Jaga bahu turun, jangan angkat.",
          "Tahan 30 detik. Ganti tangan.",
        ],
      },
      {
        nama: "Seated Forward Fold",
        durasi: "60 detik",
        target: "Hamstring, lower back",
        langkah: [
          "Duduk kaki lurus ke depan.",
          "Tekuk badan ke depan dari pinggul, tangan raih ke jari kaki.",
          "Jangan paksa — raih sejauh yang nyaman.",
          "Bernapas dalam, setiap exhale coba sedikit lebih jauh.",
        ],
        videoId: "g_tea8ZNorA",
      },
      {
        nama: "Pigeon Pose",
        durasi: "45 detik per sisi",
        target: "Glute, hip rotator, piriformis",
        langkah: [
          "Dari posisi merangkak, bawa lutut kanan ke depan ke belakang pergelangan tangan kanan.",
          "Kaki kiri lurus ke belakang.",
          "Turunkan badan ke depan perlahan.",
          "Tahan 45 detik. Ganti sisi.",
        ],
        videoId: "FVuKoeM3OBw",
      },
      {
        nama: "Lying Spinal Twist",
        durasi: "45 detik per sisi",
        target: "Tulang belakang, core, punggung bawah",
        langkah: [
          "Berbaring telentang, tekuk kedua lutut.",
          "Rentangkan tangan ke samping (T position).",
          "Jatuhkan kedua lutut ke kanan, kepala putar ke kiri.",
          "Tahan 45 detik. Ganti sisi.",
        ],
        videoId: "jYN5oMn4h-U",
      },
      {
        nama: "Child's Pose",
        durasi: "60 detik",
        target: "Punggung bawah, bahu, lats",
        langkah: [
          "Berlutut, duduk di tumit.",
          "Rentangkan tangan ke depan sejauh mungkin.",
          "Kening di lantai.",
          "Bernapas dalam, rileks sepenuhnya.",
        ],
        videoId: "2MJGg-dUKh0",
      },
    ],
  },
  {
    id: "malam",
    nama: "Evening Wind-Down",
    emoji: "🌙",
    deskripsi: "Peregangan ringan sebelum tidur. Bantu relaksasi dan kualitas tidur lebih baik.",
    durasi: "~7 menit",
    kapan: "30-60 menit sebelum tidur",
    latihan: [
      {
        nama: "Standing Forward Fold",
        durasi: "60 detik",
        target: "Hamstring, punggung bawah",
        langkah: [
          "Berdiri, kaki selebar pinggul.",
          "Tekuk badan ke depan dari pinggul, biarkan tangan menggantung.",
          "Tekuk sedikit lutut kalau perlu.",
          "Rileks, biarkan gravitasi yang bekerja. Goyangkan pelan.",
        ],
      },
      {
        nama: "Seated Butterfly Stretch",
        durasi: "60 detik",
        target: "Hip adductor, paha dalam",
        langkah: [
          "Duduk, telapak kaki saling menempel (posisi kupu-kupu).",
          "Pegang pergelangan kaki, siku di paha.",
          "Tekan lutut ke bawah perlahan dengan siku.",
          "Tegakkan punggung, tahan 60 detik.",
        ],
        videoId: "JQz0eVapMFo",
      },
      {
        nama: "Wrist Circles + Forearm Stretch",
        durasi: "60 detik",
        target: "Pergelangan tangan, forearm (penting untuk hand grip recovery)",
        langkah: [
          "Putar pergelangan tangan searah jarum jam 10x per tangan.",
          "Putar berlawanan arah 10x per tangan.",
          "Luruskan tangan ke depan, telapak menghadap ke atas. Tangan lain tarik jari ke bawah. 20 detik per tangan.",
          "Balik telapak ke bawah, tarik jari ke bawah. 20 detik per tangan.",
        ],
      },
      {
        nama: "Supine Figure-4 Stretch",
        durasi: "45 detik per sisi",
        target: "Glute, piriformis, hip",
        langkah: [
          "Berbaring telentang.",
          "Taruh pergelangan kaki kanan di atas lutut kiri.",
          "Tarik lutut kiri ke dada (bisa pegang belakang paha kiri).",
          "Tahan 45 detik. Ganti sisi.",
        ],
        videoId: "JQz0eVapMFo",
      },
      {
        nama: "Legs Up the Wall",
        durasi: "2 menit",
        target: "Hamstring, sirkulasi, relaksasi",
        langkah: [
          "Berbaring di dekat tembok.",
          "Angkat kaki lurus ke tembok (pantat rapat ke tembok).",
          "Tangan rileks di samping badan.",
          "Tutup mata, bernapas dalam 2 menit. Ini posisi recovery terbaik.",
        ],
        videoId: "ZqXrA_dG53Q",
      },
    ],
  },
];

export default function StretchingPage() {
  const [openRoutine, setOpenRoutine] = useState<string | null>(null);
  const [openVideo, setOpenVideo] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] mb-2 inline-block">
          ← kembali ke beranda
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Stretching & Mobility
        </h1>
        <p className="text-[var(--muted)] mt-1 max-w-2xl">
          Peregangan rutin mencegah cedera, mempercepat recovery, dan meningkatkan fleksibilitas.
          Terutama penting untuk pemula yang baru mulai olahraga.
        </p>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-sm text-amber-200">
        💡 <strong>Tips:</strong> Jangan pernah stretch otot dingin. Lakukan setelah pemanasan ringan (jalan kaki 2 menit / jumping jack 30 detik).
        Jangan sampai sakit — peregangan harus terasa &quot;enak sakit&quot;, bukan nyeri tajam.
      </div>

      <div className="space-y-4">
        {ROUTINES.map((routine) => {
          const isOpen = openRoutine === routine.id;
          return (
            <div key={routine.id} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenRoutine(isOpen ? null : routine.id)}
                className="w-full text-left p-5 hover:bg-[var(--background)]/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{routine.emoji}</span>
                      <h2 className="text-lg font-bold">{routine.nama}</h2>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)]">
                        {routine.durasi}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--muted)]">{routine.deskripsi}</p>
                    <p className="text-xs text-[var(--muted)] mt-1">Kapan: {routine.kapan}</p>
                  </div>
                  <span className="text-[var(--muted)] text-xl">
                    {isOpen ? "▼" : "▶"}
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-[var(--border)] divide-y divide-[var(--border)]">
                  {routine.latihan.map((ex, idx) => (
                    <div key={idx} className="p-4">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div>
                          <h3 className="font-semibold text-sm">{ex.nama}</h3>
                          <div className="text-xs text-[var(--muted)]">
                            {ex.durasi} · Target: {ex.target}
                          </div>
                        </div>
                        <span className="text-xs font-mono text-[var(--muted)]">{idx + 1}/{routine.latihan.length}</span>
                      </div>
                      <ol className="space-y-1 mb-2">
                        {ex.langkah.map((l, i) => (
                          <li key={i} className="text-sm text-[var(--muted)] flex gap-2">
                            <span className="text-[var(--accent)] font-mono shrink-0 text-xs">{i + 1}.</span>
                            <span>{l}</span>
                          </li>
                        ))}
                      </ol>
                      {ex.videoId && (
                        <div>
                          <button
                            type="button"
                            onClick={() => setOpenVideo(openVideo === `${routine.id}-${idx}` ? null : `${routine.id}-${idx}`)}
                            className="text-xs text-[var(--accent)] hover:underline"
                          >
                            {openVideo === `${routine.id}-${idx}` ? "Tutup Video" : "Lihat Video Tutorial"}
                          </button>
                          {openVideo === `${routine.id}-${idx}` && (
                            <div className="mt-2">
                              <VideoEmbed videoId={ex.videoId} title={ex.nama} />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5">
        <h2 className="font-bold mb-3">Rekomendasi Jadwal Stretching</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-[var(--accent)] font-mono shrink-0">🌅</span>
            <div>
              <strong>Morning Mobility</strong> — setiap hari setelah bangun tidur (8 menit).
              Bangunkan sendi & otot, tingkatkan aliran darah.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[var(--accent)] font-mono shrink-0">🧘</span>
            <div>
              <strong>Post-Workout Cooldown</strong> — setelah latihan (Senin, Selasa, Kamis, Jumat, Sabtu).
              Kurangi DOMS, percepat recovery.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[var(--accent)] font-mono shrink-0">🌙</span>
            <div>
              <strong>Evening Wind-Down</strong> — sebelum tidur pada hari latihan berat.
              Bantu relaksasi, tingkatkan kualitas tidur.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
