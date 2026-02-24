// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: RITUALS LANDING
// ═══════════════════════════════════════════════════════════════════════════════

import { Link } from 'react-router-dom';
import { Nav, Footer, FadeIn, PageHero } from '@components';
import { C } from '@data/brand';
import { ritualsPillars } from '@data/rituals';

export default function RitualsPage() {
  return (
    <>
      <Nav />
      <PageHero
        eyebrow="Rituals"
        title="The Practice"
        subtitle="Four pillars woven into every journey — ancient wisdom meeting extraordinary terrain."
        gradient={`linear-gradient(165deg, ${C.darkInk}, #1a3040, #2a4555)`}
      />

      <section className="page-content" style={{ padding: "80px 52px", background: C.cream }}>
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
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 36, color: pillar.color, opacity: 0.7 }}>{pillar.icon}</span>
                    <span style={{
                      fontFamily: "'Quicksand'", fontSize: 12, fontWeight: 700,
                      letterSpacing: "0.2em", textTransform: "uppercase", color: pillar.color,
                    }}>{pillar.word}</span>
                  </div>
                  <div>
                    <p style={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: 16, fontWeight: 400, color: "#5a6a78", lineHeight: 2.0, marginBottom: 20,
                    }}>{pillar.desc}</p>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      {pillar.details.map((d, j) => (
                        <span key={j} style={{
                          fontFamily: "'Quicksand'", fontSize: 11, fontWeight: 500,
                          letterSpacing: "0.06em", color: "#9aabba",
                          padding: "5px 14px", border: `1px solid ${C.stone}`,
                        }}>{d}</span>
                      ))}
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <span style={{
                        fontFamily: "'Quicksand'", fontSize: 11, fontWeight: 700,
                        letterSpacing: "0.18em", textTransform: "uppercase", color: pillar.color,
                      }}>Learn More →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
