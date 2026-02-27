// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: OFFERINGS
// ═══════════════════════════════════════════════════════════════════════════════

import { Link } from 'react-router-dom';
import { Nav, Footer, FadeIn, PageHero } from '@components';
import { C } from '@data/brand';
import { P } from '@data/photos';

// ─── Upcoming Threshold Trips ────────────────────────────────────────────────
const upcomingTrips = [
  {
    slug: "zion-autumn-equinox-2026",
    destination: "Zion Canyon",
    location: "Utah",
    threshold: "Autumn Equinox",
    window: "September 20–26, 2026",
    tagline: "The canyon exhales. Light softens, cottonwoods ignite, and the crowds dissolve.",
    gradient: "linear-gradient(165deg, #c4593c, #8b3a2a, #d4855a)",
    accent: C.sunSalmon,
    spots: 8,
  },
  {
    slug: "big-sur-harvest-moon-2026",
    destination: "Big Sur",
    location: "California",
    threshold: "Harvest Moon",
    window: "October 5–11, 2026",
    tagline: "The fog lifts, the kelp forests glow, and the Pacific turns to gold under a full moon.",
    gradient: "linear-gradient(165deg, #4A9B9F, #2d6b6e, #7BB8D4)",
    accent: C.oceanTeal,
    spots: 8,
  },
  {
    slug: "joshua-tree-spring-equinox-2027",
    destination: "Joshua Tree",
    location: "California",
    threshold: "Spring Equinox",
    window: "March 18–23, 2027",
    tagline: "Equal light, equal dark. The desert blooms at the exact moment the world rebalances.",
    gradient: "linear-gradient(165deg, #c17f43, #8b4513, #d4855a)",
    accent: C.goldenAmber,
    spots: 8,
  },
];

// ─── Four Ways / Offerings Data ──────────────────────────────────────────────
const offerings = [
  {
    icon: "☐",
    label: "DIY",
    color: C.skyBlue,
    title: "Explore the Guide",
    desc: "Browse our curated picks for free — where to stay, what to hike, where to eat, and when the light is best.",
    cta: "Explore Guides Free",
    ctaLink: "/destinations",
    detail: "Free · No account needed",
  },
  {
    icon: "◎",
    label: "Plan a Trip",
    color: C.oceanTeal,
    title: "Trip Planner",
    desc: "Turn your favorites into a day-by-day itinerary with booking links, permit timing, and offline access.",
    cta: "Unlock — $39",
    ctaLink: "/plan",
    detail: "One-time purchase · Offline access",
  },
  {
    icon: "☾",
    label: "Join a Group",
    color: C.sunSalmon,
    title: "Threshold Trips",
    desc: "Small group journeys timed to equinoxes, solstices, and natural crescendos. Guided, curated, eight travelers maximum.",
    cta: "View Trips",
    ctaLink: "#upcoming",
    detail: "From $895 per person",
  },
  {
    icon: "△",
    label: "Designed for You",
    color: C.goldenAmber,
    title: "Custom Itinerary",
    desc: "Tell us your dates, group, and vibe. A real person builds a complete itinerary around your trip.",
    cta: "Start — From $199",
    ctaLink: "/contact",
    detail: "Personalized · Human-crafted",
  },
];

