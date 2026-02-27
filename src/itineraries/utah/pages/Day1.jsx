import React from 'react';
import { Calendar, ExternalLink, Phone } from 'lucide-react';
import LinkButton from '../components/LinkButton';

const Day1 = () => (    {
      type: 'content',
      title: 'Day 1 • Nov 2',
      subtitle: 'Vegas Arrival',
      icon: <Calendar className="w-8 h-8" />,
      content: (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <p className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                <span>✈️</span> Flights
              </p>
              <div className="h-6 flex items-center">
                <svg viewBox="0 0 200 60" className="h-full w-auto">
                  <defs>
                    <linearGradient id="allegiantSky" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#4ECDC4', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#44A7C1', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  {/* Sun rays */}
                  <path d="M 85 15 L 90 5 L 95 15 L 105 10 L 100 20 L 110 20 L 105 30 L 110 35 L 100 35 L 95 45 L 90 35 L 85 45 L 80 35 L 70 35 L 75 30 L 70 20 L 80 20 L 75 10 Z" fill="#FFD93D" />
                  {/* Sun center */}
                  <circle cx="90" cy="27" r="8" fill="#FFC93C" />
                  {/* "Allegiant" text */}
                  <text x="5" y="40" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="url(#allegiantSky)">Allegiant</text>
                  {/* "Air" text - smaller and lighter */}
                  <text x="120" y="40" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="300" fill="#44A7C1" opacity="0.7">Air</text>
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-700"><span className="font-medium">3:32 PM</span> Depart Bellingham (BLI)</p>
              <p className="text-sm text-gray-700"><span className="font-medium">6:07 PM</span> Arrive Las Vegas (LAS)</p>
              <p className="text-xs text-gray-500 mt-2">Allegiant Air 273</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <LinkButton href="https://www.allegiantair.com/flight-status" variant="secondary">
                View Flight Status
              </LinkButton>
              <button
                disabled
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm bg-black text-white opacity-50 cursor-not-allowed"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="6" width="16" height="12" rx="2" fill="white" stroke="white" strokeWidth="0.5"/>
                  <rect x="5" y="7" width="14" height="2" rx="0.5" fill="#0A84FF"/>
                  <rect x="5" y="9.5" width="14" height="1.5" rx="0.5" fill="#FFD60A"/>
                  <rect x="5" y="11.5" width="14" height="2" rx="0.5" fill="#FF6482"/>
                  <path d="M12 14 Q10 16 8 16 Q6 16 6 18 L18 18 Q18 16 16 16 Q14 16 12 14 Z" fill="#F0E5D8"/>
                </svg>
                View in Apple Wallet
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <p className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                <span>🚗</span> Rental Car
              </p>
              <div className="h-6 flex items-center">
                <svg viewBox="0 0 120 40" className="h-full w-auto">
                  {/* Hertz text with yellow accent bar */}
                  <rect x="0" y="30" width="120" height="6" fill="#FFD700" />
                  <text x="5" y="25" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fontStyle="italic" fill="#000000">Hertz</text>
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-700 font-medium">Hertz - Midsize SUV</p>
              <p className="text-xs text-gray-600">(Q4) Jeep Compass or similar</p>
              <div className="pt-2 space-y-1">
                <p className="text-xs text-gray-700"><span className="font-medium">Confirmation:</span> L37835604F5</p>
                <p className="text-xs text-gray-700"><span className="font-medium">Member #:</span> 17971823</p>
              </div>
              <div className="pt-2 space-y-1">
                <p className="text-xs text-gray-700"><span className="font-medium">Pickup:</span> Sun, Nov 2, 5:30 PM</p>
                <p className="text-xs text-gray-700"><span className="font-medium">Drop-off:</span> Sat, Nov 8, 8:00 AM</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <p className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                <span>🏨</span> Hotel
              </p>
              <div className="flex items-center px-2 py-1">
                <img src="data:image/png;base64,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" alt="Super.com" className="h-5 w-auto" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-semibold text-gray-900 mb-2">The Venetian Resort Las Vegas</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">3355 S Las Vegas Blvd</p>
                  <p className="text-xs text-gray-600">Las Vegas, NV 89109</p>
                  <p className="text-xs text-gray-600 mt-2">📞 (702) 414-1000</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-600">Room:</p>
                  <p className="text-sm font-medium text-gray-900">Luxury King Suite (Newly Remodeled)</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-600">Check-in:</p>
                  <p className="text-sm font-medium text-gray-900">Nov 2, 2025 (3:00 PM)</p>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-600">Confirmation:</p>
                  <p className="text-sm font-medium text-gray-900">B_22059540</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-600">Booked via:</p>
                  <p className="text-sm font-medium text-gray-900">Super.com</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href="tel:+17024141000"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400"
                >
                  <Phone className="w-4 h-4" />
                  Call Hotel
                </a>
                <a
                  href="https://www.venetianlasvegas.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400"
                >
                  <ExternalLink className="w-4 h-4" />
                  Hotel Website
                </a>
                <a
                  href="#venetian-confirmation"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 bg-pacific-slate hover:bg-[#243647] text-white border-2 border-gray-900"
                >
                  View Confirmation
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm">Dinner Options</p>
            
            <div className="mb-4">
              <a
                href="https://vegas.eater.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-sun-salmon hover:bg-[#EE6D5A] text-white rounded-lg font-bold text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 uppercase tracking-wide"
              >
                <span className="text-base">🍽️</span>
                EATER Las Vegas
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-xs text-gray-500 text-center mt-2">Browse top-rated restaurants & food guides</p>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Casual & Quick</p>
                <div className="space-y-2">
                  <LinkButton href="https://www.hashhouseagogo.com" variant="outline">
                    Hash House A Go Go
                  </LinkButton>
                  <LinkButton href="https://www.eggslut.com" variant="outline">
                    Eggslut
                  </LinkButton>
                  <LinkButton href="https://www.in-n-out.com" variant="outline">
                    In-N-Out Burger
                  </LinkButton>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Slightly Nicer</p>
                <div className="space-y-2">
                  <LinkButton href="https://www.caesars.com/cromwell/restaurants/giada" variant="outline">
                    Giada at The Cromwell
                  </LinkButton>
                  <LinkButton href="https://www.venetianlasvegas.com/restaurants/buddy-vs-ristorante.html" variant="outline">
                    Buddy V's at Venetian
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    });

export default Day1;
