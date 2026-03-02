// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: DESTINATIONS LANDING
// ═══════════════════════════════════════════════════════════════════════════════

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Footer, FadeIn, PageHeader } from '@components';
import { C } from '@data/brand';
import { destinations } from '@data/destinations';

// ─── Immersive Cell ──────────────────────────────────────────────────────
function DestCell({ dest, textAlign = "left" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/destinations/${dest.slug}`}
      style={{ display: "block", textDecoration: "none", height: "100%" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        height: "100%",
      }}>
        <div style={{
          position: "absolute",
          inset: -10,
          transition: "transform 5s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: hovered ? "scale(1.04)" : "scale(1)",
        }}>
          {dest.photo ? (
            <img src={dest.photo} alt={dest.name} style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
            }} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: dest.gradient }} />
          )}
        </div>

        <div style={{
          position: "absolute", inset: 0,
          background: textAlign === "right"
            ? "linear-gradient(to left, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.04) 60%)"
            : "linear-gradient(to right, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.04) 60%)",
          transition: "opacity 0.5s",
          opacity: hovered ? 1 : 0.68,
        }} />

        <div style={{
          position: "absolute", bottom: 0,
          ...(textAlign === "right" ? { right: 0 } : { left: 0 }),
          padding: "28px 30px",
          maxWidth: 420,
          textAlign,
        }}>
          {/* Guide status badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 12px", marginBottom: 12,
            background: dest.guideAvailable ? "rgba(30,46,58,0.7)" : "rgba(0,0,0,0.4)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${dest.guideAvailable ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)"}`,
          }}>
            <div style={{
              width: 5, height: 5, borderRadius: "50%",
              background: dest.guideAvailable
                ? (C.seaGlass || "#c8d8c0")
                : "rgba(255,255,255,0.4)",
            }} />
            <span style={{
              fontFamily: "'Quicksand'", fontSize: 9, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: dest.guideAvailable
                ? (C.seaGlass || "#c8d8c0")
                : "rgba(255,255,255,0.55)",
            }}>{dest.guideAvailable ? "Guide Available" : "Guide Coming Soon"}</span>
          </div>

          <span style={{
            fontFamily: "'Quicksand'", fontSize: 9, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.38)", display: "block", marginBottom: 5,
          }}>{dest.location}</span>

          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 400, color: "white", lineHeight: 1.1,
            marginBottom: 10,
          }}>{dest.name}</h3>

          {/* Golden Windows — label + both seasonal windows */}
          {dest.windows && dest.windows.length > 0 && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              flexDirection: textAlign === "right" ? "row-reverse" : "row",
              flexWrap: "wrap",
              padding: "6px 14px",
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <span style={{
                fontFamily: "'Quicksand'", fontSize: 9, fontWeight: 700,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)",
              }}>Golden Windows</span>
              <span style={{
                width: 1, height: 10,
                background: "rgba(255,255,255,0.3)",
                flexShrink: 0,
              }} />
              {dest.windows.map((w, wi) => (
                <span key={wi} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    fontFamily: "'Quicksand'", fontSize: 10, fontWeight: 600,
                    color: "white",
                    letterSpacing: "0.02em",
                  }}>{w.season} {w.months}</span>
                  {wi < dest.windows.length - 1 && (
                    <span style={{
                      fontFamily: "'Quicksand'", fontSize: 10,
                      color: "rgba(255,255,255,0.35)",
                    }}>·</span>
                  )}
                </span>
              ))}
            </div>
          )}

          {/* Description on hover */}
          <div style={{
            overflow: "hidden",
            maxHeight: hovered ? 80 : 0,
            opacity: hovered ? 1 : 0,
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}>
            <p style={{
              fontFamily: "'Quicksand'", fontSize: 13,
              color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginTop: 12,
            }}>{dest.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Grid: 2×2×2, contained, seamless between tiles ─────────────────────
//
//   ┌────────────┬────────────┐
//   │   Zion     │Joshua Tree │
//   ├────────────┼────────────┤  no gaps — tiles touch
//   │  Olympic   │  Big Sur   │
//   ├────────────┼────────────┤
//   │ Vancouver  │  Kauaʻi    │
//   └────────────┴────────────┘
//
//   Contained within maxWidth: 1100, aligned with rest of page content.

export default function DestinationsPage() {
  const d = destinations;
  const rows = [];
  for (let i = 0; i < d.length; i += 2) {
    if (d[i + 1]) rows.push([d[i], d[i + 1]]);
    else rows.push([d[i]]);
  }

  return (
    <>
      <Nav />
      <PageHeader
        eyebrow="Destinations"
        title="Sacred Terrain"
        subtitle="Each place chosen for its capacity to dissolve the ordinary — timed to its most luminous window."
        accentColor={C.seaGlass}
      />

      <section className="page-content" style={{ padding: "48px 52px 80px", background: C.cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridAutoRows: 300,
            gap: 0,
            overflow: "hidden",
          }}>
            {rows.map((row, ri) =>
              row.map((dest, ci) => (
                <FadeIn key={dest.slug} delay={(ri * 2 + ci) * 0.06}>
                  <div style={{ height: 300 }}>
                    <DestCell
                      dest={dest}
                      textAlign={ci === 0 ? "left" : "right"}
                    />
                  </div>
                </FadeIn>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
