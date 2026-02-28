/**
 * Lila Trips — Destination Data Service
 * 
 * Gathers curated content + live data for a destination,
 * then assembles the full context for the Claude API call.
 * 
 * This runs on your backend (Vercel serverless function).
 */

import fs from 'fs';
import path from 'path';
import { generateMatchingInstructions } from './preference-mapping.js';

// ============================================================
// CONFIGURATION
// ============================================================

const NPS_API_KEY = process.env.NPS_API_KEY; // Get free key at developer.nps.gov
const NPS_BASE_URL = 'https://developer.nps.gov/api/v1';

// Park codes for each Lila Trips destination
const PARK_CODES = {
  zion: 'zion',
  'joshua-tree': 'jotr',
  'big-sur': null, // Not an NPS unit — no NPS API data
  'olympic-peninsula': 'olym',
  kauai: null, // State parks, not NPS
};

// Open-Meteo coordinates for weather forecasts
const DESTINATION_COORDS = {
  zion: { lat: 37.2982, lon: -113.0263 },
  'joshua-tree': { lat: 33.8734, lon: -115.9010 },
  'big-sur': { lat: 36.2704, lon: -121.8081 },
  'olympic-peninsula': { lat: 47.8021, lon: -123.6044 },
  kauai: { lat: 22.0964, lon: -159.5261 },
};


// ============================================================
// STATIC CONTENT — Your curated, vetted destination guides
// ============================================================

/**
 * Load the curated destination guide (markdown file).
 * This is YOUR editorial content — the single source of truth.
 */
function loadGuide(destination) {
  const guidePath = path.join(process.cwd(), 'src', 'data', 'destinations', `${destination}.md`);
  
  if (!fs.existsSync(guidePath)) {
    throw new Error(`No guide found for destination: ${destination}`);
  }
  
  return fs.readFileSync(guidePath, 'utf-8');
}


// ============================================================
// LIVE DATA — NPS API
// ============================================================

/**
 * Fetch current alerts (closures, dangers, cautions) from NPS API.
 * Returns human-readable summary for the Claude prompt.
 */
async function fetchNPSAlerts(destination) {
  const parkCode = PARK_CODES[destination];
  if (!parkCode || !NPS_API_KEY) return null;

  try {
    const response = await fetch(
      `${NPS_BASE_URL}/alerts?parkCode=${parkCode}&limit=20`,
      { headers: { 'X-Api-Key': NPS_API_KEY } }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const alerts = data.data;

    if (!alerts || alerts.length === 0) {
      return 'No current alerts or closures.';
    }

    return alerts.map(alert => 
      `[${alert.category.toUpperCase()}] ${alert.title}: ${alert.description}`
    ).join('\n\n');
  } catch (error) {
    console.error('NPS Alerts fetch failed:', error);
    return null;
  }
}

/**
 * Fetch campground info from NPS API.
 */
async function fetchNPSCampgrounds(destination) {
  const parkCode = PARK_CODES[destination];
  if (!parkCode || !NPS_API_KEY) return null;

  try {
    const response = await fetch(
      `${NPS_BASE_URL}/campgrounds?parkCode=${parkCode}&limit=20`,
      { headers: { 'X-Api-Key': NPS_API_KEY } }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data.data.map(cg => ({
      name: cg.name,
      description: cg.description,
      reservationType: cg.reservationInfo,
      totalSites: cg.campsites?.totalSites,
      amenities: cg.amenities,
    }));
  } catch (error) {
    console.error('NPS Campgrounds fetch failed:', error);
    return null;
  }
}


// ============================================================
// LIVE DATA — Weather (Open-Meteo, free, no API key needed)
// ============================================================

/**
 * Fetch weather forecast for specific travel dates.
 * Open-Meteo provides 16-day forecasts for free.
 * If dates are beyond 16 days, returns historical averages note.
 */
async function fetchWeather(destination, startDate, endDate) {
  const coords = DESTINATION_COORDS[destination];
  if (!coords) return null;

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${coords.lat}&longitude=${coords.lon}` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode` +
      `&temperature_unit=fahrenheit` +
      `&start_date=${startDate}&end_date=${endDate}` +
      `&timezone=America/Denver`
    );

    if (!response.ok) return null;

    const data = await response.json();
    const daily = data.daily;

    if (!daily || !daily.time) return null;

    return daily.time.map((date, i) => ({
      date,
      high: Math.round(daily.temperature_2m_max[i]),
      low: Math.round(daily.temperature_2m_min[i]),
      precipChance: daily.precipitation_probability_max[i],
      code: daily.weathercode[i],
    }));
  } catch (error) {
    console.error('Weather fetch failed:', error);
    return null;
  }
}

