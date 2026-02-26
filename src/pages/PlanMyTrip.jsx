import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { C as BrandC } from '@data/brand';

// ─── Brand Tokens (extended from site brand system) ─────────────────────────
const C = {
  ...BrandC,
  cream:      BrandC.cream,
  creamMid:   "#EDE7DC",
  creamDark:  "#E8DCC8",
  slate:      BrandC.darkInk,
  slateLight: "#2d3d4d",
  sage:       "#6B8078",
  sageDark:   "#4A5A54",
  sageLight:  "#8FA39A",
  skyBlue:    BrandC.skyBlue,
  oceanTeal:  BrandC.oceanTeal,
  sunSalmon:  BrandC.sunSalmon,
  goldenAmber: BrandC.goldenAmber,
  seaGlass:   BrandC.seaGlass,
  coralBlush: "#FFD1C1",
  white:      "#FFFFFF",
};

// ─── Step Data ───────────────────────────────────────────────────────────────
const DESTINATIONS = [
  { id: "zion", name: "Zion", subtitle: "Red cathedral walls", emoji: "🏜️", gradient: `linear-gradient(135deg, ${C.sunSalmon}30, ${C.goldenAmber}20)` },
  { id: "bigSur", name: "Big Sur", subtitle: "Where mountains meet the sea", emoji: "🌊", gradient: `linear-gradient(135deg, ${C.oceanTeal}30, ${C.skyBlue}20)` },
  { id: "joshuaTree", name: "Joshua Tree", subtitle: "Desert silence & starlight", emoji: "🌵", gradient: `linear-gradient(135deg, ${C.goldenAmber}30, ${C.coralBlush}20)` },
  { id: "olympic", name: "Olympic", subtitle: "Temperate rainforest magic", emoji: "🌲", gradient: `linear-gradient(135deg, ${C.seaGlass}30, ${C.sage}20)` },
  { id: "kauai", name: "Kauaʻi", subtitle: "Garden isle, sacred coast", emoji: "🌺", gradient: `linear-gradient(135deg, ${C.seaGlass}20, ${C.oceanTeal}30)` },
  { id: "vancouver", name: "Vancouver Island", subtitle: "Wild coast, ancient forest", emoji: "🌿", gradient: `linear-gradient(135deg, ${C.sage}25, ${C.seaGlass}20)` },
];

const INTENTIONS = [
  { id: "stillness", label: "Stillness", desc: "Quiet the noise. Find center.", icon: "◯", color: C.oceanTeal },
  { id: "adventure", label: "Adventure", desc: "Push edges. Feel alive.", icon: "△", color: C.sunSalmon },
  { id: "connection", label: "Connection", desc: "Deepen bonds. Open up.", icon: "◇", color: C.goldenAmber },
  { id: "transformation", label: "Transformation", desc: "Shed the old. Come back different.", icon: "✦", color: C.skyBlue },
];

const PRACTICES = [
  { id: "yoga", label: "Yoga", icon: "🧘", color: C.oceanTeal },
  { id: "breathwork", label: "Breathwork", icon: "🌬️", color: C.skyBlue },
  { id: "coldPlunge", label: "Cold Plunge", icon: "🧊", color: C.seaGlass },
  { id: "meditation", label: "Meditation", icon: "🪷", color: C.sage },
  { id: "hiking", label: "Mindful Hiking", icon: "🥾", color: C.goldenAmber },
  { id: "stargazing", label: "Stargazing", icon: "✨", color: C.slateLight },
  { id: "journaling", label: "Journaling", icon: "📝", color: C.coralBlush },
  { id: "soundBath", label: "Sound Bath", icon: "🔔", color: C.sageLight },
  { id: "sauna", label: "Sauna", icon: "🔥", color: C.sunSalmon },
];

const BUDGET_TIERS = [
  { id: "mindful", label: "Mindful", desc: "Smart & intentional", range: "$100–150/day", color: C.sage },
  { id: "balanced", label: "Balanced", desc: "Comfort meets experience", range: "$150–250/day", color: C.oceanTeal },
  { id: "premium", label: "Premium", desc: "Elevated at every turn", range: "$250–400/day", color: C.goldenAmber },
  { id: "noLimits", label: "No Limits", desc: "The extraordinary", range: "$400+/day", color: C.sunSalmon },
];

