// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: OUR APPROACH — "More Than a Trip"
// ═══════════════════════════════════════════════════════════════════════════════
//
// Structure:
//   1. Hero — "Our Approach"
//   2. Editorial intro — the three braids concept
//   3. Sacred Terrain — landscape as teacher
//   4. Ancient Practices — philosophy + modalities (Oneness, Flow, Presence, Reverence nest here)
//   5. Elemental Encounters — raw sensory elements
//   6. Convergence — the threads woven together
//
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Footer, FadeIn } from '@components';
import { C } from '@data/brand';
import { ritualsPillars, traditions, ritualsIntro } from '@data/rituals';

// ─── Section Data ───────────────────────────────────────────────────────────

const terrainDetails = [
  "Destinations chosen for transformative capacity, not popularity",
  "Trips timed to natural crescendos — solstices, seasonal peaks, migrations",
  "Canyon, desert, alpine, old-growth forest, wild coastline",
  "Places where the landscape does the work of dissolving the ordinary",
];

const elementalDetails = [
  { name: "Sunlight", desc: "Golden hour on red rock. First light breaking over a ridgeline. The warmth that finds you after a cold morning.", color: "#D4A853" },
  { name: "Cold Water", desc: "River plunges that shock you back into your body. The gasp, the aliveness, the reset.", color: "#6BA4B8" },
  { name: "Starry Skies", desc: "Darkness so complete the Milky Way pours overhead. Ten thousand stars reframing your place in everything.", color: "#7DB8A0" },
  { name: "Ancient Stone", desc: "Canyon walls holding millions of years of silence. Rock that remembers deep time. Geology as teacher.", color: "#E8956A" },
  { name: "Silence", desc: "Not the absence of sound — the presence of space. Deep enough to hear yourself think for the first time in months.", color: "#A89080" },
];


