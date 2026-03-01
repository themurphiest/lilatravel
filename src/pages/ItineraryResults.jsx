import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { C as BrandC } from '@data/brand';
import { lookupUrl } from '@data/destinations/zion-urls';
import JSON5 from 'json5';

const C = {
  cream:      BrandC.cream,
  slate:      BrandC.darkInk,
  sage:       '#6B8078',
  sageLight:  '#8FA39A',
  skyBlue:    BrandC.skyBlue,
  oceanTeal:  BrandC.oceanTeal,
  sunSalmon:  BrandC.sunSalmon,
  goldenAmber: BrandC.goldenAmber,
  seaGlass:   BrandC.seaGlass,
  white:      '#FFFFFF',
};

const TIME_COLORS = {
  morning: '#E8C07A',
  midday: BrandC.skyBlue,
  afternoon: BrandC.sunSalmon,
  evening: '#8B7EC8',
  night: '#6B7B8D',
};

/* ── tiny icons ─────────────────────────────────────────────────────────── */

const Chevron = ({ open, color = C.sage }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
    stroke={color} strokeWidth="1.8" strokeLinecap="round"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.35s ease', flexShrink: 0 }}>
    <polyline points="4,6 8,10 12,6" />
  </svg>
);

const Star = ({ size = 12, color = C.goldenAmber }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color}><path d="M8 1l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 11.8 3.8 14l.8-4.7L1.2 6l4.7-.7z" /></svg>
);

const ExternalLinkIcon = ({ size = 11, color = C.sage }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M12 9v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4" />
    <path d="M9 2h5v5" />
    <path d="M7 9L14 2" />
  </svg>
);

/* ── smooth collapsible ─────────────────────────────────────────────────── */

