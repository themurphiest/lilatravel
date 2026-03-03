// ═══════════════════════════════════════════════════════════════════════════════
// CELESTIAL SNAPSHOT — live conditions sidebar for destination guides
// ═══════════════════════════════════════════════════════════════════════════════
//
// Sticky sidebar showing weather, sun, moon, night sky, river level,
// upcoming celestial events, and NPS alerts. Collapses to a floating
// button + drawer on mobile (≤ 900px).
//

import { useState, useEffect, useCallback } from 'react';
import { C } from '@data/brand';
import { getCelestialSnapshot } from '@services/celestialService';


// ─── Shared Typography ──────────────────────────────────────────────────────

const LABEL = {
  fontFamily: "'Quicksand', sans-serif",
  fontSize: 9, fontWeight: 700,
  letterSpacing: "0.2em", textTransform: "uppercase",
  color: "#b8b0a8", marginBottom: 6,
};

const VALUE = {
  fontFamily: "'Quicksand', sans-serif",
  fontSize: 14, fontWeight: 600,
  color: C.darkInk, lineHeight: 1.4,
};

const DETAIL = {
  fontFamily: "'Quicksand', sans-serif",
  fontSize: 11, fontWeight: 400,
  color: "#8a9098", lineHeight: 1.5,
};


// ─── SVG Helpers ─────────────────────────────────────────────────────────────

function SunArc({ progress }) {
  // Simple arc showing daylight progress
  const w = 180, h = 50;
  const cx = w / 2, cy = h - 4;
  const r = 72;
  // Arc from left to right
  const startAngle = Math.PI;
  const endAngle = 0;
  const currentAngle = startAngle + (endAngle - startAngle) * progress;

  const arcPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;

  const dotX = cx + r * Math.cos(currentAngle);
  const dotY = cy - r * Math.sin(Math.PI - currentAngle);

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", margin: "6px auto 2px" }}>
      <path d={arcPath} fill="none" stroke={C.stone} strokeWidth="1.5" />
      {progress > 0 && progress < 1 && (
        <>
          <path
            d={arcPath}
            fill="none" stroke={C.goldenAmber} strokeWidth="1.5"
            strokeDasharray={`${progress * Math.PI * r} ${Math.PI * r}`}
          />
          <circle cx={dotX} cy={dotY} r="4" fill={C.goldenAmber} />
        </>
      )}
      {/* Horizon line */}
      <line x1={cx - r - 8} y1={cy} x2={cx + r + 8} y2={cy} stroke={C.stone} strokeWidth="0.5" />
    </svg>
  );
}

function MoonDisc({ illumination, phaseName }) {
  // Simplified moon disc — dark circle with illuminated portion
  const r = 14;
  const size = r * 2 + 4;
  const cx = r + 2, cy = r + 2;

  // Waxing = right side lit, waning = left side lit
  const isWaning = phaseName.includes("Waning") || phaseName === "Last Quarter";
  const fraction = illumination / 100;

  // Terminator x-offset from center (ellipse width)
  const termX = r * (1 - 2 * fraction);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Dark base */}
      <circle cx={cx} cy={cy} r={r} fill="#2a3040" />
      {/* Illuminated portion */}
      <clipPath id="moonClip">
        <circle cx={cx} cy={cy} r={r} />
      </clipPath>
      <ellipse
        cx={cx + (isWaning ? termX : -termX) / 2}
        cy={cy} rx={r - Math.abs(termX) / 2} ry={r}
        fill="#e8e4d8" clipPath="url(#moonClip)"
      />
    </svg>
  );
}

function QualityDots({ rating, max = 5 }) {
  return (
    <span style={{ display: "inline-flex", gap: 3 }}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: "50%",
          background: i < rating ? C.goldenAmber : C.stone,
          transition: "background 0.3s",
        }} />
      ))}
    </span>
  );
}

function RiverBar({ level }) {
  const colors = { low: C.seaGlass, moderate: C.skyBlue, high: C.goldenAmber, dangerous: C.sunSalmon };
  const widths = { low: "25%", moderate: "50%", high: "75%", dangerous: "100%" };
  return (
    <div style={{ height: 4, background: C.stone, width: "100%", marginTop: 6 }}>
      <div style={{
        height: "100%", width: widths[level],
        background: colors[level], transition: "width 0.5s, background 0.5s",
      }} />
    </div>
  );
}


// ─── Expandable Row ──────────────────────────────────────────────────────────

