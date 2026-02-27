import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';

const CoverPage = () => ({
  type: 'cover',
  title: 'Southern Utah',
  subtitle: 'Anniversary Adventure',
  date: 'November 2-8, 2025',
  icon: <MapPin className="w-16 h-16" />,
  content: (
    <div className="mt-4 px-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-xl">
        <p className="text-xs font-semibold text-gray-500 mb-3 text-center tracking-wide uppercase">Your Route</p>
        
        {/* Horizontal Trip Flow */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-sun-salmon flex items-center justify-center mb-1.5 shadow-md">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs font-semibold text-gray-900 text-center leading-tight">Las<br/>Vegas</p>
          </div>
          
          <ChevronRight className="w-4 h-4 text-sun-salmon mb-5" />
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-sun-salmon flex items-center justify-center mb-1.5 shadow-md">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs font-semibold text-gray-900 text-center leading-tight">Zion<br/>NP</p>
          </div>
          
          <ChevronRight className="w-4 h-4 text-sky-blue mb-5" />
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-sky-blue flex items-center justify-center mb-1.5 shadow-md">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs font-semibold text-gray-900 text-center leading-tight">Bryce<br/>Canyon</p>
          </div>
          
          <ChevronRight className="w-4 h-4 text-ocean-teal mb-5" />
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-ocean-teal flex items-center justify-center mb-1.5 shadow-md">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs font-semibold text-gray-900 text-center leading-tight">Capitol<br/>Reef</p>
          </div>
          
          <ChevronRight className="w-4 h-4 text-golden-amber mb-5" />
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-golden-amber flex items-center justify-center mb-1.5 shadow-md">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs font-semibold text-gray-900 text-center leading-tight">Las<br/>Vegas</p>
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex justify-center gap-6 text-center">
            <div>
              <p className="text-lg font-bold text-sky-blue">650 mi</p>
              <p className="text-xs text-gray-400">Distance</p>
            </div>
            <div className="border-l border-gray-300"></div>
            <div>
              <p className="text-lg font-bold text-sky-blue">7 days</p>
              <p className="text-xs text-gray-400">Duration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});

export default CoverPage;