const DIMENSIONS = [
  { key: "movement", label: "Movement" },
  { key: "wellness", label: "Wellness" },
  { key: "adventure", label: "Adventure" },
  { key: "stillness", label: "Stillness" },
  { key: "social", label: "Connection" },
  { key: "luxury", label: "Luxury" },
];

// ─── Utilities ───────────────────────────────────────────────────────────────
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

// ─── Sub-Components ──────────────────────────────────────────────────────────

function StepIndicator({ current, total }) {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 40 }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          width: i === current ? 28 : 8,
          height: 8,
          borderRadius: 4,
          background: i === current ? C.oceanTeal : i < current ? C.sage : `${C.sage}30`,
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }} />
      ))}
    </div>
  );
}

function NavButtons({ onBack, onNext, nextLabel = "Continue", nextDisabled = false, showBack = true }) {
  return (
    <div style={{
      display: "flex", gap: 16, justifyContent: "center",
      marginTop: 48, paddingBottom: 40,
    }}>
      {showBack && (
        <button onClick={onBack} style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
          background: "none", border: `1.5px solid ${C.sage}40`,
          color: C.sage, padding: "14px 32px", borderRadius: 40,
          cursor: "pointer", transition: "all 0.3s",
        }}
        onMouseEnter={e => { e.target.style.borderColor = C.sage; e.target.style.background = `${C.sage}10`; }}
        onMouseLeave={e => { e.target.style.borderColor = `${C.sage}40`; e.target.style.background = "none"; }}
        >
          Back
        </button>
      )}
      <button onClick={onNext} disabled={nextDisabled} style={{
        fontFamily: "'Quicksand', sans-serif",
        fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
        background: nextDisabled ? `${C.sage}30` : C.sage,
        border: "none", color: C.white, padding: "14px 40px", borderRadius: 40,
        cursor: nextDisabled ? "not-allowed" : "pointer",
        transition: "all 0.3s", opacity: nextDisabled ? 0.5 : 1,
        boxShadow: nextDisabled ? "none" : `0 4px 20px ${C.sage}30`,
      }}
      onMouseEnter={e => { if (!nextDisabled) e.target.style.background = C.sageDark; }}
      onMouseLeave={e => { if (!nextDisabled) e.target.style.background = C.sage; }}
      >
        {nextLabel}
      </button>
    </div>
  );
}

function StepTitle({ eyebrow, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 40 }}>
      {eyebrow && (
        <span style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase",
          color: C.oceanTeal, display: "block", marginBottom: 14,
        }}>{eyebrow}</span>
      )}
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 36, fontWeight: 300, lineHeight: 1.2,
        color: C.slate, marginBottom: subtitle ? 12 : 0,
      }}>{title}</h2>
      {subtitle && (
        <p style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: 15, fontWeight: 400, color: `${C.slate}90`, lineHeight: 1.6, maxWidth: 480, margin: "0 auto",
        }}>{subtitle}</p>
      )}
    </div>
  );
}

