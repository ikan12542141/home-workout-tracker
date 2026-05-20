/**
 * Database harga bahan & resep makanan murah Indonesia (Mei 2026 — perkiraan harga ritel).
 * Harga bisa beda 10-30% tergantung kota/pasar. Gunakan sebagai panduan kasar.
 */

export type BahanMakanan = {
  nama: string;
  satuan: string; // "100g", "1 butir", dll.
  hargaRupiah: number;
  kaloriPerSatuan: number;
  proteinGramPerSatuan: number;
  kategori: "protein" | "karbo" | "sayur" | "lemak" | "minuman";
};

export const BAHAN: BahanMakanan[] = [
  // Protein
  { nama: "Telur ayam", satuan: "1 butir", hargaRupiah: 2200, kaloriPerSatuan: 78, proteinGramPerSatuan: 6, kategori: "protein" },
  { nama: "Tempe", satuan: "100g", hargaRupiah: 3500, kaloriPerSatuan: 195, proteinGramPerSatuan: 19, kategori: "protein" },
  { nama: "Tahu", satuan: "100g", hargaRupiah: 3000, kaloriPerSatuan: 76, proteinGramPerSatuan: 8, kategori: "protein" },
  { nama: "Dada ayam tanpa tulang", satuan: "100g", hargaRupiah: 8500, kaloriPerSatuan: 165, proteinGramPerSatuan: 31, kategori: "protein" },
  { nama: "Ikan lele", satuan: "100g", hargaRupiah: 5500, kaloriPerSatuan: 105, proteinGramPerSatuan: 16, kategori: "protein" },
  { nama: "Ikan nila", satuan: "100g", hargaRupiah: 6000, kaloriPerSatuan: 96, proteinGramPerSatuan: 20, kategori: "protein" },
  { nama: "Ikan tongkol", satuan: "100g", hargaRupiah: 7000, kaloriPerSatuan: 109, proteinGramPerSatuan: 23, kategori: "protein" },
  { nama: "Susu UHT", satuan: "250ml", hargaRupiah: 6500, kaloriPerSatuan: 150, proteinGramPerSatuan: 8, kategori: "protein" },
  { nama: "Greek yogurt plain", satuan: "100g", hargaRupiah: 9000, kaloriPerSatuan: 59, proteinGramPerSatuan: 10, kategori: "protein" },
  { nama: "Kacang tanah", satuan: "30g", hargaRupiah: 2500, kaloriPerSatuan: 170, proteinGramPerSatuan: 8, kategori: "protein" },
  // Karbo
  { nama: "Nasi putih", satuan: "100g", hargaRupiah: 2000, kaloriPerSatuan: 130, proteinGramPerSatuan: 2, kategori: "karbo" },
  { nama: "Roti tawar gandum", satuan: "1 lembar", hargaRupiah: 1500, kaloriPerSatuan: 80, proteinGramPerSatuan: 4, kategori: "karbo" },
  { nama: "Oatmeal", satuan: "40g", hargaRupiah: 3500, kaloriPerSatuan: 150, proteinGramPerSatuan: 5, kategori: "karbo" },
  { nama: "Kentang rebus", satuan: "100g", hargaRupiah: 2000, kaloriPerSatuan: 87, proteinGramPerSatuan: 2, kategori: "karbo" },
  { nama: "Mie instan (NO MSG)", satuan: "1 bungkus", hargaRupiah: 4500, kaloriPerSatuan: 380, proteinGramPerSatuan: 8, kategori: "karbo" },
  { nama: "Pisang", satuan: "1 buah", hargaRupiah: 2000, kaloriPerSatuan: 105, proteinGramPerSatuan: 1, kategori: "karbo" },
  // Sayur
  { nama: "Bayam (1 ikat)", satuan: "100g", hargaRupiah: 2500, kaloriPerSatuan: 23, proteinGramPerSatuan: 3, kategori: "sayur" },
  { nama: "Brokoli", satuan: "100g", hargaRupiah: 5000, kaloriPerSatuan: 34, proteinGramPerSatuan: 3, kategori: "sayur" },
  { nama: "Wortel", satuan: "100g", hargaRupiah: 2000, kaloriPerSatuan: 41, proteinGramPerSatuan: 1, kategori: "sayur" },
  { nama: "Kacang panjang", satuan: "100g", hargaRupiah: 2500, kaloriPerSatuan: 47, proteinGramPerSatuan: 3, kategori: "sayur" },
];