function Collapsible({ open, children }) {
  const ref = useRef(null);
  const [h, setH] = useState(0);
  useEffect(() => { if (ref.current) setH(ref.current.scrollHeight); }, [open, children]);
  return (
    <div style={{ maxHeight: open ? h + 40 : 0, opacity: open ? 1 : 0, overflow: 'hidden', transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease' }}>
      <div ref={ref} style={{ paddingTop: 12 }}>{children}</div>
    </div>
  );
}

/* ── linked name ───────────────────────────────────────────────────────── */

function LinkedName({ name, url, style = {} }) {
  const resolvedUrl = url || lookupUrl(name);
  if (resolvedUrl) {
    return (
      <a href={resolvedUrl} target="_blank" rel="noopener noreferrer" style={{
        ...style,
        textDecoration: 'none',
        borderBottom: `1px solid ${C.oceanTeal}30`,
        color: 'inherit',
        transition: 'border-color 0.2s',
      }}>
        {name}
      </a>
    );
  }
  return <span style={style}>{name}</span>;
}

/* ── destination snapshot ──────────────────────────────────────────────── */

function DestinationSnapshot({ snapshot, celestial, weather }) {
  const hasCelestial = celestial && celestial.days && celestial.days.length > 0;
  const hasMoon = celestial && celestial.moonPhase;
  const hasWeather = weather && weather.length > 0;
  const hasAiSnapshot = snapshot && (snapshot.seasonalNote || snapshot.weatherSummary);

  if (!hasCelestial && !hasWeather && !hasAiSnapshot) return null;

  // Compute weather summary from raw data
  let tempRange = null;
  if (hasWeather) {
    const highs = weather.map(d => d.high);
    const lows = weather.map(d => d.low);
    tempRange = {
      highMin: Math.min(...highs),
      highMax: Math.max(...highs),
      lowMin: Math.min(...lows),
      lowMax: Math.max(...lows),
    };
  }

  const firstDay = hasCelestial ? celestial.days[0] : null;

  return (
    <div style={{
      background: C.white,
      borderRadius: 20,
      border: `1px solid ${C.sage}10`,
      boxShadow: `0 2px 16px ${C.sage}06`,
      padding: '24px 20px',
      marginBottom: 24,
      overflow: 'hidden',
    }}>
      <div style={{
        fontFamily: "'Quicksand', sans-serif",
        fontSize: 9, fontWeight: 700,
        letterSpacing: '0.25em', textTransform: 'uppercase',
        color: `${C.sage}70`,
        marginBottom: 18, paddingLeft: 2,
      }}>
        What to Expect
      </div>

      {/* Seasonal note from AI */}
      {hasAiSnapshot && snapshot.seasonalNote && (
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(16px, 4.2vw, 19px)',
          fontWeight: 300, fontStyle: 'italic',
          color: `${C.slate}85`,
          lineHeight: 1.55,
          marginBottom: 20,
          paddingBottom: 18,
          borderBottom: `1px solid ${C.sage}08`,
        }}>
          {snapshot.seasonalNote}
        </p>
      )}

      {/* Data grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* Weather */}
        {(tempRange || (hasAiSnapshot && snapshot.weatherSummary)) && (
          <div style={{
            background: `${C.skyBlue}08`,
            borderRadius: 14,
            padding: '14px 16px',
            gridColumn: tempRange ? '1 / 2' : '1 / -1',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 14 }}>🌡</span>
              <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.skyBlue }}>Weather</span>
            </div>
            {tempRange ? (
              <>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px, 5.5vw, 28px)', fontWeight: 400, color: C.slate, lineHeight: 1.1 }}>
                  {tempRange.highMin}–{tempRange.highMax}°F
                </div>
                <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 11, color: `${C.slate}60`, marginTop: 4 }}>
                  highs · lows {tempRange.lowMin}–{tempRange.lowMax}°F
                </div>
              </>
            ) : (
              <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 12, color: `${C.slate}70`, lineHeight: 1.5 }}>
                {snapshot.weatherSummary}
              </div>
            )}
          </div>
        )}

        {/* Moon phase */}
        {hasMoon && (
          <div style={{
            background: `${C.goldenAmber}08`,
            borderRadius: 14,
            padding: '14px 16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 14 }}>{celestial.moonPhase.emoji}</span>
              <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.goldenAmber }}>Moon</span>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(15px, 4vw, 17px)', fontWeight: 400, color: C.slate, lineHeight: 1.3 }}>
              {celestial.moonPhase.name}
            </div>
            <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 11, color: `${C.slate}60`, marginTop: 4 }}>
              {celestial.moonPhase.illumination}% illuminated · {celestial.moonPhase.stargazing} stargazing
            </div>
          </div>
        )}

        {/* Sunrise */}
        {firstDay && firstDay.sunrise && (
          <div style={{
            background: `${C.sunSalmon}08`,
            borderRadius: 14,
            padding: '14px 16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 14 }}>🌅</span>
              <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.sunSalmon }}>Sunrise</span>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px, 4.5vw, 22px)', fontWeight: 400, color: C.slate }}>
              {firstDay.sunrise}
            </div>
            <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 11, color: `${C.slate}60`, marginTop: 2 }}>
              golden hour starts ~30 min before
            </div>
          </div>
        )}

        {/* Sunset */}
        {firstDay && firstDay.sunset && (
          <div style={{
            background: `#8B7EC808`,
            borderRadius: 14,
            padding: '14px 16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 14 }}>🌇</span>
              <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B7EC8' }}>Sunset</span>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px, 4.5vw, 22px)', fontWeight: 400, color: C.slate }}>
              {firstDay.sunset}
            </div>
            <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 11, color: `${C.slate}60`, marginTop: 2 }}>
              golden hour ~1 hr before
            </div>
          </div>
        )}
      </div>

      {/* Packing hint */}
      {hasAiSnapshot && snapshot.packingHint && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginTop: 16, paddingTop: 14,
          borderTop: `1px solid ${C.sage}08`,
        }}>
          <span style={{ fontSize: 13 }}>🎒</span>
          <span style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 12, color: `${C.slate}70`,
            lineHeight: 1.5,
          }}>{snapshot.packingHint}</span>
        </div>
      )}
    </div>
  );
}

/* ── trip overview / at-a-glance ────────────────────────────────────────── */

const DAY_COLORS = [
  C.goldenAmber, C.oceanTeal, C.skyBlue, C.sunSalmon,
  C.seaGlass, '#8B7EC8', C.goldenAmber, C.oceanTeal,
];

