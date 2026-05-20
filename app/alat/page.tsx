type AlatItem = {
  nama: string;
  status: "harus punya" | "alternatif rumah" | "opsional";
  hargaEstimasi?: string;
  manfaat: string;
  alternatifGratis?: string;
};

const ALAT: AlatItem[] = [
  {
    nama: "Matras / Alas Lantai",
    status: "harus punya",
    hargaEstimasi: "Rp 50.000 - 150.000",
    manfaat:
      "Wajib untuk plank, crunch, push-up, dan latihan lantai lainnya. Melindungi siku, lutut, dan tulang ekor.",
    alternatifGratis:
      "Karpet tebal, handuk besar dilipat, atau selimut tebal. Jangan langsung di keramik dingin.",
  },
  {
    nama: "Botol Air 1.5L (2 buah)",
    status: "alternatif rumah",
    hargaEstimasi: "Gratis (sudah punya)",
    manfaat:
      "Pengganti dumbbell untuk bicep curl, hammer curl, russian twist. Isi air = ~1.5 kg, isi pasir basah = ~3 kg.",
    alternatifGratis:
      "Galon kecil, ransel diisi buku, atau plastik kresek diisi pasir/beras.",
  },
  {
    nama: "Kursi / Bangku Stabil",
    status: "alternatif rumah",
    manfaat:
      "Untuk tricep dip, step-up, incline push-up. PASTIKAN tidak beroda dan kuat menahan berat badan kamu.",
    alternatifGratis: "Pakai sofa, tepi tempat tidur, atau tangga yang kokoh.",
  },
  {
    nama: "Meja Kokoh",
    status: "alternatif rumah",
    manfaat: "Untuk inverted row (versi pull-up paling mudah dari rumah).",
    alternatifGratis:
      "Pakai gagang sapu di antara 2 kursi yang stabil. Atau cari pintu yang kokoh untuk doorway row.",
  },
  {
    nama: "Dumbbell Adjustable 2.5-10 kg",
    status: "opsional",
    hargaEstimasi: "Rp 200.000 - 600.000",
    manfaat:
      "Investasi terbaik untuk pembentukan lengan & bisep. Bisa adjust beban sesuai progres.",
    alternatifGratis: "Tetap pakai botol air, tapi progres akan lebih lambat setelah minggu ke-4.",
  },
  {
    nama: "Resistance Band Set (Loop)",
    status: "opsional",
    hargaEstimasi: "Rp 50.000 - 150.000",
    manfaat:
      "Murah, ringkas, bisa untuk latihan punggung, bahu, kaki. Wajib punya kalau mau serius latihan di rumah.",
    alternatifGratis: "Tidak ada padanan persis. Skip latihan band kalau belum punya.",
  },
  {
    nama: "Pull-up Bar Pintu",
    status: "opsional",
    hargaEstimasi: "Rp 100.000 - 250.000",
    manfaat:
      "Untuk pull-up, chin-up, leg raises bergantung. Paling efektif untuk bentuk punggung & bisep.",
    alternatifGratis:
      "Gunakan inverted row di bawah meja. Pull-up bar lebih bagus tapi tidak wajib.",
  },
  {
    nama: "Skipping Rope",
    status: "opsional",
    hargaEstimasi: "Rp 25.000 - 100.000",
    manfaat:
      "Kardio paling efisien & murah. 15 menit skipping = ~30 menit lari.",
    alternatifGratis: "Jumping jack, high knees, atau lompat tanpa tali.",
  },
  {
    nama: "Jam / Timer",
    status: "harus punya",
    manfaat: "Untuk plank, HIIT, dan mengatur istirahat antar set.",
    alternatifGratis:
      "Pakai HP. Cari aplikasi 'Tabata timer' atau gunakan stopwatch bawaan HP.",
  },
];

const SECTIONS = [
  { key: "harus punya", judul: "🟢 Harus Punya", deskripsi: "Wajib sebelum mulai program." },
  {
    key: "alternatif rumah",
    judul: "🟡 Sudah Ada di Rumah",
    deskripsi: "Tidak perlu beli — kemungkinan besar kamu sudah punya.",
  },
  {
    key: "opsional",
    judul: "🟠 Opsional (Untuk Progres Jangka Panjang)",
    deskripsi:
      "Tidak perlu langsung beli. Pertimbangkan setelah konsisten minimal 4 minggu.",
  },
] as const;

export default function AlatPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Alat & Perlengkapan
        </h1>
        <p className="text-[var(--muted)] mt-2 max-w-2xl">
          Program ini dirancang agar bisa dimulai tanpa beli apa pun. Gunakan
          barang yang sudah ada di rumah dulu. Pertimbangkan beli alat
          tambahan setelah konsisten minimal 2-4 minggu.
        </p>
      </div>

      {SECTIONS.map((sec) => (
        <section key={sec.key}>
          <h2 className="text-lg font-bold">{sec.judul}</h2>
          <p className="text-sm text-[var(--muted)] mb-3">{sec.deskripsi}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {ALAT.filter((a) => a.status === sec.key).map((a) => (
              <div
                key={a.nama}
                className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold">{a.nama}</h3>
                  {a.hargaEstimasi && (
                    <span className="text-xs px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--muted)] whitespace-nowrap">
                      {a.hargaEstimasi}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--muted)] mb-2">{a.manfaat}</p>
                {a.alternatifGratis && (
                  <div className="text-xs bg-amber-500/10 border border-amber-500/30 text-amber-100 rounded-lg px-3 py-2">
                    <span className="font-medium">Alternatif: </span>
                    {a.alternatifGratis}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5">
        <h2 className="font-bold mb-2">💸 Saran Belanja Bertahap</h2>
        <ol className="list-decimal list-inside text-sm space-y-2 text-[var(--muted)]">
          <li>
            <span className="text-[var(--foreground)] font-medium">
              Minggu 1-2:
            </span>{" "}
            Hanya beli matras (kalau belum punya). Pakai botol air sebagai
            dumbbell.
          </li>
          <li>
            <span className="text-[var(--foreground)] font-medium">
              Minggu 3-4:
            </span>{" "}
            Kalau masih semangat, beli resistance band set. Murah & multifungsi.
          </li>
          <li>
            <span className="text-[var(--foreground)] font-medium">
              Setelah Minggu 4:
            </span>{" "}
            Sudah konsisten? Beli dumbbell adjustable. Ini investasi 5+ tahun
            ke depan.
          </li>
          <li>
            <span className="text-[var(--foreground)] font-medium">
              Bulan 2+:
            </span>{" "}
            Pertimbangkan pull-up bar pintu kalau ingin progres ke pull-up.
          </li>
        </ol>
      </section>
    </div>
  );
}
