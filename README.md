# Home Workout Tracker

Website jadwal & tracker olahraga di rumah untuk pemula. Fokus pada pembentukan
lengan, bisep, dan perut menggunakan alat seadanya yang sudah ada di rumah.

## Fitur

- **Profil personal** — atur nama, umur, tinggi, berat, goal.
- **Program 4 minggu** — progresif dari knee push-up sampai full push-up.
  Split: Push / Core / Pull / Cardio / Full Body / 2 hari rest.
- **22+ latihan** dengan langkah, tips, dan alat yang dibutuhkan.
- **Progress tracker** — centang tiap set & hari yang diselesaikan,
  heatmap 4 minggu, streak counter. Data disimpan di `localStorage` browser.
- **Panduan alat** — bertahap dari yang gratis (botol air, kursi) sampai
  opsional (dumbbell, resistance band).
- **Panduan nutrisi** singkat dengan menu contoh & sumber protein lokal.

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, static export)
- [Tailwind CSS 4](https://tailwindcss.com/)
- TypeScript
- LocalStorage untuk persistensi progres (tanpa backend)

## Development

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build
```

Output statis ada di `out/`. Bisa di-deploy ke Vercel, Netlify, Cloudflare
Pages, atau static host mana saja. Tidak ada server-side requirements.

## Struktur

```
app/
├── layout.tsx              # Root layout + nav
├── page.tsx                # Home (profil + latihan hari ini)
├── jadwal/
│   ├── page.tsx            # Daftar minggu & hari
│   └── [minggu]/[hari]/    # Detail latihan per hari
├── latihan/[id]/           # Detail tiap exercise
├── progres/                # Heatmap, streak, reset
├── alat/                   # Rekomendasi alat
└── nutrisi/                # Panduan makan
lib/
├── exercises.ts            # Daftar 22 latihan
├── program.ts              # Jadwal 4 minggu × 7 hari
└── storage.ts              # localStorage helpers
```
