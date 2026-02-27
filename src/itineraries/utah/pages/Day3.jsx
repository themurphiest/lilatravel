import React from 'react';
import { Calendar, Phone } from 'lucide-react';
import LinkButton from '../components/LinkButton';
import WeatherWidget from '../components/WeatherWidget';

const Day3 = ({ weather }) => (    // Day 3
    {
      type: 'content',
      title: 'Day 3 • Nov 4',
      subtitle: 'The Narrows & Adventure',
      icon: <Calendar className="w-8 h-8" />,
      content: (
        <div className="space-y-4">
          <WeatherWidget weather={weather} location="zion" />

          <div className="bg-coral-blush border-l-4 border-sun-salmon rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>⚠️</span> Flash Flood Safety - CRITICAL
            </p>
            <p className="text-sm text-gray-700 mb-2 font-medium">Before you hike:</p>
            <div className="space-y-2 mb-3">
              <p className="text-xs text-gray-600">• Check flash flood forecast at Visitor Center</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <a
                  href="tel:+14357723256"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-xs transition-all duration-200 shadow-sm hover:shadow-md bg-sun-salmon hover:bg-[#EE6D5A] text-white"
                >
                  <Phone className="w-3 h-3" />
                  Call (435) 772-3256
                </a>
                <LinkButton href="https://www.weather.gov/slc/flashflood" variant="outline">
                  Check Current Conditions
                </LinkButton>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-1 font-medium">DO NOT ENTER if:</p>
            <div className="space-y-1">
              <p className="text-xs text-gray-600">• Rain in forecast (anywhere upstream)</p>
              <p className="text-xs text-gray-600">• Flash flood rating is "Probable" or "Expected"</p>
              <p className="text-xs text-gray-600">• Dark clouds visible</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>🌊</span> The Narrows
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-700"><span className="font-medium">8:00-8:30 AM:</span> Sleep in a bit, hearty breakfast</p>
              <p className="text-sm text-gray-700"><span className="font-medium">9:00 AM:</span> Pick up rental gear</p>
              <p className="text-xs text-gray-500">Waterproof pants, boots, walking stick</p>
              <p className="text-sm text-gray-700"><span className="font-medium">10:00 AM-1:00 PM:</span> Hike (2-4 hours)</p>
              <p className="text-xs text-gray-500 mt-2">💧 November water is COLD - rental gear essential!</p>
              <p className="text-xs text-gray-500">Water temp: 38-45°F - wetsuit/neoprene recommended</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <LinkButton href="https://www.nps.gov/zion/planyourvisit/thenarrows.htm" variant="secondary">
                Trail Information
              </LinkButton>
              <LinkButton href="https://www.zionadventures.com" variant="outline">
                Zion Adventures Rentals
              </LinkButton>
              <LinkButton href="https://www.zionoutfitter.com" variant="outline">
                Zion Outfitter
              </LinkButton>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>⛰️</span> Afternoon Options
            </p>
            <div className="space-y-2">
              <div>
                <LinkButton href="https://www.nps.gov/zion/planyourvisit/east-rim-wilderness-trail-descriptions.htm" variant="outline">
                  Option 1: Observation Point via East Mesa
                </LinkButton>
                <p className="text-xs text-gray-500 mt-1 px-2">7 mi, views ABOVE Angels Landing (1hr drive)</p>
              </div>
              <div>
                <LinkButton href="https://www.nps.gov/thingstodo/hike-canyon-overlook.htm" variant="outline">
                  Option 2: Canyon Overlook Trail
                </LinkButton>
                <p className="text-xs text-gray-500 mt-1 px-2">1 mi easy hike, great views near Zion Tunnel</p>
              </div>
              <div>
                <LinkButton href="https://www.zionoutfitter.com/bike-rentals" variant="outline">
                  Option 3: Mountain Bike Rental
                </LinkButton>
                <p className="text-xs text-gray-500 mt-1 px-2">Explore Pa'rus Trail & Springdale - Zion Outfitter has quality rentals</p>
              </div>
              <div>
                <p className="text-sm text-gray-700 font-medium">Option 4: Rest at pool/hot tub</p>
                <p className="text-xs text-gray-500">Recover from The Narrows - you earned it!</p>
              </div>
            </div>
          </div>

          <div className="bg-sea-glass/30 border-l-4 border-ocean-teal rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>🧘‍♀️</span> Yoga & Wellness (Optional)
            </p>
            <p className="text-xs text-gray-600 mb-3">Post-Narrows recovery yoga - perfect for tired muscles!</p>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 mb-1">Flanigan's Hillside Veranda Yoga</p>
                <p className="text-xs text-gray-600 mb-2">Gentle yoga with sound bath • All levels</p>
                <LinkButton href="https://www.flanigansinn.com/activities" variant="outline">
                  Check Schedule
                </LinkButton>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 mb-1">Zion Guru Skydeck Yoga</p>
                <p className="text-xs text-gray-600 mb-2">Outdoor practice with Zion views • All levels welcome</p>
                <LinkButton href="https://zionguru.com" variant="outline">
                  Learn More
                </LinkButton>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 mb-1">Cosmic Flow Yoga</p>
                <p className="text-xs text-gray-600 mb-2">Meditation & sound healing • Riverside location</p>
                <LinkButton href="https://www.facebook.com/cosmicflowyoga/" variant="outline">
                  View Classes
                </LinkButton>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>🍽️</span> Dinner (Make Reservations!)
            </p>
            <div className="space-y-2">
              <LinkButton href="https://kingslanding.com/" variant="outline">
                King's Landing Bistro
              </LinkButton>
              <LinkButton href="https://www.switchbackgrille.com/" variant="outline">
                Switchback Grille
              </LinkButton>
              <LinkButton href="https://oscarscafe.com/" variant="outline">
                Oscar's Cafe
              </LinkButton>
            </div>
          </div>

          <div className="bg-sea-glass border border-sea-glass rounded-lg p-3 shadow-sm">
            <p className="text-xs font-semibold text-pacific-slate">✓ BOOKED</p>
            <p className="text-sm text-gray-700 mt-1">Cliffrose Springdale (Night 2 of 3)</p>
          </div>
        </div>
      )
    });

export default Day3;