export default function OfferingsPage() {
  return (
    <>
      <Nav />
      <PageHero
        eyebrow="Offerings"
        title="From Inspiration to Experience"
        subtitle="We handle the complexity so you can focus on being there."
        photo={P.ancientCedar}
        accentColor={C.seaGlass}
      />

      {/* ── FOUR WAYS ── */}
      <section style={{ padding: "80px 52px", background: C.cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{
                fontFamily: "'Quicksand'", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: C.oceanTeal, display: "block", marginBottom: 12,
              }}>How Lila Helps</span>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300,
                color: C.darkInk, marginBottom: 16,
              }}>Four ways to experience a destination</h2>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 18, fontStyle: "italic", color: "#5a6a78",
                maxWidth: 560, margin: "0 auto",
              }}>
                Start by exploring our free guide below — or jump straight to the path that fits.
              </p>
            </div>
          </FadeIn>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 1,
            background: C.stone,
            border: `1px solid ${C.stone}`,
          }}>
            {offerings.map((o, i) => (
              <FadeIn key={o.label} delay={i * 0.08}>
                <div style={{
                  background: "white",
                  padding: "36px 28px 32px",
                  display: "flex", flexDirection: "column",
                  minHeight: 420,
                }}>
                  {/* Icon — colored to match section */}
                  <div style={{
                    fontFamily: "serif", fontSize: 28, color: o.color,
                    marginBottom: 24, lineHeight: 1,
                  }}>{o.icon}</div>

                  {/* Label */}
                  <span style={{
                    fontFamily: "'Quicksand'", fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    color: o.color, display: "block", marginBottom: 12,
                  }}>{o.label}</span>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 26, fontWeight: 400, color: C.darkInk,
                    lineHeight: 1.2, marginBottom: 16,
                  }}>{o.title}</h3>

                  {/* Description */}
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 15, fontStyle: "italic",
                    color: "#5a6a78", lineHeight: 1.8,
                    flex: 1,
                  }}>{o.desc}</p>

                  {/* CTA Button */}
                  <div style={{ marginTop: 24 }}>
                    <Link
                      to={o.ctaLink}
                      style={{
                        display: "inline-block",
                        padding: "12px 24px",
                        border: `1.5px solid ${o.color}`,
                        fontFamily: "'Quicksand'", fontSize: 10, fontWeight: 700,
                        letterSpacing: "0.18em", textTransform: "uppercase",
                        color: o.color, textDecoration: "none",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={e => {
                        e.target.style.background = o.color;
                        e.target.style.color = "white";
                      }}
                      onMouseLeave={e => {
                        e.target.style.background = "transparent";
                        e.target.style.color = o.color;
                      }}
                    >{o.cta}</Link>
                  </div>

                  {/* Detail line */}
                  <p style={{
                    fontFamily: "'Quicksand'", fontSize: 11,
                    color: "#8a96a3", marginTop: 12,
                  }}>{o.detail}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING THRESHOLD TRIPS ── */}
      <section id="upcoming" style={{ padding: "80px 52px", background: C.cream }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{
                fontFamily: "'Quicksand'", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: C.sunSalmon, display: "block", marginBottom: 12,
              }}>Upcoming Experiences</span>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300,
                color: C.darkInk, marginBottom: 16,
              }}>Threshold Trips</h2>
              <p style={{
                fontFamily: "'Quicksand'", fontSize: 15, color: "#5a6a78",
                lineHeight: 1.8, maxWidth: 580, margin: "0 auto",
              }}>
                Journeys timed to equinoxes, solstices, and seasonal turning points —
                when a place crosses into its most powerful window.
              </p>
            </div>
          </FadeIn>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 28,
          }}>
            {upcomingTrips.map((trip, i) => (
              <FadeIn key={trip.slug} delay={i * 0.1}>
                <Link
                  to={`/trips/${trip.slug}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div style={{
                    background: "white",
                    overflow: "hidden",
                    transition: "transform 0.4s ease, box-shadow 0.4s ease",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  >
                    {/* Photo placeholder with gradient */}
                    <div style={{
                      height: 200,
                      background: trip.gradient,
                      display: "flex",
                      alignItems: "flex-end",
                      padding: 20,
                      position: "relative",
                    }}>
                      {/* Coming Soon badge */}
                      <div style={{
                        position: "absolute", top: 16, right: 16,
                        background: "rgba(255,255,255,0.92)",
                        backdropFilter: "blur(8px)",
                        padding: "6px 14px",
                        fontSize: 9, fontFamily: "'Quicksand'", fontWeight: 700,
                        letterSpacing: "0.18em", textTransform: "uppercase",
                        color: C.darkInk,
                      }}>
                        Coming Soon
                      </div>
                      <div>
                        <p style={{
                          fontFamily: "'Quicksand'", fontSize: 11, fontWeight: 600,
                          letterSpacing: "0.15em", textTransform: "uppercase",
                          color: "rgba(255,255,255,0.7)", marginBottom: 4,
                        }}>{trip.location}</p>
                        <h3 style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 28, fontWeight: 300, color: "white",
                          lineHeight: 1.2,
                        }}>{trip.destination}</h3>
                      </div>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: "24px 24px 28px" }}>
                      {/* Threshold label */}
                      <span style={{
                        fontFamily: "'Quicksand'", fontSize: 9, fontWeight: 700,
                        letterSpacing: "0.2em", textTransform: "uppercase",
                        color: trip.accent,
                        display: "inline-block",
                        padding: "4px 10px",
                        border: `1px solid ${trip.accent}`,
                        marginBottom: 12,
                      }}>{trip.threshold}</span>

                      <p style={{
                        fontFamily: "'Quicksand'", fontSize: 12, fontWeight: 600,
                        color: "#5a6a78", letterSpacing: "0.04em",
                        marginBottom: 10,
                      }}>{trip.window}</p>
                      <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 16, fontStyle: "italic",
                        color: "#5a6a78", lineHeight: 1.7,
                        marginBottom: 16,
                      }}>{trip.tagline}</p>
                      <div style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                        <span style={{
                          fontFamily: "'Quicksand'", fontSize: 11,
                          color: "#8a96a3", letterSpacing: "0.04em",
                        }}>{trip.spots} spots</span>
                        <span style={{
                          fontFamily: "'Quicksand'", fontSize: 10, fontWeight: 700,
                          letterSpacing: "0.18em", textTransform: "uppercase",
                          color: trip.accent,
                        }}>Learn More →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding: "0 52px 80px", background: C.cream }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn delay={0.2}>
            <div style={{
              padding: "48px 40px",
              background: C.darkInk, textAlign: "center",
            }}>
              <span className="eyebrow" style={{ color: C.skyBlue }}>Not sure where to start?</span>
              <h3 style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 300, color: "white", marginBottom: 20,
              }}>Pick a destination. The guide is free.</h3>
              <Link to="/destinations" className="underline-link underline-link-light">Explore Destinations</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
