import { useState, useEffect } from 'react';
import { getMonthlySnapshot } from '@services/celestialService';
import { C } from '@data/brand';

const MONTH_MAP = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

const F = "'Quicksand', sans-serif";

function Tile({ emoji, title, subtitle, detail }) {
  return (
    <div style={{
      flex: '0 0 auto',
      minWidth: 160,
      background: '#1a2530',
      borderRadius: 2,
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    }}>
      <div style={{ fontSize: 18, lineHeight: 1 }}>{emoji}</div>
      <div style={{
        fontFamily: F, fontSize: 11, fontWeight: 600,
        letterSpacing: '0.06em', color: '#ffffffcc',
        marginTop: 4,
      }}>{title}</div>
      {subtitle && (
        <div style={{
          fontFamily: F, fontSize: 11, fontWeight: 500, color: C.goldenAmber,
        }}>{subtitle}</div>
      )}
      {detail && (
        <div style={{
          fontFamily: F, fontSize: 10, fontWeight: 400, color: '#ffffff60',
          lineHeight: 1.4,
        }}>{detail}</div>
      )}
    </div>
  );
}

export default function CelestialMonthStrip({ month, destinationKey }) {
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    if (!month) return;
    const monthNum = typeof month === 'number' ? month : MONTH_MAP[month?.toLowerCase()];
    if (!monthNum) return;
    const data = getMonthlySnapshot(monthNum);
    setSnapshot(data);
  }, [month]);

  if (!snapshot) return null;

  const tiles = [];

  // Celestial events (meteor showers, solstices, equinoxes)
  for (const evt of snapshot.events) {
    const isShower = evt.name.toLowerCase().includes('meteor');
    tiles.push(
      <Tile
        key={evt.name}
        emoji={isShower ? '☄️' : '☀️'}
        title={evt.name}
        subtitle={new Date(2024, evt.month - 1, evt.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        detail={evt.detail}
      />
    );
  }

  // New Moon
  if (snapshot.newMoon) {
    tiles.push(
      <Tile
        key="newmoon"
        emoji="🌑"
        title="New Moon"
        subtitle={snapshot.newMoon.label}
        detail="Best night-sky viewing. Ideal for stargazing."
      />
    );
  }

  // Full Moon
  if (snapshot.fullMoon) {
    tiles.push(
      <Tile
        key="fullmoon"
        emoji="🌕"
        title="Full Moon"
        subtitle={snapshot.fullMoon.label}
        detail="Bright moonlit landscapes. Night hikes glow."
      />
    );
  }

  // Milky Way window
  if (snapshot.milkyWayWindow) {
    tiles.push(
      <Tile
        key="milkyway"
        emoji="🌌"
        title="Milky Way Window"
        subtitle={snapshot.milkyWayWindow}
        detail="Core visible during this window. Best near new moon."
      />
    );
  }

  if (tiles.length === 0) return null;

  return (
    <div style={{ margin: '6px 0 10px' }}>
      <div style={{
        fontFamily: F, fontSize: 9, fontWeight: 600,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: '#ffffff50', background: '#1a2530',
        padding: '10px 16px 0', borderRadius: '2px 2px 0 0',
      }}>
        {snapshot.seasonLabel} Sky
      </div>
      <div style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        padding: '8px 10px 12px',
        background: '#1a2530',
        borderRadius: '0 0 2px 2px',
        scrollbarWidth: 'none',
      }}>
        {tiles}
      </div>
    </div>
  );
}
