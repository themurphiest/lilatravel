// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: ZION CANYON GUIDE (dedicated)
// ═══════════════════════════════════════════════════════════════════════════════
//
// Full editorial guide for Zion & its orbit. Uses shared Nav/Footer/FadeIn
// from the Lila Trips component library, with guide-specific components
// defined locally (ListItem, StayItem, ExpandableList, AddToTripButton).
//
// Route: /destinations/zion-canyon
//

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Footer, FadeIn, Breadcrumb } from '@components';
import { C } from '@data/brand';
import { P } from '@data/photos';


// ─── Guide-Specific Components ───────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: "'Quicksand', sans-serif",
      fontSize: 11, fontWeight: 700,
      letterSpacing: "0.28em", textTransform: "uppercase",
      color: C.skyBlue, marginBottom: 12,
      textAlign: "center",
    }}>{children}</div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 400,
      color: C.darkInk, margin: "0 0 6px", lineHeight: 1.2,
      textAlign: "center",
    }}>{children}</h2>
  );
}

function SectionSub({ children }) {
  return (
    <p style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "clamp(15px, 2vw, 17px)", fontWeight: 300, fontStyle: "italic",
      color: "#5a7080", margin: "0 auto 28px", lineHeight: 1.65,
      textAlign: "center", maxWidth: 520,
    }}>{children}</p>
  );
}

function Divider() {
  return <div style={{ height: 1, background: C.stone, margin: 0 }} />;
}

// Minimal geometric icons matching the Rituals page
function SectionIcon({ type }) {
  const size = 28;
  const icons = {
    // Rotated diamond — Move
    move: (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <rect x="14" y="2" width="15" height="15" rx="2" transform="rotate(45 14 2)"
          stroke={C.goldenAmber} strokeWidth="1.5" fill="none" />
      </svg>
    ),
    // Circle — Breathe
    breathe: (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10"
          stroke={C.seaGlass} strokeWidth="1.5" fill="none" />
      </svg>
    ),
    // Star/sparkle — Awaken
    awaken: (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <path d="M14 3 L16 11 L24 14 L16 17 L14 25 L12 17 L4 14 L12 11 Z"
          stroke={C.sunSalmon} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      </svg>
    ),
    // Two overlapping circles — Connect
    connect: (
      <svg width={size} height={size} viewBox="0 0 32 28" fill="none">
        <circle cx="12" cy="14" r="9" stroke={C.skyBlue} strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="14" r="9" stroke={C.skyBlue} strokeWidth="1.5" fill="none" />
      </svg>
    ),
    // House/shelter — Stay
    stay: (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <path d="M4 14 L14 5 L24 14" stroke={C.oceanTeal} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 13 L7 23 L21 23 L21 13" stroke={C.oceanTeal} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    // Calendar/window — When to go
    windows: (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="2" stroke={C.goldenAmber} strokeWidth="1.5" fill="none" />
        <line x1="14" y1="4" x2="14" y2="24" stroke={C.goldenAmber} strokeWidth="1.5" />
        <line x1="4" y1="14" x2="24" y2="14" stroke={C.goldenAmber} strokeWidth="1.5" />
      </svg>
    ),
    // Threshold — crescent
    threshold: (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <path d="M18 6 A10 10 0 1 0 18 22 A7 7 0 1 1 18 6 Z"
          stroke={C.sunSalmon} strokeWidth="1.5" fill="none" />
      </svg>
    ),
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
      {icons[type]}
    </div>
  );
}

function AddToTripButton({ name }) {
  const [added, setAdded] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (added) { setAdded(false); return; }
    setAdded(true);
    setTimeout(() => setShowPrompt(true), 400);
  };

  return (
    <>
      <button
        onClick={handleClick}
        style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          padding: added ? "4px 10px" : "4px 10px 4px 6px",
          borderRadius: 1,
          border: `1.5px solid ${added ? C.oceanTeal : C.stone}`,
          background: added ? `${C.oceanTeal}10` : "transparent",
          cursor: "pointer",
          fontFamily: "'Quicksand', sans-serif",
          fontSize: 10, fontWeight: 700,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: added ? C.oceanTeal : "#9aabba",
          transition: "all 0.2s ease",
          flexShrink: 0, whiteSpace: "nowrap",
        }}
        onMouseEnter={e => {
          if (!added) { e.currentTarget.style.borderColor = C.oceanTeal; e.currentTarget.style.color = C.oceanTeal; }
        }}
        onMouseLeave={e => {
          if (!added) { e.currentTarget.style.borderColor = C.stone; e.currentTarget.style.color = "#9aabba"; }
        }}
      >
        <span style={{ fontSize: 14, lineHeight: 1, fontWeight: 400 }}>{added ? "✓" : "+"}</span>
        {added ? "Added" : "Add"}
      </button>

      {showPrompt && (
        <div
          onClick={() => setShowPrompt(false)}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 9999, padding: 20,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: C.warmWhite, padding: "48px 40px",
              maxWidth: 400, width: "100%", textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{
              width: 44, height: 44,
              background: `${C.oceanTeal}15`, color: C.oceanTeal,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, margin: "0 auto 16px",
            }}>✓</div>
            <div style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 11, fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: C.darkInk, marginBottom: 12,
            }}>Added to your trip</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(15px, 2vw, 17px)", fontWeight: 300, fontStyle: "italic",
              color: "#5a7080", lineHeight: 1.65, marginBottom: 28,
            }}>Create a free account to save your trip, get personalized recommendations, and unlock custom itineraries.</div>
            <button
              onClick={() => setShowPrompt(false)}
              style={{
                width: "100%", padding: "13px 28px",
                background: C.darkInk, color: "#fff", border: "none",
                fontFamily: "'Quicksand', sans-serif",
                fontSize: 10, fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase",
                cursor: "pointer", marginBottom: 10, transition: "opacity 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >Create Free Account</button>
            <button
              onClick={() => setShowPrompt(false)}
              style={{
                width: "100%", padding: "10px 24px",
                background: "transparent", color: "#9aabba", border: "none",
                fontFamily: "'Quicksand', sans-serif",
                fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
                cursor: "pointer",
              }}
            >Keep browsing</button>
          </div>
        </div>
      )}
    </>
  );
}

