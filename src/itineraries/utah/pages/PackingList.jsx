import React from 'react';
import { Package, Phone } from 'lucide-react';

const PackingList = () => (    {
      type: 'content',
      title: 'Packing Essentials',
      icon: <Package className="w-8 h-8" />,
      content: (
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>🥾</span> Hiking Gear
            </p>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">☐ Broken-in hiking boots</p>
              <p className="text-sm text-gray-600">☐ Daypack (20-30L)</p>
              <p className="text-sm text-gray-600">☐ Water bottles (3L total)</p>
              <p className="text-sm text-gray-600">☐ Headlamp + batteries</p>
              <p className="text-sm text-gray-600">☐ Sunscreen, hat, sunglasses</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>👕</span> Clothing (30s-70s F)
            </p>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">☐ Hiking pants/shorts</p>
              <p className="text-sm text-gray-600">☐ Fleece or mid-layer jacket</p>
              <p className="text-sm text-gray-600">☐ Insulated winter jacket</p>
              <p className="text-sm text-gray-600">☐ Rain jacket</p>
              <p className="text-sm text-gray-600">☐ Warm beanie & gloves</p>
              <p className="text-sm text-gray-600">☐ Multiple warm socks</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>🌟</span> Stargazing Kit
            </p>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">☐ Extra warm layers (30s-40s!)</p>
              <p className="text-sm text-gray-600">☐ Blanket to sit on</p>
              <p className="text-sm text-gray-600">☐ Thermos with hot beverages</p>
              <p className="text-sm text-gray-600">☐ Red flashlight</p>
              <p className="text-sm text-gray-600">☐ Star app downloaded</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>👗</span> Resort & Dining
            </p>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">☐ Swimsuit for pools/hot tubs</p>
              <p className="text-sm text-gray-600">☐ 2-3 dressy outfits</p>
              <p className="text-sm text-gray-600">☐ Dress shoes or nice boots</p>
              <p className="text-sm text-gray-600">☐ Comfortable Strip walking shoes</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
              <span>📱</span> Electronics
            </p>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">☐ Phone + car charger</p>
              <p className="text-sm text-gray-600">☐ Camera + charger</p>
              <p className="text-sm text-gray-600">☐ Portable battery pack</p>
              <p className="text-sm text-gray-600">☐ Download offline maps</p>
            </div>
          </div>
        </div>
      )
    });

export default PackingList;
