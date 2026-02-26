// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: HOMEPAGE
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Footer, FadeIn } from '@components';
import { C } from '@data/brand';
import { P } from '@data/photos';
import { destinations } from '@data/destinations';
import { ritualsPillars } from '@data/rituals';
import { journey, heroCallouts, magicMoments } from '@data/journey';
import { useDayCycle, interpolatePhase, useHorizontalSwipe } from '@utils/hooks';


// ─── Destination Carousel ───────────────────────────────────────────────────
function DestCarousel() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);

  const go = (idx) => {
    if (fading || idx === active) return;
    setFading(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { setActive(idx); setFading(false); }, 350);
  };

  const prev = () => go((active - 1 + destinations.length) % destinations.length);
  const next = () => go((active + 1) % destinations.length);
  const swipeRef = useHorizontalSwipe(next, prev);
  const d = destinations[active];

  return (
    <div ref={swipeRef}>
      <div className="carousel-grid" style={{
        display: "grid", gridTemplateColumns: "55% 45%",
        minHeight: 560, overflow: "hidden",
        opacity: fading ? 0 : 1, transition: "opacity 0.35s ease",
      }}>
        {/* Photo */}
        <Link to={`/destinations/${d.slug}`} style={{ position: "relative", overflow: "hidden", minHeight: 320, display: "block" }}>
          {d.photo ? (
            <img src={d.photo} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", minHeight: 200, background: d.gradient }} />
          )}
          <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 8, zIndex: 2 }}>
            {destinations.map((_, i) => (
              <button key={i} onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(i); }} style={{
                width: i === active ? 24 : 8, height: 8, borderRadius: 4,
                background: i === active ? "white" : "rgba(255,255,255,0.4)",
                border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0,
              }} />
            ))}
          </div>
        </Link>

        {/* Info panel */}
        <div className="dest-card-content" style={{
          background: C.warmWhite, padding: "64px 56px",
          display: "flex", flexDirection: "column", justifyContent: "center",
          borderTop: `1px solid ${C.stone}`, borderRight: `1px solid ${C.stone}`, borderBottom: `1px solid ${C.stone}`,
        }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <div style={{ width: 20, height: 1, background: d.accent }} />
            <span style={{ fontFamily: "'Quicksand'", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: d.accent }}>
              {d.threshold}
            </span>
          </div>

          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(32px, 4vw, 54px)", fontWeight: 300,
            color: C.darkInk, lineHeight: 1.0, marginBottom: 8, letterSpacing: "-0.01em",
          }}>
            {d.name}
          </h3>
          <p style={{
            fontFamily: "'Quicksand'", fontSize: 11, fontWeight: 600,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "#9aabba", marginBottom: 24,
          }}>
            {d.location}
          </p>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(17px, 2vw, 22px)", fontWeight: 300, fontStyle: "italic",
            color: "#5a7080", lineHeight: 1.75, marginBottom: 36,
          }}>
            {d.description}
          </p>

          <Link to={`/destinations/${d.slug}`} style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            fontFamily: "'Quicksand'", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: C.darkInk, paddingBottom: 4, borderBottom: `1px solid ${C.darkInk}`,
            width: "fit-content", transition: "gap 0.25s, color 0.25s", textDecoration: "none",
          }}
          onMouseEnter={e => { e.currentTarget.style.gap = "16px"; e.currentTarget.style.color = d.accent; e.currentTarget.style.borderColor = d.accent; }}
          onMouseLeave={e => { e.currentTarget.style.gap = "10px"; e.currentTarget.style.color = C.darkInk; e.currentTarget.style.borderColor = C.darkInk; }}
          >
            Explore Free Guide <span>→</span>
          </Link>
        </div>
      </div>

      {/* Pills + arrows */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 24 }}>
        <div className="dest-pills" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {destinations.map((dest, i) => (
            <button key={i} onClick={() => go(i)} style={{
              fontFamily: "'Quicksand'", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 14px",
              background: i === active ? C.darkInk : "transparent",
              color: i === active ? "white" : "#9aabba",
              border: `1px solid ${i === active ? C.darkInk : C.stone}`,
              cursor: "pointer", transition: "all 0.25s", borderRadius: 1,
            }}
            onMouseEnter={e => { if (i !== active) { e.currentTarget.style.borderColor = "#9aabba"; e.currentTarget.style.color = C.darkInk; }}}
            onMouseLeave={e => { if (i !== active) { e.currentTarget.style.borderColor = C.stone; e.currentTarget.style.color = "#9aabba"; }}}
            >
              {dest.name}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          {[{ fn: prev, label: "←" }, { fn: next, label: "→" }].map(({ fn, label }) => (
            <button key={label} onClick={fn} style={{
              width: 40, height: 40, background: "transparent",
              border: `1px solid ${C.stone}`, cursor: "pointer", fontSize: 15, color: C.slate,
              display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.darkInk; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = C.darkInk; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.slate; e.currentTarget.style.borderColor = C.stone; }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


// ─── Rituals Section (homepage version) ─────────────────────────────────────
function RitualsSectionHome() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 860);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggle = (i) => setActiveIdx(activeIdx === i ? null : i);

  return (
    <section style={{ padding: "100px 0", background: C.darkInk }}>
      <div className="section-padded" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 52px" }}>
        <FadeIn>
          <span className="eyebrow" style={{ color: C.skyBlue }}>Rituals</span>
        </FadeIn>

        {/* Desktop: 4 columns */}
        {!isMobile && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 48 }}>
            {ritualsPillars.map((pillar, i) => (
              <FadeIn key={pillar.word} delay={i * 0.1}>
                <div style={{ padding: "0 32px", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                  <span style={{ fontSize: 22, color: pillar.color, display: "block", marginBottom: 18, opacity: 0.8 }}>{pillar.icon}</span>
                  <h3 style={{
                    fontFamily: "'Quicksand', sans-serif", fontSize: 13, fontWeight: 700,
                    letterSpacing: "0.2em", textTransform: "uppercase", color: pillar.color, marginBottom: 16,
                  }}>{pillar.word}</h3>
                  <p style={{
                    fontFamily: "'Quicksand', sans-serif", fontSize: 13, fontWeight: 400,
                    color: "rgba(255,255,255,0.45)", lineHeight: 1.9, letterSpacing: "0.02em", marginBottom: 20,
                  }}>{pillar.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {pillar.details.map((d, j) => (
                      <span key={j} style={{
                        fontFamily: "'Quicksand', sans-serif", fontSize: 12.5, fontWeight: 500,
                        color: "rgba(255,255,255,0.3)", letterSpacing: "0.03em", lineHeight: 1.5,
                      }}>{d}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {/* Mobile: accordion */}
        {isMobile && (
          <div style={{ marginTop: 36 }}>
            {ritualsPillars.map((pillar, i) => {
              const isOpen = activeIdx === i;
              return (
                <div key={pillar.word} style={{
                  borderTop: i === 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}>
                  <button onClick={() => toggle(i)} style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "22px 4px", background: "transparent", border: "none", cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <span style={{ fontSize: 18, color: pillar.color, width: 28, textAlign: "center", opacity: isOpen ? 1 : 0.6, transition: "opacity 0.3s" }}>{pillar.icon}</span>
                      <span style={{
                        fontFamily: "'Quicksand', sans-serif", fontSize: 13, fontWeight: 700,
                        letterSpacing: "0.2em", textTransform: "uppercase",
                        color: isOpen ? pillar.color : "rgba(255,255,255,0.5)", transition: "color 0.3s",
                      }}>{pillar.word}</span>
                    </div>
                    <span style={{
                      fontSize: 18, color: isOpen ? pillar.color : "rgba(255,255,255,0.2)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease, color 0.3s", lineHeight: 1,
                    }}>+</span>
                  </button>
                  <div style={{
                    maxHeight: isOpen ? 300 : 0, opacity: isOpen ? 1 : 0, overflow: "hidden",
                    transition: "max-height 0.4s ease, opacity 0.3s ease", paddingLeft: 44,
                  }}>
                    <p style={{
                      fontFamily: "'Quicksand', sans-serif", fontSize: 14, fontWeight: 400,
                      color: "rgba(255,255,255,0.55)", lineHeight: 1.9, letterSpacing: "0.02em",
                      marginBottom: 16, paddingRight: 16,
                    }}>{pillar.desc}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 24 }}>
                      {pillar.details.map((d, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: pillar.color, opacity: 0.5, flexShrink: 0 }} />
                          <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: "0.04em" }}>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <FadeIn delay={0.4}>
          <div style={{ marginTop: 48, paddingLeft: isMobile ? 4 : 32 }}>
            <Link to="/rituals" className="underline-link underline-link-light">Dive Deeper</Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}


// ─── Homepage ───────────────────────────────────────────────────────────────
export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const dayProgress = useDayCycle(30);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const heroOpacity  = Math.max(0, 1 - scrollY / 680);
  const heroParallax = scrollY * 0.25;
  const phase = interpolatePhase(dayProgress);

  return (
    <>
      <Nav transparent />

      {/* ══ 1. HERO — Animated Day Cycle ═════════════════════════════════ */}
      <style>{`
        .hero-moment {
          position: absolute;
          font-family: 'Quicksand', sans-serif;
          font-weight: 300;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.01em;
          text-align: center;
          margin: 0;
          white-space: nowrap;
          font-size: 36px;
          line-height: 1.2;
        }
        .hero-moment-wrap {
          position: relative;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 28px;
        }
        .hero-subtitle {
          font-family: 'Quicksand', sans-serif;
          font-weight: 300;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.02em;
          text-align: center;
          font-size: 20px;
          white-space: nowrap;
        }
        @media (max-width: 768px) {
          .hero-moment {
            font-size: 20px;
            white-space: normal;
            width: 85vw;
            line-height: 1.35;
          }
          .hero-moment-wrap {
            height: 70px;
            margin-bottom: 20px;
          }
          .hero-subtitle {
            font-size: 11.5px;
            white-space: nowrap;
            padding: 0 24px;
          }
        }
      `}</style>
      <section style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          transform: `translateY(${heroParallax}px)`,
          background: `linear-gradient(185deg, ${phase.sky[0]} 0%, ${phase.sky[1]} 30%, ${phase.sky[2]} 60%, ${phase.sky[3]} 100%)`,
        }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: phase.stars }}>
            {Array.from({ length: 150 }, (_, i) => (
              <circle key={i}
                cx={`${(i * 53.7 + 11) % 100}%`} cy={`${(i * 29.3 + 5) % 65}%`}
                r={i % 9 === 0 ? 1.8 : i % 4 === 0 ? 1.1 : 0.55}
                fill="white" opacity={0.25 + (i % 6) * 0.1}
              />
            ))}
          </svg>
          <div style={{
            position: "absolute", left: "50%", top: `${phase.glowY * 100}%`,
            transform: "translate(-50%, -50%)", width: 400, height: 400, borderRadius: "50%",
            background: `radial-gradient(circle, ${phase.glowColor}${Math.round(phase.glowOpacity * 255).toString(16).padStart(2,"0")} 0%, transparent 70%)`,
            filter: "blur(40px)", pointerEvents: "none",
          }} />
          <svg className="hero-mountains" style={{ position: "absolute", bottom: 0, width: "100%", height: "35%" }} viewBox="0 0 1440 360" preserveAspectRatio="none">
            <path d="M0,360 L0,210 L160,95 L320,170 L480,65 L640,145 L800,30 L960,115 L1120,55 L1280,130 L1440,85 L1440,360 Z" fill="rgba(12,28,42,0.92)" />
            <path d="M0,360 L0,255 L110,182 L230,220 L380,148 L520,198 L670,125 L820,178 L960,108 L1100,160 L1240,118 L1360,162 L1440,135 L1440,360 Z" fill="rgba(12,28,42,0.5)" />
          </svg>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,35,52,0.15) 0%, rgba(15,35,52,0.4) 100%)" }} />
        </div>

        <div className="hero-content" style={{
          position: "relative", zIndex: 2, height: "100%",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "0 24px", opacity: heroOpacity,
        }}>
          <FadeIn from="none" delay={0.15}>
            <span className="eyebrow" style={{ color: C.skyBlue }}>Wellness Travel for Adventure Seekers</span>
          </FadeIn>
          <FadeIn from="bottom" delay={0.25}>
            <div className="hero-moment-wrap">
              {magicMoments.map((m, i) => {
                const opacity = (() => {
                  let dist = Math.abs(dayProgress - m.center);
                  if (dist > 0.5) dist = 1 - dist;
                  if (dist < 0.06) return 1;
                  if (dist > 0.14) return 0;
                  return Math.pow(1 - (dist - 0.06) / 0.08, 2);
                })();
                if (opacity <= 0) return null;
                return (
                  <h1 key={i} className="hero-moment" style={{ opacity }}>
                    {m.text}
                  </h1>
                );
              })}
            </div>
          </FadeIn>
          <FadeIn from="bottom" delay={0.45}>
            <p className="hero-subtitle">
              Finding moments of <em style={{ color: C.skyBlue, fontStyle: "italic" }}>magic</em> that light up your soul.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══ 2. WHY WE EXIST ══════════════════════════════════════════════ */}
      <section style={{ padding: "0", background: C.warmWhite }}>
        <div className="story-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 680 }}>
          <div className="story-panel" style={{ padding: "100px 72px", display: "flex", flexDirection: "column", justifyContent: "flex-start", maxWidth: 600 }}>
            <FadeIn from="left">
              <span className="eyebrow" style={{ color: C.skyBlue }}>We Are Travelers</span>
              <h2 style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: "clamp(15px, 2vw, 22px)", fontWeight: 600, color: C.darkInk,
                lineHeight: 1.6, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 48,
              }}>
                Travel is about finding<br />moments of magic that<br />light up our souls.
              </h2>
              <div style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: "clamp(13px, 1.4vw, 15px)", fontWeight: 400,
                color: "#5a6a78", lineHeight: 2.1, letterSpacing: "0.03em",
              }}>
                <p style={{ marginBottom: 28 }}>When we find ourselves there, we just are.<br />Not weighed down by the past or an imagined future.<br />Connected through it to the entire universe.<br />Oh boy is it glorious and light and musical.</p>
                <p style={{ marginBottom: 32 }}>We're reminded of a truth we know, but often forget.<br />That life is not about conquering the mystery.<br />It's about learning to dance with it.</p>
                <p style={{ marginBottom: 6 }}>
                  <span style={{ fontStyle: "italic", color: C.skyBlue }}>Līlā</span>
                  {" "}<span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 300, fontStyle: "italic", color: "rgba(90,106,120,0.55)" }}>लीला</span>
                  {" "}<span style={{ color: "rgba(90,106,120,0.5)", fontSize: "clamp(12px, 1.4vw, 14px)" }}>/lee·lah/</span>
                </p>
                <p style={{ marginBottom: 0, color: "#5a6a78" }}>
                  A Hindu concept meaning <span style={{ color: C.skyBlue }}>"divine or cosmic play"</span>.<br />It suggests life is like a dance — joyous and light.<br />Learning to live this way is our living practice.
                </p>
              </div>
            </FadeIn>
          </div>
          <div className="story-panel-dark" style={{
            background: C.darkInk, padding: "100px 72px",
            display: "flex", flexDirection: "column", justifyContent: "flex-start", minHeight: 680,
          }}>
            <FadeIn from="right" delay={0.15}>
              <span className="eyebrow" style={{ color: C.skyBlue }}>Introducing Lila Trips</span>
              <h2 style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: "clamp(15px, 2vw, 22px)", fontWeight: 600, color: "white",
                lineHeight: 1.6, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 48,
              }}>
                We help put people,<br />place and practice<br />together.
              </h2>
              <div style={{
                fontFamily: "'Quicksand', sans-serif", fontSize: "clamp(13px, 1.4vw, 15px)",
                fontWeight: 400, color: "rgba(255,255,255,0.55)", lineHeight: 2.1, letterSpacing: "0.03em",
              }}>
                <p style={{ marginBottom: 32, color: "rgba(255,255,255,0.7)" }}>
                  We put you and the right pieces together.<br />You don't need more options.<br />You need the right ones.
                </p>
                <p style={{ marginBottom: 32, color: "rgba(255,255,255,0.7)" }}>
                  We're not really travel agents.<br />More like a local friend with a shortlist.<br />We eliminate everything not worth your time.
                </p>
                <p style={{ marginBottom: 24, color: "rgba(255,255,255,0.45)", fontStyle: "italic", fontSize: "clamp(13px, 1.4vw, 15px)" }}>
                  We help you find…
                </p>
                {[
                  "Sacred destinations with capacity for wonder.",
                  "Unique stays that set the tone and let you rest.",
                  "Wellness practices that invite expansion.",
                  "Sensory-rich activities that stoke the fire.",
                ].map((callout, i) => (
                  <p key={i} style={{
                    marginBottom: i < 3 ? 20 : 0, paddingLeft: 16,
                    borderLeft: `2px solid ${C.skyBlue}`,
                    color: "rgba(255,255,255,0.7)", fontStyle: "italic",
                  }}>{callout}</p>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ 3. DESTINATIONS CAROUSEL ═════════════════════════════════════ */}
      <section className="dest-section" style={{ padding: "100px 0", background: C.cream }}>
        <div className="section-padded" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 52px" }}>
          <FadeIn><span className="eyebrow" style={{ color: "#9aabba", marginBottom: 48, display: "block" }}>Destinations</span></FadeIn>
          <FadeIn delay={0.1}><DestCarousel /></FadeIn>
        </div>
      </section>

      {/* ══ 4. RITUALS ═══════════════════════════════════════════════════ */}
      <RitualsSectionHome />

      {/* ══ 5. OFFERINGS ═════════════════════════════════════════════════ */}
      <section className="offerings-section" style={{ padding: "100px 0", background: C.warmWhite }}>
        <div className="section-padded" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 52px" }}>
          <FadeIn>
            <div style={{ marginBottom: 64, maxWidth: 580 }}>
              <span className="eyebrow" style={{ color: "#9aabba" }}>Offerings</span>
              <h2 style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: C.darkInk, lineHeight: 1.15, marginBottom: 14,
              }}>From inspiration<br />to experience.</h2>
              <p style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: "clamp(14px, 1.6vw, 17px)", fontWeight: 300, color: "#8aa0ad", lineHeight: 1.7,
              }}>We handle the complexity so you can focus on being there.</p>
            </div>
          </FadeIn>
          <div className="journey-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0 }}>
            {journey.map((j, i) => (
              <FadeIn key={j.step} delay={i * 0.1}>
                <div className="journey-card" style={{ borderTop: `2px solid ${i === 0 ? j.color : C.stone}` }}
                  onMouseEnter={e => e.currentTarget.style.borderTopColor = j.color}
                  onMouseLeave={e => e.currentTarget.style.borderTopColor = i === 0 ? j.color : C.stone}
                >
                  <span style={{ fontFamily: "'Quicksand'", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: j.color, display: "block", marginBottom: 12 }}>{j.label}</span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 400, color: C.darkInk, lineHeight: 1.25, marginBottom: 14 }}>{j.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.8, color: "#7a90a0" }}>{j.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.5}>
            <div style={{ marginTop: 48 }}>
              <Link to="/offerings" className="underline-link">Learn More</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ 6. CTA ═══════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 600 }}>
        <img src={P.lilaPainting} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center center",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,18,26,0.25)" }} />
        <div style={{
          position: "relative", zIndex: 1, padding: "100px 52px",
          display: "flex", alignItems: "center", justifyContent: "center", minHeight: 600,
        }}>
          <FadeIn>
            <div className="cta-inner" style={{
              background: "rgba(10,18,26,0.78)", backdropFilter: "blur(20px)",
              padding: "64px 72px", textAlign: "center", maxWidth: 560,
            }}>
              <span className="eyebrow" style={{ color: C.skyBlue }}>Begin</span>
              <h2 style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 300, color: "white", lineHeight: 1.2, marginBottom: 16,
              }}>
                Come dance with<br /><span style={{ color: C.skyBlue }}>the mystery</span>.
              </h2>
              <p style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: "clamp(13px, 1.6vw, 16px)", fontWeight: 400,
                color: "rgba(255,255,255,0.5)", maxWidth: 340, margin: "0 auto 40px", lineHeight: 1.9,
              }}>We'll show you the way.</p>
              <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/destinations" className="underline-link underline-link-light">Explore Destinations</Link>
                <Link to="/plan" className="underline-link underline-link-light">Plan a Custom Trip</Link>
                <Link to="/contact" className="underline-link underline-link-light">Contact Our Experts</Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
