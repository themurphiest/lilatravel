// ═══════════════════════════════════════════════════════════════════════════════
// PAGE HERO — reusable hero banner for subpages
// ═══════════════════════════════════════════════════════════════════════════════

import { C } from '@data/brand';
import FadeIn from './FadeIn';

export default function PageHero({ eyebrow, title, subtitle, photo, gradient, accentColor = C.skyBlue, height = "60vh" }) {
  return (
    <section className="page-hero" style={{
      position: "relative", minHeight: height, overflow: "hidden",
      display: "flex", alignItems: "flex-end",
    }}>
      {photo ? (
        <img src={photo} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
        }} />
      ) : gradient ? (
        <div style={{ position: "absolute", inset: 0, background: gradient }} />
      ) : (
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(165deg, ${C.slate}, ${C.darkInk})` }} />
      )}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,18,26,0.75) 0%, rgba(10,18,26,0.2) 50%, rgba(10,18,26,0.1) 100%)" }} />

      <div style={{
        position: "relative", zIndex: 2,
        padding: "64px 52px", maxWidth: 900, width: "100%",
      }}>
        <FadeIn from="bottom" delay={0.1}>
          {eyebrow && <span className="eyebrow" style={{ color: accentColor }}>{eyebrow}</span>}
          <h1 style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: "clamp(32px, 6vw, 64px)", fontWeight: 300,
            color: "white", lineHeight: 1.1, marginBottom: subtitle ? 16 : 0,
          }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(17px, 2.5vw, 24px)", fontWeight: 300, fontStyle: "italic",
              color: "rgba(255,255,255,0.6)", lineHeight: 1.6, maxWidth: 600,
            }}>
              {subtitle}
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