function ListItem({ name, detail, note, tags, featured, url }) {
  const nameEl = url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{
      fontFamily: "'Quicksand', sans-serif", fontSize: 15, fontWeight: 600,
      color: C.darkInk, textDecoration: "none",
      borderBottom: `1px solid ${C.stone}`, transition: "border-color 0.2s, color 0.2s",
    }} onMouseEnter={e => { e.target.style.borderColor = C.oceanTeal; e.target.style.color = C.slate || "#3D5A6B"; }}
       onMouseLeave={e => { e.target.style.borderColor = C.stone; e.target.style.color = C.darkInk; }}>
      {name}
      <span style={{ fontSize: 11, marginLeft: 4, color: "#9aabba" }}>{"↗"}</span>
    </a>
  ) : (
    <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 15, fontWeight: 600, color: C.darkInk }}>{name}</span>
  );

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderBottom: `1px solid ${C.stone}` }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 3 }}>
          {nameEl}
          {featured && (
            <span style={{
              padding: "2px 10px", border: `1px solid ${C.sunSalmon}40`,
              fontFamily: "'Quicksand', sans-serif", fontSize: 9, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase", color: C.sunSalmon,
            }}>{"Lila Pick"}</span>
          )}
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(14px, 1.6vw, 15px)", fontWeight: 300,
          color: "#5a7080", lineHeight: 1.6,
        }}>{detail}</div>
        {note && (
          <div style={{
            fontFamily: "'Quicksand', sans-serif", fontSize: 11, fontWeight: 600,
            color: C.oceanTeal, marginTop: 4,
          }}>{note}</div>
        )}
        {tags && tags.length > 0 && (
          <div style={{ display: "flex", gap: 5, marginTop: 7, flexWrap: "wrap" }}>
            {tags.map((t, i) => (
              <span key={i} style={{
                padding: "2px 8px", background: C.stone + "60",
                fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 600,
                color: "#9aabba",
              }}>{t}</span>
            ))}
          </div>
        )}
      </div>
      <AddToTripButton name={name} />
    </div>
  );
}

function StayItem({ name, location, tier, detail, tags, url, featured }) {
  const styles = {
    elemental: { color: C.seaGlass, label: "Elemental", bg: `${C.seaGlass}15` },
    rooted: { color: C.oceanTeal, label: "Rooted", bg: `${C.oceanTeal}12` },
    premium: { color: C.goldenAmber, label: "Premium", bg: `${C.goldenAmber}15` },
  };
  const s = styles[tier];
  const nameEl = url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{
      fontFamily: "'Quicksand', sans-serif", fontSize: 15, fontWeight: 600,
      color: C.darkInk, textDecoration: "none",
      borderBottom: `1px solid ${C.stone}`, transition: "border-color 0.2s",
    }} onMouseEnter={e => e.target.style.borderColor = C.oceanTeal}
       onMouseLeave={e => e.target.style.borderColor = C.stone}>
      {name}
      <span style={{ fontSize: 11, marginLeft: 4, color: "#9aabba" }}>{"↗"}</span>
    </a>
  ) : (
    <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 15, fontWeight: 600, color: C.darkInk }}>{name}</span>
  );

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 0", borderBottom: `1px solid ${C.stone}` }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
          <span style={{
            padding: "2px 10px", background: s.bg,
            fontFamily: "'Quicksand', sans-serif", fontSize: 9, fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase", color: s.color,
          }}>{s.label}</span>
          <span style={{
            fontFamily: "'Quicksand', sans-serif", fontSize: 11, fontWeight: 500, color: "#9aabba",
          }}>{location}</span>
          {featured && (
            <span style={{
              padding: "2px 10px", border: `1px solid ${C.sunSalmon}40`,
              fontFamily: "'Quicksand', sans-serif", fontSize: 9, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase", color: C.sunSalmon,
            }}>{"Lila Pick"}</span>
          )}
        </div>
        <div style={{ marginBottom: 3 }}>{nameEl}</div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(14px, 1.6vw, 15px)", fontWeight: 300,
          color: "#5a7080", lineHeight: 1.6,
        }}>{detail}</div>
        {tags && (
          <div style={{ display: "flex", gap: 5, marginTop: 7, flexWrap: "wrap" }}>
            {tags.map((t, i) => (
              <span key={i} style={{
                padding: "2px 8px", background: C.stone + "60",
                fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 600,
                color: "#9aabba",
              }}>{t}</span>
            ))}
          </div>
        )}
      </div>
      <AddToTripButton name={name} />
    </div>
  );
}

