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
  /** YouTube video ID (just the ID, not full URL) — used for embed player */
  videoEmbedId?: string;
  gambar?: string;
  /** Used for Personal Records: if defined, this is the metric tracked */
  prMetric?: "reps" | "durasi-detik";
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
    videoEmbedId: "IODxDxX7oi4",
    prMetric: "reps",
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
    videoEmbedId: "jWxvty2KROs",
    prMetric: "reps",
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
    videoEmbedId: "J0DnG1_S92I",
    prMetric: "reps",
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
    videoEmbedId: "x7_NgEv25H4",
    prMetric: "reps",
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
    videoEmbedId: "6kALZikXxLc",
    prMetric: "reps",
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
    videoEmbedId: "ykJmrZ5v0Oo",
    prMetric: "reps",
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
    videoEmbedId: "TwD-YGVP4Bk",
    prMetric: "reps",
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
    videoEmbedId: "dvkIaarnf0I",
    prMetric: "reps",
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
    videoEmbedId: "xQNrFHEMhI4",
    prMetric: "reps",
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
    videoEmbedId: "pSHjTRCQxIw",
    prMetric: "durasi-detik",
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
    videoEmbedId: "K2VljzCC16g",
    prMetric: "durasi-detik",
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
    videoEmbedId: "Xyd_fa5zoEU",
    prMetric: "reps",
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
    videoEmbedId: "9FGilxCbdz8",
    prMetric: "reps",
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
    videoEmbedId: "JB2oyawG9KI",
    prMetric: "reps",
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
    videoEmbedId: "nmwgirgXLYM",
    prMetric: "durasi-detik",
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
    videoEmbedId: "wkD8rjkodUI",
    prMetric: "reps",
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
    videoEmbedId: "YaXPRqUwItQ",
    prMetric: "reps",
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
    videoEmbedId: "c4DAnQ6DtF8",
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
    videoEmbedId: "OAJ_J3EZkdY",
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
    videoEmbedId: "qLBImHhCXSw",
    prMetric: "reps",
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
  // ====== ADVANCED EXERCISES (Week 5-24) ======
  {
    id: "decline-push-up",
    nama: "Decline Push-up (Kaki di Kursi)",
    kategori: ["dada", "bahu", "tricep"],
    alat: ["kursi / meja", "matras"],
    deskripsi:
      "Push-up dengan kaki diangkat ke kursi — beban lebih ke bahu & dada atas. Progres setelah push-up standar mudah.",
    langkah: [
      "Posisi push-up tapi taruh kaki di atas kursi/sofa stabil.",
      "Tangan di lantai, tubuh lurus diagonal.",
      "Turunkan dada ke lantai, dorong kembali ke atas.",
    ],
    tips: [
      "Semakin tinggi kursi = semakin berat ke bahu.",
      "Kuasai dulu 3×15 push-up standar sebelum naik ke decline.",
    ],
    videoEmbedId: "SKPab2YC8BE",
    prMetric: "reps",
  },
  {
    id: "archer-push-up",
    nama: "Archer Push-up",
    kategori: ["dada", "tricep"],
    alat: ["tanpa alat", "matras"],
    deskripsi:
      "Push-up satu sisi — beban hampir 70% ditahan 1 tangan. Progres ke one-arm push-up.",
    langkah: [
      "Posisi push-up dengan tangan lebih lebar dari bahu.",
      "Turunkan tubuh ke satu sisi — tangan sisi itu menekuk, tangan lain lurus seperti memanah.",
      "Dorong kembali ke tengah, ulangi ke sisi sebaliknya.",
    ],
    tips: [
      "Mulai dengan jangkauan kecil dulu, perlebar bertahap.",
      "Persiapan untuk one-arm push-up dalam 6-12 bulan.",
    ],
    videoEmbedId: "tu0YQA62OQE",
    prMetric: "reps",
  },
  {
    id: "weighted-row",
    nama: "Weighted Inverted Row",
    kategori: ["punggung", "bisep"],
    alat: ["kursi / meja"],
    deskripsi:
      "Inverted row dengan beban tambahan (tas isi buku di dada). Progres setelah row dengan body weight terlalu mudah.",
    langkah: [
      "Pakai backpack diisi buku/botol (3-8 kg) di dada/depan badan.",
      "Lakukan inverted row di bawah meja seperti biasa.",
    ],
    tips: [
      "Naikkan beban 1-2 kg setiap kali 3×12 rep terasa mudah.",
      "Jaga form — lebih baik kurang beban tapi gerakan full.",
    ],
    prMetric: "reps",
  },
  {
    id: "negative-pull-up",
    nama: "Negative Pull-up",
    kategori: ["punggung", "bisep"],
    alat: ["tanpa alat"],
    deskripsi:
      "Lompat ke posisi atas pull-up, turun pelan-pelan (5+ detik). Cara paling cepat membangun pull-up.",
    langkah: [
      "Pakai pull-up bar pintu atau dahan kuat.",
      "Lompat sampai dagu di atas bar.",
      "Turunkan tubuh PELAN-PELAN minimum 5 detik.",
      "Lompat kembali ke atas, ulangi.",
    ],
    tips: [
      "5-8 negative per set sudah sangat berat.",
      "Setelah bisa 3×5 negative slow control, coba 1 pull-up murni.",
    ],
    videoEmbedId: "f6BHbWVypHs",
    prMetric: "reps",
  },
  {
    id: "pull-up",
    nama: "Pull-up",
    kategori: ["punggung", "bisep"],
    alat: ["tanpa alat"],
    deskripsi:
      "Raja semua latihan punggung atas. Butuh pull-up bar atau dahan.",
    langkah: [
      "Gantung di bar dengan grip overhand selebar bahu.",
      "Tarik tubuh ke atas sampai dagu di atas bar.",
      "Turunkan terkontrol sampai lengan lurus.",
    ],
    tips: [
      "Bahu jangan naik ke kuping — tahan scapula ke bawah.",
      "Belum bisa 1? Lakukan negative pull-up dulu.",
    ],
    videoEmbedId: "eGo4IYlbE5g",
    prMetric: "reps",
  },
  {
    id: "chin-up",
    nama: "Chin-up",
    kategori: ["bisep", "punggung"],
    alat: ["tanpa alat"],
    deskripsi:
      "Pull-up dengan grip underhand (telapak menghadap kamu). Lebih banyak ke bisep.",
    langkah: [
      "Gantung di bar dengan telapak menghadap kamu, selebar bahu.",
      "Tarik dada ke arah bar.",
      "Turunkan terkontrol.",
    ],
    tips: [
      "Biasanya lebih mudah dari pull-up karena bisep ikut bantu.",
      "Goal sederhana: 5 chin-up murni di bulan ke-4.",
    ],
    videoEmbedId: "brhRXlOhsAM",
    prMetric: "reps",
  },
  {
    id: "hollow-hold",
    nama: "Hollow Body Hold",
    kategori: ["perut"],
    alat: ["matras"],
    deskripsi:
      "Standar gimnastik untuk core. Bikin perut & lower abs sangat kuat.",
    langkah: [
      "Tiduran terlentang, lower back menempel ke lantai.",
      "Angkat kaki lurus ~30cm dari lantai.",
      "Angkat kepala & bahu sedikit, tangan lurus di atas kepala.",
      "Tahan posisi — badan seperti pisang terbalik.",
    ],
    tips: [
      "Pemula: tekuk lutut & taruh tangan di samping.",
      "Goal: 60 detik hold di bulan ke-3.",
    ],
    videoEmbedId: "LlDNef_Ztsc",
    prMetric: "durasi-detik",
  },
  {
    id: "l-sit-progression",
    nama: "L-Sit Progression",
    kategori: ["perut", "lengan"],
    alat: ["matras"],
    deskripsi:
      "Tahan tubuh di atas tangan dengan kaki lurus di depan. Latihan core paling brutal yang ada.",
    langkah: [
      "Duduk di lantai, tangan menempel di lantai di samping pinggul.",
      "Dorong badan ke atas — pinggul terangkat dari lantai.",
      "Pemula: tekuk lutut (tuck l-sit).",
      "Lanjutan: kaki lurus.",
    ],
    tips: [
      "5 detik hold sudah keras. Progres pelan-pelan.",
      "Bisa pakai dua kursi sebagai parallette.",
    ],
    videoEmbedId: "TfQuSluZBgQ",
    prMetric: "durasi-detik",
  },
  {
    id: "wall-handstand-hold",
    nama: "Wall Handstand Hold",
    kategori: ["bahu", "lengan"],
    alat: ["tanpa alat"],
    deskripsi:
      "Handstand bersandar tembok. Bangun kekuatan & kepercayaan diri untuk handstand bebas.",
    langkah: [
      "Posisi push-up dengan kaki di tembok, lalu jalan kaki naik ke atas tembok.",
      "Atau lompat ke handstand dengan kaki menyandar tembok.",
      "Tahan posisi terbalik — kepala netral, perut kencang.",
    ],
    tips: [
      "Mulai 10-15 detik. Goal 60 detik di bulan ke-4.",
      "Latihan ini sangat bagus untuk bahu bulat & posture.",
    ],
    videoEmbedId: "BS8WS-LP2_o",
    prMetric: "durasi-detik",
  },
  {
    id: "pistol-squat-progression",
    nama: "Pistol Squat Progression",
    kategori: ["kaki"],
    alat: ["kursi / meja"],
    deskripsi:
      "Squat satu kaki. Cara paling efisien menguatkan kaki tanpa beban berat.",
    langkah: [
      "Berdiri 1 kaki, kaki lain lurus di depan.",
      "Pegangan ke kursi/tembok untuk balance.",
      "Turunkan dengan 1 kaki sampai pantat hampir kena lantai.",
      "Dorong kembali ke atas.",
    ],
    tips: [
      "Mulai dari box squat (jongkok di kursi rendah, berdiri 1 kaki).",
      "Goal: 5 pistol squat murni per kaki.",
    ],
    videoEmbedId: "vq5-vdgJc0I",
    prMetric: "reps",
  },
  {
    id: "weighted-squat",
    nama: "Weighted Squat (Goblet/Backpack)",
    kategori: ["kaki", "fullbody"],
    alat: ["botol air / dumbbell"],
    deskripsi:
      "Squat dengan beban di depan dada (goblet) atau backpack berat.",
    langkah: [
      "Pegang dumbbell/botol di depan dada, atau backpack diisi 5-15kg.",
      "Squat seperti biasa, dada terbuka, lutut searah ujung kaki.",
    ],
    tips: [
      "Tambah beban perlahan — kaki cepat adaptasi.",
      "Squat + protein = metabolisme naik = perut rata.",
    ],
    prMetric: "reps",
  },
  {
    id: "bulgarian-split-squat",
    nama: "Bulgarian Split Squat",
    kategori: ["kaki"],
    alat: ["kursi / meja"],
    deskripsi:
      "Squat 1 kaki dengan kaki belakang di atas kursi. Membentuk paha & glutes.",
    langkah: [
      "Berdiri 1 langkah di depan kursi, taruh punggung kaki belakang di kursi.",
      "Turunkan tubuh sampai paha depan paralel lantai.",
      "Dorong kembali ke atas. Selesai 1 sisi, baru pindah kaki.",
    ],
    tips: [
      "Beban kebanyakan di kaki depan.",
      "Tambah backpack untuk beban tambahan.",
    ],
    videoEmbedId: "2C-uNgKwPLE",
    prMetric: "reps",
  },
  {
    id: "concentration-curl",
    nama: "Concentration Curl",
    kategori: ["bisep"],
    alat: ["botol air / dumbbell"],
    deskripsi:
      "Bicep curl 1 tangan dengan siku ditopang paha. Isolasi murni untuk bisep.",
    langkah: [
      "Duduk di kursi, badan condong ke depan.",
      "Siku 1 tangan ditopang ke paha bagian dalam.",
      "Angkat botol/dumbbell perlahan ke arah bahu, peras bisep di atas.",
      "Turunkan terkontrol.",
    ],
    tips: [
      "Pelan-pelan banget. Fokus mind-muscle connection.",
      "Ini adalah favorit Arnold Schwarzenegger untuk bisep tinggi.",
    ],
    videoEmbedId: "Pwq-Rrm-3WI",
    prMetric: "reps",
  },
  {
    id: "preacher-curl-floor",
    nama: "Preacher-style Curl (di Kursi)",
    kategori: ["bisep"],
    alat: ["botol air / dumbbell", "kursi / meja"],
    deskripsi:
      "Bicep curl dengan siku ditopang sandaran kursi. Eliminates momentum.",
    langkah: [
      "Berlutut di lantai, taruh siku & lengan atas di atas sandaran kursi (atau tepi tempat tidur).",
      "Pegang botol/dumbbell — angkat sampai ke arah bahu, turunkan pelan.",
    ],
    tips: [
      "Versi tanpa-bench dari preacher curl di gym.",
      "Bagus banget untuk peak bisep.",
    ],
    prMetric: "reps",
  },
  {
    id: "diamond-pushup-feet-elevated",
    nama: "Decline Diamond Push-up",
    kategori: ["tricep", "dada"],
    alat: ["kursi / meja", "matras"],
    deskripsi:
      "Diamond push-up dengan kaki di kursi. Salah satu latihan tricep terkeras tanpa alat.",
    langkah: [
      "Kaki di kursi, tangan rapat membentuk berlian di lantai.",
      "Turunkan dada ke arah tangan, dorong kembali.",
    ],
    tips: [
      "Maksimum tension ke tricep.",
      "Hanya lakukan setelah diamond push-up biasa terasa mudah.",
    ],
    prMetric: "reps",
  },
  {
    id: "tuck-front-lever",
    nama: "Tuck Front Lever Hold",
    kategori: ["punggung", "perut"],
    alat: ["tanpa alat"],
    deskripsi:
      "Gantung di bar dengan kaki ditarik ke dada, tubuh paralel dengan lantai. Latihan punggung & core advanced.",
    langkah: [
      "Gantung di pull-up bar dengan grip overhand.",
      "Tarik kaki ke dada, lalu putar tubuh sehingga punggung paralel dengan lantai.",
      "Tahan posisi.",
    ],
    tips: [
      "Sangat advanced. Coba setelah bulan 4.",
      "Mulai dari 5 detik. Goal 30 detik.",
    ],
    videoEmbedId: "lJ4OLAv-itk",
    prMetric: "durasi-detik",
  },
  {
    id: "side-plank",
    nama: "Side Plank",
    kategori: ["perut"],
    alat: ["matras"],
    deskripsi:
      "Plank samping — fokus ke otot samping perut (obliques).",
    langkah: [
      "Tiduran miring, topang dengan 1 siku & sisi kaki.",
      "Angkat pinggul sehingga tubuh lurus diagonal.",
      "Tahan posisi.",
    ],
    tips: [
      "Tambah variasi: angkat kaki atas atau pegang botol di tangan atas.",
      "Latih kedua sisi sama rata.",
    ],
    videoEmbedId: "wqzrb67Dwf8",
    prMetric: "durasi-detik",
  },
  {
    id: "dragon-flag-progression",
    nama: "Dragon Flag Progression",
    kategori: ["perut"],
    alat: ["matras"],
    deskripsi:
      "Latihan perut legendaris dari Bruce Lee. Sangat brutal untuk lower abs.",
    langkah: [
      "Tiduran terlentang, pegang tepi sofa/kasur kuat dengan kedua tangan di atas kepala.",
      "Angkat seluruh tubuh lurus seperti pisau lipat.",
      "Turunkan tubuh PELAN — hanya kepala & bahu yang menyentuh lantai.",
    ],
    tips: [
      "Progres: tuck (lutut ditekuk) → straddle → full straight.",
      "5 rep sudah luar biasa berat.",
    ],
    videoEmbedId: "UFm-fp42aE0",
    prMetric: "reps",
  },
  {
    id: "explosive-push-up",
    nama: "Explosive / Clap Push-up",
    kategori: ["dada", "fullbody"],
    alat: ["matras"],
    deskripsi:
      "Push-up dengan dorong meledak — tangan terangkat dari lantai. Bangun power.",
    langkah: [
      "Posisi push-up.",
      "Turunkan tubuh, lalu dorong dengan ledakan kuat sampai tangan lepas dari lantai.",
      "Mendarat lembut & ulangi.",
    ],
    tips: [
      "Hanya setelah bisa 15 push-up murni.",
      "Clap push-up versi lebih sulit — coba kalau sudah expert.",
    ],
    videoEmbedId: "lp-ZUf69rgo",
    prMetric: "reps",
  },
  {
    id: "burpee-pullup",
    nama: "Burpee + Pull-up",
    kategori: ["fullbody", "kardio"],
    alat: ["tanpa alat"],
    deskripsi: "Kombinasi paling brutal — burpee selesai dengan 1 pull-up.",
    langkah: [
      "Lakukan burpee biasa di bawah pull-up bar.",
      "Saat lompatan akhir, raih bar & lakukan 1 pull-up.",
      "Lepaskan bar, ulangi.",
    ],
    tips: [
      "Hanya untuk fase advanced (bulan 5-6).",
      "5 rep sudah membakar.",
    ],
    prMetric: "reps",
  },
  {
    id: "skip-rope",
    nama: "Skipping Rope",
    kategori: ["kardio"],
    alat: ["tanpa alat"],
    deskripsi:
      "Kardio paling efisien & murah. 10 menit skipping ≈ 30 menit jogging.",
    langkah: [
      "Pegang tali, putar dari pergelangan tangan.",
      "Lompat ringan saat tali sampai di kaki.",
    ],
    tips: [
      "Pemula: 30 detik on, 30 detik off, ulangi 8-10 putaran.",
      "Setelah lancar: double under (tali putar 2x per lompatan).",
    ],
    videoEmbedId: "1BZM2Vre5oc",
    prMetric: "durasi-detik",
  },
];

export function getExercise(id: string): Exercise | undefined {
  return EXERCISES.find((e) => e.id === id);
}