function TripOverview({ days, onDayClick }) {
  return (
    <div style={{
      background: C.white, borderRadius: 20,
      border: `1px solid ${C.sage}10`, boxShadow: `0 2px 16px ${C.sage}06`,
      padding: '24px 20px', marginBottom: 24,
    }}>
      <div style={{
        fontFamily: "'Quicksand', sans-serif", fontSize: 9, fontWeight: 700,
        letterSpacing: '0.25em', textTransform: 'uppercase',
        color: `${C.sage}70`, marginBottom: 18, paddingLeft: 2,
      }}>Your Trip at a Glance</div>

      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 15, top: 8, bottom: 8,
          width: 2, background: `linear-gradient(180deg, ${C.sage}12, ${C.sage}06)`, borderRadius: 1,
        }} />

        {days.map((day, i) => {
          const color = DAY_COLORS[i % DAY_COLORS.length];
          return (
            <button key={i} onClick={() => onDayClick(i)} style={{
              display: 'flex', alignItems: 'center', gap: 14, width: '100%',
              padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer',
              textAlign: 'left', WebkitTapHighlightColor: 'transparent', position: 'relative',
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: `${color}15`, border: `2px solid ${color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, zIndex: 1,
              }}>
                <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 11, fontWeight: 700, color }}>{i + 1}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color, marginBottom: 2 }}>{day.label}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(15px, 4vw, 17px)', fontWeight: 500, color: C.slate, lineHeight: 1.3 }}>{day.title}</div>
                {day.snapshot && (
                  <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(10px, 2.8vw, 11px)', color: `${C.slate}50`, lineHeight: 1.4, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{day.snapshot}</div>
                )}
              </div>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={`${C.sage}30`} strokeWidth="1.5" strokeLinecap="round" style={{ flexShrink: 0 }}>
                <polyline points="6,3 11,8 6,13" />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── timeline block ─────────────────────────────────────────────────────── */

function TimelineBlock({ time, title, summary, details, timeOfDay = 'morning', url, isLast = false }) {
  const [open, setOpen] = useState(false);
  const dot = TIME_COLORS[timeOfDay] || TIME_COLORS.morning;
  const resolvedUrl = url || lookupUrl(title);

  return (
    <div style={{ display: 'flex', gap: 14, minHeight: 48 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20, flexShrink: 0 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: dot, border: `2px solid ${C.white}`, boxShadow: `0 0 0 2px ${dot}30`, flexShrink: 0, marginTop: 4 }} />
        {!isLast && <div style={{ width: 1.5, flex: 1, minHeight: 24, background: `linear-gradient(180deg, ${dot}30, ${C.sage}10)` }} />}
      </div>
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 16 }}>
        <button onClick={() => details && setOpen(!open)} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', cursor: details ? 'pointer' : 'default', textAlign: 'left', padding: 0, gap: 8, WebkitTapHighlightColor: 'transparent' }}>
          <div>
            {time && <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: dot, marginBottom: 3 }}>{time}</div>}
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(16px, 4.2vw, 19px)', fontWeight: 500, color: C.slate, lineHeight: 1.3 }}>{title}</div>
            <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(12px, 3.2vw, 13px)', color: `${C.slate}70`, lineHeight: 1.5, marginTop: 4 }}>{summary}</div>
          </div>
          {details && <Chevron open={open} color={`${C.sage}40`} />}
        </button>
        {details && (
          <Collapsible open={open}>
            <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(12px, 3.2vw, 13px)', color: `${C.slate}90`, lineHeight: 1.7, padding: '8px 0' }}>
              {renderInlineBlock(details)}
              {resolvedUrl && (
                <a href={resolvedUrl} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontFamily: "'Quicksand', sans-serif", fontSize: 11, fontWeight: 600,
                  color: C.oceanTeal, textDecoration: 'none',
                  marginTop: 8, padding: '6px 12px',
                  background: `${C.oceanTeal}08`, borderRadius: 8,
                  border: `1px solid ${C.oceanTeal}15`,
                }}>
                  Learn more <ExternalLinkIcon size={10} color={C.oceanTeal} />
                </a>
              )}
            </div>
          </Collapsible>
        )}
      </div>
    </div>
  );
}

/* ── pick card ──────────────────────────────────────────────────────────── */

function PickCard({ category, pick, alternatives = [] }) {
  const [showAlts, setShowAlts] = useState(false);
  const styles = {
    stay: { label: 'Where to Stay', color: C.goldenAmber, icon: '🏡', badge: 'Lila Pick' },
    eat: { label: 'Where to Eat', color: C.sunSalmon, icon: '🍽', badge: 'Lila Pick' },
    gear: { label: 'Gear Rental', color: C.oceanTeal, icon: '🎒', badge: 'Lila Pick' },
    wellness: { label: 'Wellness', color: C.seaGlass, icon: '🧘', badge: 'Lila Pick' },
  };
  const s = styles[category] || styles.stay;

  return (
    <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${s.color}20`, overflow: 'hidden', marginBottom: 14, boxShadow: `0 1px 8px ${s.color}08` }}>
      <div style={{ padding: '12px 18px 10px', background: `${s.color}06`, borderBottom: `1px solid ${s.color}12` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14 }}>{s.icon}</span>
            <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: s.color }}>{s.label}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: `${s.color}12`, padding: '3px 10px 3px 7px', borderRadius: 12 }}>
            <Star size={10} color={s.color} />
            <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: s.color }}>{s.badge}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <LinkedName
            name={pick.name}
            url={pick.url}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(17px, 4.5vw, 20px)', fontWeight: 500, color: C.slate }}
          />
          {(pick.url || lookupUrl(pick.name)) && <ExternalLinkIcon size={11} color={`${C.sage}50`} />}
        </div>
        <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(12px, 3.2vw, 13px)', color: `${C.slate}70`, lineHeight: 1.6 }}>{pick.why}</div>
      </div>

      {alternatives.length > 0 && (
        <>
          <button onClick={() => setShowAlts(!showAlts)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 18px', background: `${C.cream}60`, border: 'none', borderTop: `1px solid ${s.color}10`, cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>
            <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 11, fontWeight: 600, color: `${C.sage}80` }}>{showAlts ? 'Hide options' : `${alternatives.length} other option${alternatives.length > 1 ? 's' : ''}`}</span>
            <Chevron open={showAlts} color={`${C.sage}50`} />
          </button>
          <Collapsible open={showAlts}>
            <div style={{ padding: '4px 18px 14px' }}>
              {alternatives.map((alt, i) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: i < alternatives.length - 1 ? `1px solid ${C.sage}10` : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                    <LinkedName
                      name={alt.name}
                      url={alt.url}
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(15px, 3.8vw, 17px)', fontWeight: 500, color: C.slate }}
                    />
                    {(alt.url || lookupUrl(alt.name)) && <ExternalLinkIcon size={10} color={`${C.sage}40`} />}
                  </div>
                  <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(11px, 3vw, 12px)', color: `${C.slate}70`, lineHeight: 1.5 }}>{alt.why}</div>
                </div>
              ))}
            </div>
          </Collapsible>
        </>
      )}
    </div>
  );
}

