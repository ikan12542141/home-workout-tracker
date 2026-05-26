export type WorkoutSet = {
  exerciseId: string;
  set: number;
  reps?: string;
  durasi?: string;
  istirahat: string;
};

export type WorkoutDay = {
  hari: string;
  fokus: string;
  isRest: boolean;
  durasiTotal: string;
  pemanasan?: string[];
  latihan: WorkoutSet[];
  pendinginan?: string[];
  catatan?: string;
};

export type WeekProgram = {
  minggu: number;
  judul: string;
  deskripsi: string;
  hari: WorkoutDay[];
};

const PEMANASAN_STANDAR = [
  "Jumping jack 60 detik",
  "Arm circles (10 ke depan + 10 ke belakang)",
  "Hip rotation kiri & kanan 10x",
  "Squat ringan 10x",
];

const PENDINGINAN_STANDAR = [
  "Stretching dada (tangan di tembok, putar badan) 30 detik per sisi",
  "Stretching tricep (tarik siku ke belakang kepala) 30 detik per sisi",
  "Stretching hamstring (cium lutut sambil berdiri) 30 detik",
  "Tarik napas dalam 5x",
];

export const PROGRAM: WeekProgram[] = [
  {
    minggu: 1,
    judul: "Minggu 1 — Foundation",
    deskripsi:
      "Bangun kebiasaan & pelajari bentuk gerakan yang benar. Volume rendah, fokus form. Sakit otot 2-3 hari adalah normal.",
    hari: [
      {
        hari: "Senin",
        fokus: "Push (Dada, Bahu, Tricep)",
        isRest: false,
        durasiTotal: "~25 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "knee-push-up", set: 3, reps: "8-10", istirahat: "60 detik" },
          { exerciseId: "pike-push-up", set: 2, reps: "5-8", istirahat: "60 detik" },
          { exerciseId: "tricep-dip-chair", set: 2, reps: "8", istirahat: "60 detik" },
          { exerciseId: "plank", set: 2, durasi: "20 detik", istirahat: "45 detik" },
          { exerciseId: "hand-grip-basic", set: 2, reps: "15 per tangan", istirahat: "30 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
        catatan:
          "Hari pertama paling berat secara mental — yang penting MULAI dulu. Bentuk > jumlah.",
      },
      {
        hari: "Selasa",
        fokus: "Core (Perut)",
        isRest: false,
        durasiTotal: "~20 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "plank", set: 3, durasi: "20 detik", istirahat: "45 detik" },
          { exerciseId: "crunch", set: 3, reps: "10-12", istirahat: "45 detik" },
          { exerciseId: "leg-raise", set: 2, reps: "8", istirahat: "45 detik" },
          { exerciseId: "mountain-climber", set: 2, durasi: "30 detik", istirahat: "45 detik" },
          { exerciseId: "hand-grip-basic", set: 2, reps: "15 per tangan", istirahat: "30 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
      },
      {
        hari: "Rabu",
        fokus: "Aktif Recovery",
        isRest: true,
        durasiTotal: "~30 menit",
        latihan: [
          { exerciseId: "walk-stretch", set: 1, durasi: "30 menit", istirahat: "-" },
          { exerciseId: "hand-grip-basic", set: 2, reps: "10-15 per tangan (ringan)", istirahat: "30 detik" },
        ],
        catatan: "Hari istirahat aktif. Jalan kaki + stretching + hand grip ringan. Tidak boleh skip!",
      },
      {
        hari: "Kamis",
        fokus: "Pull (Bisep, Punggung)",
        isRest: false,
        durasiTotal: "~25 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "inverted-row-meja", set: 3, reps: "6-8", istirahat: "60 detik" },
          { exerciseId: "bicep-curl-botol", set: 3, reps: "10-12", istirahat: "60 detik" },
          { exerciseId: "hammer-curl", set: 2, reps: "10", istirahat: "60 detik" },
          { exerciseId: "hand-grip-basic", set: 2, reps: "15-20 per tangan", istirahat: "45 detik" },
          { exerciseId: "side-plank", set: 2, durasi: "15 detik per sisi", istirahat: "45 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
        catatan:
          "Belum punya dumbbell? Pakai botol 1.5L isi air/pasir. Belum bisa inverted row di meja? Coba dengan lutut ditekuk.",
      },
      {
        hari: "Jumat",
        fokus: "Core + Kardio Ringan",
        isRest: false,
        durasiTotal: "~20 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "bicycle-crunch", set: 3, reps: "10 per sisi", istirahat: "45 detik" },
          { exerciseId: "russian-twist", set: 3, reps: "12 per sisi", istirahat: "45 detik" },
          { exerciseId: "high-knees", set: 3, durasi: "30 detik", istirahat: "30 detik" },
          { exerciseId: "plank", set: 1, durasi: "30 detik", istirahat: "-" },
          { exerciseId: "hand-grip-basic", set: 2, reps: "15 per tangan", istirahat: "30 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
      },
      {
        hari: "Sabtu",
        fokus: "Full Body Ringan",
        isRest: false,
        durasiTotal: "~25 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "squat", set: 3, reps: "12", istirahat: "60 detik" },
          { exerciseId: "knee-push-up", set: 2, reps: "10", istirahat: "60 detik" },
          { exerciseId: "bicep-curl-botol", set: 2, reps: "10", istirahat: "60 detik" },
          { exerciseId: "plank", set: 2, durasi: "25 detik", istirahat: "45 detik" },
          { exerciseId: "hand-grip-basic", set: 2, reps: "15 per tangan", istirahat: "30 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
      },
      {
        hari: "Minggu",
        fokus: "Istirahat Total",
        isRest: true,
        durasiTotal: "-",
        latihan: [],
        catatan:
          "Istirahat total. Pakai untuk recovery, tidur cukup, makan baik. Tubuh tumbuh saat istirahat, BUKAN saat latihan.",
      },
    ],
  },
  {
    minggu: 2,
    judul: "Minggu 2 — Build Habit",
    deskripsi:
      "Naikkan sedikit volume. Kalau minggu 1 terasa terlalu mudah, langsung skip ke minggu 3. Kalau berat, ulangi minggu 1 sekali lagi.",
    hari: [
      {
        hari: "Senin",
        fokus: "Push (Dada, Bahu, Tricep)",
        isRest: false,
        durasiTotal: "~30 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "knee-push-up", set: 3, reps: "12", istirahat: "60 detik" },
          { exerciseId: "pike-push-up", set: 3, reps: "8", istirahat: "60 detik" },
          { exerciseId: "tricep-dip-chair", set: 3, reps: "10", istirahat: "60 detik" },
          { exerciseId: "plank", set: 3, durasi: "30 detik", istirahat: "45 detik" },
          { exerciseId: "hand-grip-basic", set: 2, reps: "15-20 per tangan", istirahat: "30 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
      },
      {
        hari: "Selasa",
        fokus: "Core (Perut)",
        isRest: false,
        durasiTotal: "~25 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "plank", set: 3, durasi: "30 detik", istirahat: "45 detik" },
          { exerciseId: "crunch", set: 3, reps: "15", istirahat: "45 detik" },
          { exerciseId: "leg-raise", set: 3, reps: "10", istirahat: "45 detik" },
          { exerciseId: "bicycle-crunch", set: 3, reps: "12 per sisi", istirahat: "45 detik" },
          { exerciseId: "mountain-climber", set: 2, durasi: "40 detik", istirahat: "45 detik" },
          { exerciseId: "hand-grip-basic", set: 2, reps: "15-20 per tangan", istirahat: "30 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
      },
      {
        hari: "Rabu",
        fokus: "Aktif Recovery",
        isRest: true,
        durasiTotal: "~30 menit",
        latihan: [
          { exerciseId: "walk-stretch", set: 1, durasi: "30 menit", istirahat: "-" },
          { exerciseId: "hand-grip-basic", set: 2, reps: "10-15 per tangan (ringan)", istirahat: "30 detik" },
        ],
      },
      {
        hari: "Kamis",
        fokus: "Pull (Bisep, Punggung)",
        isRest: false,
        durasiTotal: "~30 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "inverted-row-meja", set: 3, reps: "8-10", istirahat: "60 detik" },
          { exerciseId: "bicep-curl-botol", set: 3, reps: "12", istirahat: "60 detik" },
          { exerciseId: "hammer-curl", set: 3, reps: "10", istirahat: "60 detik" },
          { exerciseId: "hand-grip-basic", set: 3, reps: "15-20 per tangan", istirahat: "45 detik" },
          { exerciseId: "side-plank", set: 2, durasi: "20 detik per sisi", istirahat: "45 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
      },
      {
        hari: "Jumat",
        fokus: "Core + HIIT Ringan",
        isRest: false,
        durasiTotal: "~25 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "russian-twist", set: 3, reps: "15 per sisi", istirahat: "45 detik" },
          { exerciseId: "leg-raise", set: 3, reps: "10", istirahat: "45 detik" },
          { exerciseId: "high-knees", set: 4, durasi: "30 detik", istirahat: "30 detik" },
          { exerciseId: "plank", set: 1, durasi: "45 detik", istirahat: "-" },
          { exerciseId: "hand-grip-basic", set: 2, reps: "15-20 per tangan", istirahat: "30 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
      },
      {
        hari: "Sabtu",
        fokus: "Full Body",
        isRest: false,
        durasiTotal: "~30 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "squat", set: 3, reps: "15", istirahat: "60 detik" },
          { exerciseId: "knee-push-up", set: 3, reps: "12", istirahat: "60 detik" },
          { exerciseId: "bicep-curl-botol", set: 3, reps: "12", istirahat: "60 detik" },
          { exerciseId: "plank", set: 2, durasi: "30 detik", istirahat: "45 detik" },
          { exerciseId: "jumping-jack", set: 1, durasi: "60 detik", istirahat: "-" },
          { exerciseId: "hand-grip-basic", set: 2, reps: "15-20 per tangan", istirahat: "30 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
      },
      {
        hari: "Minggu",
        fokus: "Istirahat Total",
        isRest: true,
        durasiTotal: "-",
        latihan: [],
      },
    ],
  },
  {
    minggu: 3,
    judul: "Minggu 3 — Level Up",
    deskripsi:
      "Sudah lebih kuat? Saatnya naik level. Knee push-up → push-up standar. Tambah set & beban.",
    hari: [
      {
        hari: "Senin",
        fokus: "Push (Dada, Bahu, Tricep)",
        isRest: false,
        durasiTotal: "~35 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "push-up", set: 4, reps: "8-10", istirahat: "75 detik" },
          { exerciseId: "pike-push-up", set: 3, reps: "10", istirahat: "60 detik" },
          { exerciseId: "diamond-push-up", set: 2, reps: "5-8 (boleh knee)", istirahat: "60 detik" },
          { exerciseId: "tricep-dip-chair", set: 3, reps: "12", istirahat: "60 detik" },
          { exerciseId: "plank", set: 3, durasi: "40 detik", istirahat: "45 detik" },
          { exerciseId: "hand-grip-hold", set: 2, durasi: "15 detik per tangan", istirahat: "30 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
      },
      {
        hari: "Selasa",
        fokus: "Core (Perut)",
        isRest: false,
        durasiTotal: "~30 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "plank", set: 3, durasi: "45 detik", istirahat: "45 detik" },
          { exerciseId: "crunch", set: 3, reps: "20", istirahat: "45 detik" },
          { exerciseId: "leg-raise", set: 3, reps: "12", istirahat: "45 detik" },
          { exerciseId: "bicycle-crunch", set: 3, reps: "15 per sisi", istirahat: "45 detik" },
          { exerciseId: "russian-twist", set: 3, reps: "20 per sisi", istirahat: "45 detik" },
          { exerciseId: "mountain-climber", set: 3, durasi: "45 detik", istirahat: "45 detik" },
          { exerciseId: "hand-grip-hold", set: 2, durasi: "15 detik per tangan", istirahat: "30 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
      },
      {
        hari: "Rabu",
        fokus: "Aktif Recovery",
        isRest: true,
        durasiTotal: "~30 menit",
        latihan: [
          { exerciseId: "walk-stretch", set: 1, durasi: "30 menit", istirahat: "-" },
          { exerciseId: "hand-grip-basic", set: 2, reps: "10-15 per tangan (ringan)", istirahat: "30 detik" },
        ],
      },
      {
        hari: "Kamis",
        fokus: "Pull (Bisep, Punggung)",
        isRest: false,
        durasiTotal: "~35 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "inverted-row-meja", set: 4, reps: "10", istirahat: "75 detik" },
          { exerciseId: "bicep-curl-botol", set: 4, reps: "12", istirahat: "60 detik" },
          { exerciseId: "hammer-curl", set: 3, reps: "12", istirahat: "60 detik" },
          { exerciseId: "resistance-band-row", set: 3, reps: "15", istirahat: "60 detik" },
          { exerciseId: "hand-grip-hold", set: 2, durasi: "15-20 detik per tangan", istirahat: "45 detik" },
          { exerciseId: "side-plank", set: 3, durasi: "25 detik per sisi", istirahat: "45 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
        catatan: "Saatnya pertimbangkan beli resistance band kalau belum punya.",
      },
      {
        hari: "Jumat",
        fokus: "HIIT + Core",
        isRest: false,
        durasiTotal: "~30 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "burpee", set: 4, reps: "8", istirahat: "60 detik" },
          { exerciseId: "high-knees", set: 4, durasi: "40 detik", istirahat: "30 detik" },
          { exerciseId: "mountain-climber", set: 3, durasi: "40 detik", istirahat: "30 detik" },
          { exerciseId: "plank", set: 2, durasi: "45 detik", istirahat: "45 detik" },
          { exerciseId: "hand-grip-hold", set: 2, durasi: "15 detik per tangan", istirahat: "30 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
      },
      {
        hari: "Sabtu",
        fokus: "Full Body",
        isRest: false,
        durasiTotal: "~35 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "squat", set: 4, reps: "15", istirahat: "60 detik" },
          { exerciseId: "push-up", set: 3, reps: "8", istirahat: "60 detik" },
          { exerciseId: "bicep-curl-botol", set: 3, reps: "12", istirahat: "60 detik" },
          { exerciseId: "inverted-row-meja", set: 3, reps: "8", istirahat: "60 detik" },
          { exerciseId: "plank", set: 2, durasi: "45 detik", istirahat: "45 detik" },
          { exerciseId: "hand-grip-hold", set: 2, durasi: "15 detik per tangan", istirahat: "30 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
      },
      {
        hari: "Minggu",
        fokus: "Istirahat Total",
        isRest: true,
        durasiTotal: "-",
        latihan: [],
      },
    ],
  },
  {
    minggu: 4,
    judul: "Minggu 4 — Push Limits",
    deskripsi:
      "Minggu terakhir cycle pertama. Setelah ini, evaluasi: ulangi program dengan beban/reps lebih tinggi, atau cari program intermediate.",
    hari: [
      {
        hari: "Senin",
        fokus: "Push (Dada, Bahu, Tricep)",
        isRest: false,
        durasiTotal: "~40 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "push-up", set: 4, reps: "12", istirahat: "75 detik" },
          { exerciseId: "diamond-push-up", set: 3, reps: "8", istirahat: "60 detik" },
          { exerciseId: "pike-push-up", set: 3, reps: "12", istirahat: "60 detik" },
          { exerciseId: "tricep-dip-chair", set: 4, reps: "15", istirahat: "60 detik" },
          { exerciseId: "plank", set: 3, durasi: "60 detik", istirahat: "60 detik" },
          { exerciseId: "hand-grip-hold", set: 2, durasi: "20 detik per tangan", istirahat: "30 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
      },
      {
        hari: "Selasa",
        fokus: "Core Killer",
        isRest: false,
        durasiTotal: "~35 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "plank", set: 3, durasi: "60 detik", istirahat: "45 detik" },
          { exerciseId: "side-plank", set: 3, durasi: "30 detik per sisi", istirahat: "45 detik" },
          { exerciseId: "leg-raise", set: 4, reps: "15", istirahat: "45 detik" },
          { exerciseId: "bicycle-crunch", set: 3, reps: "20 per sisi", istirahat: "45 detik" },
          { exerciseId: "russian-twist", set: 3, reps: "25 per sisi", istirahat: "45 detik" },
          { exerciseId: "mountain-climber", set: 3, durasi: "60 detik", istirahat: "45 detik" },
          { exerciseId: "hand-grip-hold", set: 2, durasi: "20 detik per tangan", istirahat: "30 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
      },
      {
        hari: "Rabu",
        fokus: "Aktif Recovery",
        isRest: true,
        durasiTotal: "~30 menit",
        latihan: [
          { exerciseId: "walk-stretch", set: 1, durasi: "30 menit", istirahat: "-" },
          { exerciseId: "hand-grip-basic", set: 2, reps: "10-15 per tangan (ringan)", istirahat: "30 detik" },
        ],
      },
      {
        hari: "Kamis",
        fokus: "Pull (Bisep, Punggung)",
        isRest: false,
        durasiTotal: "~40 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "inverted-row-meja", set: 4, reps: "12", istirahat: "75 detik" },
          { exerciseId: "bicep-curl-botol", set: 4, reps: "15", istirahat: "60 detik" },
          { exerciseId: "hammer-curl", set: 3, reps: "12", istirahat: "60 detik" },
          { exerciseId: "resistance-band-row", set: 3, reps: "15", istirahat: "60 detik" },
          { exerciseId: "hand-grip-hold", set: 3, durasi: "20-30 detik per tangan", istirahat: "45 detik" },
          { exerciseId: "side-plank", set: 3, durasi: "30 detik per sisi", istirahat: "45 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
      },
      {
        hari: "Jumat",
        fokus: "HIIT + Core",
        isRest: false,
        durasiTotal: "~35 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "burpee", set: 5, reps: "10", istirahat: "60 detik" },
          { exerciseId: "high-knees", set: 5, durasi: "45 detik", istirahat: "30 detik" },
          { exerciseId: "mountain-climber", set: 4, durasi: "45 detik", istirahat: "30 detik" },
          { exerciseId: "plank", set: 2, durasi: "60 detik", istirahat: "45 detik" },
          { exerciseId: "hand-grip-hold", set: 2, durasi: "20 detik per tangan", istirahat: "30 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
      },
      {
        hari: "Sabtu",
        fokus: "Full Body Finisher",
        isRest: false,
        durasiTotal: "~40 menit",
        pemanasan: PEMANASAN_STANDAR,
        latihan: [
          { exerciseId: "squat", set: 4, reps: "20", istirahat: "60 detik" },
          { exerciseId: "push-up", set: 4, reps: "10-12", istirahat: "60 detik" },
          { exerciseId: "bicep-curl-botol", set: 3, reps: "15", istirahat: "60 detik" },
          { exerciseId: "inverted-row-meja", set: 3, reps: "10", istirahat: "60 detik" },
          { exerciseId: "burpee", set: 2, reps: "10", istirahat: "60 detik" },
          { exerciseId: "plank", set: 1, durasi: "90 detik (target)", istirahat: "-" },
          { exerciseId: "hand-grip-pulse", set: 2, reps: "25-30 per tangan", istirahat: "30 detik" },
        ],
        pendinginan: PENDINGINAN_STANDAR,
        catatan:
          "Selamat! Kalau sampai sini, kamu sudah punya kebiasaan olahraga. Lanjutkan dengan menaikkan beban (dumbbell lebih berat) atau program intermediate.",
      },
      {
        hari: "Minggu",
        fokus: "Istirahat Total",
        isRest: true,
        durasiTotal: "-",
        latihan: [],
        catatan:
          "Selamat menyelesaikan 4 minggu pertama! Evaluasi: ukur lengan, foto badan, cek progres.",
      },
    ],
  },
];

// ============================================================
// WEEKS 5-24 — Phase-based progressive overload
// Phase 2 (w5-8): Build  — push-up standar, volume tinggi
// Phase 3 (w9-12): Strength — weighted variations, negative pull-up
// Phase 4 (w13-16): Hypertrophy — drop set, chin-up reps
// Phase 5 (w17-20): Power — explosive push-up, pull-up reps
// Phase 6 (w21-24): Master — l-sit, handstand, dragon flag
// ============================================================

type SetShort = [string, number, string, string?]; // [exerciseId, sets, reps/durasi, istirahat?]

function day(
  hari: string,
  fokus: string,
  durasi: string,
  sets: SetShort[],
  opts: { isRest?: boolean; catatan?: string; pemanasan?: boolean } = {},
): WorkoutDay {
  return {
    hari,
    fokus,
    isRest: opts.isRest ?? false,
    durasiTotal: durasi,
    pemanasan: opts.pemanasan === false ? undefined : PEMANASAN_STANDAR,
    pendinginan: opts.pemanasan === false ? undefined : PENDINGINAN_STANDAR,
    latihan: sets.map(([exerciseId, s, r, ist]) => {
      const isDuration = /\d+\s*detik|menit/.test(r);
      return {
        exerciseId,
        set: s,
        ...(isDuration ? { durasi: r } : { reps: r }),
        istirahat: ist ?? "60 detik",
      };
    }),
    catatan: opts.catatan,
  };
}

function restActiveDay(catatan?: string): WorkoutDay {
  return {
    hari: "Rabu",
    fokus: "Aktif Recovery",
    isRest: true,
    durasiTotal: "~30 menit",
    latihan: [
      { exerciseId: "walk-stretch", set: 1, durasi: "30 menit", istirahat: "-" },
      { exerciseId: "hand-grip-basic", set: 2, reps: "10-15 per tangan (ringan)", istirahat: "30 detik" },
    ],
    catatan: catatan ?? "Hari istirahat aktif. Jalan kaki + stretching + hand grip ringan. Tidak boleh skip!",
  };
}

const restTotalDay = (catatan?: string): WorkoutDay => ({
  hari: "Minggu",
  fokus: "Istirahat Total",
  isRest: true,
  durasiTotal: "-",
  latihan: [],
  catatan,
});

// PHASE 2: BUILD (Week 5-8) — intensity goes up each week
function phase2Week(minggu: number): WorkoutDay[] {
  const w = minggu - 4; // 1, 2, 3, 4
  const pushReps = String(10 + w * 2); // 12, 14, 16, 18
  const coreReps = String(12 + w * 2);
  const plankSec = String(40 + w * 5) + " detik";
  return [
    day("Senin", "Push (Dada, Bahu, Tricep)", "~30 menit", [
      ["push-up", 4, pushReps, "60 detik"],
      ["pike-push-up", 3, "8-10"],
      ["tricep-dip-chair", 3, "12-15"],
      ["plank", 3, plankSec, "45 detik"],
      ["hand-grip-basic", 2, "15-20 per tangan", "30 detik"],
    ]),
    day("Selasa", "Core (Perut)", "~25 menit", [
      ["hollow-hold", 4, plankSec, "45 detik"],
      ["leg-raise", 4, coreReps],
      ["bicycle-crunch", 3, "20 (10 per sisi)"],
      ["side-plank", 3, "30 detik per sisi"],
      ["hand-grip-basic", 2, "15-20 per tangan", "30 detik"],
    ]),
    restActiveDay(),
    day("Kamis", "Pull (Bisep, Punggung)", "~30 menit", [
      ["inverted-row-meja", 4, pushReps],
      ["bicep-curl-botol", 4, "12-15"],
      ["hammer-curl", 3, "10-12"],
      ["hand-grip-basic", 3, "20 per tangan"],
      ["plank", 3, plankSec, "45 detik"],
    ]),
    day("Jumat", "Core + Kardio (HIIT)", "~25 menit", [
      ["burpee", 4, "8-12", "45 detik"],
      ["mountain-climber", 4, "40 detik", "30 detik"],
      ["jumping-jack", 4, "60 detik", "30 detik"],
      ["plank", 3, plankSec],
      ["hand-grip-basic", 2, "15-20 per tangan", "30 detik"],
    ]),
    day("Sabtu", "Full Body", "~30 menit", [
      ["squat", 4, "15-20"],
      ["push-up", 3, pushReps],
      ["inverted-row-meja", 3, "10-12"],
      ["plank", 3, plankSec],
      ["hand-grip-basic", 2, "15-20 per tangan", "30 detik"],
    ]),
    restTotalDay(
      w === 4 ? "Akhir Phase 2! Foto badan + ukur lengan. Bandingkan dengan minggu 1." : undefined,
    ),
  ];
}

// PHASE 3: STRENGTH (Week 9-12) — weighted/decline variations, negative pull-ups
function phase3Week(minggu: number): WorkoutDay[] {
  const w = minggu - 8; // 1, 2, 3, 4
  const reps = String(8 + w); // 9, 10, 11, 12
  const plankSec = String(50 + w * 10) + " detik";
  return [
    day("Senin", "Push (Strength)", "~35 menit", [
      ["decline-push-up", 4, reps, "90 detik"],
      ["pike-push-up", 4, reps],
      ["diamond-push-up", 3, "8-10"],
      ["tricep-dip-chair", 3, "12-15"],
      ["hand-grip-hold", 2, "20-30 detik per tangan", "30 detik"],
    ]),
    day("Selasa", "Core (Heavy)", "~25 menit", [
      ["hollow-hold", 4, plankSec],
      ["leg-raise", 4, "12-15"],
      ["dragon-flag-progression", 3, "5-8 (tuck)"],
      ["side-plank", 3, "40 detik per sisi"],
      ["hand-grip-hold", 2, "20-30 detik per tangan", "30 detik"],
    ]),
    restActiveDay(),
    day("Kamis", "Pull (Strength)", "~35 menit", [
      ["negative-pull-up", 4, "5 (turun pelan 5 detik)", "90 detik"],
      ["weighted-row", 4, reps],
      ["concentration-curl", 3, "10 per sisi"],
      ["bicep-curl-botol", 3, "12 (berat naik)"],
      ["hand-grip-hold", 3, "20-30 detik per tangan", "45 detik"],
    ]),
    day("Jumat", "Power + Kardio", "~25 menit", [
      ["burpee", 4, "10-15", "45 detik"],
      ["mountain-climber", 4, "45 detik", "30 detik"],
      ["jumping-jack", 4, "60 detik", "30 detik"],
      ["hollow-hold", 3, plankSec],
      ["hand-grip-hold", 2, "20-30 detik per tangan", "30 detik"],
    ]),
    day("Sabtu", "Full Body (Heavy)", "~30 menit", [
      ["weighted-squat", 4, "12-15"],
      ["decline-push-up", 3, reps],
      ["weighted-row", 3, reps],
      ["plank", 3, plankSec],
      ["hand-grip-hold", 2, "20-30 detik per tangan", "30 detik"],
    ]),
    restTotalDay(
      w === 4 ? "Akhir Phase 3! Test: berapa push-up murni max? Catat di Personal Records." : undefined,
    ),
  ];
}

// PHASE 4: HYPERTROPHY (Week 13-16) — high volume, chin-up reps
function phase4Week(minggu: number): WorkoutDay[] {
  const w = minggu - 12;
  const reps = String(10 + w);
  const plankSec = String(60 + w * 10) + " detik";
  return [
    day("Senin", "Push (Hypertrophy)", "~40 menit", [
      ["decline-push-up", 5, reps, "75 detik"],
      ["archer-push-up", 4, "5-6 per sisi"],
      ["diamond-pushup-feet-elevated", 3, "8-10"],
      ["pike-push-up", 3, "10-12"],
      ["hand-grip-pulse", 2, "25-30 per tangan", "30 detik"],
    ]),
    day("Selasa", "Core (Volume)", "~30 menit", [
      ["hollow-hold", 5, plankSec],
      ["leg-raise", 5, "15"],
      ["bicycle-crunch", 4, "30 (15 per sisi)"],
      ["dragon-flag-progression", 3, "5-8"],
      ["hand-grip-pulse", 2, "25-30 per tangan", "30 detik"],
    ]),
    restActiveDay(),
    day("Kamis", "Pull (Hypertrophy)", "~40 menit", [
      ["chin-up", 4, "3-5 (atau negative)", "90 detik"],
      ["weighted-row", 4, "12"],
      ["bicep-curl-botol", 4, "15"],
      ["concentration-curl", 4, "10 per sisi"],
      ["hand-grip-pulse", 3, "30-40 per tangan", "45 detik"],
    ]),
    day("Jumat", "Conditioning", "~30 menit", [
      ["burpee", 5, "10-12", "60 detik"],
      ["mountain-climber", 4, "50 detik", "30 detik"],
      ["high-knees", 4, "45 detik", "30 detik"],
      ["plank", 4, plankSec],
      ["hand-grip-pulse", 2, "25-30 per tangan", "30 detik"],
    ]),
    day("Sabtu", "Full Body + Kaki", "~35 menit", [
      ["weighted-squat", 4, "12-15"],
      ["bulgarian-split-squat", 3, "10 per sisi"],
      ["decline-push-up", 3, "10-12"],
      ["weighted-row", 3, "10-12"],
      ["hand-grip-pulse", 2, "25-30 per tangan", "30 detik"],
    ]),
    restTotalDay(
      w === 4 ? "Akhir Phase 4! Ukur lengan & dada lagi. Lihat foto progres bulan ke-4." : undefined,
    ),
  ];
}

// PHASE 5: POWER (Week 17-20) — explosive, pull-ups, advanced holds
function phase5Week(minggu: number): WorkoutDay[] {
  const w = minggu - 16;
  const reps = String(6 + w);
  return [
    day("Senin", "Push (Power)", "~40 menit", [
      ["explosive-push-up", 5, "5-8", "90 detik"],
      ["archer-push-up", 4, "6-8 per sisi"],
      ["decline-push-up", 4, "12-15"],
      ["wall-handstand-hold", 3, "20-30 detik"],
      ["hand-grip-hold", 2, "30-45 detik per tangan", "30 detik"],
    ]),
    day("Selasa", "Core (Advanced)", "~30 menit", [
      ["l-sit-progression", 5, "10-15 detik"],
      ["dragon-flag-progression", 4, "5-8"],
      ["leg-raise", 4, "15-20"],
      ["hollow-hold", 4, "60 detik"],
      ["hand-grip-hold", 2, "30-45 detik per tangan", "30 detik"],
    ]),
    restActiveDay(),
    day("Kamis", "Pull (Power)", "~40 menit", [
      ["pull-up", 5, reps + "-" + String(Number(reps) + 2), "120 detik"],
      ["chin-up", 4, reps],
      ["weighted-row", 4, "10-12"],
      ["preacher-curl-floor", 4, "10-12"],
      ["hand-grip-hold", 3, "30-45 detik per tangan", "45 detik"],
    ]),
    day("Jumat", "Power + HIIT", "~30 menit", [
      ["burpee-pullup", 5, "5-8", "60 detik"],
      ["explosive-push-up", 4, "8"],
      ["skip-rope", 4, "60 detik", "30 detik"],
      ["mountain-climber", 3, "45 detik"],
      ["hand-grip-hold", 2, "30-45 detik per tangan", "30 detik"],
    ]),
    day("Sabtu", "Full Body (Athletic)", "~35 menit", [
      ["pistol-squat-progression", 4, "5 per sisi"],
      ["bulgarian-split-squat", 3, "10 per sisi"],
      ["pull-up", 3, "5-8"],
      ["decline-push-up", 3, "12-15"],
      ["hand-grip-hold", 2, "30-45 detik per tangan", "30 detik"],
    ]),
    restTotalDay(
      w === 4 ? "Akhir Phase 5! Test: bisa berapa pull-up murni? Plank berapa lama?" : undefined,
    ),
  ];
}

// PHASE 6: MASTER (Week 21-24) — combinations, expert holds
function phase6Week(minggu: number): WorkoutDay[] {
  const w = minggu - 20;
  return [
    day("Senin", "Push (Master)", "~45 menit", [
      ["explosive-push-up", 5, "8-12", "90 detik"],
      ["archer-push-up", 5, "8 per sisi"],
      ["diamond-pushup-feet-elevated", 4, "10-12"],
      ["wall-handstand-hold", 4, "30-60 detik"],
      ["hand-grip-pulse", 3, "40-50 per tangan", "30 detik"],
    ]),
    day("Selasa", "Core (Master)", "~30 menit", [
      ["l-sit-progression", 5, "15-30 detik"],
      ["dragon-flag-progression", 5, "6-10"],
      ["tuck-front-lever", 4, "10-15 detik"],
      ["side-plank", 4, "60 detik per sisi"],
      ["hand-grip-pulse", 3, "40-50 per tangan", "30 detik"],
    ]),
    restActiveDay(),
    day("Kamis", "Pull (Master)", "~45 menit", [
      ["pull-up", 5, "8-12", "120 detik"],
      ["chin-up", 4, "10-12"],
      ["tuck-front-lever", 3, "15-20 detik"],
      ["concentration-curl", 4, "12 per sisi"],
      ["hand-grip-pulse", 4, "40-50 per tangan", "45 detik"],
    ]),
    day("Jumat", "Brutal Conditioning", "~35 menit", [
      ["burpee-pullup", 5, "8-10", "60 detik"],
      ["explosive-push-up", 5, "10"],
      ["skip-rope", 5, "90 detik", "30 detik"],
      ["l-sit-progression", 3, "10 detik"],
      ["hand-grip-pulse", 3, "40-50 per tangan", "30 detik"],
    ]),
    day("Sabtu", "Full Body (Mastery)", "~40 menit", [
      ["pistol-squat-progression", 4, "8 per sisi"],
      ["pull-up", 4, "8-10"],
      ["archer-push-up", 3, "6-8 per sisi"],
      ["dragon-flag-progression", 3, "6-8"],
      ["hand-grip-pulse", 3, "40-50 per tangan", "30 detik"],
    ]),
    restTotalDay(
      w === 4
        ? "🏆 SELAMAT! 6 BULAN SELESAI! Test final: max push-up, max pull-up, max plank, max chin-up. Lihat foto sebelum-sesudah."
        : undefined,
    ),
  ];
}

const PHASE_2_DESCRIPTIONS: Record<number, string> = {
  5: "Push-up standar mulai jadi default. Volume naik sedikit, fokus konsistensi.",
  6: "Reps push-up naik. Mulai terasa lebih kuat di lengan.",
  7: "Volume harian lebih tinggi. Tubuh sudah adaptasi.",
  8: "Akhir phase 2 — di sini biasanya orang mulai lihat perubahan di cermin.",
};

const PHASE_3_DESCRIPTIONS: Record<number, string> = {
  9: "Decline push-up + negative pull-up masuk. Mulai latih kekuatan murni.",
  10: "Beban tambahan (backpack) untuk row & squat. Progressive overload sesungguhnya.",
  11: "Dragon flag progression masuk. Core mulai serius.",
  12: "Akhir phase 3 — bisa 1 pull-up murni? Test di akhir minggu.",
};

const PHASE_4_DESCRIPTIONS: Record<number, string> = {
  13: "High volume mode. Lebih banyak set per latihan.",
  14: "Archer push-up progression. Persiapan one-arm push-up.",
  15: "Bulgarian split squat masuk. Bentuk kaki & glutes.",
  16: "Akhir phase 4 — lengan mulai terlihat tonus. Ukur lingkar bisep!",
};

const PHASE_5_DESCRIPTIONS: Record<number, string> = {
  17: "Explosive push-up + L-sit progression. Bangun power.",
  18: "Pull-up jadi gerakan utama. Goal: 5+ pull-up murni.",
  19: "Burpee + pull-up — kombinasi paling brutal.",
  20: "Akhir phase 5 — atletis. Coba pistol squat.",
};

const PHASE_6_DESCRIPTIONS: Record<number, string> = {
  21: "L-sit hold lebih lama. Tuck front lever masuk.",
  22: "Pull-up + chin-up volume tinggi. Lengan masif.",
  23: "Dragon flag full. Brutal core.",
  24: "🏆 Minggu terakhir. Test maksimal. Lihat foto sebelum-sesudah.",
};

function generateExtendedWeeks(): WeekProgram[] {
  const weeks: WeekProgram[] = [];

  for (let m = 5; m <= 8; m++) {
    weeks.push({
      minggu: m,
      judul: `Minggu ${m} — Build (Phase 2)`,
      deskripsi: PHASE_2_DESCRIPTIONS[m],
      hari: phase2Week(m),
    });
  }
  for (let m = 9; m <= 12; m++) {
    weeks.push({
      minggu: m,
      judul: `Minggu ${m} — Strength (Phase 3)`,
      deskripsi: PHASE_3_DESCRIPTIONS[m],
      hari: phase3Week(m),
    });
  }
  for (let m = 13; m <= 16; m++) {
    weeks.push({
      minggu: m,
      judul: `Minggu ${m} — Hypertrophy (Phase 4)`,
      deskripsi: PHASE_4_DESCRIPTIONS[m],
      hari: phase4Week(m),
    });
  }
  for (let m = 17; m <= 20; m++) {
    weeks.push({
      minggu: m,
      judul: `Minggu ${m} — Power (Phase 5)`,
      deskripsi: PHASE_5_DESCRIPTIONS[m],
      hari: phase5Week(m),
    });
  }
  for (let m = 21; m <= 24; m++) {
    weeks.push({
      minggu: m,
      judul: `Minggu ${m} — Master (Phase 6)`,
      deskripsi: PHASE_6_DESCRIPTIONS[m],
      hari: phase6Week(m),
    });
  }
  return weeks;
}

PROGRAM.push(...generateExtendedWeeks());

export type PhaseInfo = {
  phase: number;
  nama: string;
  weeks: [number, number];
  deskripsi: string;
  goal: string;
};

export const PHASES: PhaseInfo[] = [
  {
    phase: 1,
    nama: "Foundation",
    weeks: [1, 4],
    deskripsi: "Bangun kebiasaan, pelajari bentuk gerakan. Knee → full push-up.",
    goal: "Bisa 10 push-up murni tanpa istirahat.",
  },
  {
    phase: 2,
    nama: "Build",
    weeks: [5, 8],
    deskripsi: "Volume naik. Push-up standar jadi default.",
    goal: "Push-up 4×15, plank 60 detik, inverted row 4×15.",
  },
  {
    phase: 3,
    nama: "Strength",
    weeks: [9, 12],
    deskripsi: "Weighted/decline variations, negative pull-up.",
    goal: "1 pull-up murni, decline push-up 4×12.",
  },
  {
    phase: 4,
    nama: "Hypertrophy",
    weeks: [13, 16],
    deskripsi: "High volume untuk bentuk otot.",
    goal: "Lingkar bisep naik 1-2cm dari awal.",
  },
  {
    phase: 5,
    nama: "Power",
    weeks: [17, 20],
    deskripsi: "Explosive variations, pull-up reps, L-sit progression.",
    goal: "5 pull-up murni, L-sit 15 detik.",
  },
  {
    phase: 6,
    nama: "Master",
    weeks: [21, 24],
    deskripsi: "Advanced holds, kombinasi gerakan, level athlet.",
    goal: "10 pull-up, plank 3 menit, dragon flag, handstand 60 detik.",
  },
];

export function getPhase(minggu: number): PhaseInfo {
  return (
    PHASES.find((p) => minggu >= p.weeks[0] && minggu <= p.weeks[1]) ?? PHASES[0]
  );
}

export function getDay(minggu: number, hariIndex: number): WorkoutDay | undefined {
  const week = PROGRAM.find((w) => w.minggu === minggu);
  return week?.hari[hariIndex];
}

export function dayKey(minggu: number, hariIndex: number): string {
  return `m${minggu}-h${hariIndex}`;
}