/**
 * Convert weather code to human-readable description.
 */
function weatherDescription(code) {
  const descriptions = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Depositing rime fog',
    51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
    61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
    80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
    95: 'Thunderstorm', 96: 'Thunderstorm with hail',
  };
  return descriptions[code] || 'Unknown';
}

/**
 * Format weather data into a readable summary for the Claude prompt.
 */
function formatWeatherForPrompt(weatherData) {
  if (!weatherData) return 'Weather forecast not available. Suggest traveler check closer to trip dates.';
  
  return weatherData.map(day => 
    `${day.date}: High ${day.high}°F / Low ${day.low}°F — ${weatherDescription(day.code)} (${day.precipChance}% precip chance)`
  ).join('\n');
}


// ============================================================
// MAIN: Assemble Full Context for Claude API Call
// ============================================================

/**
 * The main function. Call this from your API route.
 * 
 * @param {string} destination - e.g., 'zion'
 * @param {Object} userPreferences - From your onboarding flow
 * @param {string} userPreferences.dates.start - ISO date string
 * @param {string} userPreferences.dates.end - ISO date string
 * @param {string[]} userPreferences.wellness - e.g., ['yoga', 'breathwork', 'hiking']
 * @param {string} userPreferences.energy - 'gentle' | 'moderate' | 'adventurous'
 * @param {string} userPreferences.budget - 'budget' | 'mid-range' | 'premium'
 * @param {string} userPreferences.intention - Free text from onboarding
 * @param {string} userPreferences.groupType - 'solo' | 'couple' | 'friends' | 'family'
 * @param {string} userPreferences.name - Traveler's name
 */
export async function assembleContext(destination, userPreferences) {
  // 1. Load static curated content
  const guide = loadGuide(destination);

  // 2. Fetch live data in parallel
  const hasExactDates = userPreferences.dates?.start && userPreferences.dates?.end;
  
  const [alerts, weather, campgrounds] = await Promise.all([
    fetchNPSAlerts(destination),
    hasExactDates 
      ? fetchWeather(destination, userPreferences.dates.start, userPreferences.dates.end)
      : Promise.resolve(null), // No weather fetch if only month selected
    fetchNPSCampgrounds(destination),
  ]);

  // 3. Generate matching instructions from preferences
  const matchingInstructions = generateMatchingInstructions(userPreferences);

  // 4. Assemble the context block that goes into the Claude prompt
  const context = {
    guide,
    liveData: {
      alerts: alerts || 'No alert data available.',
      weather: formatWeatherForPrompt(weather),
      campgrounds: campgrounds ? JSON.stringify(campgrounds, null, 2) : null,
    },
    traveler: userPreferences,
    matchingInstructions,
  };

  return context;
}


// ============================================================
// BUILD THE CLAUDE API MESSAGE
// ============================================================

/**
 * Construct the full message payload for the Anthropic API.
 */
export function buildClaudeMessage(context, systemPrompt) {
  const userMessage = `
## Destination Guide (ONLY recommend from this content)

${context.guide}

---

## Live Data

### Current Park Alerts
${context.liveData.alerts}

### Weather Forecast for Travel Dates
${context.liveData.weather}

${context.liveData.campgrounds ? `### Campground Data\n${context.liveData.campgrounds}` : ''}

---

## Traveler Profile

- **Name**: ${context.traveler.name || 'Traveler'}
- **Dates**: ${context.traveler.dates?.start ? `${context.traveler.dates.start} to ${context.traveler.dates.end}` : `Month: ${context.traveler.month || 'Not specified'}`}
- **Wellness interests**: ${context.traveler.wellness?.join(', ') || context.traveler.interests?.map(i => i).join(', ') || 'Not specified'}
- **Energy level**: ${context.traveler.energy}
- **Stay style**: ${context.traveler.stayStyle || 'Not specified'}
- **Budget**: ${context.traveler.budget}
- **Group**: ${context.traveler.groupType}${context.traveler.groupSize > 1 ? ` (${context.traveler.groupSize} people)` : ''}
- **Intention**: ${context.traveler.intention}

---

## Matching Instructions (follow these precisely)

${context.matchingInstructions || 'Use the traveler profile above to personalize recommendations from the guide.'}

---

Please create a personalized day-by-day itinerary for this traveler based on the destination guide above. Follow all rules in your system prompt. Only recommend places, trails, restaurants, and experiences that appear in the guide. Account for the weather forecast and any active alerts. Follow the matching instructions to select content that fits this specific traveler.
`.trim();

  return {
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      { role: 'user', content: userMessage }
    ],
  };
}