// ─── Radar Chart ─────────────────────────────────────────────────────────────
function RadarChart({ values, size = 280 }) {
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  const n = DIMENSIONS.length;
  const angleStep = (Math.PI * 2) / n;
  const [animProgress, setAnimProgress] = useState(0);

  useEffect(() => {
    setAnimProgress(0);
    let start = null;
    const duration = 1200;
    function frame(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setAnimProgress(easeOutCubic(p));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }, [values]);

  const getPoint = (i, val) => {
    const angle = angleStep * i - Math.PI / 2;
    const dist = r * val * animProgress;
    return { x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist };
  };

  const gridLevels = [0.25, 0.5, 0.75, 1];
  const colors = [C.oceanTeal, C.skyBlue, C.sunSalmon, C.goldenAmber, C.seaGlass, C.sage];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid */}
      {gridLevels.map((level, li) => (
        <polygon key={li}
          points={Array.from({ length: n }, (_, i) => {
            const angle = angleStep * i - Math.PI / 2;
            return `${cx + Math.cos(angle) * r * level},${cy + Math.sin(angle) * r * level}`;
          }).join(" ")}
          fill="none" stroke={`${C.sage}18`} strokeWidth={1}
        />
      ))}
      {/* Axes */}
      {Array.from({ length: n }, (_, i) => {
        const angle = angleStep * i - Math.PI / 2;
        return (
          <line key={i}
            x1={cx} y1={cy}
            x2={cx + Math.cos(angle) * r} y2={cy + Math.sin(angle) * r}
            stroke={`${C.sage}15`} strokeWidth={1}
          />
        );
      })}
      {/* Fill */}
      <polygon
        points={Array.from({ length: n }, (_, i) => {
          const p = getPoint(i, values[DIMENSIONS[i].key] || 0);
          return `${p.x},${p.y}`;
        }).join(" ")}
        fill={`${C.oceanTeal}18`} stroke={C.oceanTeal} strokeWidth={2}
      />
      {/* Points */}
      {DIMENSIONS.map((dim, i) => {
        const p = getPoint(i, values[dim.key] || 0);
        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={5} fill={colors[i]} stroke={C.white} strokeWidth={2} />
            <text
              x={cx + Math.cos(angleStep * i - Math.PI / 2) * (r + 22)}
              y={cy + Math.sin(angleStep * i - Math.PI / 2) * (r + 22)}
              textAnchor="middle" dominantBaseline="middle"
              style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: 10, fontWeight: 600, letterSpacing: "0.08em",
                textTransform: "uppercase", fill: C.sage,
              }}
            >{dim.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Step: Welcome ───────────────────────────────────────────────────────────
function StepWelcome({ onNext }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      minHeight: "100vh", padding: "60px 24px", textAlign: "center",
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
    }}>
      <div style={{
        width: 40, height: 1, background: `${C.sage}40`, margin: "0 auto 32px",
      }} />
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 44, fontWeight: 300, lineHeight: 1.15,
        color: C.slate, marginBottom: 20, maxWidth: 520,
      }}>
        Let's design<br />your journey
      </h1>
      <p style={{
        fontFamily: "'Quicksand', sans-serif",
        fontSize: 16, fontWeight: 400, color: `${C.slate}80`,
        lineHeight: 1.7, maxWidth: 420, marginBottom: 48,
      }}>
        A few questions to understand what you're seeking — so we can craft something that feels like it was made for you.
      </p>
      <button onClick={onNext} style={{
        fontFamily: "'Quicksand', sans-serif",
        fontSize: 13, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase",
        background: C.sage, border: "none", color: C.white,
        padding: "16px 48px", borderRadius: 40, cursor: "pointer",
        transition: "all 0.3s",
        boxShadow: `0 4px 24px ${C.sage}30`,
      }}
      onMouseEnter={e => { e.target.style.background = C.sageDark; e.target.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.target.style.background = C.sage; e.target.style.transform = "translateY(0)"; }}
      >
        Begin
      </button>
      <p style={{
        fontFamily: "'Quicksand', sans-serif",
        fontSize: 12, color: `${C.sage}60`, marginTop: 24, letterSpacing: "0.04em",
      }}>Takes about 2 minutes</p>
    </div>
  );
}

// ─── Step: Destination ───────────────────────────────────────────────────────
function StepDestination({ data, onChange, onNext, onBack }) {
  return (
    <div>
      <StepTitle
        eyebrow="Where"
        title="Where is calling you?"
        subtitle="Choose the landscape that stirs something. You can always explore others later."
      />
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 14, maxWidth: 560, margin: "0 auto", padding: "0 16px",
      }}>
        {DESTINATIONS.map(d => {
          const selected = data.destination === d.id;
          return (
            <button key={d.id} onClick={() => onChange({ destination: d.id })} style={{
              background: selected ? d.gradient : C.white,
              border: `2px solid ${selected ? C.sage : `${C.sage}18`}`,
              borderRadius: 16, padding: "24px 16px",
              cursor: "pointer", transition: "all 0.3s",
              textAlign: "center",
              boxShadow: selected ? `0 4px 20px ${C.sage}15` : "0 1px 4px rgba(0,0,0,0.04)",
              transform: selected ? "scale(1.02)" : "scale(1)",
            }}
            onMouseEnter={e => { if (!selected) e.target.style.borderColor = `${C.sage}50`; }}
            onMouseLeave={e => { if (!selected) e.target.style.borderColor = `${C.sage}18`; }}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{d.emoji}</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 18, fontWeight: 600, color: C.slate, marginBottom: 4,
              }}>{d.name}</div>
              <div style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: 11, color: `${C.slate}70`, fontWeight: 400,
              }}>{d.subtitle}</div>
            </button>
          );
        })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!data.destination} showBack={false} />
    </div>
  );
}