function ExpandableList({ children, initialCount = 5, label = "more" }) {
  const [expanded, setExpanded] = useState(false);
  const items = Array.isArray(children) ? children : [children];
  const visible = expanded ? items : items.slice(0, initialCount);
  const hasMore = items.length > initialCount;

  return (
    <div>
      {visible}
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            margin: "20px 0 0", padding: "8px 0", paddingBottom: 4,
            background: "none", border: "none",
            borderBottom: `1px solid ${C.darkInk}`,
            cursor: "pointer",
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: C.darkInk, transition: "opacity 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.55"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          {expanded ? "Show less" : `Show ${items.length - initialCount} more ${label}`}
          <span style={{
            display: "inline-block",
            transition: "transform 0.25s ease",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            fontSize: 10,
          }}>{"▼"}</span>
        </button>
      )}
    </div>
  );
}


// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ZionGuide() {
  return (
    <>
      <Nav />

      {/* ══ IMAGE HERO ══════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative", minHeight: "70vh", overflow: "hidden",
        display: "flex", alignItems: "flex-end",
      }}>
        <img src={P.zion} alt="Zion Canyon" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 40%",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,18,26,0.8) 0%, rgba(10,18,26,0.15) 50%, rgba(10,18,26,0.05) 100%)" }} />
        <div style={{
          position: "relative", zIndex: 2,
          padding: "64px 52px", maxWidth: 900, width: "100%",
        }}>
          <FadeIn from="bottom" delay={0.1}>
            <span className="eyebrow" style={{ color: C.sunSalmon }}>Destination Guide</span>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(40px, 8vw, 80px)", fontWeight: 300,
              color: "white", lineHeight: 1.0, marginBottom: 16, letterSpacing: "-0.02em",
            }}>
              Zion &amp; its orbit
            </h1>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 300, fontStyle: "italic",
              color: "rgba(255,255,255,0.6)", lineHeight: 1.6, maxWidth: 500,
            }}>
              Cottonwoods catch fire against ancient sandstone. The crowds thin. The canyon breathes.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══ GUIDE CONTENT ═══════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 52px", background: C.cream }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>

          <Breadcrumb items={[
            { label: "Home", to: "/" },
            { label: "Destinations", to: "/destinations" },
            { label: "Zion Canyon" },
          ]} />

          {/* ── Park Badges ─────────────────────────────────────────────── */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 32, marginBottom: 20 }}>
            {[
              { label: "Zion National Park", url: "https://www.nps.gov/zion/" },
              { label: "Bryce Canyon National Park", url: "https://www.nps.gov/brca/" },
              { label: "Capitol Reef National Park", url: "https://www.nps.gov/care/" },
            ].map((park, i) => (
              <a key={i} href={park.url} target="_blank" rel="noopener noreferrer" style={{
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                padding: "5px 14px 5px 6px", background: `${C.seaGlass}15`,
              }}>
                <div style={{
                  width: 22, height: 22, background: C.seaGlass,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, color: "#fff",
                }}>{"🏛"}</div>
                <span style={{
                  fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.08em", color: C.seaGlass,
                }}>{park.label}</span>
              </a>
            ))}
          </div>

          {/* ── Subtitle + Threshold Badge + Meta Tags ──────────────────── */}
          <FadeIn>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(17px, 2vw, 22px)", fontWeight: 300, fontStyle: "italic",
              color: "#5a7080", margin: "0 0 28px", lineHeight: 1.65, maxWidth: 520,
            }}>
              Our curated guide to Southwest Utah — from the canyon floor in Zion to the hoodoos of Bryce Canyon and the starlit mesas of Capitol Reef. The places, practices, and experiences we keep coming back to.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <div style={{ width: 20, height: 1, background: C.sunSalmon }} />
              <span style={{
                fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.22em", textTransform: "uppercase", color: C.sunSalmon,
              }}>Autumn · Sep–Nov</span>
            </div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 48 }}>
              {["Springdale to Torrey", "Free Guide", "Updated 2026"].map((t, i) => (
                <span key={i} style={{
                  padding: "5px 14px", border: `1px solid ${C.stone}`,
                  fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 600,
                  letterSpacing: "0.08em", color: "#9aabba",
                }}>{t}</span>
              ))}
            </div>
          </FadeIn>


          <Divider />

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* SENSE OF PLACE                                                */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <section style={{ padding: "44px 0" }}>
            <FadeIn>
              <SectionLabel>Sense of Place</SectionLabel>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.85,
                fontWeight: 300, color: "#5a6a78", margin: "0 0 16px",
              }}>
                {"Zion Canyon was carved over millions of years by the Virgin River cutting through Navajo sandstone. The walls glow copper at sunrise, amber at midday, impossible pink at dusk. The Paiute called it Mukuntuweap — \"straight-up land.\" Whatever name you give it, the experience is the same: you stand among these walls of stone and you stop talking."}
              </p>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.85,
                fontWeight: 300, color: "#5a6a78", margin: "0 0 24px",
              }}>
                This guide covers the full orbit — not just the park, but the surrounding area that makes a trip here extraordinary. From yoga studios in Springdale to the hoodoos of Bryce Canyon and the starlit mesas of Capitol Reef, drawn from the lived experience of locals, guides, and travelers who return again and again.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: 16, padding: 20,
                background: C.cream, border: `1px solid ${C.stone}`,
              }}>
                {[
                  { l: "Recommended", v: "4–7 days" },
                  { l: "Nearest Airport", v: "Las Vegas (LAS)" },
                  { l: "Drive from LAS", v: "~2.5 hours" },
                  { l: "Best Times", v: "Mar–May, Sep–Nov" },
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.oceanTeal, marginBottom: 3 }}>{s.l}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 400, color: C.darkInk }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </section>


          <Divider />

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* MAGIC WINDOWS                                                 */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <section style={{ padding: "44px 0" }}>
            <FadeIn>
              <SectionIcon type="windows" />
              <SectionLabel>Magic Windows</SectionLabel>
              <SectionTitle>When to go</SectionTitle>
              <SectionSub>Zion transforms with the seasons. These are the moments when the land is most alive.</SectionSub>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div>
                <ListItem name={"Early Autumn — The Golden Corridor"} featured
                  detail="Cottonwoods turn gold along the Virgin River. Crowds thin. Light goes amber. Best hiking weather of the year."
                  tags={["Late Sep – Oct", "Golden Light", "Best Weather"]} />
                <ListItem name="Desert Bloom" featured
                  detail="After a wet winter, the desert floor erupts in wildflowers. Cacti crown themselves. Timing is everything — and unpredictable."
                  tags={["Mar – Apr", "Wildflowers", "Variable"]} />
                <ListItem name="Winter Solstice"
                  detail="Shortest day, most dramatic canyon light. Snow dusting the upper walls at sunset. Fewer people, deeper silence."
                  tags={["Dec 19–22", "Solstice", "Canyon Light"]} />
                <ListItem name="Dark Sky Season"
                  detail="Late summer and early fall offer warm nights for stargazing. The Milky Way peaks overhead from June through September."
                  tags={["Jun – Sep", "Milky Way", "Warm Nights"]} />
              </div>
            </FadeIn>
          </section>


          <Divider />

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* STAY                                                          */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <section style={{ padding: "44px 0" }}>
            <FadeIn>
              <SectionIcon type="stay" />
              <SectionLabel>Stay</SectionLabel>
              <SectionTitle>Where to sleep</SectionTitle>
              <SectionSub>How you inhabit a place matters. Options across the full spectrum — from sleeping under the stars to world-class luxury.</SectionSub>
            </FadeIn>

            <FadeIn delay={0.05}>
              <div style={{
                padding: "14px 16px", background: C.cream,
                border: `1px solid ${C.stone}`, marginBottom: 20,
                display: "flex", gap: 16, flexWrap: "wrap",
              }}>
                {[
                  { label: "Elemental", desc: "In the landscape", color: C.seaGlass },
                  { label: "Rooted", desc: "Boutique, local", color: C.oceanTeal },
                  { label: "Premium", desc: "World-class", color: C.goldenAmber },
                ].map((t, i) => (
                  <div key={i} style={{ flex: "1 1 140px" }}>
                    <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: t.color }}>{t.label}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontWeight: 300, fontStyle: "italic", color: "#5a7080", marginLeft: 6 }}>{t.desc}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <ExpandableList initialCount={4} label="places to stay">
                <StayItem tier="elemental" name="Under Canvas Zion" location="Virgin, UT" featured
                  url="https://www.undercanvas.com/camps/zion/"
                  detail="Safari-style tents on 196 acres. DarkSky certified. Stargazer tents with sky windows above your bed. No WiFi — by design."
                  tags={["Glamping", "DarkSky", "Seasonal"]} />
                <StayItem tier="elemental" name="AutoCamp Zion" location="Virgin, UT" featured
                  url="https://autocamp.com/zion/"
                  detail="Climate-controlled Airstream suites with midcentury design. Retro charm, modern comfort."
                  tags={["Airstreams", "Climate-Controlled", "Hilton Points"]} />
                <StayItem tier="rooted" name="Cliffrose Springdale" location="Springdale" featured
                  url="https://www.cliffroselodge.com/"
                  detail="Five acres of gardens on the Virgin River. Heated pools year-round. Anthera restaurant. Steps from the park."
                  tags={["Riverfront", "Restaurant", "Spa", "Pool"]} />
                <StayItem tier="premium" name="Amangiri" location="Canyon Point, UT" featured
                  url="https://www.aman.com/hotels/amangiri"
                  detail="34 modernist suites on 900 acres. Camp Sarika with private plunge pools. Aman Spa with Navajo healing traditions."
                  tags={["Ultra-Luxury", "Via Ferrata", "Spa"]} />
                <StayItem tier="elemental" name="Open Sky Zion" location="Virgin, UT"
                  url="https://www.openskyzion.com/"
                  detail="Private and immersive. Farm-to-table at Black Sage restaurant. Wellness woven into every element."
                  tags={["Luxury Glamping", "Farm-to-Table", "Wellness"]} />
                <StayItem tier="rooted" name="Desert Pearl Inn" location="Springdale"
                  url="https://www.desertpearl.com/"
                  detail="Family-owned 20+ years. Built with reclaimed Douglas fir from a century-old railroad trestle. Rated #1 in Springdale."
                  tags={["Family-Owned", "Riverside", "Kitchenette"]} />
                <StayItem tier="rooted" name={"Flanigan's Resort"} location="Springdale"
                  url="https://flanigans.com/"
                  detail="Park lodge with Deep Canyon Spa, Spotted Dog restaurant, and hillside yoga. Best wellness integration in town."
                  tags={["Spa", "Restaurant", "Yoga"]} />
                <StayItem tier="rooted" name="Skyview Hotel" location="Torrey, UT"
                  url="https://skyviewhotel.com/"
                  detail={"14 rooms and 6 glamping domes near Capitol Reef. Rooftop stargazing in Utah's first Dark Sky community."}
                  tags={["Dark Sky", "Glamping Domes", "Boutique"]} />
                <StayItem tier="premium" name="The Inn at Entrada" location="St. George, UT"
                  url="https://www.innatentrada.com/"
                  detail="Luxury casitas near Snow Canyon. Red rock panoramas, championship golf, full-service spa."
                  tags={["Casitas", "Golf", "Spa"]} />
              </ExpandableList>
            </FadeIn>
          </section>


          <Divider />

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* MOVE                                                          */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <section style={{ padding: "44px 0" }}>
            <FadeIn>
              <SectionIcon type="move" />
              <SectionLabel>Move</SectionLabel>
              <SectionTitle>Hikes, trails &amp; adventures</SectionTitle>
              <SectionSub>{"From easy canyon strolls to world-class challenges. The terrain teaches you something new at every elevation."}</SectionSub>
            </FadeIn>
            <FadeIn delay={0.08}>
              <ExpandableList initialCount={5} label="trails & adventures">
                <ListItem name="Angels Landing" featured
                  url="https://www.nps.gov/zion/planyourvisit/zion-canyon-trail-descriptions.htm"
                  detail={"The iconic chain-assisted ridgeline summit. Exposure, adrenaline, and views that justify every step. Permit required — book 3 months out."}
                  note="Permit required — recreation.gov · Seasonal lottery"
                  tags={["5.4 mi RT", "Strenuous", "1,488 ft gain", "Permit"]} />
                <ListItem name="The Narrows" featured
                  url="https://www.nps.gov/zion/planyourvisit/thenarrows.htm"
                  detail="Hiking through the Virgin River between thousand-foot walls. Water levels dictate access — check conditions daily. Rent gear in Springdale."
                  note="River-level dependent — check NPS morning reports"
                  tags={["Up to 10 mi", "Moderate–Strenuous", "Water Hiking"]} />
                <ListItem name="The Subway" featured
                  url="https://www.nps.gov/zion/planyourvisit/the-subway.htm"
                  detail="A tunnel-shaped canyon carved by flowing water. Technical bottom-up route or wilderness top-down. Unforgettable geology."
                  tags={["9 mi RT", "Technical", "Permit Required"]} />
                <ListItem name="Canyon Overlook Trail"
                  url="https://www.nps.gov/zion/planyourvisit/zion-canyon-trail-descriptions.htm"
                  detail="Short, punchy, with one of the best views in the park. East side of the tunnel. Arrive early or at sunset."
                  tags={["1 mi RT", "Easy–Moderate", "Sunset", "Family Friendly"]} />
                <ListItem name="Observation Point"
                  url="https://www.nps.gov/zion/planyourvisit/zion-canyon-trail-descriptions.htm"
                  detail="Higher than Angels Landing, quieter, arguably more stunning. Full panorama of Zion Canyon."
                  tags={["8 mi RT", "Strenuous", "2,150 ft gain"]} />
                <ListItem name="Kolob Canyons"
                  url="https://www.nps.gov/zion/planyourvisit/kolob-canyons-wilderness-hiking-trails.htm"
                  detail={"Zion's quiet northern section. Fewer visitors, deeper solitude. Finger canyons of red Navajo sandstone."}
                  tags={["Multiple Trails", "Remote", "Separate Entrance"]} />
                <ListItem name="Hidden Canyon"
                  url="https://www.nps.gov/zion/planyourvisit/zion-canyon-trail-descriptions.htm"
                  detail="A narrow slot canyon reached by a chain-assisted trail. Small, intimate, often overlooked."
                  tags={["2.4 mi RT", "Moderate–Strenuous", "Chains"]} />
                <ListItem name="Emerald Pools"
                  url="https://www.nps.gov/zion/planyourvisit/zion-canyon-trail-descriptions.htm"
                  detail="Three tiers of pools and waterfalls, increasingly beautiful as you climb. Upper pool is the reward."
                  tags={["1–3 mi RT", "Easy–Moderate", "Family Friendly"]} />
                <ListItem name={"Pa'rus Trail"}
                  url="https://www.nps.gov/zion/planyourvisit/zion-canyon-trail-descriptions.htm"
                  detail="Flat, paved riverside trail. Bikes allowed. Perfect for decompression, morning walks, or families."
                  tags={["3.5 mi RT", "Easy", "Paved", "Bikes OK"]} />
                <ListItem name="Snow Canyon State Park"
                  url="https://stateparks.utah.gov/parks/snow-canyon/"
                  detail="Red and white sandstone, lava flows, and sand dunes 45 min from Zion. Far fewer crowds."
                  note="Near St. George — great half-day trip"
                  tags={["State Park", "Lava Tubes", "Less Crowded"]} />
                <ListItem name="Scenic Drive to Capitol Reef"
                  detail="The 2.5-hour drive via Highway 12 is one of the most beautiful roads in America. Make it the journey, not the commute."
                  tags={["Scenic Drive", "Half Day", "Highway 12"]} />
              </ExpandableList>
            </FadeIn>
          </section>


          <Divider />

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* BREATHE                                                       */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <section style={{ padding: "44px 0" }}>
            <FadeIn>
              <SectionIcon type="breathe" />
              <SectionLabel>Breathe</SectionLabel>
              <SectionTitle>{"Yoga, spa & wellness"}</SectionTitle>
              <SectionSub>{"Slow down. The canyon holds space for stillness just as powerfully as it holds space for adventure."}</SectionSub>
            </FadeIn>
            <FadeIn delay={0.08}>
              <ExpandableList initialCount={4} label="wellness options">
                <ListItem name={"Hillside Yoga at Flanigan's"} featured
                  url="https://flanigans.com/spa/"
                  detail={"Gentle yoga with sound bath on a terrace overlooking Zion. The vibration carries differently at this elevation. All levels welcome — come for the practice, stay for the view."}
                  note={"At Flanigan's Resort — check schedule for sound bath sessions"}
                  tags={["Sound Bath", "Canyon Views", "All Levels"]} />
                <ListItem name="Zion Guru Skydeck Yoga" featured
                  url="https://www.zionguru.com/"
                  detail="Open-air deck with the Watchman as your backdrop. Morning sessions catch first light on the canyon walls."
                  tags={["Outdoor", "Morning", "All Levels"]} />
                <ListItem name="Deep Canyon Spa" featured
                  url="https://flanigans.com/spa/"
                  detail={"Full-service spa inside Flanigan's Resort. Massages, body treatments, and facials after long trail days. The canyon's first spa, open since 1994."}
                  tags={["Full Spa", "Springdale", "Walk-In"]} />
                <ListItem name="Open Sky Wellness Programs" featured
                  url="https://www.openskyzion.com/"
                  detail="Immersive yoga, meditation, and sound healing in an off-grid desert setting. Multi-day programs available."
                  tags={["Multi-Day", "Off-Grid", "Immersive"]} />
                <ListItem name="Five Petals Spa at the Cliffrose"
                  url="https://www.cliffroselodge.com/"
                  detail="Riverfront spa steps from the park. Deep-tissue, hot stone, and custom facials."
                  tags={["Riverfront", "Hotel Spa"]} />
                <ListItem name="Sunrise Meditation at Canyon Junction"
                  detail="Arrive before the shuttles. Sit at the Pine Creek bridge. Watch the walls ignite in silence. No teacher needed."
                  tags={["Free", "Early AM", "Solo", "Self-Guided"]} />
                <ListItem name="Earthing on the Canyon Floor"
                  detail="Take your shoes off. Stand on the sandstone. Feel the warmth the rock has been collecting for 200 million years."
                  tags={["Free", "Grounding", "Self-Guided"]} />
                <ListItem name="Journaling at the Virgin River"
                  detail={"Find a bench along the Pa'rus Trail. The sound of the river is its own kind of teacher."}
                  tags={["Free", "Contemplative", "Self-Guided"]} />
              </ExpandableList>
            </FadeIn>
          </section>


          <Divider />

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* AWAKEN                                                        */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <section style={{ padding: "44px 0" }}>
            <FadeIn>
              <SectionIcon type="awaken" />
              <SectionLabel>Awaken</SectionLabel>
              <SectionTitle>{"Light, sky & wonder"}</SectionTitle>
              <SectionSub>{"The moments that shift something inside you. Sunrise, starlight, the land at its most alive."}</SectionSub>
            </FadeIn>
            <FadeIn delay={0.08}>
              <ExpandableList initialCount={4} label="experiences">
                <ListItem name="Stargazing from the Canyon Floor" featured
                  url="https://www.nps.gov/thingstodo/stargazing-in-zion.htm"
                  detail={"Zion is a certified International Dark Sky Park. On a moonless night, the Milky Way arcs directly overhead between the canyon walls. Bring a blanket, lie down, and give yourself an hour."}
                  tags={["Free", "Night", "Dark Sky Park"]} />
                <ListItem name="Sunrise at the Watchman" featured
                  url="https://www.nps.gov/zion/planyourvisit/zion-canyon-trail-descriptions.htm"
                  detail="Get to the trailhead before first light. Watch the canyon walls ignite one layer at a time. Worth every minute of lost sleep."
                  tags={["3.3 mi RT", "Moderate", "Early AM"]} />
                <ListItem name="Drive Historic Highway 12" featured
                  detail="One of America's most dramatic scenic byways. 124 miles from Bryce Canyon to Capitol Reef through red rock canyons, hogbacks with thousand-foot drops on both sides, and the high forests of Boulder Mountain. Don't rush it."
                  tags={["Scenic Drive", "Half Day", "Bryce to Capitol Reef"]} />
                <ListItem name="Drive the Mt. Carmel Tunnel" featured
                  detail="The 1.1-mile tunnel carved through sandstone in 1930. Emerge on the east side to a completely different landscape — checkerboard mesas, white slickrock, open sky."
                  tags={["Scenic Drive", "East Side", "Historic"]} />
                <ListItem name="NPS Ranger Stargazing Program"
                  url="https://www.nps.gov/zion/planyourvisit/sunset-stargazing.htm"
                  detail="Free ranger-led night sky programs. Telescopes provided, no reservation needed. Check the park calendar for dates."
                  tags={["Free", "Ranger-Led", "Seasonal"]} />
                <ListItem name={"Bryce Canyon Under Stars"}
                  url="https://www.nps.gov/thingstodo/stargazing-at-bryce-canyon.htm"
                  detail={"Some of the darkest skies in the country. The hoodoos by starlight are otherworldly. Ranger-led telescope programs available."}
                  tags={["Day Trip", "Dark Sky", "Telescope Programs"]} />
              </ExpandableList>
            </FadeIn>
          </section>


          <Divider />

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* CONNECT                                                       */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <section style={{ padding: "44px 0" }}>
            <FadeIn>
              <SectionIcon type="connect" />
              <SectionLabel>Connect</SectionLabel>
              <SectionTitle>{"Food, culture & community"}</SectionTitle>
              <SectionSub>{"The people and places that turn a visit into a memory. Where to eat, give back, honor the land, and linger."}</SectionSub>
            </FadeIn>
            <FadeIn delay={0.08}>
              <ExpandableList initialCount={4} label="places">
                <ListItem name={"Live Music at Zion Canyon Brew Pub"} featured
                  url="https://zionbrewery.com/"
                  detail={"Cold beer, outdoor patio right on the Virgin River, canyon walls glowing overhead, and live music drifting through it all. Southern Utah's first brewery, and still the best post-hike spot in town."}
                  note="Live music Tuesdays, Fridays, and weekends — 95 Zion Park Blvd"
                  tags={["Live Music", "Outdoor Patio", "Craft Beer", "Canyon Views"]} />
                <ListItem name={"King's Landing Bistro"} featured
                  url="https://www.kingslanding-zion.com/"
                  detail={"The canyon's most celebrated table. Seasonal, Southwest-rooted. Reserve ahead."}
                  tags={["Dinner", "Fine Dining", "Reservations", "$$–$$$"]} />
                <ListItem name={"Spotted Dog Café"}
                  url="https://flanigans.com/"
                  detail={"Inside Flanigan's lodge. Organic, local, elevated comfort food."}
                  tags={["Dinner", "Organic", "$$"]} />
                <ListItem name={"Oscar's Café"}
                  url="https://www.oscarscafe.com/"
                  detail="Big portions, excellent huevos rancheros. The local gathering spot."
                  tags={["Breakfast", "Lunch", "Casual", "$–$$"]} />
                <ListItem name="Deep Creek Coffee"
                  detail="The first stop every morning. Single-origin pour-overs and house-baked pastries."
                  tags={["Coffee", "Pastries", "$"]} />
                <ListItem name="Whiptail Grill"
                  url="https://www.whiptailgrillzion.com/"
                  detail="Mexican-inspired, great patio, solid margaritas, reasonable for Springdale."
                  tags={["Lunch", "Dinner", "Mexican", "$–$$"]} />
                <ListItem name="Tribal Arts Zion"
                  detail="Native American art and jewelry sourced directly from tribal artists."
                  tags={["Native Art", "Jewelry", "Gallery"]} />
                <ListItem name="David J. West Gallery"
                  url="https://www.davidjwest.com/"
                  detail={"Fine art photography of the Southwest in light that makes you question whether you've ever really seen these places."}
                  tags={["Photography", "Fine Art"]} />
                <ListItem name="Sol Foods Market"
                  detail="Small but mighty grocery. Good sandwiches for the trail, cold drinks, local provisions."
                  tags={["Grocery", "Deli", "Trail Provisions"]} />
                <ListItem name="Springdale Farmers Market"
                  detail="Saturday mornings in season. Local produce, artisan goods."
                  tags={["Seasonal", "Saturday AM", "Local"]} />

                {/* ── Cultural Heritage & Service ──────────────────────── */}
                <ListItem name="Paiute Cultural Heritage" featured
                  url="https://pitu.gov/culture/"
                  detail={"The Southern Paiute called this land Mukuntuweap long before it was Zion. The Paiute Indian Tribe of Utah preserves language, oral history, and traditions through cultural programs and the annual Restoration Powwow in Cedar City each June."}
                  note="Paiute Indian Tribe of Utah — pitu.gov"
                  tags={["Indigenous Heritage", "Cultural", "Cedar City"]} />
                <ListItem name="Pipe Spring National Monument" featured
                  url="https://www.nps.gov/pisp/"
                  detail={"Jointly managed by NPS and the Kaibab Band of Paiutes. A desert oasis that tells the layered story of water, sovereignty, and survival — Native, pioneer, and ranching history in one place. The Kaibab Paiutes operate the visitor center."}
                  tags={["NPS Monument", "Indigenous History", "Day Trip"]} />
                <ListItem name="Zion Forever Project" featured
                  url="https://www.zionpark.org/"
                  detail={"The park's official nonprofit partner. Conservation volunteer days, trail restoration, hanging garden protection, and dark sky preservation. A way to give back to the land that gives so much."}
                  note="Volunteer opportunities available — zionpark.org"
                  tags={["Conservation", "Volunteer", "Nonprofit"]} />
                <ListItem name="Conserve Southwest Utah" featured
                  url="https://www.conserveswu.org/stewardship"
                  detail={"Hands-on desert habitat restoration at Red Cliffs NCA near St. George. Planting native shrubs, protecting threatened Mojave desert tortoise habitat, invasive species removal. Over 5,000 native plants restored since 2020."}
                  note="Regular volunteer days — 45 min from Zion"
                  tags={["Habitat Restoration", "Volunteer", "Desert Tortoise"]} />
                <ListItem name="Parowan Gap Petroglyphs"
                  detail={"A free, open-air gallery of ancient rock art attributed to the Fremont people, near Cedar City. Hundreds of petroglyphs etched into the canyon walls — a contemplative stop that asks nothing but attention."}
                  tags={["Free", "Ancient Rock Art", "Self-Guided", "Cedar City"]} />
              </ExpandableList>
            </FadeIn>
          </section>


          <Divider />

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* THRESHOLD EXPERIENCES                                         */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <section style={{ padding: "44px 0" }}>
            <FadeIn>
              <SectionIcon type="threshold" />
              <SectionLabel>Threshold Experiences</SectionLabel>
              <SectionTitle>Join a curated journey</SectionTitle>
              <SectionSub>Guided group trips timed to natural crescendos. Small groups, expert guides, meaningful connection.</SectionSub>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div style={{ padding: 28, background: C.darkInk }}>
                <div style={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase",
                  color: C.sunSalmon, marginBottom: 10,
                }}>Coming Soon</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 300, color: "white", marginBottom: 4, lineHeight: 1.2,
                }}>Autumn Equinox in Zion</div>
                <div style={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
                  color: C.sunSalmon, marginBottom: 16,
                }}>{"September 20–24 · 5 days · Guided group"}</div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(15px, 2vw, 17px)", fontWeight: 300, fontStyle: "italic",
                  lineHeight: 1.7, color: "rgba(255,255,255,0.55)", margin: "0 0 24px",
                }}>
                  {"The cottonwoods begin their turn. Light shifts from summer's intensity to something golden and forgiving. A small group, guided through canyon trails at dawn, evening ceremonies as day and night find balance. The land at its most generous."}
                </p>
                <button style={{
                  padding: "11px 28px",
                  border: `1px solid rgba(255,255,255,0.4)`,
                  background: "transparent", color: "white",
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  cursor: "pointer", transition: "all 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = C.darkInk; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "white"; }}
                >Express Interest</button>
              </div>
            </FadeIn>
          </section>


          <Divider />

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* CTA                                                           */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <section id="cta" style={{ padding: "56px 0 72px", textAlign: "center" }}>
            <FadeIn>
              <span style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: 11, fontWeight: 700,
                letterSpacing: "0.28em", textTransform: "uppercase",
                color: C.skyBlue, display: "block", marginBottom: 16,
              }}>Begin</span>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 300,
                color: C.darkInk, margin: "0 0 10px", lineHeight: 1.2,
              }}>Build your own<br />Zion adventure</h3>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(15px, 2vw, 17px)", fontWeight: 300, fontStyle: "italic",
                color: "#5a7080", maxWidth: 420,
                margin: "0 auto 32px", lineHeight: 1.65,
              }}>
                Create an account to unlock custom itineraries, golden window timing, offline access, and insider notes.
              </p>
              <button style={{
                padding: "13px 36px", border: "none",
                background: C.darkInk, color: "#fff",
                fontFamily: "'Quicksand', sans-serif",
                fontSize: 10, fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase",
                cursor: "pointer", transition: "opacity 0.2s",
                marginBottom: 10,
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >{"Create My Account →"}</button>
              <div style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: 11, fontWeight: 400, color: "#9aabba", marginTop: 12,
                letterSpacing: "0.04em",
              }}>{"Free to start · No credit card required"}</div>
            </FadeIn>
          </section>

          {/* ── Also Explore ────────────────────────────────────────────── */}
          <Divider />
          <FadeIn>
            <div style={{ padding: "44px 0" }}>
              <span className="eyebrow" style={{ color: "#9aabba" }}>Also Explore</span>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 16 }}>
                {[
                  { name: "Joshua Tree", slug: "joshua-tree", accent: C.goldenAmber },
                  { name: "Olympic Peninsula", slug: "olympic-peninsula", accent: C.skyBlue },
                  { name: "Big Sur", slug: "big-sur", accent: C.seaGlass },
                ].map(other => (
                  <Link key={other.slug} to={`/destinations/${other.slug}`} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 20px", border: `1px solid ${C.stone}`,
                    transition: "all 0.25s", background: C.warmWhite, textDecoration: "none",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = other.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.stone; }}
                  >
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: other.accent, opacity: 0.6 }} />
                    <span style={{
                      fontFamily: "'Quicksand'", fontSize: 12, fontWeight: 600,
                      letterSpacing: "0.1em", textTransform: "uppercase", color: C.darkInk,
                    }}>{other.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      <Footer />
    </>
  );
}
