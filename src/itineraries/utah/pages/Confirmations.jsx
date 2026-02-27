import React from 'react';
import { CheckSquare } from 'lucide-react';

const Confirmations = () => (    {
      type: 'content',
      title: 'Confirmations & Tickets',
      icon: <CheckSquare className="w-8 h-8" />,
      content: (
        <div className="space-y-4">
          <div className="bg-sea-glass border-l-4 border-sky-blue rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
              ✈️ Flights
            </p>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Outbound - Alaska Airlines</p>
                <p className="text-sm font-medium text-gray-900">Sun, Nov 2, 2025</p>
                <p className="text-xs text-gray-600">BLI → LAS • Confirmation: RLBK4Q</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Return - Alaska Airlines</p>
                <p className="text-sm font-medium text-gray-900">Sat, Nov 8, 2025</p>
                <p className="text-xs text-gray-600">LAS → BLI • Confirmation: RLBK4Q</p>
              </div>
            </div>
          </div>

          <div className="bg-sandstone border-l-4 border-golden-amber rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
              🚗 Rental Car
            </p>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm font-medium text-gray-900 mb-1">Hertz - Midsize SUV</p>
              <p className="text-xs text-gray-600">(Q4) Jeep Compass or similar</p>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-700"><span className="font-medium">Confirmation:</span> L37835604F5</p>
                <p className="text-xs text-gray-700"><span className="font-medium">Member #:</span> 17971823</p>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-600">Pickup: Sun, Nov 2, 5:30 PM</p>
                <p className="text-xs text-gray-600">Drop-off: Sat, Nov 8, 8:00 AM</p>
              </div>
            </div>
          </div>

          <div className="bg-coral-blush border-l-4 border-sun-salmon rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
              🏨 Hotels
            </p>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 mb-1">The Venetian Resort Las Vegas</p>
                <p className="text-xs text-gray-600 mb-2">Luxury King Suite (Newly Remodeled)</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-700"><span className="font-medium">Check-in:</span> Nov 2, 3:00 PM</p>
                  <p className="text-xs text-gray-700"><span className="font-medium">Confirmation:</span> B_22059540</p>
                  <p className="text-xs text-gray-500">Booked via Super.com</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 mb-1">Cliffrose Springdale</p>
                <p className="text-xs text-gray-600 mb-2">Pool View King Bed • 3 nights</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-700"><span className="font-medium">Check-in:</span> Nov 3, 4:00 PM</p>
                  <p className="text-xs text-gray-700"><span className="font-medium">Check-out:</span> Nov 6, 11:00 AM</p>
                  <p className="text-xs text-gray-700"><span className="font-medium">Confirmation:</span> 3364099541</p>
                  <p className="text-xs text-gray-700"><span className="font-medium">Hilton Honors:</span> 2588244851</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 mb-1">Skyview Hotel, Torrey</p>
                <p className="text-xs text-gray-600 mb-2">Essential Double Queen</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-700"><span className="font-medium">Check-in:</span> Nov 6, 3:00 PM</p>
                  <p className="text-xs text-gray-700"><span className="font-medium">Check-out:</span> Nov 7, 11:00 AM</p>
                  <p className="text-xs text-gray-700"><span className="font-medium">Expedia Itinerary:</span> 73285250236061</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 mb-1">Circa Resort & Casino</p>
                <p className="text-xs text-gray-600 mb-2">Adults Only</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-700"><span className="font-medium">Check-in:</span> Nov 7 after 3:00 PM</p>
                  <p className="text-xs text-gray-700"><span className="font-medium">Confirmation:</span> 926587042</p>
                  <p className="text-xs text-gray-700"><span className="font-medium">Priceline:</span> 192-476-183-96</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-sea-glass border-l-4 border-ocean-teal rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
              🎭 The Sphere
            </p>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm font-medium text-gray-900 mb-1">The Wizard of Oz at Sphere</p>
              <p className="text-xs text-gray-600 mb-2">Fri, Nov 7, 2025 at 1:45 PM</p>
              <div className="space-y-1">
                <p className="text-xs text-gray-700"><span className="font-medium">Location:</span> Sphere at The Venetian Resort</p>
                <p className="text-xs text-gray-700"><span className="font-medium">Seats:</span> Section 308, Row 14</p>
                <p className="text-xs text-gray-700"><span className="font-medium">Quantity:</span> 2 tickets</p>
                <p className="text-xs text-gray-700"><span className="font-medium">Order #:</span> 76343886</p>
              </div>
              <div className="bg-sandstone p-2 rounded border border-golden-amber mt-2">
                <p className="text-xs text-pacific-slate">💡 Use iOS or Android device for entry</p>
              </div>
            </div>
          </div>

          <div className="bg-coral-blush border-l-4 border-sun-salmon rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
              ⛰️ Angels Landing Permit
            </p>
            <div className="bg-white rounded-lg p-3">
              <p className="text-sm font-medium text-gray-900 mb-1">Angels Landing Hiking Permit</p>
              <p className="text-xs text-gray-600 mb-2">Tue, Nov 5, 2025</p>
              <div className="space-y-1">
                <p className="text-xs text-gray-700"><span className="font-medium">Status:</span> Check your permit status</p>
                <p className="text-xs text-gray-500">Visit recreation.gov to confirm</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 text-sm mb-2">📱 Quick Access Tip</p>
            <p className="text-xs text-gray-600">Add this guide to your home screen for easy access to all confirmations on the go!</p>
          </div>
        </div>
      )
    });

export default Confirmations;