// ─── Step: Intention ─────────────────────────────────────────────────────────
function StepIntention({ data, onChange, onNext, onBack }) {
  const selected = data.intentions || [];
  const toggle = (id) => {
    const next = selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id];
    onChange({ intentions: next });
  };
  return (
    <div>
      <StepTitle
        eyebrow="Intention"
        title="What are you seeking?"
        subtitle="Choose all that resonate. There are no wrong answers here."
      />
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14,
        maxWidth: 480, margin: "0 auto", padding: "0 16px",
      }}>
        {INTENTIONS.map(item => {
          const active = selected.includes(item.id);
          return (
            <button key={item.id} onClick={() => toggle(item.id)} style={{
              background: active ? `${item.color}12` : C.white,
              border: `2px solid ${active ? item.color : `${C.sage}18`}`,
              borderRadius: 16, padding: "28px 20px",
              cursor: "pointer", transition: "all 0.35s",
              textAlign: "center",
              boxShadow: active ? `0 4px 20px ${item.color}20` : "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <div style={{
                fontSize: 28, marginBottom: 12, color: active ? item.color : `${C.slate}40`,
                transition: "color 0.3s",
              }}>{item.icon}</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 20, fontWeight: 600, color: C.slate, marginBottom: 6,
              }}>{item.label}</div>
              <div style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: 12, color: `${C.slate}70`, fontWeight: 400, lineHeight: 1.5,
              }}>{item.desc}</div>
            </button>
          );
        })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={selected.length === 0} />
    </div>
  );
}

// ─── Step: Movement ──────────────────────────────────────────────────────────
function StepMovement({ data, onChange, onNext, onBack }) {
  const val = data.movement ?? 50;
  const labels = ["Gentle", "Moderate", "Active", "Vigorous"];
  const labelIndex = val < 25 ? 0 : val < 50 ? 1 : val < 75 ? 2 : 3;
  const descriptions = [
    "Easy walks, gentle stretches, slow mornings",
    "Light hikes, flowing yoga, comfortable pace",
    "Full-day hikes, challenging trails, dynamic practice",
    "Push your limits. Summits. Trail runs. Max effort.",
  ];

  return (
    <div>
      <StepTitle
        eyebrow="Movement"
        title="How do you want to move?"
        subtitle="From gentle morning walks to summit pushes — set your pace."
      />
      <div style={{ maxWidth: 440, margin: "0 auto", padding: "0 24px" }}>
        <div style={{
          textAlign: "center", marginBottom: 32,
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 40, fontWeight: 300, color: C.sage,
            marginBottom: 6,
          }}>{labels[labelIndex]}</div>
          <p style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 13, color: `${C.slate}70`, lineHeight: 1.6,
          }}>{descriptions[labelIndex]}</p>
        </div>

        <div style={{ position: "relative", padding: "12px 0" }}>
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0, height: 4,
            background: `${C.sage}18`, borderRadius: 2, transform: "translateY(-50%)",
          }} />
          <div style={{
            position: "absolute", top: "50%", left: 0, width: `${val}%`, height: 4,
            background: `linear-gradient(90deg, ${C.seaGlass}, ${C.oceanTeal}, ${C.sunSalmon})`,
            borderRadius: 2, transform: "translateY(-50%)", transition: "width 0.15s",
          }} />
          <input
            type="range" min={0} max={100} value={val}
            onChange={e => onChange({ movement: Number(e.target.value) })}
            style={{
              width: "100%", appearance: "none", WebkitAppearance: "none",
              background: "transparent", cursor: "pointer", position: "relative", zIndex: 2,
              height: 28,
            }}
          />
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", marginTop: 8,
        }}>
          {labels.map(l => (
            <span key={l} style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
              color: `${C.sage}60`,
            }}>{l}</span>
          ))}
        </div>
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

