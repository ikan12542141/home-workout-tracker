"use client";

import { useState } from "react";
import {
  MENU_TEMPLATES,
  recommendBudget,
  weeklyEstimate,
} from "@/lib/budget-meals";

export default function BudgetCalculator() {
  const [budget, setBudget] = useState(40000);
  const tier = recommendBudget(budget);
  const menu = MENU_TEMPLATES[tier][0];

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 space-y-4">
      <div>
        <h2 className="text-lg font-bold">🍱 Budget Meal Calculator</h2>
        <p className="text-sm text-[var(--muted)] mt-1">
          Input budget harian → app rekomendasikan menu sesuai. Harga estimasi
          dari pasar Indonesia tahun 2026. Bisa beda 10-30% tergantung kota.
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm">
          <span className="text-[var(--muted)]">
            Budget makan per hari (Rp):
          </span>
          <input
            type="number"
            min={15000}
            max={150000}
            step={5000}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value) || 0)}
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2 font-mono text-lg"
          />
        </label>
        <input
          type="range"
          min={15000}
          max={100000}
          step={5000}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
        <div className="flex justify-between text-xs text-[var(--muted)] font-mono">
          <span>15k</span>
          <span>25k</span>
          <span>40k</span>
          <span>60k</span>
          <span>100k</span>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-4 space-y-3">
        <div>
          <p className="text-xs text-[var(--muted)] uppercase tracking-wide">
            Rekomendasi tier
          </p>
          <p className="text-xl font-bold capitalize">{tier}</p>
        </div>
        <h3 className="font-semibold">{menu.nama}</h3>
        <ul className="space-y-2 text-sm">
          {menu.items.map((it, i) => (
            <li
              key={i}
              className="flex justify-between gap-2 border-b border-[var(--border)] pb-2 last:border-b-0"
            >
              <span>{it.bahan}</span>
              <span className="font-mono text-[var(--muted)] whitespace-nowrap">
                Rp {it.harga.toLocaleString("id-ID")}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border)] text-xs">
          <div className="rounded-full bg-[var(--background)] px-3 py-1">
            <span className="text-[var(--muted)]">Kalori:</span>{" "}
            <span className="font-mono">~{menu.total.kalori} kcal</span>
          </div>
          <div className="rounded-full bg-[var(--background)] px-3 py-1">
            <span className="text-[var(--muted)]">Protein:</span>{" "}
            <span className="font-mono">~{menu.total.protein}g</span>
          </div>
          <div className="rounded-full bg-[var(--background)] px-3 py-1">
            <span className="text-[var(--muted)]">Per hari:</span>{" "}
            <span className="font-mono">
              Rp {menu.total.harga.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="rounded-full bg-[var(--background)] px-3 py-1">
            <span className="text-[var(--muted)]">Per minggu:</span>{" "}
            <span className="font-mono">
              Rp {weeklyEstimate(menu).toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-[var(--muted)]">
        💡 Tips hemat: beli telur, tempe, tahu mingguan (lebih murah). Cek
        harga pasar tradisional vs supermarket — bisa beda 20-30%.
      </p>
    </div>
  );
}
