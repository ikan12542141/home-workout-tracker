import BudgetCalculator from "./BudgetCalculator";

function calcTDEE(berat: number, tinggi: number, umur: number): number {
  // Mifflin-St Jeor (Pria, sedentary→light active multiplier)
  const bmr = 10 * berat + 6.25 * tinggi - 5 * umur + 5;
  return Math.round(bmr * 1.4);
}

export default function NutrisiPage() {
  // Default berdasar profil user (21 thn, 170cm, 60kg)
  const tdee = calcTDEE(60, 170, 21);
  const proteinTarget = Math.round(60 * 1.6); // ~1.6g/kg untuk pemula yang latihan
  const proteinHigh = Math.round(60 * 2.0);
  const surplus = tdee + 250;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Panduan Nutrisi Singkat
        </h1>
        <p className="text-[var(--muted)] mt-2 max-w-2xl">
          Latihan adalah <strong>30%</strong>, makan adalah{" "}
          <strong>70%</strong> dari hasil. Goal kamu: bentuk lengan, bisep,
          perut → butuh otot lebih + lemak perut turun.
        </p>
      </div>

      <section className="grid sm:grid-cols-3 gap-3">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
          <div className="text-[var(--muted)] text-xs uppercase tracking-wide">
            Maintenance Kalori
          </div>
          <div className="text-3xl font-bold mt-1">
            ~{tdee}
            <span className="text-base text-[var(--muted)]"> kcal</span>
          </div>
          <div className="text-xs text-[var(--muted)] mt-1">
            estimasi untuk 170cm / 60kg / 21 thn / aktivitas ringan
          </div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
          <div className="text-[var(--muted)] text-xs uppercase tracking-wide">
            Lean Surplus
          </div>
          <div className="text-3xl font-bold mt-1">
            ~{surplus}
            <span className="text-base text-[var(--muted)]"> kcal</span>
          </div>
          <div className="text-xs text-[var(--muted)] mt-1">
            target +250 kcal/hari untuk bangun otot perlahan
          </div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
          <div className="text-[var(--muted)] text-xs uppercase tracking-wide">
            Protein Harian
          </div>
          <div className="text-3xl font-bold mt-1">
            {proteinTarget}-{proteinHigh}
            <span className="text-base text-[var(--muted)]"> g</span>
          </div>
          <div className="text-xs text-[var(--muted)] mt-1">
            ~1.6-2.0 g per kg berat badan
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-3">🍳 Sumber Protein Murah Lokal</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { nama: "Telur", info: "~6g protein per butir. Murah, fleksibel, bisa rebus/dadar." },
            {
              nama: "Tahu & Tempe",
              info: "Tempe 100g = ~19g protein. Tahu 100g = ~8g. Murah & lokal.",
            },
            {
              nama: "Dada Ayam",
              info: "100g = ~31g protein. Beli mentah, masak sendiri lebih murah.",
            },
            {
              nama: "Ikan (lele, nila, tongkol)",
              info: "Sumber protein + omega-3. 100g lele = ~16g protein.",
            },
            {
              nama: "Susu / Yogurt",
              info: "Susu UHT 250ml = ~8g protein. Greek yogurt lebih tinggi.",
            },
            {
              nama: "Kacang-kacangan",
              info: "Kacang tanah, almond, kacang merah — protein + lemak baik.",
            },
          ].map((s) => (
            <div
              key={s.nama}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4"
            >
              <h3 className="font-semibold mb-1">{s.nama}</h3>
              <p className="text-sm text-[var(--muted)]">{s.info}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-3">📋 Aturan Sederhana</h2>
        <ol className="space-y-2">
          {[
            "Setiap kali makan, pastikan ada sumber protein (telur, ayam, tempe, ikan).",
            "Karbohidrat oke — nasi, roti, kentang, oat. Jangan dipotong drastis.",
            "Sayur minimal 1 porsi per hari. Buah 1-2 porsi.",
            "Air minum: minimal 2 liter/hari. Lebih banyak kalau habis olahraga.",
            "Batasi gorengan jadi 1-2x seminggu saja.",
            "Minuman manis (boba, soda, kopi gula tinggi) = musuh utama perut buncit.",
            "Tidur 7-8 jam. Otot tumbuh saat tidur, BUKAN saat latihan.",
            "Boleh cheat 1x seminggu. Konsistensi 6 dari 7 hari sudah luar biasa.",
          ].map((r, i) => (
            <li
              key={i}
              className="flex gap-3 bg-[var(--card)] border border-[var(--border)] rounded-xl p-3"
            >
              <span className="font-mono text-sm text-[var(--accent)] shrink-0">
                {i + 1}
              </span>
              <span className="text-sm">{r}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-3">🍽️ Contoh Menu Sehari (~2500 kcal)</h2>
        <div className="space-y-3">
          {[
            {
              waktu: "Sarapan (~07:00)",
              menu: "Oatmeal 60g + susu 250ml + pisang + 2 butir telur rebus",
              kcal: "~600 kcal · ~30g protein",
            },
            {
              waktu: "Snack (~10:00)",
              menu: "Yogurt + 1 sdm kacang almond / kacang tanah",
              kcal: "~250 kcal · ~12g protein",
            },
            {
              waktu: "Makan Siang (~12:30)",
              menu: "Nasi 1 piring + dada ayam 150g + tempe goreng + sayur tumis",
              kcal: "~750 kcal · ~50g protein",
            },
            {
              waktu: "Pre/Post Latihan (~16:00)",
              menu: "Pisang + segelas susu, atau telur rebus 2 butir",
              kcal: "~250 kcal · ~12g protein",
            },
            {
              waktu: "Makan Malam (~19:00)",
              menu: "Nasi setengah piring + ikan tongkol/lele 150g + tahu + sayur",
              kcal: "~600 kcal · ~30g protein",
            },
          ].map((m) => (
            <div
              key={m.waktu}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4"
            >
              <div className="text-xs text-[var(--muted)] font-mono mb-1">
                {m.waktu}
              </div>
              <div className="font-medium text-sm">{m.menu}</div>
              <div className="text-xs text-[var(--accent)] mt-1">{m.kcal}</div>
            </div>
          ))}
        </div>
        <div className="text-xs text-[var(--muted)] mt-3">
          * Estimasi kasar. Sesuaikan porsi dengan rasa kenyang & berat badan
          mingguan. Kalau berat tidak naik dalam 2 minggu, tambah porsi nasi.
        </div>
      </section>

      <BudgetCalculator />

      <section className="bg-amber-500/10 border border-amber-500/30 text-amber-100 rounded-2xl p-5">
        <h2 className="font-bold mb-2">⚠️ Disclaimer</h2>
        <p className="text-sm">
          Panduan ini berdasarkan prinsip umum nutrisi olahraga. Bukan saran
          medis. Kalau kamu punya kondisi kesehatan tertentu (diabetes,
          gangguan ginjal, dll), konsultasi dengan dokter / ahli gizi dulu.
        </p>
      </section>
    </div>
  );
}