// ─── Step: Practices ─────────────────────────────────────────────────────────
function StepPractices({ data, onChange, onNext, onBack }) {
  const selected = data.practices || [];
  const toggle = (id) => {
    const next = selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id];
    onChange({ practices: next });
  };
  return (
    <div>
      <StepTitle
        eyebrow="Practices"
        title="What nourishes you?"
        subtitle="Select the practices you'd like woven into your journey."
      />
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
        gap: 12, maxWidth: 560, margin: "0 auto", padding: "0 16px",
      }}>
        {PRACTICES.map(p => {
          const active = selected.includes(p.id);
          return (
            <button key={p.id} onClick={() => toggle(p.id)} style={{
              background: active ? `${p.color}12` : C.white,
              border: `2px solid ${active ? p.color : `${C.sage}15`}`,
              borderRadius: 14, padding: "20px 12px",
              cursor: "pointer", transition: "all 0.3s",
              textAlign: "center",
              boxShadow: active ? `0 3px 14px ${p.color}18` : "none",
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{p.icon}</div>
              <div style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: 12, fontWeight: 600, color: C.slate, letterSpacing: "0.02em",
              }}>{p.label}</div>
            </button>
          );
        })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={selected.length === 0} />
    </div>
  );
}

// ─── Step: Pacing ────────────────────────────────────────────────────────────
function StepPacing({ data, onChange, onNext, onBack }) {
  const val = data.pacing ?? 50;
  const labels = ["Slow & Deep", "Unhurried", "Balanced", "Full & Rich"];
  const labelIndex = val < 25 ? 0 : val < 50 ? 1 : val < 75 ? 2 : 3;
  const descriptions = [
    "One or two experiences a day. Long mornings. Space to breathe.",
    "Room to wander, but never bored. Natural flow.",
    "A good mix of planned moments and free time.",
    "Every window filled. Dawn to dark. Make the most of every hour.",
  ];

  return (
    <div>
      <StepTitle
        eyebrow="Rhythm"
        title="What's your rhythm?"
        subtitle="Some travelers need space. Others want every moment filled."
      />
      <div style={{ maxWidth: 440, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 40, fontWeight: 300, color: C.sage, marginBottom: 6,
          }}>{labels[labelIndex]}</div>
          <p style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 13, color: `${C.slate}70`, lineHeight: 1.6,
          }}>{descriptions[labelIndex]}</p>
        </div>

        <div style={{ position: "relative", padding: "12px 0" }}>
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0, height: 4,
            background: `${C.sage}18`, borderRadius: 2, transform: "translateY(-50%)",
          }} />
          <div style={{
            position: "absolute", top: "50%", left: 0, width: `${val}%`, height: 4,
            background: `linear-gradient(90deg, ${C.oceanTeal}, ${C.goldenAmber})`,
            borderRadius: 2, transform: "translateY(-50%)", transition: "width 0.15s",
          }} />
          <input
            type="range" min={0} max={100} value={val}
            onChange={e => onChange({ pacing: Number(e.target.value) })}
            style={{
              width: "100%", appearance: "none", WebkitAppearance: "none",
              background: "transparent", cursor: "pointer", position: "relative", zIndex: 2,
              height: 28,
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          {["Spacious", "", "", "Packed"].map((l, i) => (
            <span key={i} style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
              color: `${C.sage}60`,
            }}>{l}</span>
          ))}
        </div>
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

// ─── Step: Budget ────────────────────────────────────────────────────────────
function StepBudget({ data, onChange, onNext, onBack }) {
  return (
    <div>
      <StepTitle
        eyebrow="Investment"
        title="What feels right?"
        subtitle="Every tier is intentionally designed. This just shapes the options."
      />
      <div style={{
        display: "flex", flexDirection: "column", gap: 12,
        maxWidth: 440, margin: "0 auto", padding: "0 16px",
      }}>
        {BUDGET_TIERS.map(tier => {
          const active = data.budget === tier.id;
          return (
            <button key={tier.id} onClick={() => onChange({ budget: tier.id })} style={{
              display: "flex", alignItems: "center", gap: 16,
              background: active ? `${tier.color}10` : C.white,
              border: `2px solid ${active ? tier.color : `${C.sage}15`}`,
              borderRadius: 16, padding: "20px 24px",
              cursor: "pointer", transition: "all 0.3s", textAlign: "left",
              boxShadow: active ? `0 3px 16px ${tier.color}18` : "0 1px 4px rgba(0,0,0,0.03)",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: active ? `${tier.color}20` : `${C.sage}10`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.3s", flexShrink: 0,
              }}>
                <div style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: active ? tier.color : `${C.sage}40`,
                  transition: "background 0.3s",
                }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 20, fontWeight: 600, color: C.slate, marginBottom: 2,
                }}>{tier.label}</div>
                <div style={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: 12, color: `${C.slate}70`, fontWeight: 400,
                }}>{tier.desc}</div>
              </div>
              <div style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: 12, fontWeight: 600, color: active ? tier.color : `${C.sage}80`,
                letterSpacing: "0.02em", flexShrink: 0,
              }}>{tier.range}</div>
            </button>
          );
        })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={!data.budget} />
    </div>
  );
}