/* ── day card ───────────────────────────────────────────────────────────── */

function DayCard({ day, isFirst = false, dayIndex = 0 }) {
  const [open, setOpen] = useState(isFirst);
  const color = DAY_COLORS[dayIndex % DAY_COLORS.length];

  return (
    <div style={{
      marginBottom: 16, borderRadius: 20, background: C.white,
      border: `1px solid ${open ? `${color}25` : `${C.sage}10`}`,
      boxShadow: open ? `0 4px 24px ${color}08` : `0 2px 16px ${C.sage}06`,
      overflow: 'hidden', transition: 'border-color 0.3s, box-shadow 0.3s',
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 22px', background: open ? `${color}04` : 'transparent',
        border: 'none', cursor: 'pointer', textAlign: 'left',
        transition: 'background 0.3s', WebkitTapHighlightColor: 'transparent', gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: open ? `${color}15` : `${C.sage}08`,
          border: `1.5px solid ${open ? `${color}30` : `${C.sage}15`}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'all 0.3s',
        }}>
          <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 13, fontWeight: 700, color: open ? color : `${C.sage}80`, transition: 'color 0.3s' }}>{dayIndex + 1}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: open ? color : C.sage, marginBottom: 4, transition: 'color 0.3s' }}>{day.label}</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px, 5.5vw, 26px)', fontWeight: 400, color: C.slate, lineHeight: 1.2 }}>{day.title}</div>
          {!open && day.snapshot && (
            <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(11px, 3vw, 12px)', color: `${C.slate}55`, marginTop: 8, lineHeight: 1.6 }}>{day.snapshot}</div>
          )}
        </div>
        <Chevron open={open} />
      </button>
      <Collapsible open={open}>
        <div style={{ padding: '4px 22px 24px' }}>
          {day.intro && <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(13px, 3.4vw, 14px)', color: `${C.slate}85`, lineHeight: 1.75, margin: '0 0 20px', fontStyle: 'italic' }}>{day.intro}</p>}
          {day.timeline && day.timeline.map((b, i) => (
            <TimelineBlock key={i} time={b.time} title={b.title} summary={b.summary}
              details={b.details} timeOfDay={b.timeOfDay} url={b.url}
              isLast={i === day.timeline.length - 1} />
          ))}
          {day.picks && day.picks.map((p, i) => <PickCard key={i} category={p.category} pick={p.pick} alternatives={p.alternatives || []} />)}
        </div>
      </Collapsible>
    </div>
  );
}

/* ── markdown rendering (improved) ─────────────────────────────────────── */

function renderInlineBlock(text) {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    if (line.trim() === '') return <div key={i} style={{ height: 4 }} />;
    return <p key={i} style={{ margin: '4px 0' }}>{renderInline(line)}</p>;
  });
}

function renderInline(text) {
  if (!text || typeof text !== 'string') return text;
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);

    let earliest = null;
    let type = null;

    if (boldMatch && (!earliest || boldMatch.index < earliest.index)) { earliest = boldMatch; type = 'bold'; }
    if (italicMatch && (!earliest || italicMatch.index < earliest.index)) { earliest = italicMatch; type = 'italic'; }

    if (!earliest) { parts.push(remaining); break; }
    if (earliest.index > 0) parts.push(remaining.slice(0, earliest.index));

    if (type === 'bold') {
      parts.push(<strong key={key++} style={{ fontWeight: 700, color: C.slate }}>{earliest[1]}</strong>);
    } else {
      parts.push(<em key={key++} style={{ fontStyle: 'italic', color: `${C.slate}85` }}>{earliest[1]}</em>);
    }
    remaining = remaining.slice(earliest.index + earliest[0].length);
  }
  return parts.length > 0 ? parts : text;
}

function MarkdownContent({ content }) {
  if (!content || typeof content !== 'string') return null;
  const lines = content.split('\n');
  const elements = [];
  let key = 0;

  for (const line of lines) {
    if (line.trim() === '---' || line.trim() === '***') {
      elements.push(<hr key={key++} style={{ border: 'none', borderTop: `1px solid ${C.sage}15`, margin: '28px 0' }} />);
    } else if (/^# [^#]/.test(line)) {
      elements.push(<h1 key={key++} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px, 7vw, 34px)', fontWeight: 300, color: C.slate, lineHeight: 1.2, margin: '28px 0 10px' }}>{renderInline(line.slice(2))}</h1>);
    } else if (/^## [^#]/.test(line)) {
      elements.push(<h2 key={key++} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px, 5.5vw, 26px)', fontWeight: 400, color: C.slate, margin: '24px 0 8px' }}>{renderInline(line.slice(3))}</h2>);
    } else if (/^### /.test(line)) {
      elements.push(<h3 key={key++} style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 14, fontWeight: 700, color: C.sage, margin: '18px 0 6px' }}>{renderInline(line.slice(4))}</h3>);
    } else if (/^\s*[-*] /.test(line)) {
      elements.push(<div key={key++} style={{ display: 'flex', gap: 8, padding: '3px 0' }}><span style={{ color: C.sage, flexShrink: 0 }}>•</span><span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 13, color: C.slate, lineHeight: 1.65 }}>{renderInline(line.replace(/^\s*[-*] /, ''))}</span></div>);
    } else if (/^\d+\.\s/.test(line)) {
      const numMatch = line.match(/^(\d+)\.\s(.*)/);
      if (numMatch) {
        elements.push(<div key={key++} style={{ display: 'flex', gap: 8, padding: '3px 0' }}><span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 12, color: C.sage, fontWeight: 700, flexShrink: 0, minWidth: 18 }}>{numMatch[1]}.</span><span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 13, color: C.slate, lineHeight: 1.65 }}>{renderInline(numMatch[2])}</span></div>);
      }
    } else if (/^>\s/.test(line)) {
      elements.push(<div key={key++} style={{ borderLeft: `3px solid ${C.oceanTeal}30`, paddingLeft: 14, margin: '12px 0', fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(15px, 4vw, 18px)', fontStyle: 'italic', color: `${C.slate}80`, lineHeight: 1.6 }}>{renderInline(line.slice(2))}</div>);
    } else if (line.trim() === '') {
      elements.push(<div key={key++} style={{ height: 6 }} />);
    } else {
      elements.push(<p key={key++} style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 13, color: C.slate, lineHeight: 1.75, margin: '5px 0' }}>{renderInline(line)}</p>);
    }
  }
  return <>{elements}</>;
}

/* ── main page ──────────────────────────────────────────────────────────── */

export default function ItineraryResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { itinerary: rawItinerary, metadata, formData } = location.state || {};
  const dayRefs = useRef([]);

  useEffect(() => {
    if (!rawItinerary) { navigate('/plan'); return; }
    setTimeout(() => setVisible(true), 100);
  }, [rawItinerary, navigate]);

  if (!rawItinerary) return null;

  let itinerary = null;
  try {
    let cleaned = rawItinerary;
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleaned = cleaned.slice(firstBrace, lastBrace + 1);
    }
    itinerary = JSON5.parse(cleaned);
  } catch (e) {
    console.error('JSON parse failed, using markdown fallback:', e.message);
    itinerary = null;
  }

  const isStructured = itinerary && itinerary.days;

  const scrollToDay = (index) => {
    if (dayRefs.current[index]) {
      dayRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ fontFamily: "'Quicksand', sans-serif", background: C.cream, minHeight: '100vh' }}>
      {/* header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 20px',
        background: `${C.cream}f0`,
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${C.sage}08`,
      }}>
        <Link to="/" style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 500, letterSpacing: '0.08em', color: C.slate, textDecoration: 'none' }}>Lila Trips</Link>
        <button onClick={() => navigate('/plan')} style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 11, fontWeight: 600, color: C.sage, background: `${C.white}80`, border: `1px solid ${C.sage}20`, borderRadius: 20, padding: '7px 16px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>New Trip</button>
      </div>

      <div style={{
        maxWidth: 600, margin: '0 auto', padding: '20px 16px 80px',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
      }}>

        {/* hero */}
        {isStructured && (
          <div style={{ textAlign: 'center', padding: '20px 10px 32px' }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px, 7vw, 36px)', fontWeight: 300, color: C.slate, lineHeight: 1.15, marginBottom: 8 }}>{itinerary.title}</h1>
            {itinerary.subtitle && <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(12px, 3.2vw, 14px)', color: `${C.slate}60`, fontStyle: 'italic' }}>{itinerary.subtitle}</p>}
            {itinerary.intro && <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 'clamp(13px, 3.4vw, 14px)', color: `${C.slate}80`, lineHeight: 1.75, maxWidth: 480, margin: '16px auto 0' }}>{itinerary.intro}</p>}
          </div>
        )}

        {/* Destination Snapshot — celestial + weather + seasonal context */}
        {isStructured && (
          <DestinationSnapshot
            snapshot={itinerary.snapshot}
            celestial={metadata?.celestial}
            weather={metadata?.weather}
          />
        )}

        {/* Trip overview at-a-glance */}
        {isStructured && itinerary.days.length > 1 && (
          <TripOverview days={itinerary.days} onDayClick={scrollToDay} />
        )}

        {/* Day cards */}
        {isStructured ? (
          <>
            {itinerary.days.map((day, i) => (
              <div key={i} ref={el => dayRefs.current[i] = el} style={{ scrollMarginTop: 70 }}>
                <DayCard day={day} isFirst={i === 0} dayIndex={i} />
              </div>
            ))}

            {itinerary.beforeYouGo && (
              <div style={{ background: C.white, borderRadius: 20, border: `1px solid ${C.sage}10`, padding: 22, marginTop: 8, boxShadow: `0 2px 16px ${C.sage}06` }}>
                <div style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.sage, marginBottom: 14 }}>Before You Go</div>
                {itinerary.beforeYouGo.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: i < itinerary.beforeYouGo.length - 1 ? `1px solid ${C.sage}08` : 'none' }}>
                    <span style={{ color: C.sage, flexShrink: 0, fontSize: 12 }}>•</span>
                    <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 13, color: C.slate, lineHeight: 1.6 }}>{renderInline(item)}</span>
                  </div>
                ))}
              </div>
            )}
            {itinerary.closingNote && (
              <div style={{ textAlign: 'center', padding: '36px 20px 0' }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px, 4.5vw, 22px)', fontWeight: 300, color: `${C.slate}80`, lineHeight: 1.5, fontStyle: 'italic' }}>{itinerary.closingNote}</p>
              </div>
            )}
          </>
        ) : (
          <div style={{ background: C.white, borderRadius: 20, padding: '24px 22px', border: `1px solid ${C.sage}10`, boxShadow: `0 2px 16px ${C.sage}06` }}>
            <MarkdownContent content={rawItinerary} />
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 48, paddingBottom: 20 }}>
          <button onClick={() => navigate('/plan')} style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 12, fontWeight: 600, color: C.sage, background: 'none', border: `1.5px solid ${C.sage}30`, borderRadius: 28, padding: '12px 28px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>Plan Another Trip</button>
        </div>
      </div>
    </div>
  );
}
