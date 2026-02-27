import React from 'react';
import { MapPin } from 'lucide-react';

const QuickReference = () => (    {
      type: 'content',
      title: 'Quick Reference',
      icon: <MapPin className="w-8 h-8" />,
      content: (
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>📞</span> Important Numbers
            </p>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Cliffrose: (435) 772-3234</p>
              <p className="text-sm text-gray-600">Zion NP: (435) 772-3256</p>
              <p className="text-sm text-gray-600">Bryce NP: (435) 834-5322</p>
              <p className="text-sm text-gray-600">Capitol Reef NP: (435) 425-3791</p>
              <p className="text-sm text-gray-600">Utah Roads: 511 or udottraffic.utah.gov</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>🌡️</span> November Weather
            </p>
            <div className="space-y-1">
              <p className="text-sm text-gray-600"><span className="font-medium">Zion:</span> Highs 60-70°F, Lows 35-45°F</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Bryce:</span> Highs 45-51°F, Lows 23-28°F ❄️</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Capitol Reef:</span> Highs 52-65°F, Lows 29-41°F</p>
              <p className="text-xs text-gray-500 mt-2">Sunrise: ~7:00 AM • Sunset: ~5:30 PM</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>🚗</span> Driving Times
            </p>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Vegas → Springdale: 2.5 hrs (150 mi)</p>
              <p className="text-sm text-gray-600">Springdale → Bryce: 1.5 hrs (85 mi)</p>
              <p className="text-sm text-gray-600">Bryce → Torrey (Hwy 12): 3-4 hrs (165 mi)</p>
              <p className="text-sm text-gray-600">Torrey → Vegas: 3.5-4 hrs (330 mi)</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>⚠️</span> Before Each Hike
            </p>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">✓ Check weather forecast</p>
              <p className="text-sm text-gray-600">✓ Check trail status/closures</p>
              <p className="text-sm text-gray-600">✓ Arrive early for parking</p>
              <p className="text-sm text-gray-600">✓ Pack layers, water, snacks</p>
              <p className="text-sm text-gray-600">✓ Charge all devices</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>📱</span> Download Before Trip
            </p>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">• Google Maps (offline)</p>
              <p className="text-sm text-gray-600">• Star Walk or Stellarium (stargazing)</p>
              <p className="text-sm text-gray-600">• AllTrails (hiking maps)</p>
              <p className="text-sm text-gray-600">• NPS apps for each park</p>
            </div>
          </div>

          {/* Copyright Notice */}
          <div className="text-center pt-4 pb-2">
            <p className="text-xs text-gray-400">© 2025 FullSend Trips. Have an amazing adventure!</p>
          </div>
        </div>
      )
    });

export default QuickReference;