// ─── Step: Duration ──────────────────────────────────────────────────────────
function StepDuration({ data, onChange, onNext, onBack }) {
  const days = data.duration || 4;
  return (
    <div>
      <StepTitle
        eyebrow="Duration"
        title="How many days?"
        subtitle="We recommend 4–7 days for a truly transformative experience."
      />
      <div style={{ maxWidth: 360, margin: "0 auto", textAlign: "center", padding: "0 24px" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 32, marginBottom: 24,
        }}>
          <button onClick={() => onChange({ duration: Math.max(2, days - 1) })} style={{
            width: 48, height: 48, borderRadius: "50%",
            background: C.white, border: `2px solid ${C.sage}25`,
            cursor: "pointer", fontSize: 22, color: C.sage,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s", fontFamily: "'Quicksand', sans-serif",
          }}
          onMouseEnter={e => e.target.style.borderColor = C.sage}
          onMouseLeave={e => e.target.style.borderColor = `${C.sage}25`}
          >−</button>
          <div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 72, fontWeight: 300, color: C.slate, lineHeight: 1,
            }}>{days}</div>
            <div style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase",
              color: `${C.sage}80`, marginTop: 4,
            }}>days</div>
          </div>
          <button onClick={() => onChange({ duration: Math.min(14, days + 1) })} style={{
            width: 48, height: 48, borderRadius: "50%",
            background: C.white, border: `2px solid ${C.sage}25`,
            cursor: "pointer", fontSize: 22, color: C.sage,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s", fontFamily: "'Quicksand', sans-serif",
          }}
          onMouseEnter={e => e.target.style.borderColor = C.sage}
          onMouseLeave={e => e.target.style.borderColor = `${C.sage}25`}
          >+</button>
        </div>

        {/* Visual day blocks */}
        <div style={{
          display: "flex", gap: 4, justifyContent: "center", flexWrap: "wrap", marginTop: 16,
        }}>
          {Array.from({ length: days }, (_, i) => (
            <div key={i} style={{
              width: 32, height: 32, borderRadius: 8,
              background: `linear-gradient(135deg, ${C.oceanTeal}${(20 + i * 10).toString(16)}, ${C.goldenAmber}${(20 + i * 10).toString(16)})`,
              border: `1px solid ${C.sage}15`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 600, color: C.sage,
              animation: `fadeScale 0.3s ${i * 0.05}s both`,
            }}>{i + 1}</div>
          ))}
        </div>
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextLabel="See My Profile" />
    </div>
  );
}

