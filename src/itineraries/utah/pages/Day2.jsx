import React from 'react';
import { Calendar, ExternalLink, Phone } from 'lucide-react';
import LinkButton from '../components/LinkButton';
import WeatherWidget from '../components/WeatherWidget';

const Day2 = ({ weather }) => (    // Day 2
    {
      type: 'content',
      title: 'Day 2 • Nov 3',
      subtitle: 'Vegas → Zion',
      icon: <Calendar className="w-8 h-8" />,
      content: (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>🥐</span> Breakfast Options
            </p>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Top Picks Near Venetian</p>
                <div className="space-y-2">
                  <LinkButton href="https://thomaskeller.com/bouchonbakerylasvegas/" variant="outline">
                    Bouchon Bakery (Venetian) ⭐
                  </LinkButton>
                  <LinkButton href="https://www.venetianlasvegas.com/restaurants/buddy-vs-ristorante.html" variant="outline">
                    Buddy V's Ristorante (Venetian)
                  </LinkButton>
                  <LinkButton href="https://www.grandluxcafe.com" variant="outline">
                    Grand Lux Cafe (Venetian)
                  </LinkButton>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Fan Favorites on Strip</p>
                <div className="space-y-2">
                  <LinkButton href="https://www.eggslut.com" variant="outline">
                    Eggslut (Cosmopolitan)
                  </LinkButton>
                  <LinkButton href="https://www.hashhouse.com" variant="outline">
                    Hash House A Go Go (LINQ)
                  </LinkButton>
                  <LinkButton href="https://www.mgmgrand.com/en/restaurants/yardbird.html" variant="outline">
                    Yardbird (Venetian)
                  </LinkButton>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Quick & Easy</p>
                <div className="space-y-2">
                  <LinkButton href="https://www.starbucks.com" variant="outline">
                    Starbucks (Venetian)
                  </LinkButton>
                  <p className="text-sm text-gray-600 px-4 py-2">• Grab & go from hotel market</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>🚗</span> Drive to Springdale
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-700"><span className="font-medium">Distance:</span> 150 miles</p>
              <p className="text-sm text-gray-700"><span className="font-medium">Drive Time:</span> ~2.5 hours</p>
              <p className="text-xs text-gray-500">Route: I-15 N → Exit 16 → UT-9 E</p>
              <p className="text-sm text-gray-700 mt-2"><span className="font-medium">Arrive & check in:</span> Afternoon at Cliffrose ✓</p>
            </div>
            <div className="mt-3">
              <LinkButton href="https://maps.app.goo.gl/jFqWmdmL28xAF2sv6" variant="primary">
                Get Directions
              </LinkButton>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <p className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                <span>🏨</span> Hotel - Cliffrose Springdale
              </p>
              <div className="flex items-center px-2 py-1">
                <img src="data:image/png;base64,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" alt="Curio Collection by Hilton" className="h-5 w-auto" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-semibold text-gray-900 mb-2">Cliffrose Springdale, Curio Collection by Hilton</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">281 Zion Park Boulevard</p>
                  <p className="text-xs text-gray-600">Springdale, UT 84767</p>
                  <p className="text-xs text-gray-600 mt-2">📞 (435) 772-3234</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-600">Room:</p>
                  <p className="text-sm font-medium text-gray-900">Pool View King Bed</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-600">Check-in:</p>
                  <p className="text-sm font-medium text-gray-900">Nov 3, 2025 (4:00 PM)</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-600">Check-out:</p>
                  <p className="text-sm font-medium text-gray-900">Nov 6, 2025 (11:00 AM)</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-600">Nights:</p>
                  <p className="text-sm font-medium text-gray-900">3 nights</p>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-600">Confirmation:</p>
                  <p className="text-sm font-medium text-gray-900">3364099541</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-600">Hilton Honors:</p>
                  <p className="text-sm font-medium text-gray-900">2588244851</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href="tel:+14357723234"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400"
                >
                  <Phone className="w-4 h-4" />
                  Call Hotel
                </a>
                <a
                  href="https://www.cliffroselodge.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400"
                >
                  <ExternalLink className="w-4 h-4" />
                  Hotel Website
                </a>
                <a
                  href="#cliffrose-confirmation"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 bg-pacific-slate hover:bg-[#243647] text-white border-2 border-gray-900"
                >
                  View Confirmation
                </a>
              </div>
            </div>
          </div>

          <WeatherWidget weather={weather} location="springdale" />

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>🥾</span> Afternoon Hike
            </p>
            <p className="text-sm text-gray-700 mb-3 font-medium">Easy options after travel:</p>
            <div className="space-y-2">
              <LinkButton href="https://www.nps.gov/thingstodo/hike-lower-emerald-pool-trail.htm" variant="outline">
                Emerald Pools Trail (3 mi)
              </LinkButton>
              <LinkButton href="https://www.nps.gov/thingstodo/hike-pa-rus-trail.htm" variant="outline">
                Pa'rus Trail (paved, easy)
              </LinkButton>
              <LinkButton href="https://www.nps.gov/zion/planyourvisit/zion-canyon-trail-descriptions.htm" variant="outline">
                Canyon Junction Bridge
              </LinkButton>
            </div>
            <p className="text-sm text-gray-700 mt-3">Pool/hot tub time at resort</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>🌅</span> Evening
            </p>
            <div className="mb-3">
              <p className="text-sm text-gray-700 mb-2 font-medium">Sunset Options:</p>
              <LinkButton href="https://www.nps.gov/thingstodo/hike-watchman-trail.htm" variant="outline">
                Watchman Trail
              </LinkButton>
              <p className="text-xs text-gray-500 mt-2 px-2">or relax at hotel patio</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-700 mb-2 font-medium">Dinner Options:</p>
              <div className="space-y-2">
                <LinkButton href="https://whiptailgrillzion.com/" variant="outline">
                  Whiptail Grill
                </LinkButton>
                <LinkButton href="https://oscarscafe.com/" variant="outline">
                  Oscar's Cafe
                </LinkButton>
                <LinkButton href="https://www.cliffroselodge.com/dining" variant="outline">
                  Cliffrose Dining
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      )
    });

export default Day2;
