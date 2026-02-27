import React from 'react';
import { Calendar } from 'lucide-react';
import LinkButton from '../components/LinkButton';

const Day4 = () => (    // Day 4
    {
      type: 'content',
      title: 'Day 4 • Nov 5',
      subtitle: 'Angels Landing & Relaxation',
      icon: <Calendar className="w-8 h-8" />,
      content: (
        <div className="space-y-4">
          <div className="bg-white border-l-4 border-sun-salmon rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>⛰️</span> Angels Landing Hike
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-700"><span className="font-medium">8:00 AM:</span> Breakfast & prepare</p>
              <p className="text-sm text-gray-700"><span className="font-medium">9:00 AM:</span> Catch shuttle to Grotto (Stop #6)</p>
              <p className="text-sm text-gray-700"><span className="font-medium">9:30 AM-1:30 PM:</span> Angels Landing hike</p>
              <p className="text-xs text-gray-500">5.4 miles round trip • 1,488 ft elevation gain • 4-5 hours</p>
              <p className="text-xs text-sky-blue font-medium mt-2">⚠️ Permit required - check you have it!</p>
              <p className="text-xs text-gray-500">Chains section at the top • Not for those afraid of heights</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <LinkButton href="https://www.nps.gov/zion/planyourvisit/angels-landing-hiking-permits.htm" variant="secondary">
                Trail Information
              </LinkButton>
              <LinkButton href="https://www.recreation.gov/timed-entry/10087438" variant="outline">
                Check Permit Status
              </LinkButton>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>🚴</span> Afternoon - Relaxation Mode
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-700"><span className="font-medium">2:00-3:00 PM:</span> Lunch in Springdale</p>
              <p className="text-sm text-gray-700 mb-2"><span className="font-medium">3:30-5:30 PM:</span> Choose your adventure:</p>
              <div className="space-y-2">
                <LinkButton href="https://www.nps.gov/thingstodo/hike-pa-rus-trail.htm" variant="outline">
                  Pa'rus Trail (bike or walk)
                </LinkButton>
                <p className="text-sm text-gray-600">• Pool & hot tub at Cliffrose</p>
                <p className="text-sm text-gray-600">• Browse Springdale galleries & shops</p>
                <LinkButton href="https://www.nps.gov/thingstodo/hike-riverside-walk.htm" variant="outline">
                  Riverside Walk (paved, easy)
                </LinkButton>
              </div>
            </div>
          </div>

          <div className="bg-sea-glass/30 border-l-4 border-ocean-teal rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>🧘‍♀️</span> Yoga & Recovery (Optional)
            </p>
            <p className="text-xs text-gray-600 mb-3">Perfect for post-Angels Landing recovery & muscle relief</p>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 mb-1">Homebody Healing</p>
                <p className="text-xs text-gray-600 mb-2">Weekly classes at Cable Mountain Spa • Restorative yoga</p>
                <LinkButton href="https://www.cablemountainspa.com" variant="outline">
                  Check Schedule
                </LinkButton>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 mb-1">Cosmic Flow Sunset Session</p>
                <p className="text-xs text-gray-600 mb-2">Yoga beneath the stars • Once-in-a-lifetime experience</p>
                <LinkButton href="https://www.facebook.com/cosmicflowyoga/" variant="outline">
                  View Times
                </LinkButton>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>☀️</span> Late Afternoon Options
            </p>
            <div className="space-y-2">
              <LinkButton href="https://www.nps.gov/zion/planyourvisit/kolob-canyons.htm" variant="outline">
                Kolob Canyons Scenic Drive
              </LinkButton>
              <p className="text-sm text-gray-600">• Grafton Ghost Town photos (20 min drive)</p>
              <p className="text-sm text-gray-600">• Couples spa treatments (book in advance!)</p>
              <p className="text-sm text-gray-600">• More pool/hot tub time</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>🌆</span> Evening
            </p>
            <p className="text-sm text-gray-700 mb-2 font-medium">Final nice dinner in Springdale:</p>
            <div className="space-y-2">
              <LinkButton href="https://www.switchbackgrille.com/" variant="outline">
                Switchback Grille
              </LinkButton>
              <LinkButton href="https://www.spotteddogcafe.com/" variant="outline">
                Spotted Dog Café
              </LinkButton>
              <LinkButton href="https://bitandspur.com/" variant="outline">
                Bit and Spur
              </LinkButton>
            </div>
            <p className="text-sm text-gray-600 mt-3">Optional: Cowboys & Angels Speakeasy after (mocktails available)</p>
            <p className="text-xs text-gray-500 mt-3">Pack up tonight for tomorrow's big scenic drive!</p>
          </div>

          <div className="bg-sea-glass border border-sea-glass rounded-lg p-3 shadow-sm">
            <p className="text-xs font-semibold text-pacific-slate">✓ BOOKED</p>
            <p className="text-sm text-gray-700 mt-1">Cliffrose Springdale (Night 3 of 3)</p>
          </div>
        </div>
      )
    });

export default Day4;
