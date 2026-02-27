// Park coordinates for weather API
export const parkLocations = {
  zion: { lat: 37.2982, lon: -113.0263, name: 'Zion National Park' },
  bryce: { lat: 37.5930, lon: -112.1871, name: 'Bryce Canyon' },
  capitol: { lat: 38.2821, lon: -111.2479, name: 'Capitol Reef' },
  springdale: { lat: 37.1889, lon: -112.9977, name: 'Springdale' },
  torrey: { lat: 38.2997, lon: -111.4215, name: 'Torrey' }
};

// Static fallback weather data (November averages for these locations)
export const fallbackWeather = {
  zion: { current: 62, high: 68, low: 42, weathercode: 0, wind: 8, precipitation: 10 },
  bryce: { current: 48, high: 51, low: 28, weathercode: 2, wind: 12, precipitation: 15 },
  capitol: { current: 55, high: 62, low: 38, weathercode: 1, wind: 10, precipitation: 12 },
  springdale: { current: 63, high: 69, low: 43, weathercode: 0, wind: 7, precipitation: 10 },
  torrey: { current: 54, high: 61, low: 37, weathercode: 1, wind: 11, precipitation: 12 }
};
