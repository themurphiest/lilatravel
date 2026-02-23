import { useState, useEffect, useRef } from "react";

// ─── Brand Colors ────────────────────────────────────────────────────────────
const C = {
  cream:       "#f5f1ea",
  warmWhite:   "#faf8f4",
  stone:       "#e8e2d9",
  slate:       "#3D5A6B",
  skyBlue:     "#7BB8D4",
  oceanTeal:   "#4A9B9F",
  sunSalmon:   "#E8A090",
  goldenAmber: "#D4A853",
  seaGlass:    "#7BB8A0",
  darkInk:     "#1a2530",
};

// ─── Photos (your photography) ───────────────────────────────────────────────
const P = {
  // ⬇️ REPLACE THESE with your hosted image URLs (Imgur, GitHub, Cloudflare, etc.)
  // The extracted .jpg files are provided alongside this file — upload them and paste URLs here.
  starry:  "YOUR_URL/starry.jpg",
  sunset:  "YOUR_URL/sunset.jpg",
  forest1: "YOUR_URL/forest1.jpg",
  forest2: "YOUR_URL/forest2.jpg",
  rainbow: "YOUR_URL/rainbow.jpg",
};

// ─── Placeholder photo (styled divs for destinations without photos yet) ────
function PhotoPlaceholder({ gradient, children, style = {} }) {
  return (
    <div style={{
      background: gradient,
      width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, from = "bottom", style = {}, className = "" }) {
  const [ref, inView] = useInView();
  const t = { bottom: "translateY(28px)", left: "translateX(-22px)", right: "translateX(22px)", none: "none" };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translate(0)" : t[from],
      transition: `opacity 1.1s ease ${delay}s, transform 1.1s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const magicMoments = [
  { text: "Riding into the last light as the canyon catches fire.", color: C.goldenAmber },
  { text: "Walking misty mountain trails alongside ancient giants.", color: C.seaGlass },
  { text: "Lying on warm rock gazing up at the universe and ten-thousand stars.", color: C.skyBlue },
  { text: "Gentle waves crashing during fiery vinyasa flows.", color: C.sunSalmon },
];

const destinations = [
  {
    name: "Joshua Tree",
    location: "California",
    threshold: "Spring · Mar–May",
    description: "After winter rains, the desert blooms. Ocotillo in scarlet. Clarity so sharp it rearranges something inside you.",
    photo: null,
    gradient: "linear-gradient(165deg, #c17f43, #8b4513, #d4855a)",
    accent: C.goldenAmber,
  },
  {
    name: "Zion Canyon",
    location: "Utah",
    threshold: "Fall · Sep–Nov",
    description: "Cottonwoods catch fire against ancient sandstone. The crowds thin. The canyon breathes.",
    photo: null,
    gradient: "linear-gradient(165deg, #a0522d, #6b3520, #c0714a)",
    accent: C.sunSalmon,
  },
  {
    name: "Olympic Peninsula",
    location: "Washington",
    threshold: "Summer · Jun–Aug",
    description: "Three ecosystems in one. Temperate rainforest dissolves into glacial peaks into wild Pacific coast.",
    photo: P.forest1,
    gradient: "linear-gradient(165deg, #2b5070, #3d7090, #1a3d55)",
    accent: C.skyBlue,
  },
  {
    name: "Big Sur",
    location: "California",
    threshold: "Winter · Dec–Feb",
    description: "Storm season brings the coast alive — waterfalls to the sea, empty trails, gray-green Pacific drama.",
    photo: null,
    gradient: "linear-gradient(165deg, #2a5f4f, #4a8a6f, #1c4a3a)",
    accent: C.seaGlass,
  },
  {
    name: "Vancouver Island",
    location: "British Columbia",
    threshold: "Late Summer · Jul–Sep",
    description: "Old-growth forests. Orca waters. Hot springs deep in the wilderness. The edge of the known world.",
    photo: P.forest2,
    gradient: "linear-gradient(165deg, #3d5a6b, #2a4a5a, #1a3040)",
    accent: C.oceanTeal,
  },
];

const journey = [
  {
    step: "01", label: "Discover", color: C.skyBlue,
    title: "Find the place calling you",
    desc: "Browse destinations chosen for their capacity to dissolve the ordinary — each timed to its most luminous window.",
  },
  {
    step: "02", label: "Explore Free", color: C.seaGlass,
    title: "The vibe, the itinerary, the timing",
    desc: "Every destination comes with a free guide: curated atmosphere, sample itinerary, and Threshold timing. Enough to know this is your trip.",
  },
  {
    step: "03", label: "Unlock", color: C.goldenAmber,
    title: "Activate the full guide",
    desc: "One unlock. Vetted hotels, curated experiences, booking links, wellness sessions, offline access. The research is done. The friction is gone.",
  },
  {
    step: "04", label: "Go Your Way", color: C.sunSalmon,
    title: "Solo, custom, or group",
    desc: "Book yourself from inside the guide, request a custom human-built itinerary, or join a scheduled Threshold trip with a curated group.",
  },
  {
    step: "05", label: "Live It", color: C.oceanTeal,
    title: "The guide in your pocket",
    desc: "Offline, seamless, never in the way. When the trip ends, share it, gift it, or start planning the next one.",
  },
];

// ─── Destination Carousel ────────────────────────────────────────────────────
function DestCarousel() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);

  const go = (idx) => {
    if (fading || idx === active) return;
    setFading(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActive(idx);
      setFading(false);
    }, 350);
  };

  const prev = () => go((active - 1 + destinations.length) % destinations.length);
  const next = () => go((active + 1) % destinations.length);

  const d = destinations[active];

  return (
    <div>
      {/* Main card — 1Hotels-style full bleed split */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "55% 45%",
        minHeight: 560,
        overflow: "hidden",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.35s ease",
      }}>
        {/* Photo panel */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          {d.photo ? (
            <img
              src={d.photo}
              alt={d.name}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center",
                display: "block",
              }}
            />
          ) : (
            <PhotoPlaceholder gradient={d.gradient} />
          )}
          {/* Photo credit placeholder overlay for non-photo */}
          {!d.photo && (
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <p style={{
                fontFamily: "\'Quicksand\'", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}>
                Photo coming soon
              </p>
            </div>
          )}
        </div>

        {/* Content panel — cream, editorial */}
        <div style={{
          background: C.warmWhite,
          padding: "64px 56px",
          display: "flex", flexDirection: "column", justifyContent: "center",
          borderTop: `1px solid ${C.stone}`,
          borderRight: `1px solid ${C.stone}`,
          borderBottom: `1px solid ${C.stone}`,
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            marginBottom: 32,
          }}>
            <div style={{ width: 20, height: 1, background: d.accent }} />
            <span style={{
              fontFamily: "\'Quicksand\'", fontSize: 10, fontWeight: 700,
              letterSpacing: "0.22em", textTransform: "uppercase", color: d.accent,
            }}>
              {d.threshold}
            </span>
          </div>

          <h3 style={{
            fontFamily: "\'Cormorant Garamond\', serif",
            fontSize: "clamp(36px, 4vw, 54px)", fontWeight: 300,
            color: C.darkInk, lineHeight: 1.0, marginBottom: 8,
            letterSpacing: "-0.01em",
          }}>
            {d.name}
          </h3>
          <p style={{
            fontFamily: "\'Quicksand\'", fontSize: 11, fontWeight: 600,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#9aabba", marginBottom: 32,
          }}>
            {d.location}
          </p>

          <p style={{
            fontFamily: "\'Cormorant Garamond\', serif",
            fontSize: "clamp(17px, 2vw, 22px)", fontWeight: 300, fontStyle: "italic",
            color: "#5a7080", lineHeight: 1.75, marginBottom: 44,
          }}>
            {d.description}
          </p>

          <a href="#" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            fontFamily: "\'Quicksand\'", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: C.darkInk, textDecoration: "none",
            paddingBottom: 4, borderBottom: `1px solid ${C.darkInk}`,
            width: "fit-content", transition: "gap 0.25s, color 0.25s",
          }}
          onMouseEnter={e => { e.currentTarget.style.gap = "16px"; e.currentTarget.style.color = d.accent; e.currentTarget.style.borderColor = d.accent; }}
          onMouseLeave={e => { e.currentTarget.style.gap = "10px"; e.currentTarget.style.color = C.darkInk; e.currentTarget.style.borderColor = C.darkInk; }}
          >
            Explore Free Guide <span>→</span>
          </a>
        </div>
      </div>

      {/* Controls row */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingTop: 24,
      }}>
        {/* Destination name pills */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {destinations.map((dest, i) => (
            <button key={i} onClick={() => go(i)} style={{
              fontFamily: "\'Quicksand\'", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "6px 14px",
              background: i === active ? C.darkInk : "transparent",
              color: i === active ? "white" : "#9aabba",
              border: `1px solid ${i === active ? C.darkInk : C.stone}`,
              cursor: "pointer", transition: "all 0.25s",
              borderRadius: 1,
            }}
            onMouseEnter={e => { if (i !== active) { e.currentTarget.style.borderColor = "#9aabba"; e.currentTarget.style.color = C.darkInk; }}}
            onMouseLeave={e => { if (i !== active) { e.currentTarget.style.borderColor = C.stone; e.currentTarget.style.color = "#9aabba"; }}}
            >
              {dest.name}
            </button>
          ))}
        </div>

        {/* Prev/Next */}
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          {[{ fn: prev, label: "←" }, { fn: next, label: "→" }].map(({ fn, label }) => (
            <button key={label} onClick={fn} style={{
              width: 40, height: 40,
              background: "transparent",
              border: `1px solid ${C.stone}`,
              cursor: "pointer", fontSize: 15, color: C.slate,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.darkInk; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = C.darkInk; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.slate; e.currentTarget.style.borderColor = C.stone; }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
// ─── Day Cycle Helpers ──────────────────────────────────────────────────────
const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
};
const rgbToHex = ([r,g,b]) => "#" + [r,g,b].map(v => Math.round(v).toString(16).padStart(2,"0")).join("");
const lerp = (a, b, t) => a + (b - a) * t;
const lerpColor = (c1, c2, t) => {
  const a = hexToRgb(c1), b = hexToRgb(c2);
  return rgbToHex([lerp(a[0],b[0],t), lerp(a[1],b[1],t), lerp(a[2],b[2],t)]);
};

// Each phase: { sky (top→bottom gradient stops), stars opacity, glowY (0=top,1=bottom), glowColor, glowOpacity }
const dayPhases = [
  { // 0 — Deep Night
    sky: ["#0a1628", "#111e2b", "#1a2d42", "#1e3a50"],
    stars: 0.7, glowY: 1.1, glowColor: "#4a7a95", glowOpacity: 0,
  },
  { // 1 — Pre-Dawn
    sky: ["#111e2b", "#1e3347", "#3b4a5c", "#5a4a52"],
    stars: 0.35, glowY: 0.95, glowColor: "#d4855a", glowOpacity: 0.15,
  },
  { // 2 — Sunrise
    sky: ["#1a2d42", "#3d556a", "#c17f55", "#e8a070"],
    stars: 0.05, glowY: 0.78, glowColor: "#e8a070", glowOpacity: 0.55,
  },
  { // 3 — Golden Morning
    sky: ["#3a6080", "#5a8aaa", "#8cb8d4", "#d4c8a0"],
    stars: 0, glowY: 0.55, glowColor: "#f0d080", glowOpacity: 0.4,
  },
  { // 4 — Midday
    sky: ["#3a6b8f", "#5a9aba", "#7BB8D4", "#a0cce0"],
    stars: 0, glowY: 0.28, glowColor: "#fffbe0", glowOpacity: 0.3,
  },
  { // 5 — Afternoon
    sky: ["#3a6b8f", "#5a8aaa", "#8cb0c8", "#c0b888"],
    stars: 0, glowY: 0.45, glowColor: "#f0d080", glowOpacity: 0.35,
  },
  { // 6 — Sunset
    sky: ["#1e3a50", "#4a5568", "#c07848", "#e09070"],
    stars: 0.05, glowY: 0.8, glowColor: "#e08860", glowOpacity: 0.6,
  },
  { // 7 — Dusk
    sky: ["#151e30", "#2a3450", "#4a3858", "#6a4060"],
    stars: 0.3, glowY: 0.95, glowColor: "#9060a0", glowOpacity: 0.2,
  },
  { // 8 — Night (same as 0 for seamless loop)
    sky: ["#0a1628", "#111e2b", "#1a2d42", "#1e3a50"],
    stars: 0.7, glowY: 1.1, glowColor: "#4a7a95", glowOpacity: 0,
  },
];

function useDayCycle(durationSec = 30) {
  const [progress, setProgress] = useState(0);
  const startRef = useRef(null);
  useEffect(() => {
    let raf;
    const tick = (now) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = (now - startRef.current) / 1000;
      setProgress((elapsed % durationSec) / durationSec);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationSec]);
  return progress;
}

function interpolatePhase(progress) {
  const totalPhases = dayPhases.length - 1; // 8 segments
  const scaled = progress * totalPhases;
  const idx = Math.min(Math.floor(scaled), totalPhases - 1);
  const t = scaled - idx;
  // Smooth easing
  const ease = t * t * (3 - 2 * t);
  const a = dayPhases[idx], b = dayPhases[idx + 1];
  return {
    sky: a.sky.map((c, i) => lerpColor(c, b.sky[i], ease)),
    stars: lerp(a.stars, b.stars, ease),
    glowY: lerp(a.glowY, b.glowY, ease),
    glowColor: lerpColor(a.glowColor, b.glowColor, ease),
    glowOpacity: lerp(a.glowOpacity, b.glowOpacity, ease),
  };
}

// ─── Hero Callout — synced to day cycle ─────────────────────────────────────
const heroCallouts = [
  { text: "Lying on warm rock gazing up at the universe and ten\u2011thousand stars.", center: 0.0 },   // Night
  { text: "Gentle waves crashing during fiery vinyasa flows.", center: 0.25 },                         // Sunrise
  { text: "Walking on misty mountain trails alongside ancient giants.", center: 0.5 },                 // Midday
  { text: "Riding into the last light as the canyon catches fire.", center: 0.75 },                    // Sunset
];

function HeroCallout({ progress }) {
  // Compute opacity for each callout based on distance from its center
  // Uses circular distance for seamless night→night wrap
  const getOpacity = (center) => {
    let dist = Math.abs(progress - center);
    if (dist > 0.5) dist = 1 - dist; // wrap around
    // Fade window: fully visible within 0.08, fully gone by 0.18
    if (dist < 0.08) return 1;
    if (dist > 0.18) return 0;
    return 1 - (dist - 0.08) / 0.1;
  };

  return (
    <div style={{ position: "relative", height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {heroCallouts.map((c, i) => {
        const opacity = getOpacity(c.center);
        if (opacity <= 0) return null;
        return (
          <p key={i} style={{
            position: "absolute",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(16px, 2.5vw, 22px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.02em",
            opacity,
            transition: "none",
            whiteSpace: "nowrap",
          }}>
            {c.text}
          </p>
        );
      })}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function LilaHomepage() {
  const [scrollY, setScrollY] = useState(0);
  const dayProgress = useDayCycle(30);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const heroOpacity  = Math.max(0, 1 - scrollY / 680);
  const heroParallax = scrollY * 0.25;
  const scrolled = scrollY > 60;
  const phase = interpolatePhase(dayProgress);

  return (
    <div style={{ fontFamily: "\'Quicksand\', sans-serif", background: C.cream, color: C.darkInk, overflowX: "hidden" }}>
      <style>{`
        @import url(\'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap\');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${C.skyBlue}40; }
        body { -webkit-font-smoothing: antialiased; }
        .eyebrow {
          font-family: \'Quicksand\'; font-size: 11px; font-weight: 700;
          letter-spacing: 0.28em; text-transform: uppercase; display: block; margin-bottom: 16px;
        }
        .underline-link {
          font-family: \'Quicksand\'; font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: ${C.darkInk}; text-decoration: none;
          padding-bottom: 3px; border-bottom: 1px solid ${C.darkInk};
          display: inline-block; transition: opacity 0.2s;
        }
        .underline-link:hover { opacity: 0.55; }
        .underline-link-light {
          color: white; border-bottom-color: rgba(255,255,255,0.5);
        }
        .underline-link-light:hover { opacity: 0.65; }
        .journey-card {
          padding: 36px 28px;
          border-top: 1px solid rgba(255,255,255,0.1);
          transition: background 0.3s;
        }
        .journey-card:hover { background: rgba(255,255,255,0.05); }
        @media (max-width: 860px) {
          .carousel-grid { grid-template-columns: 1fr !important; }
          .story-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
          .journey-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .journey-grid { grid-template-columns: 1fr !important; }
          .nav-links { display: none !important; }
          nav { padding: 18px 24px !important; }
        }
      `}</style>

      {/* ══ NAV ════════════════════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 52px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(250,248,244,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.stone}` : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{
          fontFamily: "\'Cormorant Garamond\', serif",
          fontSize: 20, fontWeight: 300, letterSpacing: "0.24em",
          color: scrolled ? C.darkInk : "white",
          transition: "color 0.4s",
        }}>
          LILA
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {["Destinations", "Why We Exist", "How It Works"].map(link => (
            <button key={link} style={{
              fontFamily: "\'Quicksand\'", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: scrolled ? C.darkInk : "rgba(255,255,255,0.75)",
              background: "none", border: "none", cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.55"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              {link}
            </button>
          ))}
          <a href="#cta" style={{
            fontFamily: "\'Quicksand\'", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: scrolled ? C.darkInk : "white",
            textDecoration: "none", padding: "9px 20px",
            border: scrolled ? `1px solid ${C.darkInk}` : "1px solid rgba(255,255,255,0.55)",
            transition: "all 0.3s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.darkInk; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = C.darkInk; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = scrolled ? C.darkInk : "white"; e.currentTarget.style.borderColor = scrolled ? C.darkInk : "rgba(255,255,255,0.55)"; }}
          >
            Plan a Trip
          </a>
        </div>
      </nav>

      {/* ══ 1. HERO — Animated Day Cycle ══════════════════════════════════ */}
      <section style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          transform: `translateY(${heroParallax}px)`,
          background: `linear-gradient(185deg, ${phase.sky[0]} 0%, ${phase.sky[1]} 30%, ${phase.sky[2]} 60%, ${phase.sky[3]} 100%)`,
          transition: "none",
        }}>
          {/* Stars — fade with daylight */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: phase.stars, transition: "none" }}>
            {Array.from({ length: 150 }, (_, i) => (
              <circle key={i}
                cx={`${(i * 53.7 + 11) % 100}%`}
                cy={`${(i * 29.3 + 5) % 65}%`}
                r={i % 9 === 0 ? 1.8 : i % 4 === 0 ? 1.1 : 0.55}
                fill="white" opacity={0.25 + (i % 6) * 0.1}
              />
            ))}
          </svg>
          {/* Sun / Moon glow */}
          <div style={{
            position: "absolute",
            left: "50%", top: `${phase.glowY * 100}%`,
            transform: "translate(-50%, -50%)",
            width: 400, height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${phase.glowColor}${Math.round(phase.glowOpacity * 255).toString(16).padStart(2,"0")} 0%, transparent 70%)`,
            filter: "blur(40px)",
            pointerEvents: "none",
          }} />
          {/* Mountain silhouettes */}
          <svg style={{ position: "absolute", bottom: 0, width: "100%" }} viewBox="0 0 1440 360" preserveAspectRatio="none">
            <path d="M0,360 L0,210 L160,95 L320,170 L480,65 L640,145 L800,30 L960,115 L1120,55 L1280,130 L1440,85 L1440,360 Z" fill="rgba(12,28,42,0.92)" />
            <path d="M0,360 L0,255 L110,182 L230,220 L380,148 L520,198 L670,125 L820,178 L960,108 L1100,160 L1240,118 L1360,162 L1440,135 L1440,360 Z" fill="rgba(12,28,42,0.5)" />
          </svg>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,35,52,0.15) 0%, rgba(15,35,52,0.4) 100%)" }} />
        </div>

        <div style={{
          position: "relative", zIndex: 2,
          height: "100%", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "0 24px",
          opacity: heroOpacity,
        }}>
          <FadeIn from="none" delay={0.15}>
            <span className="eyebrow" style={{ color: C.skyBlue }}>Wellness Travel for the Modern Age</span>
          </FadeIn>
          <FadeIn from="bottom" delay={0.25}>
            <h1 style={{
              fontFamily: "\'Cormorant Garamond\', serif",
              fontSize: "clamp(42px, 8vw, 96px)",
              fontWeight: 300, color: "white",
              lineHeight: 1.05, letterSpacing: "0.01em", marginBottom: 28,
            }}>
              Finding moments of <em style={{ color: C.skyBlue }}>magic</em><br />
              that light up our soul.
            </h1>
          </FadeIn>
          <FadeIn from="bottom" delay={0.45}>
            <HeroCallout progress={dayProgress} />
          </FadeIn>
        </div>
      </section>

      {/* ══ 2. WHY WE EXIST ═════════════════════════════════════════════════ */}
      <section id="story" style={{ padding: "0", background: C.cream }}>
        <div className="story-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          minHeight: 680,
        }}>
          {/* Left — Why We Exist */}
          <div style={{ padding: "100px 72px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <FadeIn from="left">
              <span className="eyebrow" style={{ color: "#9aabba" }}>Why We Exist</span>

              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 300,
                color: C.darkInk, lineHeight: 1.2, marginBottom: 36,
              }}>
                Travel is where we find<br />our truest selves.
              </h2>

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(16px, 1.8vw, 20px)", fontWeight: 300,
                color: "#5a7080", lineHeight: 1.85,
              }}>
                <p style={{ marginBottom: 28 }}>
                  Not weighed down by what brought us here.<br />
                  Or distracted by forces born of the modern world.<br />
                  Or stuck in a distant imagined future.
                </p>

                <p style={{
                  fontSize: "clamp(22px, 2.8vw, 32px)",
                  fontStyle: "italic",
                  color: C.darkInk,
                  lineHeight: 1.3,
                  marginBottom: 8,
                  paddingTop: 20,
                  borderTop: `1px solid ${C.stone}`,
                }}>
                  We just are.
                </p>
                <p style={{
                  fontSize: "clamp(17px, 2vw, 22px)",
                  fontStyle: "italic",
                  color: C.darkInk,
                  lineHeight: 1.5,
                  marginBottom: 28,
                }}>
                  Right here, right now.
                </p>

                <p style={{ marginBottom: 28 }}>
                  Connected to the whole universe through this moment.<br />
                  And man is it glorious… and free… and light.
                </p>

                <p style={{
                  paddingTop: 20,
                  borderTop: `1px solid ${C.stone}`,
                  marginBottom: 40,
                }}>
                  It reminds us of a truth we know deep down, but often forget.<br />
                  That life is not about conquering the mystery —{" "}
                  <em style={{ color: C.darkInk, fontStyle: "italic" }}>
                    it's about learning to dance with it.
                  </em>
                </p>

                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(20px, 2.4vw, 28px)",
                  fontWeight: 300, fontStyle: "italic",
                  color: C.darkInk,
                  lineHeight: 1.5,
                  paddingTop: 32,
                  borderTop: `1px solid ${C.stone}`,
                  marginBottom: 0,
                }}>
                  "So come dance with the mystery.<br />
                  <span style={{ color: C.oceanTeal }}>We'll show you the way.</span>"
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right — The Name: Lila (painting background) */}
          <div style={{
            position: "relative",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            overflow: "hidden",
            minHeight: 680,
          }}>
            {/* Painting layer */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "url('/lila.png')",
              backgroundSize: "cover",
              backgroundPosition: "center 30%",
              zIndex: 0,
            }} />
            {/* Gradient overlay — darker at edges, lighter toward center to let painting glow */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at center, rgba(10,18,26,0.42) 0%, rgba(10,18,26,0.72) 100%)",
              zIndex: 1,
            }} />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "80px 60px" }}>
              <FadeIn from="right" delay={0.15}>

                {/* Eyebrow */}
                <span style={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: 10, fontWeight: 600,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  display: "block", marginBottom: 32,
                }}>The Name</span>

                {/* Big Sanskrit glyph — decorative, sits above the roman name */}
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 300, fontStyle: "italic",
                  color: "rgba(212, 168, 83, 0.75)", /* goldenAmber, faded */
                  lineHeight: 1,
                  marginBottom: 12,
                  textShadow: "0 2px 24px rgba(0,0,0,0.5)",
                }}>
                  लीला
                </div>

                {/* Main title */}
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(72px, 10vw, 120px)", fontWeight: 300,
                  color: "white",
                  lineHeight: 0.9,
                  marginBottom: 40,
                  textShadow: "0 4px 32px rgba(0,0,0,0.6)",
                  letterSpacing: "-0.01em",
                }}>
                  Lila
                </div>

                {/* Divider */}
                <div style={{
                  width: 48, height: 1,
                  background: "rgba(255,255,255,0.25)",
                  margin: "0 auto 36px",
                }} />

                {/* Definition */}
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(15px, 1.6vw, 19px)", fontWeight: 300, fontStyle: "italic",
                  color: "rgba(255,255,255,0.72)",
                  lineHeight: 1.9,
                  maxWidth: 340,
                  margin: "0 auto",
                  textShadow: "0 1px 12px rgba(0,0,0,0.5)",
                }}>
                  In Sanskrit, <em style={{ fontStyle: "normal", color: "white" }}>Lila</em> means{" "}
                  <em style={{ fontStyle: "italic", color: "rgba(212,168,83,0.9)" }}>"divine play"</em> — the idea
                  that the universe is a light, joyous, beautiful expression. It arises the way music arises
                  and inspires dance.
                </p>

              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. DESTINATIONS CAROUSEL ════════════════════════════════════════ */}
      <section id="destinations" style={{ padding: "100px 0", background: C.warmWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 52px" }}>
          <FadeIn>
            <div style={{ marginBottom: 52 }}>
              <span className="eyebrow" style={{ color: "#9aabba" }}>Sacred Terrain</span>
              <h2 style={{
                fontFamily: "\'Cormorant Garamond\', serif",
                fontSize: "clamp(34px, 5vw, 60px)", fontWeight: 300,
                color: C.darkInk, lineHeight: 1.05, marginBottom: 10,
              }}>
                Where we go
              </h2>
              <p style={{
                fontFamily: "\'Cormorant Garamond\', serif",
                fontSize: "clamp(16px, 2vw, 21px)", fontWeight: 300, fontStyle: "italic",
                color: "#8aa0ad",
              }}>
                Iconic outdoor destinations timed to their most luminous moment.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <DestCarousel />
          </FadeIn>
        </div>
      </section>

      {/* ══ 4. RAINFOREST MOMENT — editorial full-bleed ══════════════════════ */}
      <section style={{ position: "relative", height: "55vh", minHeight: 400, overflow: "hidden" }}>
        <img
          src={P.rainbow}
          alt="Rainforest bridge with rainbow"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)",
          display: "flex", alignItems: "flex-end",
          padding: "56px 72px",
        }}>
          <FadeIn from="bottom">
            <p style={{
              fontFamily: "\'Cormorant Garamond\', serif",
              fontSize: "clamp(22px, 3.5vw, 42px)", fontWeight: 300, fontStyle: "italic",
              color: "white", lineHeight: 1.35, maxWidth: 640,
            }}>
              "Walking misty mountain trails<br />alongside ancient giants."
            </p>
            <p style={{
              fontFamily: "\'Quicksand\'", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)", marginTop: 16,
            }}>
              Olympic Peninsula, WA
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══ 5. HOW IT WORKS ════════════════════════════════════════════════ */}
      <section id="how" style={{ padding: "100px 0", background: C.cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 52px" }}>
          <FadeIn>
            <div style={{ marginBottom: 64, maxWidth: 580 }}>
              <span className="eyebrow" style={{ color: "#9aabba" }}>How It Works</span>
              <h2 style={{
                fontFamily: "\'Cormorant Garamond\', serif",
                fontSize: "clamp(34px, 5vw, 60px)", fontWeight: 300,
                color: C.darkInk, lineHeight: 1.05, marginBottom: 14,
              }}>
                From inspiration<br />to experience.
              </h2>
              <p style={{
                fontFamily: "\'Cormorant Garamond\', serif",
                fontSize: "clamp(16px, 2vw, 21px)", fontWeight: 300, fontStyle: "italic",
                color: "#8aa0ad", lineHeight: 1.7,
              }}>
                We handle the complexity so you can focus on being there.
              </p>
            </div>
          </FadeIn>

          <div className="journey-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0 }}>
            {journey.map((j, i) => (
              <FadeIn key={j.step} delay={i * 0.1}>
                <div className="journey-card" style={{ borderTop: `2px solid ${i === 0 ? j.color : C.stone}` }}
                  onMouseEnter={e => e.currentTarget.style.borderTopColor = j.color}
                  onMouseLeave={e => e.currentTarget.style.borderTopColor = i === 0 ? j.color : C.stone}
                >
                  <span style={{
                    fontFamily: "\'Quicksand\'", fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    color: j.color, display: "block", marginBottom: 12,
                  }}>
                    {j.label}
                  </span>
                  <h3 style={{
                    fontFamily: "\'Cormorant Garamond\', serif",
                    fontSize: 20, fontWeight: 400,
                    color: C.darkInk, lineHeight: 1.25, marginBottom: 14,
                  }}>
                    {j.title}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.8, color: "#7a90a0" }}>
                    {j.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. CTA — Sunset photo ═══════════════════════════════════════════ */}
      <section id="cta" style={{ position: "relative", overflow: "hidden", minHeight: 560 }}>
        <img
          src={P.sunset}
          alt="Sunset"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 30%",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10,20,35,0.45) 0%, rgba(10,20,35,0.78) 100%)",
        }} />
        <div style={{
          position: "relative", zIndex: 1,
          padding: "120px 52px", textAlign: "center",
        }}>
          <FadeIn>
            <span className="eyebrow" style={{ color: "rgba(255,255,255,0.45)" }}>Begin</span>
            <h2 style={{
              fontFamily: "\'Cormorant Garamond\', serif",
              fontSize: "clamp(38px, 7vw, 80px)", fontWeight: 300,
              color: "white", lineHeight: 1.05, marginBottom: 20,
            }}>
              Come dance with<br />
              <em style={{ color: "rgba(200,230,245,0.9)" }}>the mystery</em>.
            </h2>
            <p style={{
              fontFamily: "\'Cormorant Garamond\', serif",
              fontSize: "clamp(17px, 2.2vw, 24px)", fontWeight: 300, fontStyle: "italic",
              color: "rgba(255,255,255,0.5)", maxWidth: 380, margin: "0 auto 48px", lineHeight: 1.7,
            }}>
              We'll show you the way.
            </p>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#destinations" className="underline-link underline-link-light">Explore Destinations</a>
              <a href="#" className="underline-link underline-link-light">Plan a Custom Trip</a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
      <footer style={{ padding: "48px 52px", background: C.darkInk }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 24,
        }}>
          <div>
            <div style={{
              fontFamily: "\'Cormorant Garamond\', serif",
              fontSize: 19, fontWeight: 300, letterSpacing: "0.24em",
              color: "rgba(255,255,255,0.7)", marginBottom: 5,
            }}>
              LILA
            </div>
            <p style={{ fontFamily: "\'Quicksand\'", fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
              Less noise. More magic.
            </p>
          </div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {["Destinations", "Why We Exist", "How It Works", "Contact"].map(link => (
              <a key={link} href="#" style={{
                fontFamily: "\'Quicksand\'", fontSize: 10, fontWeight: 600,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)", textDecoration: "none", transition: "color 0.25s",
              }}
              onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.7)"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.28)"}
              >
                {link}
              </a>
            ))}
          </div>
          <p style={{ fontFamily: "\'Quicksand\'", fontSize: 10, color: "rgba(255,255,255,0.16)", letterSpacing: "0.06em" }}>
            © 2026 Lila Travel
          </p>
        </div>
      </footer>
    </div>
  );
}
