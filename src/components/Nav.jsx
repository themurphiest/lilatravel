// ═══════════════════════════════════════════════════════════════════════════════
// NAV — shared navigation across all pages
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { C } from '@data/brand';

export default function Nav({ transparent = false }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  const showSolid = scrolled || !transparent;

  const links = [
    { label: "Destinations", to: "/destinations" },
    { label: "Rituals", to: "/rituals" },
    { label: "Offerings", to: "/offerings" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "20px 52px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: showSolid ? "rgba(250,248,244,0.97)" : "transparent",
      backdropFilter: showSolid ? "blur(16px)" : "none",
      borderBottom: showSolid ? `1px solid ${C.stone}` : "none",
      transition: "all 0.4s ease",
    }}>
      <Link to="/" style={{
        fontFamily: "'Quicksand', sans-serif",
        fontSize: 22, fontWeight: 500, letterSpacing: "0.08em",
        color: showSolid ? C.darkInk : "white",
        transition: "color 0.4s", textDecoration: "none",
      }}>
        Lila Trips
      </Link>

      <div className="nav-links" style={{ display: "flex", gap: 40, alignItems: "center" }}>
        {links.map(link => (
          <Link key={link.label} to={link.to} style={{
            fontFamily: "'Quicksand'", fontSize: 11, fontWeight: 600,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: showSolid ? C.darkInk : "rgba(255,255,255,0.75)",
            transition: "opacity 0.2s", textDecoration: "none",
            opacity: location.pathname.startsWith(link.to) ? 1 : 0.75,
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.55"}
          onMouseLeave={e => e.currentTarget.style.opacity = location.pathname.startsWith(link.to) ? "1" : "0.75"}
          >
            {link.label}
          </Link>
        ))}

        <Link to="/destinations" style={{
          fontFamily: "'Quicksand'", fontSize: 10, fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: showSolid ? C.darkInk : "white",
          padding: "9px 20px", textDecoration: "none",
          border: showSolid ? `1px solid ${C.darkInk}` : "1px solid rgba(255,255,255,0.55)",
          transition: "all 0.3s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = C.darkInk; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = C.darkInk; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = showSolid ? C.darkInk : "white"; e.currentTarget.style.borderColor = showSolid ? C.darkInk : "rgba(255,255,255,0.55)"; }}
        >
          Plan a Trip
        </Link>
      </div>
    </nav>
  );
}
