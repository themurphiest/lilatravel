// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: GROUP TRIPS
// ═══════════════════════════════════════════════════════════════════════════════
//
// 3-column grid of trip cards using shared TripCard component.
// Route: /group-trips
//
// ═══════════════════════════════════════════════════════════════════════════════

import { Link } from 'react-router-dom';
import { Nav, Footer, FadeIn } from '@components';
import TripCard from '@components/TripCard';
import { C } from '@data/brand';
import { allTrips } from '@data/trips';

export default function GroupTrips() {
  return (
    <>
      <Nav />

      {/* Hero — left aligned */}
      <section style={{
        paddingTop: 120, paddingBottom: 48,
        background: C.warmWhite,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 52px" }}>
          <FadeIn>
            <span style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 10, fontWeight: 700,
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: C.goldenAmber, display: "block", marginBottom: 14,
            }}>
              Group Trips
            </span>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 300,
              color: C.darkInk, lineHeight: 1.15,
              margin: "0 0 14px",
            }}>
              Tuned to Earth Rhythms
            </h1>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 300, fontStyle: "italic",
              color: "#5a7080", maxWidth: 520, margin: 0, lineHeight: 1.7,
            }}>
              Small group experiences timed to equinoxes, solstices, and celestial events.
              Eight travelers maximum.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Trip Grid */}
      <section style={{
        padding: "48px 0 96px",
        background: C.cream,
      }}>
        <div className="trips-grid-container" style={{
          maxWidth: 1100, margin: "0 auto", padding: "0 52px",
        }}>
          <div className="trips-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 28,
          }}>
            {allTrips.map((trip, i) => (
              <FadeIn key={trip.slug} delay={i * 0.08}>
                <TripCard trip={trip} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{
        padding: "64px 52px",
        background: C.darkInk,
        textAlign: "center",
      }}>
        <FadeIn>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22, fontWeight: 300, fontStyle: "italic",
            color: "rgba(255,255,255,0.5)", marginBottom: 24,
          }}>
            Can't find the right dates?
          </p>
          <Link to="/contact" style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 10, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "white", padding: "12px 28px",
            border: "1px solid rgba(255,255,255,0.35)",
            textDecoration: "none", transition: "all 0.3s",
          }}
          onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.borderColor = "rgba(255,255,255,0.6)"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(255,255,255,0.35)"; }}
          >
            Get in Touch
          </Link>
        </FadeIn>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .trips-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .trips-grid-container { padding: 0 24px !important; }
        }
        @media (max-width: 600px) {
          .trips-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </>
  );
}