export default function ApproachPage() {
  const [activePhilosophy, setActivePhilosophy] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 860);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const activePillar = ritualsPillars[activePhilosophy];

  return (
    <>
      <Nav />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative", minHeight: "55vh", overflow: "hidden",
        display: "flex", alignItems: "flex-end", background: C.darkInk,
      }}>
        <img
          src="/images/rituals-hero.jpg"
          alt=""
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 70%",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(15,30,42,0.3) 0%, rgba(15,30,42,0.65) 70%, rgba(15,30,42,0.85) 100%)",
        }} />
        <div style={{
          position: "relative", zIndex: 2,
          padding: "64px 52px", maxWidth: 900, width: "100%",
        }}>
          <FadeIn from="bottom" delay={0.1}>
            <span className="eyebrow" style={{ color: "#6BA4B8" }}>Our Approach</span>
            <h1 style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 300,
              color: "white", lineHeight: 1.2, marginBottom: 12,
            }}>
              More Than a Trip
            </h1>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 300, fontStyle: "italic",
              color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: 560,
            }}>
              Three braids woven into every Lila journey — sacred places, ancient wisdom, and raw elemental experience.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══ EDITORIAL INTRO ═══════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 52px", background: C.cream }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeIn>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 300, fontStyle: "italic",
              color: "#4a6070", lineHeight: 1.9, marginBottom: 0,
            }}>
              Most travel is designed around logistics — where to sleep, what to see, how to get there.
              We start somewhere different. We ask: what combination of place, practice, and raw experience
              has the power to change the way you see the world? Then we weave three threads together
              until something new emerges.
            </p>
          </FadeIn>

          {/* Three braid markers */}
          <FadeIn delay={0.15}>
            <div style={{
              display: "flex", gap: isMobile ? 24 : 48,
              flexDirection: isMobile ? "column" : "row",
              marginTop: 48, paddingTop: 48,
              borderTop: `1px solid ${C.stone}`,
            }}>
              {[
                { icon: "△", label: "Sacred Terrain", color: "#7DB8A0", sub: "The landscape is the teacher" },
                { icon: "◎", label: "Ancient Practices", color: "#D4A853", sub: "Wisdom traditions woven in" },
                { icon: "✦", label: "Elemental Encounters", color: "#6BA4B8", sub: "The raw materials of being alive" },
              ].map((b, i) => (
                <a
                  key={b.label}
                  href={`#${b.label.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 14,
                    flex: 1, textDecoration: "none",
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  <span style={{ fontSize: 22, color: b.color, opacity: 0.7, lineHeight: 1, marginTop: 2 }}>{b.icon}</span>
                  <div>
                    <span style={{
                      fontFamily: "'Quicksand'", fontSize: 12, fontWeight: 700,
                      letterSpacing: "0.14em", textTransform: "uppercase",
                      color: C.darkInk, display: "block", marginBottom: 4,
                    }}>{b.label}</span>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 15, fontStyle: "italic", color: "#7a8a9a",
                    }}>{b.sub}</span>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>


      {/* ══ BRAID 1: SACRED TERRAIN ══════════════════════════════════════════ */}
      <section id="sacred-terrain" style={{
        padding: "80px 52px",
        background: `linear-gradient(165deg, ${C.darkInk}, #1a3040)`,
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 40 : 72,
              alignItems: "start",
            }}>
              {/* Left: narrative */}
              <div>
                <span style={{
                  fontSize: 28, color: "#7DB8A0", opacity: 0.6,
                  display: "block", marginBottom: 20,
                }}>△</span>
                <span className="eyebrow" style={{ color: "#7DB8A0" }}>Sacred Terrain</span>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300,
                  color: "white", lineHeight: 1.25, marginBottom: 24,
                }}>
                  The landscape is<br />the teacher.
                </h2>
                <p style={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: "clamp(13px, 1.5vw, 15px)", fontWeight: 400,
                  color: "rgba(255,255,255,0.6)", lineHeight: 2.0,
                  letterSpacing: "0.02em",
                }}>
                  We don't choose destinations for their Instagram potential or their proximity
                  to airports. We choose them for their capacity to dissolve the ordinary —
                  places where canyon walls hold millions of years of silence, where ancient
                  forests hum with something older than language, where the horizon line
                  rearranges something inside you. These aren't backdrops. They're the main event.
                </p>
              </div>

              {/* Right: detail points */}
              <div style={{ paddingTop: isMobile ? 0 : 48 }}>
                {terrainDetails.map((d, j) => (
                  <div key={j} style={{
                    display: "flex", alignItems: "flex-start", gap: 16,
                    padding: "18px 0",
                    borderBottom: j < terrainDetails.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: "#7DB8A0", opacity: 0.5,
                      flexShrink: 0, marginTop: 8,
                    }} />
                    <span style={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: 14, fontWeight: 400,
                      color: "rgba(255,255,255,0.45)",
                      letterSpacing: "0.02em", lineHeight: 1.8,
                    }}>{d}</span>
                  </div>
                ))}

                <div style={{ marginTop: 32 }}>
                  <Link to="/destinations" style={{
                    fontFamily: "'Quicksand'", fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "#7DB8A0", textDecoration: "none",
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    Explore Destinations →
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>


      {/* ══ BRAID 2: ANCIENT PRACTICES ═══════════════════════════════════════ */}
      <section id="ancient-practices" style={{ padding: "80px 52px", background: C.cream }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn>
            <span style={{
              fontSize: 28, color: "#D4A853", opacity: 0.6,
              display: "block", marginBottom: 20,
            }}>◎</span>
            <span className="eyebrow" style={{ color: "#D4A853" }}>Ancient Practices</span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300,
              color: C.darkInk, lineHeight: 1.25, marginBottom: 20,
            }}>
              Wisdom traditions woven<br />into every journey.
            </h2>
            <p style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "clamp(13px, 1.5vw, 15px)", fontWeight: 400,
              color: "#5a6a78", lineHeight: 2.0, maxWidth: 640,
              letterSpacing: "0.02em", marginBottom: 0,
            }}>
              {ritualsIntro.body}
            </p>
          </FadeIn>

          {/* Tradition markers */}
          <FadeIn delay={0.1}>
            <div style={{
              display: "flex", gap: isMobile ? 16 : 32,
              flexWrap: "wrap",
              marginTop: 40, paddingTop: 40,
              borderTop: `1px solid ${C.stone}`,
            }}>
              {traditions.map((t) => (
                <div key={t.name} style={{
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <span style={{
                    fontSize: 24, color: t.color, opacity: 0.7,
                    lineHeight: 1, fontFamily: "serif",
                  }}>{t.symbol}</span>
                  <div>
                    <span style={{
                      fontFamily: "'Quicksand'", fontSize: 11, fontWeight: 700,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: C.darkInk, display: "block",
                    }}>{t.name}</span>
                    <span style={{
                      fontFamily: "'Quicksand'", fontSize: 10, fontWeight: 400,
                      color: "#9aabba",
                    }}>{t.origin} · {t.age}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* ── The Four Principles (nested under Ancient Practices) ────────── */}
          <FadeIn delay={0.15}>
            <div style={{ marginTop: 56 }}>
              <span style={{
                fontFamily: "'Quicksand'", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "#9aabba", display: "block", marginBottom: 24,
              }}>Four Guiding Principles</span>

              {/* Philosophy tabs */}
              <div style={{
                display: "flex", gap: isMobile ? 0 : 4,
                borderBottom: `1px solid ${C.stone}`,
                flexDirection: isMobile ? "column" : "row",
                marginBottom: 0,
              }}>
                {ritualsPillars.map((p, i) => {
                  const isActive = activePhilosophy === i;
                  return (
                    <button
                      key={p.slug}
                      onClick={() => setActivePhilosophy(i)}
                      style={{
                        flex: isMobile ? "none" : 1,
                        padding: isMobile ? "16px 4px" : "16px 20px",
                        background: "transparent", border: "none",
                        borderBottom: isMobile ? "none" : `2px solid ${isActive ? p.color : "transparent"}`,
                        borderLeft: isMobile ? `2px solid ${isActive ? p.color : "transparent"}` : "none",
                        cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 10,
                        transition: "all 0.3s ease",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      <span style={{
                        fontSize: 18, color: p.color,
                        opacity: isActive ? 1 : 0.4, transition: "opacity 0.3s",
                      }}>{p.icon}</span>
                      <span style={{
                        fontFamily: "'Quicksand', sans-serif",
                        fontSize: isMobile ? 13 : 12, fontWeight: 700,
                        letterSpacing: "0.14em", textTransform: "uppercase",
                        color: isActive ? p.color : "#9aabba",
                        transition: "color 0.3s",
                      }}>{p.word}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active principle content */}
              <div
                key={activePillar.slug}
                style={{
                  padding: isMobile ? "36px 0" : "48px 0",
                  animation: "fadeUp 0.4s ease",
                }}
              >
                <style>{`
                  @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                  }
                `}</style>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: isMobile ? 32 : 56,
                  alignItems: "start",
                }}>
                  {/* Left: quote + description */}
                  <div>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 300, fontStyle: "italic",
                      color: activePillar.color, lineHeight: 1.6, marginBottom: 8,
                    }}>
                      "{activePillar.quote}"
                    </p>
                    <span style={{
                      fontFamily: "'Quicksand'", fontSize: 10, fontWeight: 600,
                      letterSpacing: "0.08em", color: "#9aabba",
                      display: "block", marginBottom: 28,
                    }}>— {activePillar.quoteAuthor}</span>

                    <p style={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "clamp(13px, 1.4vw, 15px)", fontWeight: 400,
                      color: "#5a6a78", lineHeight: 2.0, letterSpacing: "0.02em",
                    }}>
                      {activePillar.desc}
                    </p>
                  </div>

                  {/* Right: tradition concepts + application */}
                  <div>
                    {/* Tradition concepts */}
                    <div style={{
                      display: "flex", flexDirection: "column", gap: 12,
                      marginBottom: 28,
                    }}>
                      {activePillar.traditions.map((t, j) => (
                        <div key={j} style={{
                          display: "flex", alignItems: "flex-start", gap: 12,
                          padding: "12px 16px",
                          background: "rgba(0,0,0,0.02)",
                          border: `1px solid ${C.stone}`,
                        }}>
                          <span style={{
                            fontSize: 14, opacity: 0.5, flexShrink: 0, marginTop: 1,
                          }}>
                            {traditions.find(tr => tr.name === t.name)?.symbol}
                          </span>
                          <div>
                            <span style={{
                              fontFamily: "'Quicksand'", fontSize: 11, fontWeight: 700,
                              letterSpacing: "0.08em", textTransform: "uppercase",
                              color: C.darkInk, display: "block", marginBottom: 2,
                            }}>{t.concept}</span>
                            <span style={{
                              fontFamily: "'Quicksand'", fontSize: 11, fontWeight: 400,
                              color: "#7a8a9a",
                            }}>{t.name} · <em>{t.metaphor}</em></span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Application */}
                    <div style={{
                      padding: "20px 0",
                      borderTop: `1px solid ${C.stone}`,
                    }}>
                      <span style={{
                        fontFamily: "'Quicksand'", fontSize: 10, fontWeight: 700,
                        letterSpacing: "0.18em", textTransform: "uppercase",
                        color: activePillar.color, display: "block", marginBottom: 10,
                      }}>How We Apply This</span>
                      <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 15, fontStyle: "italic",
                        color: "#5a6a78", lineHeight: 1.8,
                      }}>
                        {activePillar.application}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Deep dive link */}
                <div style={{ marginTop: 24 }}>
                  <Link to={`/approach/${activePillar.slug}`} style={{
                    fontFamily: "'Quicksand'", fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: activePillar.color, textDecoration: "none",
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    Explore {activePillar.word} →
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>


      {/* ══ BRAID 3: ELEMENTAL ENCOUNTERS ════════════════════════════════════ */}
      <section id="elemental-encounters" style={{
        padding: "80px 52px",
        background: `linear-gradient(165deg, ${C.darkInk}, #1a3040)`,
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn>
            <span style={{
              fontSize: 28, color: "#6BA4B8", opacity: 0.6,
              display: "block", marginBottom: 20,
            }}>✦</span>
            <span className="eyebrow" style={{ color: "#6BA4B8" }}>Elemental Encounters</span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300,
              color: "white", lineHeight: 1.25, marginBottom: 20,
            }}>
              The raw materials<br />of being alive.
            </h2>
            <p style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "clamp(13px, 1.5vw, 15px)", fontWeight: 400,
              color: "rgba(255,255,255,0.6)", lineHeight: 2.0, maxWidth: 600,
              letterSpacing: "0.02em", marginBottom: 48,
            }}>
              Before there were words for it, there was this — sunlight, cold water, stone, sky.
              These elemental forces are the oldest teachers on earth. We design journeys that
              put you directly in conversation with them.
            </p>
          </FadeIn>

          {/* Elemental grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 1,
            background: "rgba(255,255,255,0.06)",
          }}>
            {elementalDetails.map((el, i) => (
              <FadeIn key={el.name} delay={i * 0.08}>
                <div style={{
                  padding: isMobile ? "28px 24px" : "36px 40px",
                  background: C.darkInk,
                  transition: "background 0.3s ease",
                  ...(i === elementalDetails.length - 1 && !isMobile ? { gridColumn: "1 / -1" } : {}),
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#162838"}
                onMouseLeave={e => e.currentTarget.style.background = C.darkInk}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: el.color, opacity: 0.6,
                      flexShrink: 0, marginTop: 6,
                    }} />
                    <div>
                      <h3 style={{
                        fontFamily: "'Quicksand', sans-serif",
                        fontSize: 13, fontWeight: 700,
                        letterSpacing: "0.16em", textTransform: "uppercase",
                        color: el.color, marginBottom: 10,
                      }}>{el.name}</h3>
                      <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 16, fontWeight: 300, fontStyle: "italic",
                        color: "rgba(255,255,255,0.55)", lineHeight: 1.8,
                      }}>{el.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      {/* ══ CONVERGENCE ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 52px", background: C.cream }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            {/* Visual convergence — three colored lines */}
            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center",
              gap: 16, marginBottom: 28,
            }}>
              <div style={{ width: 48, height: 1, background: "#7DB8A0" }} />
              <div style={{ width: 48, height: 1, background: "#D4A853" }} />
              <div style={{ width: 48, height: 1, background: "#6BA4B8" }} />
            </div>

            <span className="eyebrow" style={{ color: C.oceanTeal, marginBottom: 24, display: "block" }}>
              The Convergence
            </span>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 300, fontStyle: "italic",
              color: "#4a6070", lineHeight: 1.9, marginBottom: 40,
            }}>
              {ritualsIntro.convergence}
            </p>
            <p style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 15, fontWeight: 400,
              color: "#7a8a9a", lineHeight: 1.9, marginBottom: 40,
            }}>
              {ritualsIntro.closing}
            </p>
            <Link to="/how-it-works" className="underline-link">See How It Works</Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
