// ═══════════════════════════════════════════════════════════════════════════════
// CELESTIAL SERVICE — live conditions for the Celestial Snapshot sidebar
// ═══════════════════════════════════════════════════════════════════════════════
//
// Aggregates weather, sun, moon, night sky, river level, celestial events,
// and NPS alerts into a single snapshot object. Uses Promise.allSettled so
// partial API failures degrade gracefully (null sections are hidden in the UI).
//

import { CELESTIAL_CONFIG } from '@data/celestialConfig';


// ─── Weather Code Labels ─────────────────────────────────────────────────────

const WEATHER_LABELS = {
  0: "Clear", 1: "Mostly Clear", 2: "Partly Cloudy", 3: "Overcast",
  45: "Foggy", 48: "Freezing Fog",
  51: "Light Drizzle", 53: "Drizzle", 55: "Heavy Drizzle",
  61: "Light Rain", 63: "Rain", 65: "Heavy Rain",
  71: "Light Snow", 73: "Snow", 75: "Heavy Snow",
  80: "Showers", 81: "Mod. Showers", 82: "Heavy Showers",
  95: "Thunderstorm", 96: "Thunderstorm + Hail",
};


// ─── Celestial Events Calendar ───────────────────────────────────────────────

const CELESTIAL_EVENTS = [
  { month: 1, day: 3, name: "Quadrantid Meteor Shower", detail: "Up to 120 meteors/hr. Best before dawn." },
  { month: 3, day: 20, name: "Spring Equinox", detail: "Equal day and night. Sacred transition point." },
  { month: 4, day: 22, name: "Lyrid Meteor Shower", detail: "Up to 20 meteors/hr at peak. Best after midnight." },
  { month: 5, day: 6, name: "Eta Aquariid Meteor Shower", detail: "Debris from Halley's Comet. Best before dawn." },
  { month: 6, day: 20, name: "Summer Solstice", detail: "Longest day. Canyon light at its most dramatic." },
  { month: 7, day: 28, name: "Delta Aquariid Meteor Shower", detail: "Up to 25 meteors/hr. Warm night viewing." },
  { month: 8, day: 12, name: "Perseid Meteor Shower", detail: "The year's best — up to 100 meteors/hr. Peak viewing after 10 PM." },
  { month: 9, day: 22, name: "Autumn Equinox", detail: "Light shifts. Cottonwoods begin to turn." },
  { month: 10, day: 21, name: "Orionid Meteor Shower", detail: "Up to 20 meteors/hr. Another gift from Halley's Comet." },
  { month: 12, day: 13, name: "Geminid Meteor Shower", detail: "Up to 150 meteors/hr. Best show of the year — dress warm." },
  { month: 12, day: 21, name: "Winter Solstice", detail: "Shortest day. Most dramatic canyon light of the year." },
];


// ─── Sky Quality Labels ──────────────────────────────────────────────────────

const QUALITY_LABELS = { 5: "Extraordinary", 4: "Exceptional", 3: "Good", 2: "Fair", 1: "Washed Out" };


// ─── Milky Way Windows (Zion-specific rough estimates) ───────────────────────

const MW_WINDOWS = {
  3: "4:00 AM – 5:30 AM", 4: "2:30 AM – 5:00 AM", 5: "12:30 AM – 4:30 AM",
  6: "10:30 PM – 3:30 AM", 7: "9:30 PM – 2:30 AM", 8: "9:00 PM – 1:30 AM",
  9: "8:30 PM – 12:30 AM", 10: "8:00 PM – 10:30 PM",
};


// ─── Weather (Open-Meteo) ────────────────────────────────────────────────────

async function fetchWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: "temperature_2m,weather_code,wind_speed_10m",
    daily: "temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset",
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    timezone: "America/Denver",
    forecast_days: 1,
  });
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) throw new Error("Weather fetch failed");
  return res.json();
}


// ─── Sun (extracted from Open-Meteo response) ───────────────────────────────

function extractSunData(weatherResult, now) {
  if (weatherResult.status !== "fulfilled") return null;
  const d = weatherResult.value.daily;
  const rise = new Date(d.sunrise[0]);
  const set = new Date(d.sunset[0]);

  const fmt = (date) => date.toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/Denver",
  });

  const diffMs = set - rise;
  const hours = Math.floor(diffMs / 3600000);
  const mins = Math.round((diffMs % 3600000) / 60000);

  const progress = Math.max(0, Math.min(1, (now - rise) / (set - rise)));

  return {
    rise: fmt(rise),
    set: fmt(set),
    daylight: `${hours}h ${mins}m`,
    progress,
  };
}


// ─── Moon Phase (synodic calculation) ────────────────────────────────────────

function getMoonPhase(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  const day = date.getDate();

  if (month <= 2) { year--; month += 12; }
  const c = Math.floor(365.25 * year);
  const e = Math.floor(30.6001 * (month + 1));
  let jd = c + e + day - 694039.09;
  jd /= 29.5305882;
  const b = Math.floor(jd);
  jd -= b;
  const age = Math.round(jd * 29.5305882);
  const phase = Math.round((1 - Math.cos(jd * 2 * Math.PI)) / 2 * 100);

  const names = [
    "New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
    "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent",
  ];
  const idx = Math.floor(jd * 8) % 8;

  return { phase, name: names[idx], age };
}


