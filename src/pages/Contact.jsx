// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: CONTACT
// ═══════════════════════════════════════════════════════════════════════════════

import { Nav, Footer, FadeIn } from '@components';
import { C } from '@data/brand';
import { trackEvent } from '@utils/analytics';

export default function ContactPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="contact-hero" style={{
        background: C.darkInk,
        padding: "160px 52px 80px",
        textAlign: "center",
      }}>
        <FadeIn from="bottom" delay={0.1}>
          <span style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: C.goldenAmber, display: "block", marginBottom: 20,
          }}>Get in Touch</span>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 300,
            color: "white", lineHeight: 1.1,
            margin: "0 0 20px", letterSpacing: "-0.02em",
          }}>
            We'd love to hear from you.
          </h1>
          <p style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: "clamp(14px, 1.8vw, 16px)", fontWeight: 400,
            color: "rgba(255,255,255,0.55)", lineHeight: 1.7,
            maxWidth: 480, margin: "0 auto",
          }}>
            Whether you have a question about a destination, want help planning a trip, or just want to say hello — we're here.
          </p>
        </FadeIn>
      </section>

      {/* Contact */}
      <section className="contact-body" style={{
        padding: "80px 52px 100px",
        background: C.cream,
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <FadeIn delay={0.15}>
            {/* Email CTA */}
            <div style={{
              padding: "48px 36px",
              border: `1px solid ${C.stone}`,
              background: C.warmWhite,
              marginBottom: 40,
            }}>
              <div style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: 10, fontWeight: 700,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "#7A857E", marginBottom: 16,
              }}>Write to Us</div>
              <a
                href="mailto:hello@lilatrips.com"
                onClick={() => trackEvent('contact_email_clicked', {})}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 400,
                  color: C.darkInk, textDecoration: "none",
                  borderBottom: `1px solid ${C.stone}`,
                  paddingBottom: 4,
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.oceanTeal}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.stone}
              >
                hello@lilatrips.com
              </a>
              <p style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: 13, fontWeight: 400,
                color: "#7A857E", lineHeight: 1.6,
                marginTop: 16, marginBottom: 0,
              }}>
                We reply to every message personally, usually within a day.
              </p>
            </div>

            {/* What to reach out about */}
            <div className="contact-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 0,
              border: `1px solid ${C.stone}`,
            }}>
              {[
                { label: "Trip Planning", detail: "Custom itineraries, group trips, timing advice" },
                { label: "Partnerships", detail: "Lodges, guides, wellness practitioners" },
                { label: "General", detail: "Questions, feedback, or just to say hello" },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: "24px 16px",
                  borderRight: i < 2 ? `1px solid ${C.stone}` : "none",
                  textAlign: "center",
                }}>
                  <div style={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: C.oceanTeal, marginBottom: 8,
                  }}>{item.label}</div>
                  <div style={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: 12, fontWeight: 400,
                    color: "#7A857E", lineHeight: 1.5,
                  }}>{item.detail}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 600px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-grid > div { border-right: none !important; border-bottom: 1px solid ${C.stone}; }
          .contact-grid > div:last-child { border-bottom: none !important; }
        }
        @media (max-width: 768px) {
          .contact-hero { padding: 140px 20px 60px !important; }
          .contact-body { padding: 60px 20px 80px !important; }
        }
      `}</style>
    </>
  );
}
