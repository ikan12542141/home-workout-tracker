export type ExerciseCategory =
  | "lengan"
  | "bisep"
  | "tricep"
  | "bahu"
  | "dada"
  | "punggung"
  | "perut"
  | "kaki"
  | "kardio"
  | "fullbody";

export type Equipment =
  | "tanpa alat"
  | "botol air / dumbbell"
  | "resistance band"
  | "kursi / meja"
  | "matras";

export type Exercise = {
  id: string;
  nama: string;
  kategori: ExerciseCategory[];
  alat: Equipment[];
  deskripsi: string;
  langkah: string[];
  tips: string[];
  videoUrl?: string;
  gambar?: string;
};

export const EXERCISES: Exercise[] = [
  {
    id: "push-up",
    nama: "Push-up Standar",
    kategori: ["dada", "lengan", "tricep", "bahu"],
    alat: ["tanpa alat", "matras"],
    deskripsi:
      "Latihan klasik untuk membentuk dada, lengan, bahu, dan tricep. Wajib untuk pemula.",
    langkah: [
      "Posisi plank dengan tangan selebar bahu, badan lurus dari kepala sampai tumit.",
      "Turunkan badan perlahan hingga dada hampir menyentuh lantai (siku ~45° dari badan).",
      "Dorong tubuh kembali ke posisi awal dengan kuat tapi terkontrol.",
      "Jaga inti perut tetap kencang dan pinggul tidak turun atau naik.",
    ],
    tips: [
      "Belum kuat? Mulai dari knee push-up (lutut menempel lantai).",
      "Atau push-up dengan tangan di atas meja/kursi untuk versi lebih ringan.",
      "Fokus pada bentuk, bukan jumlah. 5 push-up bagus lebih baik dari 15 yang asal.",
    ],
    videoUrl: "https://www.youtube.com/results?search_query=cara+push+up+benar+pemula",
  },
  {
    id: "knee-push-up",
    nama: "Knee Push-up",
    kategori: ["dada", "lengan", "tricep"],
    alat: ["tanpa alat", "matras"],
    deskripsi:
      "Versi push-up untuk pemula. Lutut menempel di lantai sebagai tumpuan.",
    langkah: [
      "Posisi plank tapi lutut menempel ke matras/lantai.",
      "Tangan selebar bahu, badan tetap lurus dari kepala sampai lutut.",
      "Turunkan dada perlahan ke lantai, lalu dorong kembali ke atas.",
    ],
    tips: [
      "Cocok kalau push-up standar masih terlalu berat.",
      "Setelah bisa 3 set x 12 reps dengan nyaman, naik ke push-up standar.",
    ],
    videoUrl: "https://www.youtube.com/results?search_query=knee+push+up+tutorial",
  },
  {
    id: "diamond-push-up",
    nama: "Diamond Push-up",
    kategori: ["tricep", "dada"],
    alat: ["tanpa alat", "matras"],
    deskripsi:
      "Push-up dengan posisi tangan rapat membentuk berlian. Fokus utama ke tricep (belakang lengan).",
    langkah: [
      "Posisi plank, kedua telapak tangan disatukan sehingga ibu jari & telunjuk membentuk berlian.",
      "Turunkan dada ke arah tangan, jaga siku dekat dengan tubuh.",
      "Dorong tubuh kembali ke atas.",
    ],
    tips: [
      "Versi lebih sulit dari push-up standar — kuasai dulu push-up biasa.",
      "Boleh dilakukan dengan lutut menempel kalau masih berat.",
    ],
  },
  {
    id: "pike-push-up",
    nama: "Pike Push-up",
    kategori: ["bahu"],
    alat: ["tanpa alat", "matras"],
    deskripsi:
      "Push-up dengan pinggul terangkat tinggi (seperti V terbalik). Sangat efektif untuk bahu.",
    langkah: [
      "Posisi seperti downward dog: tangan dan kaki di lantai, pinggul terangkat tinggi.",
      "Tekuk siku, turunkan kepala ke arah lantai di antara tangan.",
      "Dorong kembali ke posisi awal.",
    ],
    tips: [
      "Persiapan untuk handstand push-up. Bagus untuk bentuk bahu bulat.",
      "Posisi kaki bisa lebih dekat ke tangan untuk versi lebih sulit.",
    ],
  },
  {
    id: "tricep-dip-chair",
    nama: "Tricep Dip (Kursi)",
    kategori: ["tricep", "lengan"],
    alat: ["kursi / meja"],
    deskripsi:
      "Latihan tricep menggunakan kursi atau sofa yang stabil.",
    langkah: [
      "Duduk di pinggir kursi, kedua tangan memegang pinggir kursi di samping pinggul.",
      "Geser pinggul ke depan kursi, kaki lurus atau ditekuk.",
      "Turunkan badan dengan menekuk siku hingga lengan atas paralel dengan lantai.",
      "Dorong kembali ke atas hanya dengan kekuatan tricep.",
    ],
    tips: [
      "Pastikan kursi stabil dan tidak beroda.",
      "Tekuk lutut untuk versi lebih ringan, lurus untuk lebih berat.",
    ],
  },
  {
    id: "bicep-curl-botol",
    nama: "Bicep Curl (Botol Air / Dumbbell)",
    kategori: ["bisep", "lengan"],
    alat: ["botol air / dumbbell"],
    deskripsi:
      "Latihan bisep paling klasik. Pakai botol air 1.5L isi pasir/air, atau dumbbell.",
    langkah: [
      "Berdiri tegak, pegang botol/dumbbell di kedua tangan, lengan menggantung di samping.",
      "Tekuk siku, angkat beban ke arah bahu. Siku tetap menempel di sisi tubuh.",
      "Turunkan perlahan ke posisi awal. Jangan dijatuhkan begitu saja.",
    ],
    tips: [
      "Gerakan harus pelan & terkontrol — jangan pakai momentum.",
      "Belum punya dumbbell? Isi botol 1.5L dengan pasir basah (~3kg) atau air (~1.5kg).",
      "Pertimbangkan beli dumbbell adjustable 2.5-10kg untuk progres jangka panjang.",
    ],
    videoUrl: "https://www.youtube.com/results?search_query=bicep+curl+dumbbell+form",
  },
  {
    id: "hammer-curl",
    nama: "Hammer Curl",
    kategori: ["bisep", "lengan"],
    alat: ["botol air / dumbbell"],
    deskripsi:
      "Variasi bicep curl dengan telapak tangan menghadap ke dalam (seperti pegang palu). Lebih fokus ke brachialis & lengan bawah.",
    langkah: [
      "Pegang dumbbell/botol dengan telapak tangan menghadap satu sama lain.",
      "Tekuk siku, angkat beban ke bahu tanpa memutar pergelangan tangan.",
      "Turunkan perlahan.",
    ],
    tips: [
      "Bagus untuk bikin lengan terlihat lebih tebal/penuh.",
      "Boleh selang-seling dengan bicep curl biasa.",
    ],
  },
  {
    id: "inverted-row-meja",
    nama: "Inverted Row (Bawah Meja)",
    kategori: ["punggung", "bisep"],
    alat: ["kursi / meja"],
    deskripsi:
      "Pull-up versi mudah dengan meja kokoh. Bagus untuk melatih punggung & bisep.",
    langkah: [
      "Berbaring telentang di bawah meja yang kokoh, pegang sisi meja dengan tangan selebar bahu.",
      "Kaki lurus/ditekuk, tubuh diangkat sehingga hanya tumit & tangan yang menumpu.",
      "Tarik dada ke arah meja dengan menekuk siku & menarik bahu ke belakang.",
      "Turunkan perlahan ke posisi awal.",
    ],
    tips: [
      "PASTIKAN MEJA KUAT — coba dulu dengan beban setengah badan sebelum full.",
      "Tekuk lutut untuk versi lebih ringan.",
      "Alternatif: pakai gagang sapu di antara 2 kursi yang stabil.",
    ],
    videoUrl: "https://www.youtube.com/results?search_query=inverted+row+at+home+table",
  },
  {
    id: "resistance-band-row",
    nama: "Resistance Band Row",
    kategori: ["punggung", "bisep"],
    alat: ["resistance band"],
    deskripsi:
      "Latihan punggung dengan resistance band. Murah, ringkas, sangat efektif.",
    langkah: [
      "Duduk di lantai, kaki lurus. Lingkarkan resistance band di telapak kaki.",
      "Pegang kedua ujung band, tangan lurus ke depan.",
      "Tarik band ke arah perut sambil menarik bahu ke belakang.",
      "Lepaskan perlahan ke posisi awal.",
    ],
    tips: [
      "Resistance band loop set (~50-150 ribu) adalah investasi murah & multifungsi.",
      "Bisa juga lakukan berdiri dengan band diikat ke gagang pintu.",
    ],
  },
  {
    id: "plank",
    nama: "Plank",
    kategori: ["perut", "fullbody"],
    alat: ["tanpa alat", "matras"],
    deskripsi:
      "Latihan inti perut paling efektif. Membentuk perut & juga melatih bahu, punggung.",
    langkah: [
      "Posisi seperti push-up tapi bertumpu pada siku/lengan bawah, bukan telapak tangan.",
      "Tubuh lurus dari kepala sampai tumit. Jangan biarkan pinggul turun atau naik.",
      "Kencangkan perut, bokong, paha. Tahan posisi.",
    ],
    tips: [
      "Pemula: mulai 20 detik, naikkan 5 detik tiap minggu.",
      "Target: 60 detik dalam 4 minggu.",
      "Lebih baik plank 30 detik dengan bentuk sempurna daripada 2 menit pinggul turun.",
    ],
    videoUrl: "https://www.youtube.com/results?search_query=plank+benar+pemula",
  },
  {
    id: "side-plank",
    nama: "Side Plank",
    kategori: ["perut"],
    alat: ["tanpa alat", "matras"],
    deskripsi:
      "Plank menyamping. Fokus ke perut samping (oblique).",
    langkah: [
      "Berbaring miring, bertumpu pada satu siku tepat di bawah bahu.",
      "Angkat pinggul sehingga tubuh lurus dari kepala sampai kaki.",
      "Tahan, lalu ganti sisi.",
    ],
    tips: [
      "Pemula bisa tekuk lutut bawah untuk versi lebih ringan.",
      "Versi sulit: angkat kaki atas atau angkat tangan atas ke langit-langit.",
    ],
  },
  {
    id: "crunch",
    nama: "Crunch",
    kategori: ["perut"],
    alat: ["matras"],
    deskripsi: "Crunch untuk perut bagian atas (six-pack).",
    langkah: [
      "Berbaring telentang, lutut ditekuk, kaki rata di lantai.",
      "Tangan di belakang kepala (jangan ditarik).",
      "Angkat bahu & punggung atas dari lantai dengan mengencangkan perut.",
      "Turunkan perlahan, jangan biarkan kepala/bahu menyentuh lantai sampai set selesai.",
    ],
    tips: [
      "Jangan tarik leher dengan tangan — itu cuma bikin leher sakit.",
      "Fokus 'menarik tulang rusuk ke arah panggul'.",
    ],
  },
  {
    id: "bicycle-crunch",
    nama: "Bicycle Crunch",
    kategori: ["perut"],
    alat: ["matras"],
    deskripsi: "Variasi crunch dengan gerakan menyilang. Melatih perut atas & samping.",
    langkah: [
      "Berbaring telentang, tangan di belakang kepala, lutut diangkat 90°.",
      "Putar tubuh: siku kanan ke arah lutut kiri sambil lutut kanan diluruskan.",
      "Ganti sisi seperti mengayuh sepeda.",
    ],
    tips: [
      "Gerakan harus terkontrol, bukan cepat-cepat.",
      "Putar dari batang tubuh, bukan cuma siku.",
    ],
  },
  {
    id: "leg-raise",
    nama: "Leg Raise",
    kategori: ["perut"],
    alat: ["matras"],
    deskripsi: "Latihan perut bagian bawah — area paling sulit dilatih.",
    langkah: [
      "Berbaring telentang, tangan di samping tubuh atau di bawah pantat untuk support.",
      "Angkat kaki lurus ke atas sampai 90° (tegak lurus lantai).",
      "Turunkan perlahan tapi jangan menyentuh lantai sampai set selesai.",
    ],
    tips: [
      "Tekuk lutut sedikit kalau punggung bawah sakit.",
      "Pemula: angkat satu kaki bergantian dulu.",
    ],
  },
  {
    id: "mountain-climber",
    nama: "Mountain Climber",
    kategori: ["perut", "kardio", "fullbody"],
    alat: ["matras"],
    deskripsi:
      "Latihan kardio + perut sekaligus. Bagus untuk membakar lemak.",
    langkah: [
      "Mulai posisi plank dengan tangan lurus.",
      "Tarik satu lutut ke arah dada, lalu ganti dengan cepat seperti berlari di tempat.",
      "Jaga pinggul tetap rendah, tidak naik turun.",
    ],
    tips: [
      "Tempo bisa lambat (fokus core) atau cepat (kardio HIIT).",
      "Biasanya 30-45 detik per set sudah cukup membakar.",
    ],
  },
  {
    id: "russian-twist",
    nama: "Russian Twist",
    kategori: ["perut"],
    alat: ["matras", "botol air / dumbbell"],
    deskripsi: "Melatih perut samping (oblique).",
    langkah: [
      "Duduk di matras, lutut ditekuk, kaki sedikit terangkat dari lantai.",
      "Tubuh condong ke belakang ~45°, tangan menyatu (atau pegang botol/beban).",
      "Putar tubuh ke kanan, lalu ke kiri. Setiap putaran = 1 rep.",
    ],
    tips: [
      "Pemula bisa biarkan kaki di lantai dulu.",
      "Tambah beban (botol air) untuk progres.",
    ],
  },
  {
    id: "squat",
    nama: "Bodyweight Squat",
    kategori: ["kaki", "fullbody"],
    alat: ["tanpa alat"],
    deskripsi:
      "Walaupun fokus kamu lengan & perut, latihan kaki PENTING untuk pembentukan tubuh & metabolisme.",
    langkah: [
      "Berdiri kaki selebar bahu, ujung kaki sedikit mengarah keluar.",
      "Tekuk lutut & turunkan pinggul seperti mau duduk di kursi.",
      "Turun sampai paha paralel dengan lantai (atau lebih dalam jika fleksibel).",
      "Dorong kembali ke atas dengan tumpuan tumit.",
    ],
    tips: [
      "Lutut jangan masuk ke dalam — searah dengan ujung kaki.",
      "Punggung tetap netral, dada terbuka.",
      "Kaki yang kuat = metabolisme tinggi = lebih cepat bentuk badan.",
    ],
  },
  {
    id: "jumping-jack",
    nama: "Jumping Jack",
    kategori: ["kardio", "fullbody"],
    alat: ["tanpa alat"],
    deskripsi: "Pemanasan & kardio ringan, cocok di rumah.",
    langkah: [
      "Berdiri tegak, tangan di samping, kaki rapat.",
      "Lompat sambil buka kaki selebar bahu & angkat tangan ke atas kepala.",
      "Lompat kembali ke posisi awal.",
    ],
    tips: ["Bagus untuk warm-up 1-2 menit sebelum latihan utama."],
  },
  {
    id: "high-knees",
    nama: "High Knees",
    kategori: ["kardio"],
    alat: ["tanpa alat"],
    deskripsi: "Kardio intensitas tinggi untuk membakar lemak.",
    langkah: [
      "Lari di tempat dengan mengangkat lutut setinggi pinggang.",
      "Ayunkan tangan seperti lari biasa.",
    ],
    tips: ["Untuk HIIT, lakukan 30 detik all-out, istirahat 30 detik, ulangi 4-6x."],
  },
  {
    id: "burpee",
    nama: "Burpee",
    kategori: ["kardio", "fullbody"],
    alat: ["matras"],
    deskripsi:
      "Latihan paling brutal untuk fat-burn. Melatih hampir seluruh otot tubuh.",
    langkah: [
      "Mulai berdiri, lalu jongkok & taruh tangan di lantai.",
      "Lompat kaki ke belakang ke posisi plank.",
      "Lakukan 1 push-up (opsional untuk pemula).",
      "Lompat kaki kembali ke depan, lalu lompat ke atas dengan tangan terangkat.",
    ],
    tips: [
      "Pemula: skip push-up & lompatan, cukup step out + step in.",
      "Burpee adalah salah satu latihan fat-burning paling efisien.",
    ],
  },
  {
    id: "walk-stretch",
    nama: "Jalan + Stretching",
    kategori: ["kardio"],
    alat: ["tanpa alat"],
    deskripsi:
      "Aktivitas pemulihan untuk hari istirahat. Bantu sirkulasi & mencegah otot kaku.",
    langkah: [
      "Jalan kaki ringan 20-30 menit (sekitar rumah / treadmill / dalam kamar).",
      "Stretching dinamis 5-10 menit untuk seluruh tubuh.",
    ],
    tips: [
      "Hari istirahat bukan berarti rebahan total — gerakan ringan justru bantu recovery.",
      "Stretching bahu, leher, hip flexor, hamstring penting kalau sering duduk.",
    ],
  },
];

export function getExercise(id: string): Exercise | undefined {
  return EXERCISES.find((e) => e.id === id);
}
