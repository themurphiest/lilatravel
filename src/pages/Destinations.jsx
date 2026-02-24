// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: DESTINATIONS LANDING
// ═══════════════════════════════════════════════════════════════════════════════

import { Link } from 'react-router-dom';
import { Nav, Footer, FadeIn, PageHero } from '@components';
import { C } from '@data/brand';
import { P } from '@data/photos';
import { destinations } from '@data/destinations';

export default function DestinationsPage() {
  return (
    <>
      <Nav />
      <PageHero
        eyebrow="Destinations"
        title="Sacred Terrain"
        subtitle="Each place chosen for its capacity to dissolve the ordinary — timed to its most luminous window."
        photo={P.zion}
      />

      <section className="page-content" style={{ padding: "80px 52px", background: C.cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="dest-landing-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32,
          }}>
            {destinations.map((dest, i) => (
              <FadeIn key={dest.slug} delay={i * 0.08}>
                <Link to={`/destinations/${dest.slug}`} style={{ display: "block", textDecoration: "none" }}>
                  <div style={{
                    overflow: "hidden", cursor: "pointer", transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
                      {dest.photo ? (
                        <img src={dest.photo} alt={dest.name} style={{
                          width: "100%", height: "100%", objectFit: "cover", display: "block",
                          transition: "transform 0.6s ease",
                        }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: dest.gradient }} />
                      )}
                      <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        padding: "32px 20px 16px",
                        background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                      }}>
                        <span style={{
                          fontFamily: "'Quicksand'", fontSize: 9, fontWeight: 700,
                          letterSpacing: "0.2em", textTransform: "uppercase",
                          color: dest.accent, display: "block",
                        }}>{dest.threshold}</span>
                      </div>
                      {dest.guideAvailable && (
                        <div style={{
                          position: "absolute", top: 12, right: 12,
                          padding: "4px 10px", background: "rgba(0,0,0,0.5)",
                          backdropFilter: "blur(8px)",
                        }}>
                          <span style={{
                            fontFamily: "'Quicksand'", fontSize: 8, fontWeight: 700,
                            letterSpacing: "0.2em", textTransform: "uppercase", color: C.seaGlass,
                          }}>Guide Available</span>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "24px 20px", background: C.warmWhite, border: `1px solid ${C.stone}`, borderTop: "none" }}>
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 28, fontWeight: 400, color: C.darkInk, lineHeight: 1.1, marginBottom: 4,
                      }}>{dest.name}</h3>
                      <p style={{
                        fontFamily: "'Quicksand'", fontSize: 10, fontWeight: 600,
                        letterSpacing: "0.16em", textTransform: "uppercase",
                        color: "#9aabba", marginBottom: 14,
                      }}>{dest.location}</p>
                      <p style={{
                        fontFamily: "'Quicksand'", fontSize: 13, fontWeight: 400,
                        color: "#6a7a88", lineHeight: 1.8,
                      }}>{dest.description}</p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
