import React from 'react';
import { Sun, Cloud, CloudRain, Wind } from 'lucide-react';
import { parkLocations } from '../data/weatherConfig';

// Get weather icon based on code
export const getWeatherIcon = (code) => {
  if (code === 0) return <Sun className="w-5 h-5" />;
  if (code <= 3) return <Cloud className="w-5 h-5" />;
  if (code <= 67) return <CloudRain className="w-5 h-5" />;
  return <Wind className="w-5 h-5" />;
};

const WeatherWidget = ({ location, weather, compact = false }) => {
  const data = weather[location];
  
  // Since we always have fallback data, we should always have data
  if (!data) {
    return null; // This should never happen
  }

  // Get weather description based on code
  const getWeatherDescription = (code) => {
    if (code === 0) return 'Clear';
    if (code === 1) return 'Mostly Clear';
    if (code === 2) return 'Partly Cloudy';
    if (code === 3) return 'Cloudy';
    if (code <= 67) return 'Rainy';
    return 'Windy';
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        {getWeatherIcon(data.weathercode)}
        <span className="font-semibold">{data.high}°F</span>
        <span className="text-gray-600">/ {data.low}°F</span>
      </div>
    );
  }

  // Full weather widget with Samadhi Travel styling
  return (
    <div className="bg-gradient-to-br from-sky-blue via-ocean-teal to-pacific-slate p-5 rounded-2xl shadow-lg text-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative">
        {/* Location name */}
        <p className="text-sm font-medium opacity-90 mb-1">{parkLocations[location].name}</p>
        
        {/* Large temperature display */}
        <div className="flex items-start mb-1">
          <span className="text-6xl font-light tracking-tight">{data.current}</span>
          <span className="text-3xl font-light mt-1">°</span>
        </div>
        
        {/* Weather condition */}
        <p className="text-lg font-medium mb-1">{getWeatherDescription(data.weathercode)}</p>
        
        {/* High/Low */}
        <p className="text-sm font-medium opacity-90 mb-4">
          H:{data.high}° L:{data.low}°
        </p>
        
        {/* Divider line */}
        <div className="h-px bg-white/20 mb-3"></div>
        
        {/* Additional details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 opacity-80" />
            <div>
              <p className="text-xs opacity-70">Wind</p>
              <p className="font-semibold">{data.wind} mph</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CloudRain className="w-4 h-4 opacity-80" />
            <div>
              <p className="text-xs opacity-70">Rain</p>
              <p className="font-semibold">{data.precipitation}%</p>
            </div>
          </div>
        </div>
        
        {/* Footer note */}
        <p className="text-[10px] opacity-60 mt-3 text-center">November forecast</p>
      </div>
    </div>
  );
};

export default WeatherWidget;
