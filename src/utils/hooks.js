// ═══════════════════════════════════════════════════════════════════════════════
// SHARED HOOKS — reusable across all pages
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef } from 'react';

// ─── Intersection Observer hook ─────────────────────────────────────────────
export function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── Horizontal swipe detection ─────────────────────────────────────────────
export function useHorizontalSwipe(onLeft, onRight, threshold = 40) {
  const ref = useRef(null);
  const touch = useRef({ startX: 0, startY: 0, locked: null });
  const onLeftRef = useRef(onLeft);
  const onRightRef = useRef(onRight);
  onLeftRef.current = onLeft;
  onRightRef.current = onRight;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onStart = (e) => {
      touch.current = { startX: e.touches[0].clientX, startY: e.touches[0].clientY, locked: null };
    };
    const onMove = (e) => {
      if (touch.current.locked === "v") return;
      const dx = Math.abs(e.touches[0].clientX - touch.current.startX);
      const dy = Math.abs(e.touches[0].clientY - touch.current.startY);
      if (!touch.current.locked) {
        if (dx > 10 || dy > 10) touch.current.locked = dx > dy ? "h" : "v";
      }
      if (touch.current.locked === "h") e.preventDefault();
    };
    const onEnd = (e) => {
      if (touch.current.locked !== "h") return;
      const dx = e.changedTouches[0].clientX - touch.current.startX;
      if (Math.abs(dx) > threshold) {
        if (dx < 0) onLeftRef.current();
        else onRightRef.current();
      }
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, [threshold]);

  return ref;
}

// ─── Day cycle animation (for homepage hero) ────────────────────────────────
const hexToRgb = (hex) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const rgbToHex = ([r, g, b]) => "#" + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, "0")).join("");
const lerp = (a, b, t) => a + (b - a) * t;
const lerpColor = (c1, c2, t) => {
  const a = hexToRgb(c1), b = hexToRgb(c2);
  return rgbToHex([lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]);
};

const dayPhases = [
  { time: 0.00, sky: ["#0a0e1a","#0f1a2e","#101830","#121b28"], stars: 0.85, glowColor: "#c8d8f0", glowOpacity: 0.08, glowY: 0.15 },
  { time: 0.10, sky: ["#0c1220","#111e35","#1a2840","#182030"], stars: 0.7,  glowColor: "#c8d8f0", glowOpacity: 0.06, glowY: 0.2  },
  { time: 0.20, sky: ["#1a2540","#2a3a5a","#4a3a50","#d4855a"], stars: 0.15, glowColor: "#ffb070", glowOpacity: 0.25, glowY: 0.55 },
  { time: 0.28, sky: ["#3a5578","#6a90b8","#e8a070","#f0c880"], stars: 0.0,  glowColor: "#ffe0a0", glowOpacity: 0.35, glowY: 0.65 },
  { time: 0.38, sky: ["#5a8ab0","#7bb8d4","#a0d0e8","#e0e8f0"], stars: 0.0,  glowColor: "#fff8e0", glowOpacity: 0.2,  glowY: 0.25 },
  { time: 0.50, sky: ["#4a80a8","#6aaac8","#88c4e0","#d0e0ea"], stars: 0.0,  glowColor: "#ffffff", glowOpacity: 0.15, glowY: 0.15 },
  { time: 0.60, sky: ["#5a8ab0","#7bb8d4","#a0c8d8","#c8d8e0"], stars: 0.0,  glowColor: "#fff0d0", glowOpacity: 0.18, glowY: 0.25 },
  { time: 0.70, sky: ["#5a7898","#8a7880","#d09070","#e8a060"], stars: 0.0,  glowColor: "#ff9050", glowOpacity: 0.35, glowY: 0.55 },
  { time: 0.78, sky: ["#2a3050","#4a3058","#c06050","#e87840"], stars: 0.0,  glowColor: "#ff6030", glowOpacity: 0.4,  glowY: 0.65 },
  { time: 0.85, sky: ["#151a30","#1e2545","#3a2848","#803850"], stars: 0.2,  glowColor: "#d06080", glowOpacity: 0.15, glowY: 0.75 },
  { time: 0.92, sky: ["#0e1425","#121a30","#151e35","#181828"], stars: 0.6,  glowColor: "#c8d8f0", glowOpacity: 0.08, glowY: 0.2  },
  { time: 1.00, sky: ["#0a0e1a","#0f1a2e","#101830","#121b28"], stars: 0.85, glowColor: "#c8d8f0", glowOpacity: 0.08, glowY: 0.15 },
];

export function interpolatePhase(progress) {
  let i = 0;
  while (i < dayPhases.length - 1 && dayPhases[i + 1].time <= progress) i++;
  const a = dayPhases[i], b = dayPhases[Math.min(i + 1, dayPhases.length - 1)];
  const t = b.time === a.time ? 0 : (progress - a.time) / (b.time - a.time);
  return {
    sky: a.sky.map((c, j) => lerpColor(c, b.sky[j], t)),
    stars: lerp(a.stars, b.stars, t),
    glowColor: lerpColor(a.glowColor, b.glowColor, t),
    glowOpacity: lerp(a.glowOpacity, b.glowOpacity, t),
    glowY: lerp(a.glowY, b.glowY, t),
  };
}

export function useDayCycle(durationSec = 30) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = (now - start) / 1000;
      setProgress((elapsed % durationSec) / durationSec);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationSec]);
  return progress;
}
