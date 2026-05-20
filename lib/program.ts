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
        ],
        catatan: "Hari istirahat aktif. Jalan kaki + stretching. Tidak boleh skip!",
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

export function getDay(minggu: number, hariIndex: number): WorkoutDay | undefined {
  const week = PROGRAM.find((w) => w.minggu === minggu);
  return week?.hari[hariIndex];
}

export function dayKey(minggu: number, hariIndex: number): string {
  return `m${minggu}-h${hariIndex}`;
}
