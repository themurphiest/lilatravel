// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: RITUALS LANDING — "The Threads Between"
// ═══════════════════════════════════════════════════════════════════════════════

import { Link } from 'react-router-dom';
import { Nav, Footer, FadeIn, PageHero } from '@components';
import { C } from '@data/brand';
import { ritualsPillars, traditions, ritualsIntro } from '@data/rituals';

export default function RitualsPage() {
  return (
    <>
      <Nav />
      <PageHero
        eyebrow="Rituals"
        title={ritualsIntro.headline}
        subtitle={ritualsIntro.subtitle}
        gradient={`linear-gradient(165deg, ${C.darkInk}, #1a3040, #2a4555)`}
      />

      {/* ── Philosophical Introduction ──────────────────────────────────── */}
      <section style={{ padding: "80px 52px", background: C.cream }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeIn>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 300, fontStyle: "italic",
              color: "#4a6070", lineHeight: 1.9, marginBottom: 0,
            }}>
              {ritualsIntro.body}
            </p>
          </FadeIn>

          {/* Tradition markers */}
          <FadeIn delay={0.15}>
            <div style={{
              display: "flex", gap: 24, flexWrap: "wrap",
              marginTop: 48, paddingTop: 48,
              borderTop: `1px solid ${C.stone}`,
            }}>
              {traditions.map(t => (
                <div key={t.name} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  flex: "1 1 200px",
                }}>
                  <span style={{
                    fontSize: 28, color: t.color, opacity: 0.7,
                    lineHeight: 1,
                  }}>{t.symbol}</span>
                  <div>
                    <span style={{
                      fontFamily: "'Quicksand'", fontSize: 12, fontWeight: 700,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      color: C.darkInk, display: "block",
                    }}>{t.name}</span>
                    <span style={{
                      fontFamily: "'Quicksand'", fontSize: 11, fontWeight: 400,
                      color: "#9aabba",
                    }}>{t.origin} · {t.age}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── The Four Principles ─────────────────────────────────────────── */}
      <section className="page-content" style={{ padding: "40px 52px 80px", background: C.cream }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {ritualsPillars.map((pillar, i) => (
            <FadeIn key={pillar.slug} delay={i * 0.1}>
              <Link to={`/rituals/${pillar.slug}`} style={{ display: "block", textDecoration: "none" }}>
                <div style={{
                  display: "grid", gridTemplateColumns: "120px 1fr", gap: 40,
                  padding: "48px 0",
                  borderBottom: i < ritualsPillars.length - 1 ? `1px solid ${C.stone}` : "none",
                  cursor: "pointer", transition: "padding-left 0.3s",
                }}
                onMouseEnter={e => e.currentTarget.style.paddingLeft = "12px"}
                onMouseLeave={e => e.currentTarget.style.paddingLeft = "0"}
                >
                  {/* Icon column */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 36, color: pillar.color, opacity: 0.7 }}>{pillar.icon}</span>
                    <span style={{
                      fontFamily: "'Quicksand'", fontSize: 12, fontWeight: 700,
                      letterSpacing: "0.2em", textTransform: "uppercase", color: pillar.color,
                    }}>{pillar.word}</span>
                  </div>

                  {/* Content column */}
                  <div>
                    <p style={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: 16, fontWeight: 400, color: "#5a6a78", lineHeight: 2.0, marginBottom: 20,
                    }}>{pillar.desc}</p>

                    {/* Tradition concepts preview */}
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
                      {pillar.traditions.map((t, j) => (
                        <span key={j} style={{
                          fontFamily: "'Quicksand'", fontSize: 11, fontWeight: 500,
                          letterSpacing: "0.04em", color: "#7a8a9a",
                          padding: "6px 14px", border: `1px solid ${C.stone}`,
                          display: "flex", alignItems: "center", gap: 6,
                        }}>
                          <span style={{ fontSize: 13, opacity: 0.5 }}>
                            {traditions.find(tr => tr.name === t.name)?.symbol}
                          </span>
                          {t.concept}
                        </span>
                      ))}
                    </div>

                    {/* Metaphor line */}
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 15, fontWeight: 300, fontStyle: "italic",
                      color: "#9aabba", marginBottom: 20,
                    }}>
                      "{pillar.traditions[0].metaphor}"
                    </p>

                    <div>
                      <span style={{
                        fontFamily: "'Quicksand'", fontSize: 11, fontWeight: 700,
                        letterSpacing: "0.18em", textTransform: "uppercase", color: pillar.color,
                      }}>Explore This Principle →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Convergence Statement ──────────────────────────────────────── */}
      <section style={{
        padding: "80px 52px",
        background: `linear-gradient(165deg, ${C.darkInk}, #1a3040)`,
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <span className="eyebrow" style={{ color: "#6BA4B8", marginBottom: 24, display: "block" }}>
              The Convergence
            </span>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 300, fontStyle: "italic",
              color: "rgba(255,255,255,0.75)", lineHeight: 1.9, marginBottom: 40,
            }}>
              {ritualsIntro.convergence}
            </p>
            <p style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 15, fontWeight: 400,
              color: "rgba(255,255,255,0.55)", lineHeight: 1.9,
            }}>
              {ritualsIntro.closing}
            </p>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
