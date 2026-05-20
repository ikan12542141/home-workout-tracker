export type DIYProject = {
  id: string;
  nama: string;
  deskripsi: string;
  estimasiHarga: string;
  waktu: string;
  bahan: string[];
  langkah: string[];
  alternatif?: string;
  gantiAlat: string;
  hargaAlatBeli: string;
};

export const DIY_PROJECTS: DIYProject[] = [
  {
    id: "dumbbell-pasir",
    nama: "Dumbbell Botol Pasir",
    deskripsi:
      "Cara paling murah & cepat. Botol air mineral 1.5L diisi pasir basah = sekitar 3kg per botol.",
    estimasiHarga: "Gratis - Rp 10.000 (kalau beli pasir)",
    waktu: "15 menit",
    bahan: [
      "2 botol air mineral 1.5L (kosong)",
      "Pasir kering (dari toko material atau pantai)",
      "Lakban / isolasi untuk pegangan",
      "Air (opsional, untuk versi lebih ringan)",
    ],
    langkah: [
      "Cuci & keringkan botol.",
      "Isi pasir kering sampai penuh (~3 kg per botol). Untuk versi lebih ringan, isi air (~1.5kg).",
      "Tutup rapat. Bungkus leher botol dengan lakban tebal untuk pegangan nyaman.",
      "Untuk progres lebih berat, gunakan botol 5L kosong + pasir.",
    ],
    gantiAlat: "Dumbbell 3kg pair",
    hargaAlatBeli: "Rp 150.000 - 300.000",
  },
  {
    id: "sandbag-beras",
    nama: "Sandbag dari Karung Beras",
    deskripsi:
      "Sandbag 5-15kg untuk weighted squat, lunge, dan bear hug carry. Sangat versatil.",
    estimasiHarga: "Rp 10.000 - 20.000",
    waktu: "20 menit",
    bahan: [
      "1 karung beras kosong (atau goni)",
      "1 plastik besar tebal (bag pembungkus)",
      "Lakban hitam tebal",
      "Pasir / beras / kerikil 5-15kg",
    ],
    langkah: [
      "Bungkus pasir/beras dalam plastik tebal, ikat rapat.",
      "Masukkan bungkusan ke karung.",
      "Jahit atau ikat ujung karung. Bungkus lakban di seluruh permukaan untuk durability.",
      "Buat 2-3 unit dengan berat berbeda (5kg, 10kg, 15kg) untuk progressive overload.",
    ],
    alternatif: "Backpack diisi buku tebal — gratis, bisa langsung dipakai. Bobot maksimal ~10kg sebelum ransel rusak.",
    gantiAlat: "Sandbag fitness 10kg",
    hargaAlatBeli: "Rp 250.000 - 500.000",
  },
  {
    id: "pullup-bar-pipa",
    nama: "Pull-up Bar Pipa Galvanis",
    deskripsi:
      "Pull-up bar permanen di kusen pintu / antara dua tembok. Kuat menahan 100kg+.",
    estimasiHarga: "Rp 50.000 - 100.000",
    waktu: "1 jam (termasuk bor lubang)",
    bahan: [
      "Pipa galvanis (besi) diameter 1 inch, panjang sesuai lebar pintu",
      "2 flange pipa galvanis (dudukan tembok)",
      "Sekrup tembok / dynabolt",
      "Bor + mata bor tembok",
    ],
    langkah: [
      "Ukur lebar pintu / area antara 2 tembok. Tinggi target: sekitar 220-230 cm dari lantai.",
      "Pasang 2 flange di tembok kiri & kanan dengan dynabolt (PASTIKAN ke struktur kokoh, bukan plywood).",
      "Pasang pipa ke flange dengan ulir.",
      "Test dengan menggantung — pipa harus tidak goyang sama sekali.",
    ],
    alternatif:
      "Pull-up bar pintu siap pakai (Rp 100rb-250rb di toko olahraga online).",
    gantiAlat: "Pull-up bar wall mount",
    hargaAlatBeli: "Rp 200.000 - 500.000",
  },
  {
    id: "parallette-kayu",
    nama: "Parallette dari Kayu Balok",
    deskripsi:
      "Parallel bar mini untuk push-up dalam, L-sit, handstand. Lebih nyaman dari push-up di lantai.",
    estimasiHarga: "Rp 30.000 - 60.000",
    waktu: "30 menit",
    bahan: [
      "2 kayu balok 4x4cm, panjang ~40cm (untuk pegangan)",
      "4 kayu balok 4x4cm, panjang ~15cm (untuk kaki tegak)",
      "4 kayu papan 10x4cm, panjang ~25cm (untuk dasar)",
      "Sekrup kayu + lem kayu",
    ],
    langkah: [
      "Buat 2 'kaki' berbentuk T dari kayu vertikal + dasar horizontal.",
      "Pasang kayu pegangan 40cm di atas 2 kaki dengan sekrup kayu (jarak antar kaki ~30cm).",
      "Amplas semua permukaan & cat / pernis.",
      "Letakkan di lantai matras saat dipakai.",
    ],
    alternatif:
      "Pakai 2 kursi yang punya pegangan rata di atas (push handles).",
    gantiAlat: "Parallette gym",
    hargaAlatBeli: "Rp 200.000 - 450.000",
  },
  {
    id: "resistance-band-ban",
    nama: "Resistance Band dari Ban Dalam",
    deskripsi:
      "Resistance band darurat dari ban dalam sepeda atau motor bekas. Cukup elastis untuk band pull-apart & face pull.",
    estimasiHarga: "Gratis - Rp 20.000",
    waktu: "10 menit",
    bahan: [
      "1 ban dalam sepeda/motor bekas (cek di tukang tambal ban — sering gratis)",
      "Gunting tajam",
      "Lakban (untuk pegangan)",
    ],
    langkah: [
      "Bersihkan ban dengan sabun air.",
      "Potong ban menjadi loop panjang (kalau bocor di 1 titik).",
      "Bungkus kedua ujung dengan lakban tebal untuk pegangan.",
      "Bisa dipakai untuk band pull-apart, face pull, atau resistance assist untuk pull-up.",
    ],
    alternatif:
      "Resistance band set (5 band warna) Rp 50-150rb di toko olahraga online — lebih praktis & tahan lama.",
    gantiAlat: "Resistance band set 5 warna",
    hargaAlatBeli: "Rp 50.000 - 200.000",
  },
  {
    id: "ab-wheel-mobil",
    nama: "Ab Wheel dari Roda Mobil Mainan",
    deskripsi: "Ab wheel DIY untuk core dynamic challenge. Cuma butuh roda kecil & gagang.",
    estimasiHarga: "Rp 25.000 - 50.000",
    waktu: "20 menit",
    bahan: [
      "1 roda bekas mainan mobil-mobilan (~10cm diameter) atau roda skateboard",
      "1 pipa besi/PVC ~25cm sebagai gagang",
      "Sekrup + ring untuk pasang roda",
    ],
    langkah: [
      "Bor lubang tengah roda untuk batang gagang.",
      "Pasang pipa melintang ke roda dengan sekrup kuat. Pastikan roda berputar lancar.",
      "Test: dorong di lantai keramik — harus mulus.",
    ],
    alternatif: "Pakai botol galon kosong (5L) yang digulingkan — efek mirip walaupun kurang stabil.",
    gantiAlat: "Ab wheel fitness",
    hargaAlatBeli: "Rp 80.000 - 200.000",
  },
];