function SnapshotRow({ label, children, expandContent }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => expandContent && setOpen(!open)}
      style={{
        padding: "14px 0",
        borderBottom: `1px solid ${C.stone}`,
        cursor: expandContent ? "pointer" : "default",
        transition: "background 0.15s",
      }}
      onMouseEnter={e => { if (expandContent) e.currentTarget.style.background = `${C.stone}22`; }}
      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
    >
      <div style={LABEL}>{label}</div>
      {children}
      {open && expandContent && (
        <div style={{ ...DETAIL, marginTop: 8 }}>{expandContent}</div>
      )}
    </div>
  );
}


// ─── Loading Skeleton ────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div style={{
      width: 240, padding: "20px 22px",
      background: C.warmWhite, border: `1px solid ${C.stone}`,
      position: "sticky", top: 100,
    }}>
      {/* Header skeleton */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ width: 120, height: 12, background: C.stone, marginBottom: 8, opacity: 0.5 }} />
        <div style={{ width: 80, height: 8, background: C.stone, opacity: 0.3 }} />
      </div>
      {/* Row skeletons */}
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} style={{ padding: "14px 0", borderBottom: `1px solid ${C.stone}` }}>
          <div style={{ width: 60, height: 7, background: C.stone, marginBottom: 8, opacity: 0.4 }} />
          <div style={{ width: 100 + i * 10, height: 10, background: C.stone, opacity: 0.25 }} />
        </div>
      ))}
    </div>
  );
}


// ─── Main Sidebar Content ────────────────────────────────────────────────────

function SnapshotContent({ data }) {
  const { weather, sun, moon, sky, river, nextEvent, alerts } = data;

  return (
    <>
      {/* ── Header ── */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          {/* Pulsing green dot */}
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: C.seaGlass,
            animation: "celestialPulse 2s ease-in-out infinite",
          }} />
          <span style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 9, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: C.seaGlass,
          }}>LIVE</span>
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 19, fontWeight: 300,
          color: C.darkInk, lineHeight: 1.2,
        }}>Celestial Snapshot</div>
        <div style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: 11, fontWeight: 400,
          color: "#8a9098", marginTop: 4,
        }}>Zion Canyon — right now</div>
      </div>

      {/* ── 1. Conditions ── */}
      {weather && (
        <SnapshotRow
          label="CONDITIONS"
          expandContent={<>H {weather.high}° / L {weather.low}° · Wind {weather.wind} mph</>}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 32, fontWeight: 300,
              color: C.darkInk, lineHeight: 1,
            }}>{weather.temp}°</span>
            <span style={VALUE}>{weather.condition}</span>
          </div>
        </SnapshotRow>
      )}

      {/* ── 2. Daylight ── */}
      {sun && (
        <SnapshotRow label="DAYLIGHT">
          <SunArc progress={sun.progress} />
          <div style={{ ...VALUE, fontSize: 12, textAlign: "center" }}>{sun.daylight}</div>
          <div style={{
            display: "flex", justifyContent: "space-between",
            marginTop: 8, padding: "8px 10px",
            background: `${C.goldenAmber}08`,
            border: `1px solid ${C.goldenAmber}18`,
          }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ ...LABEL, fontSize: 8, marginBottom: 2 }}>SUNRISE</div>
              <div style={{ ...VALUE, fontSize: 13 }}>{sun.rise}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ ...LABEL, fontSize: 8, marginBottom: 2 }}>SUNSET</div>
              <div style={{ ...VALUE, fontSize: 13 }}>{sun.set}</div>
            </div>
          </div>
        </SnapshotRow>
      )}

      {/* ── 3. Moon ── */}
      {moon && (
        <SnapshotRow label="MOON">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <MoonDisc illumination={moon.phase} phaseName={moon.name} />
            <div>
              <div style={VALUE}>{moon.name}</div>
              <div style={DETAIL}>{moon.phase}% illuminated</div>
            </div>
          </div>
        </SnapshotRow>
      )}

      {/* ── 4. Tonight's Sky ── */}
      {sky && (
        <SnapshotRow
          label="TONIGHT'S SKY"
          expandContent={
            <>
              Bortle Class {sky.bortle}
              {sky.milkyWayVisible && sky.milkyWayWindow && (
                <> · Milky Way {sky.milkyWayWindow}</>
              )}
              {sky.milkyWayNote && <> · {sky.milkyWayNote}</>}
              {!sky.milkyWayVisible && <> · Milky Way core not visible this season</>}
            </>
          }
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ ...VALUE, color: C.goldenAmber }}>{sky.label}</span>
            <QualityDots rating={sky.quality} />
          </div>
        </SnapshotRow>
      )}

      {/* ── 5. Virgin River ── */}
      {river && (
        <SnapshotRow
          label="VIRGIN RIVER"
          expandContent={<>{river.cfs} cfs · Water temp {river.tempF}°F</>}
        >
          <div style={VALUE}>{river.label}</div>
          <RiverBar level={river.level} />
        </SnapshotRow>
      )}

      {/* ── 6. Next Celestial Event ── */}
      {nextEvent && (
        <SnapshotRow label="NEXT CELESTIAL EVENT">
          <div style={VALUE}>{nextEvent.name}</div>
          <div style={{ ...DETAIL, marginTop: 4 }}>
            {nextEvent.date} · {nextEvent.daysAway} day{nextEvent.daysAway !== 1 ? "s" : ""} away
          </div>
          <div style={{ ...DETAIL, marginTop: 4, fontStyle: "italic" }}>{nextEvent.detail}</div>
        </SnapshotRow>
      )}

      {/* ── 7. NPS Alerts ── */}
      {alerts.length > 0 && (
        <SnapshotRow label="NPS ALERTS">
          <div style={{
            padding: "10px 12px",
            background: `${C.sunSalmon}10`,
            border: `1px solid ${C.sunSalmon}25`,
          }}>
            {alerts.map((alert, i) => (
              <div key={i} style={{
                display: "flex", gap: 8, alignItems: "flex-start",
                marginBottom: i < alerts.length - 1 ? 8 : 0,
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: C.sunSalmon, marginTop: 4, flexShrink: 0,
                }} />
                <span style={{ ...DETAIL, fontSize: 11, color: "#5a6a78" }}>{alert}</span>
              </div>
            ))}
          </div>
        </SnapshotRow>
      )}
    </>
  );
}