// ─── Night Sky Quality ───────────────────────────────────────────────────────

function getSkyQuality(bortleClass, moonIllumination, month) {
  const bortleScore = Math.max(1, 6 - bortleClass);
  const moonPenalty = (moonIllumination / 100) * 2;
  const quality = Math.max(1, Math.min(5, Math.round(bortleScore - moonPenalty)));

  const coreVisible = month >= 3 && month <= 10;
  const goodViewing = moonIllumination < 40;

  let milkyWay;
  if (!coreVisible) {
    milkyWay = { visible: false };
  } else if (!goodViewing) {
    milkyWay = { visible: true, note: "Moonlight may wash out fainter details" };
  } else {
    milkyWay = { visible: true, window: MW_WINDOWS[month] || null };
  }

  return {
    bortle: bortleClass,
    quality,
    label: QUALITY_LABELS[quality],
    milkyWayVisible: milkyWay.visible,
    milkyWayWindow: milkyWay.window || null,
    milkyWayNote: milkyWay.note || null,
  };
}


// ─── River Level (USGS Water Services) ───────────────────────────────────────

async function getRiverLevel(siteId = "09405500") {
  const url = `https://waterservices.usgs.gov/nwis/iv/?sites=${siteId}&parameterCd=00060,00010&format=json&period=P1D`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("USGS fetch failed");
  const data = await res.json();

  const series = data.value.timeSeries;
  const discharge = series.find(s => s.variable.variableCode[0].value === "00060");
  const temp = series.find(s => s.variable.variableCode[0].value === "00010");

  const cfs = parseFloat(discharge?.values[0]?.value[0]?.value || 0);
  const tempC = parseFloat(temp?.values[0]?.value[0]?.value || 0);
  const tempF = Math.round(tempC * 9 / 5 + 32);

  let level, label;
  if (cfs < 50) { level = "low"; label = "Low — Narrows ideal"; }
  else if (cfs < 150) { level = "moderate"; label = "Moderate — Narrows accessible"; }
  else if (cfs < 300) { level = "high"; label = "High — Narrows caution"; }
  else { level = "dangerous"; label = "Dangerous — Narrows closed"; }

  return { level, cfs: Math.round(cfs), label, tempF };
}


// ─── Next Celestial Event ────────────────────────────────────────────────────

function getNextCelestialEvent() {
  const now = new Date();
  const thisYear = now.getFullYear();

  for (const evt of CELESTIAL_EVENTS) {
    const date = new Date(thisYear, evt.month - 1, evt.day);
    if (date > now) {
      const daysAway = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
      const formatted = date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
      return { ...evt, date: formatted, daysAway };
    }
  }
  // Wrap to next year
  const first = CELESTIAL_EVENTS[0];
  const date = new Date(thisYear + 1, first.month - 1, first.day);
  const daysAway = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
  return { ...first, date: date.toLocaleDateString("en-US", { month: "long", day: "numeric" }), daysAway };
}


// ─── NPS Alerts ──────────────────────────────────────────────────────────────

async function fetchNPSAlerts(parkCode) {
  const apiKey = import.meta.env.VITE_NPS_API_KEY;
  if (!apiKey) return [];
  const res = await fetch(
    `https://developer.nps.gov/api/v1/alerts?parkCode=${parkCode}&api_key=${apiKey}`
  );
  if (!res.ok) throw new Error("NPS fetch failed");
  const data = await res.json();
  return (data.data || []).map(a => a.title);
}


// ─── Orchestrator ────────────────────────────────────────────────────────────

export async function getCelestialSnapshot(destinationKey = "zion") {
  const config = CELESTIAL_CONFIG[destinationKey];
  const now = new Date();

  const [weatherData, riverData, alertsData] = await Promise.allSettled([
    fetchWeather(config.lat, config.lon),
    getRiverLevel(config.usgsSiteId),
    fetchNPSAlerts(config.parkCode),
  ]);

  const moonData = getMoonPhase(now);
  const sunData = extractSunData(weatherData, now);
  const skyData = getSkyQuality(config.bortleClass, moonData.phase, now.getMonth() + 1);
  const nextEvent = getNextCelestialEvent();

  // Build weather return shape
  let weather = null;
  if (weatherData.status === "fulfilled") {
    const cur = weatherData.value.current;
    const daily = weatherData.value.daily;
    weather = {
      temp: Math.round(cur.temperature_2m),
      high: Math.round(daily.temperature_2m_max[0]),
      low: Math.round(daily.temperature_2m_min[0]),
      condition: WEATHER_LABELS[cur.weather_code] || "Unknown",
      wind: Math.round(cur.wind_speed_10m),
      weatherCode: cur.weather_code,
    };
  }

  return {
    weather,
    sun: sunData,
    moon: moonData,
    sky: skyData,
    river: riverData.status === "fulfilled" ? riverData.value : null,
    nextEvent,
    alerts: alertsData.status === "fulfilled" ? alertsData.value : [],
    fetchedAt: now.toISOString(),
  };
}
