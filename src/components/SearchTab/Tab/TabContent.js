import React from 'react';
import { MapPin, GraduationCap } from 'lucide-react';

export const TabContent = ({ type, items }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-red-500">
        <MapPin className="w-4 h-4" />
        <h2 className="font-medium">Popular Cities in</h2>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {items.cities.map((item, index) => (
          <div
            key={index}
            className="p-3 rounded-md hover:bg-gray-50 cursor-pointer
                     text-gray-600 hover:text-gray-900 transition-colors"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-red-500">
        <GraduationCap className="w-4 h-4" />
        <h2 className="font-medium">Popular University in</h2>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {items.universities.map((item, index) => (
          <div
            key={index}
            className="p-3 rounded-md hover:bg-gray-50 cursor-pointer
                     text-gray-600 hover:text-gray-900 transition-colors"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};