// ─── Mobile Floating Button + Drawer ─────────────────────────────────────────

function MobileDrawer({ data, open, onClose }) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(26,37,48,0.35)",
          zIndex: 999,
          transition: "opacity 0.25s",
        }}
      />
      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0,
        width: 280, height: "100%",
        background: C.warmWhite,
        borderLeft: `1px solid ${C.stone}`,
        padding: "24px 20px",
        overflowY: "auto",
        zIndex: 1000,
        boxShadow: "-4px 0 20px rgba(0,0,0,0.08)",
      }}>
        {/* Close button */}
        <div
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 14,
            width: 28, height: 28,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#8a9098",
            fontFamily: "'Quicksand', sans-serif", fontSize: 18, fontWeight: 300,
          }}
        >×</div>
        <SnapshotContent data={data} />
      </div>
    </>
  );
}

function FloatingButton({ onClick, hasData }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed", bottom: 24, right: 24,
        width: 52, height: 52, borderRadius: "50%",
        background: C.darkInk, border: "none",
        cursor: "pointer", zIndex: 998,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        transition: "transform 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
      {/* Star/celestial icon */}
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 2 L12.5 8 L19 11 L12.5 14 L11 20 L9.5 14 L3 11 L9.5 8 Z"
          fill={C.goldenAmber} opacity="0.9"
        />
      </svg>
      {/* Green dot indicator */}
      {hasData && (
        <span style={{
          position: "absolute", top: 8, right: 8,
          width: 7, height: 7, borderRadius: "50%",
          background: C.seaGlass,
          border: `2px solid ${C.darkInk}`,
        }} />
      )}
    </button>
  );
}


// ─── Main Export ─────────────────────────────────────────────────────────────

export default function CelestialSnapshot({ destination = "zion" }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Fetch data
  const fetchData = useCallback(async () => {
    try {
      const snapshot = await getCelestialSnapshot(destination);
      setData(snapshot);
    } catch (err) {
      console.error("CelestialSnapshot fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [destination]);

  useEffect(() => {
    fetchData();
    // Refresh every 30 minutes
    const interval = setInterval(fetchData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Inject pulse animation
  useEffect(() => {
    if (document.getElementById("celestial-pulse-style")) return;
    const style = document.createElement("style");
    style.id = "celestial-pulse-style";
    style.textContent = `
      @keyframes celestialPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
    `;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  // Mobile: floating button + drawer
  if (isMobile) {
    return (
      <>
        <FloatingButton onClick={() => setDrawerOpen(true)} hasData={!!data} />
        {data && <MobileDrawer data={data} open={drawerOpen} onClose={() => setDrawerOpen(false)} />}
      </>
    );
  }

  // Desktop: sticky sidebar
  if (loading) return <Skeleton />;
  if (!data) return null;

  return (
    <div style={{
      width: 240,
      padding: "20px 22px",
      background: C.warmWhite,
      border: `1px solid ${C.stone}`,
      position: "sticky",
      top: 100,
      alignSelf: "start",
    }}>
      <SnapshotContent data={data} />
    </div>
  );
}