// ─── Step: Spirit Profile ────────────────────────────────────────────────────
function StepProfile({ data, onBack, onUnlock }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 200); }, []);

  // Compute radar values from selections
  const radarValues = {
    movement: (data.movement ?? 50) / 100,
    wellness: Math.min(1, (data.practices?.length || 0) / 5),
    adventure: data.intentions?.includes("adventure") ? 0.85 : (data.movement ?? 50) > 65 ? 0.6 : 0.3,
    stillness: data.intentions?.includes("stillness") ? 0.85 : (data.pacing ?? 50) < 40 ? 0.7 : 0.3,
    social: data.intentions?.includes("connection") ? 0.85 : 0.4,
    luxury: data.budget === "noLimits" ? 1 : data.budget === "premium" ? 0.75 : data.budget === "balanced" ? 0.5 : 0.3,
  };

  const destName = DESTINATIONS.find(d => d.id === data.destination)?.name || "your destination";
  const intentionLabels = (data.intentions || []).map(id => INTENTIONS.find(i => i.id === id)?.label).filter(Boolean);
  const practiceLabels = (data.practices || []).map(id => PRACTICES.find(p => p.id === id)?.label).filter(Boolean);

  return (
    <div style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
    }}>
      <StepTitle
        eyebrow="Your Travel Spirit"
        title="Here's what we see"
        subtitle={`A ${data.duration || 4}-day journey to ${destName}, shaped by everything you've shared.`}
      />

      {/* Radar */}
      <div style={{
        display: "flex", justifyContent: "center", marginBottom: 32,
      }}>
        <RadarChart values={radarValues} size={280} />
      </div>

      {/* Summary cards */}
      <div style={{
        maxWidth: 480, margin: "0 auto", padding: "0 16px",
        display: "flex", flexDirection: "column", gap: 12,
      }}>
        <div style={{
          background: C.white, borderRadius: 14, padding: "18px 22px",
          border: `1px solid ${C.sage}12`,
        }}>
          <div style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
            color: C.oceanTeal, marginBottom: 8,
          }}>Seeking</div>
          <div style={{
            display: "flex", gap: 8, flexWrap: "wrap",
          }}>
            {intentionLabels.map(l => (
              <span key={l} style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: 13, fontWeight: 500, color: C.slate,
                background: `${C.oceanTeal}10`, padding: "4px 14px", borderRadius: 20,
              }}>{l}</span>
            ))}
          </div>
        </div>

        <div style={{
          background: C.white, borderRadius: 14, padding: "18px 22px",
          border: `1px solid ${C.sage}12`,
        }}>
          <div style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
            color: C.goldenAmber, marginBottom: 8,
          }}>Practices</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {practiceLabels.map(l => (
              <span key={l} style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: 13, fontWeight: 500, color: C.slate,
                background: `${C.goldenAmber}10`, padding: "4px 14px", borderRadius: 20,
              }}>{l}</span>
            ))}
          </div>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
        }}>
          <div style={{
            background: C.white, borderRadius: 14, padding: "18px 22px",
            border: `1px solid ${C.sage}12`,
          }}>
            <div style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
              color: C.sunSalmon, marginBottom: 6,
            }}>Pace</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 22, fontWeight: 400, color: C.slate,
            }}>
              {(data.pacing ?? 50) < 35 ? "Slow & Deep" : (data.pacing ?? 50) < 65 ? "Balanced" : "Full & Rich"}
            </div>
          </div>
          <div style={{
            background: C.white, borderRadius: 14, padding: "18px 22px",
            border: `1px solid ${C.sage}12`,
          }}>
            <div style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
              color: C.seaGlass, marginBottom: 6,
            }}>Investment</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 22, fontWeight: 400, color: C.slate,
            }}>
              {BUDGET_TIERS.find(t => t.id === data.budget)?.label || "—"}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", marginTop: 48, paddingBottom: 48 }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 26, fontWeight: 300, color: C.slate, marginBottom: 8,
        }}>Your itinerary is ready</div>
        <p style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: 14, color: `${C.slate}70`, marginBottom: 28, maxWidth: 380, margin: "0 auto 28px",
          lineHeight: 1.6,
        }}>
          A custom {data.duration || 4}-day plan for {destName} — built around your pace, your practices, and your intentions.
        </p>
        <button onClick={onUnlock} style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: 14, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
          background: `linear-gradient(135deg, ${C.sage}, ${C.oceanTeal})`,
          border: "none", color: C.white,
          padding: "18px 52px", borderRadius: 40, cursor: "pointer",
          transition: "all 0.3s",
          boxShadow: `0 6px 28px ${C.oceanTeal}30`,
        }}
        onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 36px ${C.oceanTeal}40`; }}
        onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 6px 28px ${C.oceanTeal}30`; }}
        >
          Unlock My Itinerary
        </button>
        <div style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: 12, color: `${C.sage}60`, marginTop: 16,
        }}>Starting at $29 · Fully customizable</div>
        <div style={{ marginTop: 20 }}>
          <button onClick={onBack} style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 12, fontWeight: 500, color: `${C.sage}80`,
            background: "none", border: "none", cursor: "pointer",
            textDecoration: "underline", textUnderlineOffset: 3,
          }}>← Adjust my preferences</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function PlanMyTrip() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    destination: null,
    intentions: [],
    movement: 50,
    practices: [],
    pacing: 50,
    budget: null,
    duration: 4,
  });
  const [transitioning, setTransitioning] = useState(false);
  const containerRef = useRef(null);

  const updateData = (patch) => setData(prev => ({ ...prev, ...patch }));

  const handleClose = () => {
    if (step > 0 && !window.confirm("Leave trip planner? Your selections won't be saved.")) return;
    navigate('/');
  };

  const goNext = () => {
    setTransitioning(true);
    setTimeout(() => {
      setStep(s => s + 1);
      setTransitioning(false);
      containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  const goBack = () => {
    setTransitioning(true);
    setTimeout(() => {
      setStep(s => s - 1);
      setTransitioning(false);
      containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  const handleUnlock = () => {
    alert("🎉 This would navigate to the payment / itinerary unlock flow!\n\nTrip data collected:\n" + JSON.stringify(data, null, 2));
  };

  const TOTAL_STEPS = 8;

  const renderStep = () => {
    switch (step) {
      case 0: return <StepWelcome onNext={goNext} />;
      case 1: return <StepDestination data={data} onChange={updateData} onNext={goNext} onBack={goBack} />;
      case 2: return <StepIntention data={data} onChange={updateData} onNext={goNext} onBack={goBack} />;
      case 3: return <StepMovement data={data} onChange={updateData} onNext={goNext} onBack={goBack} />;
      case 4: return <StepPractices data={data} onChange={updateData} onNext={goNext} onBack={goBack} />;
      case 5: return <StepPacing data={data} onChange={updateData} onNext={goNext} onBack={goBack} />;
      case 6: return <StepBudget data={data} onChange={updateData} onNext={goNext} onBack={goBack} />;
      case 7: return <StepDuration data={data} onChange={updateData} onNext={goNext} onBack={goBack} />;
      case 8: return <StepProfile data={data} onBack={goBack} onUnlock={handleUnlock} />;
      default: return null;
    }
  };

  return (
    <div ref={containerRef} style={{
      fontFamily: "'Quicksand', sans-serif",
      background: `linear-gradient(180deg, ${C.cream} 0%, ${C.white} 50%, ${C.cream} 100%)`,
      minHeight: "100vh", overflowY: "auto",
      position: "relative",
    }}>

      {/* ── Fixed Top Bar: Logo + close ── */}
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 28px",
          background: step === 0 ? "transparent" : `linear-gradient(180deg, ${C.cream}ee 0%, ${C.cream}00 100%)`,
          pointerEvents: "none",
          transition: "background 0.4s",
        }}>
          <Link to="/" style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 22, fontWeight: 500, letterSpacing: "0.08em",
            color: C.slate, pointerEvents: "auto", cursor: "pointer",
            transition: "opacity 0.3s", textDecoration: "none",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Lila Trips
          </Link>
          <button onClick={handleClose} aria-label="Close" style={{
            pointerEvents: "auto",
            width: 36, height: 36, borderRadius: "50%",
            background: `${C.white}90`, border: `1px solid ${C.sage}18`,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.borderColor = `${C.sage}40`; }}
          onMouseLeave={e => { e.currentTarget.style.background = `${C.white}90`; e.currentTarget.style.borderColor = `${C.sage}18`; }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={C.sage} strokeWidth="1.8" strokeLinecap="round">
              <line x1="1" y1="1" x2="13" y2="13" /><line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: ${C.oceanTeal}30; }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 24px; height: 24px; border-radius: 50%;
          background: ${C.white}; border: 3px solid ${C.sage};
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          cursor: pointer; transition: transform 0.2s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px; height: 24px; border-radius: 50%;
          background: ${C.white}; border: 3px solid ${C.sage};
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          cursor: pointer;
        }
        @keyframes fadeScale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div style={{
        maxWidth: 640, margin: "0 auto",
        padding: step === 0 ? 0 : "80px 0 0",
        opacity: transitioning ? 0 : 1,
        transform: transitioning ? "translateY(12px)" : "translateY(0)",
        transition: "opacity 0.3s, transform 0.3s",
      }}>
        {step > 0 && step < 8 && <StepIndicator current={step - 1} total={7} />}
        {renderStep()}
      </div>
    </div>
  );
}
