// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: ZION CANYON GUIDE (dedicated)
// ═══════════════════════════════════════════════════════════════════════════════
//
// This is the dedicated Zion guide page. It gets its own route at
// /destinations/zion-canyon which overrides the generic DestinationGuide.
//
// This is where you'll build out the full editorial guide content.
// The design can be completely unique — it doesn't need to match the
// homepage aesthetic. Think of it like a magazine feature article.
//
// WORKFLOW: To iterate on this page in a Claude chat, upload just:
//   1. This file (ZionGuide.jsx)
//   2. src/data/brand.js (for color constants)
//   3. src/components/index.js (for shared components)
// That's enough context to work on it without hitting size limits.
//

import { Link } from 'react-router-dom';
import { Nav, Footer, FadeIn, Breadcrumb } from '@components';
import { C } from '@data/brand';
import { P } from '@data/photos';

export default function ZionGuide() {
  return (
    <>
      <Nav />

      {/* Hero */}
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
              Zion Canyon
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

      {/* Guide Content */}
      <section style={{ padding: "80px 52px", background: C.cream }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Breadcrumb items={[
            { label: "Home", to: "/" },
            { label: "Destinations", to: "/destinations" },
            { label: "Zion Canyon" },
          ]} />

          <div style={{ marginTop: 48 }}>
            {/* Threshold timing badge */}
            <FadeIn>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 40,
                padding: "10px 20px",
                background: `${C.sunSalmon}15`,
                border: `1px solid ${C.sunSalmon}30`,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.sunSalmon }} />
                <span style={{
                  fontFamily: "'Quicksand'", fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase", color: C.sunSalmon,
                }}>
                  Best Window: Fall · Sep–Nov
                </span>
              </div>
            </FadeIn>

            {/* Introduction */}
            <FadeIn delay={0.1}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 300, fontStyle: "italic",
                color: "#4a6070", lineHeight: 1.8, marginBottom: 48,
                borderLeft: `3px solid ${C.sunSalmon}`,
                paddingLeft: 32,
              }}>
                <p>
                  There are places that hold something ancient, something that existed long before us
                  and will persist long after. Zion Canyon is one of them. The Paiute people called it
                  <em> Mukuntuweap</em> — "straight-up land." When you stand at the canyon floor and
                  look up at walls that took 150 million years to carve, you understand why.
                </p>
              </div>
            </FadeIn>

            {/* ── PLACEHOLDER: Your Zion guide content goes here ─────────── */}
            {/*
              This is where you'll build out the full editorial guide.
              Sections might include:

              - The Threshold Window (why fall is magic)
              - Day-by-day itinerary
              - Where to stay (curated accommodations)
              - Rituals & wellness (sunrise spots, meditation locations)
              - Practical details (permits, shuttles, packing)
              - Dining & connection
              - The departure ritual

              Each section can have its own visual treatment.
              Import your existing Zion guide content here.
            */}

            <FadeIn delay={0.2}>
              <div style={{
                padding: "48px 40px", background: C.warmWhite,
                border: `1px solid ${C.stone}`, textAlign: "center",
                marginBottom: 48,
              }}>
                <span style={{ fontSize: 32, display: "block", marginBottom: 16, color: C.sunSalmon, opacity: 0.5 }}>✦</span>
                <h3 style={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: 20, fontWeight: 500, color: C.darkInk, marginBottom: 12,
                }}>
                  Full Guide In Progress
                </h3>
                <p style={{
                  fontFamily: "'Quicksand'", fontSize: 15, color: "#7a90a0",
                  lineHeight: 1.8, maxWidth: 500, margin: "0 auto",
                }}>
                  The complete Zion Canyon guide — with curated itineraries, vetted accommodations,
                  wellness rituals, and insider knowledge — is being crafted. This page will become
                  the full editorial experience.
                </p>
              </div>
            </FadeIn>

            {/* Other destinations */}
            <FadeIn delay={0.3}>
              <div style={{ marginTop: 48 }}>
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
        </div>
      </section>

      <Footer />
    </>
  );
}
