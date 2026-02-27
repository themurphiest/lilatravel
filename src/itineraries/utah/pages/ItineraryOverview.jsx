import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

const ItineraryOverview = ({ goToPage }) => ({
  type: 'content',
  title: 'Quick Itinerary',
  icon: <Calendar className="w-8 h-8" />,
  content: (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 text-center mb-1">Tap any day to view details</p>
      
      <button
        onClick={(e) => {
          e.preventDefault();
          goToPage(2);
        }}
        className="w-full bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-coral-blush active:scale-95 active:bg-coral-blush/10 active:border-coral-blush group touch-manipulation"
        style={{ WebkitTapHighlightColor: 'transparent', minHeight: '72px' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-coral-blush flex items-center justify-center flex-shrink-0">
              <span className="text-lg">✈️</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-sky-blue mb-0.5">Day 1 • Nov 2</p>
              <p className="text-sm text-gray-700 leading-snug">Arrive Las Vegas 6:07 PM</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-sky-blue transition-colors flex-shrink-0" />
        </div>
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          goToPage(3);
        }}
        className="w-full bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-sun-salmon active:scale-95 active:bg-sun-salmon/10 active:border-sun-salmon group touch-manipulation"
        style={{ WebkitTapHighlightColor: 'transparent', minHeight: '72px' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-coral-blush flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🏜️</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-sun-salmon mb-0.5">Day 2 • Nov 3</p>
              <p className="text-sm text-gray-700 leading-snug">Vegas → Zion → Check in Cliffrose</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-sun-salmon transition-colors flex-shrink-0" />
        </div>
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          goToPage(4);
        }}
        className="w-full bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-sky-blue active:scale-95 active:bg-ocean-teal/10 active:border-ocean-teal group touch-manipulation"
        style={{ WebkitTapHighlightColor: 'transparent', minHeight: '72px' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sea-glass/30 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🌊</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-ocean-teal mb-0.5">Day 3 • Nov 4</p>
              <p className="text-sm text-gray-700 leading-snug">The Narrows hike → Lunch → Spa</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-ocean-teal transition-colors flex-shrink-0" />
        </div>
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          goToPage(5);
        }}
        className="w-full bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-sea-glass active:scale-95 active:bg-sea-glass/20 active:border-sea-glass group touch-manipulation"
        style={{ WebkitTapHighlightColor: 'transparent', minHeight: '72px' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sea-glass flex items-center justify-center flex-shrink-0">
              <span className="text-lg">⛰️</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-ocean-teal mb-0.5">Day 4 • Nov 5</p>
              <p className="text-sm text-gray-700 leading-snug">Angels Landing → Bike ride & relaxation</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-ocean-teal transition-colors flex-shrink-0" />
        </div>
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          goToPage(6);
        }}
        className="w-full bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-golden-amber active:scale-95 active:bg-golden-amber/10 active:border-golden-amber group touch-manipulation"
        style={{ WebkitTapHighlightColor: 'transparent', minHeight: '72px' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sandstone flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🚗</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-golden-amber mb-0.5">Day 5 • Nov 6 ⭐</p>
              <p className="text-sm text-gray-700 leading-snug">Scenic Drive → Bryce → Highway 12 → Capitol Reef</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-golden-amber transition-colors flex-shrink-0" />
        </div>
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          goToPage(7);
        }}
        className="w-full bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-coral-blush active:scale-95 active:bg-sky-blue/10 active:border-sky-blue group touch-manipulation"
        style={{ WebkitTapHighlightColor: 'transparent', minHeight: '72px' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sandstone flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🌄</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-sky-blue mb-0.5">Day 6 • Nov 7</p>
              <p className="text-sm text-gray-700 leading-snug">Capitol Reef sunrise → Vegas → The Sphere!</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-sky-blue transition-colors flex-shrink-0" />
        </div>
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          goToPage(8);
        }}
        className="w-full bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-golden-amber active:scale-95 active:bg-golden-amber/10 active:border-golden-amber group touch-manipulation"
        style={{ WebkitTapHighlightColor: 'transparent', minHeight: '72px' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-coral-blush flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🏠</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-golden-amber mb-0.5">Day 7 • Nov 8</p>
              <p className="text-sm text-gray-700 leading-snug">Vegas morning → Flights home</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-golden-amber transition-colors flex-shrink-0" />
        </div>
      </button>
    </div>
  )
});

export default ItineraryOverview;
