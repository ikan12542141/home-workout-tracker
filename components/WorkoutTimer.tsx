"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "idle" | "running" | "paused" | "done";

type Props = {
  /** Initial seconds. Default 60. */
  initialSeconds?: number;
  /** Optional label like "Istirahat antar set". */
  label?: string;
};

export default function WorkoutTimer({ initialSeconds = 60, label }: Props) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [mode, setMode] = useState<Mode>("idle");
  const [target, setTarget] = useState(initialSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  function getAudioCtx(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const Ctor =
        (window.AudioContext as typeof AudioContext | undefined) ??
        ((window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext as typeof AudioContext | undefined);
      if (!Ctor) return null;
      audioCtxRef.current = new Ctor();
    }
    return audioCtxRef.current;
  }

  function beep(freq: number, durationMs: number) {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = "sine";
    gain.gain.value = 0.15;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + durationMs / 1000);
  }

  function start() {
    setMode("running");
  }

  function pause() {
    setMode("paused");
  }

  function reset() {
    setMode("idle");
    setSeconds(target);
  }

  useEffect(() => {
    if (mode !== "running") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        const next = prev - 1;
        if (next === 3 || next === 2 || next === 1) {
          beep(660, 120);
        }
        if (next <= 0) {
          beep(1000, 500);
          if (intervalRef.current) clearInterval(intervalRef.current);
          setMode("done");
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [mode]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  const display = `${pad(minutes)}:${pad(secs)}`;

  const presets = [30, 45, 60, 90, 120];

  function setPreset(s: number) {
    setTarget(s);
    setSeconds(s);
    setMode("idle");
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 shadow-lg">
      {label && (
        <p className="mb-2 text-xs uppercase tracking-wider text-slate-400">
          {label}
        </p>
      )}

      <div
        className={`mb-4 text-center text-6xl font-bold font-mono ${
          mode === "done"
            ? "text-emerald-400 animate-pulse"
            : seconds <= 5 && mode === "running"
              ? "text-amber-300"
              : "text-white"
        }`}
      >
        {display}
      </div>

      <div className="mb-3 flex flex-wrap justify-center gap-2">
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPreset(p)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              target === p
                ? "bg-emerald-500 text-slate-950"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {p}s
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {mode === "idle" && (
          <button
            type="button"
            onClick={start}
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
          >
            ▶ Mulai
          </button>
        )}
        {mode === "running" && (
          <button
            type="button"
            onClick={pause}
            className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-400"
          >
            ⏸ Pause
          </button>
        )}
        {mode === "paused" && (
          <button
            type="button"
            onClick={start}
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
          >
            ▶ Lanjut
          </button>
        )}
        {(mode === "running" || mode === "paused" || mode === "done") && (
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800"
          >
            ⟲ Reset
          </button>
        )}
      </div>

      {mode === "done" && (
        <p className="mt-3 text-center text-sm font-medium text-emerald-300">
          Selesai! Lanjut set berikutnya 💪
        </p>
      )}
    </div>
  );
}