export type MenuTemplate = {
  nama: string;
  total: { kalori: number; protein: number; harga: number };
  items: { bahan: string; jumlah: string; harga: number }[];
};

/**
 * Build menu 1 hari (3 meal + 1 snack) berdasarkan budget harian.
 * Returns 3 template (hemat, standar, premium).
 */
export const MENU_TEMPLATES: Record<string, MenuTemplate[]> = {
  hemat: [
    {
      nama: "Menu Hemat — ~Rp 25.000/hari (~2000 kcal, 90g protein)",
      total: { kalori: 1980, protein: 92, harga: 24500 },
      items: [
        { bahan: "Sarapan: Oatmeal 40g + 2 butir telur rebus + 1 pisang", jumlah: "1 porsi", harga: 9100 },
        { bahan: "Snack siang: Tempe goreng 100g + nasi 100g", jumlah: "1 porsi", harga: 5500 },
        { bahan: "Makan siang: Nasi 150g + ikan lele 100g + tahu 100g + bayam tumis", jumlah: "1 porsi", harga: 13500 },
        { bahan: "Makan malam: Nasi 100g + telur ceplok 2 + tempe + sayur", jumlah: "1 porsi", harga: 9000 },
      ],
    },
  ],
  standar: [
    {
      nama: "Menu Standar — ~Rp 40.000/hari (~2400 kcal, 120g protein)",
      total: { kalori: 2380, protein: 122, harga: 39000 },
      items: [
        { bahan: "Sarapan: Oatmeal 40g + susu UHT + 2 telur + 1 pisang", jumlah: "1 porsi", harga: 14000 },
        { bahan: "Snack: Greek yogurt 100g + kacang tanah 30g", jumlah: "1 porsi", harga: 11500 },
        { bahan: "Makan siang: Nasi 150g + dada ayam 150g + tempe + sayur tumis", jumlah: "1 porsi", harga: 18000 },
        { bahan: "Makan malam: Nasi 100g + ikan tongkol 150g + tahu + brokoli", jumlah: "1 porsi", harga: 21000 },
      ],
    },
  ],
  premium: [
    {
      nama: "Menu Premium — ~Rp 60.000/hari (~2700 kcal, 150g protein)",
      total: { kalori: 2700, protein: 152, harga: 58000 },
      items: [
        { bahan: "Sarapan: 3 telur + roti gandum 2 lembar + susu UHT + pisang", jumlah: "1 porsi", harga: 13700 },
        { bahan: "Snack pagi: Greek yogurt 150g + almond/kacang", jumlah: "1 porsi", harga: 17000 },
        { bahan: "Makan siang: Nasi 150g + dada ayam 200g + brokoli + tempe", jumlah: "1 porsi", harga: 24000 },
        { bahan: "Pre/post workout: Susu UHT + 1 pisang", jumlah: "1 porsi", harga: 8500 },
        { bahan: "Makan malam: Nasi 100g + ikan tongkol 200g + sayur + tahu", jumlah: "1 porsi", harga: 25000 },
      ],
    },
  ],
};

export function recommendBudget(budgetHarian: number): "hemat" | "standar" | "premium" {
  if (budgetHarian < 32000) return "hemat";
  if (budgetHarian < 50000) return "standar";
  return "premium";
}

/**
 * Calculate weekly shopping list price based on a meal template (×7 days).
 */
export function weeklyEstimate(template: MenuTemplate): number {
  return template.total.harga * 7;
}
