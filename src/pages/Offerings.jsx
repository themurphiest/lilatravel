// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: OFFERINGS
// ═══════════════════════════════════════════════════════════════════════════════

import { Link } from 'react-router-dom';
import { Nav, Footer, FadeIn, PageHero } from '@components';
import { C } from '@data/brand';
import { P } from '@data/photos';
import { journey } from '@data/journey';

export default function OfferingsPage() {
  return (
    <>
      <Nav />
      <PageHero
        eyebrow="Offerings"
        title="From Inspiration to Experience"
        subtitle="We handle the complexity so you can focus on being there."
        photo={P.bigSur}
        accentColor={C.seaGlass}
      />

      <section className="page-content" style={{ padding: "80px 52px", background: C.cream }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {journey.map((j, i) => (
            <FadeIn key={j.step} delay={i * 0.08}>
              <div style={{
                display: "grid", gridTemplateColumns: "80px 1fr", gap: 32,
                padding: "40px 0",
                borderBottom: i < journey.length - 1 ? `1px solid ${C.stone}` : "none",
              }}>
                <div style={{ textAlign: "center" }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 36, fontWeight: 300, color: j.color,
                  }}>{j.step}</span>
                </div>
                <div>
                  <span style={{
                    fontFamily: "'Quicksand'", fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    color: j.color, display: "block", marginBottom: 8,
                  }}>{j.label}</span>
                  <h3 style={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: 22, fontWeight: 500, color: C.darkInk, marginBottom: 12,
                  }}>{j.title}</h3>
                  <p style={{
                    fontFamily: "'Quicksand'", fontSize: 15, color: "#5a6a78", lineHeight: 1.9,
                  }}>{j.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={0.4}>
            <div style={{
              marginTop: 64, padding: "48px 40px",
              background: C.darkInk, textAlign: "center",
            }}>
              <span className="eyebrow" style={{ color: C.skyBlue }}>Ready?</span>
              <h3 style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 300, color: "white", marginBottom: 20,
              }}>Start with a destination.</h3>
              <Link to="/destinations" className="underline-link underline-link-light">Explore Destinations</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
