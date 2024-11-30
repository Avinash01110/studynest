import React, { useState } from 'react';
import { TabButton } from './Tab/TabButton';
import { TabContent } from './Tab/TabContent';
import { X } from 'lucide-react';

const countries = [
  {
    code: 'UK',
    flag: '🇬🇧',
    data: {
      cities: ['London', 'Manchester', 'Leicester', 'Sheffield', 'Nottingham'],
      universities: ['Aston University', 'De Montfort University', 'University of Manchester']
    }
  },
  {
    code: 'AUS',
    flag: '🇦🇺',
    data: {
      cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
      universities: ['University of Sydney', 'University of Melbourne', 'Monash University']
    }
  },
  {
    code: 'IRL',
    flag: '🇮🇪',
    data: {
      cities: ['Dublin', 'Cork', 'Galway', 'Limerick'],
      universities: ['Trinity College Dublin', 'University College Dublin', 'NUI Galway']
    }
  }
];

export const CountryTabs = ({ setIsModalOpen }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [activeTab, setActiveTab] = useState('cities');

  return (
    // <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50'
    //   // onClick={()=>setIsModalOpen(false)}
    // >
    <div className='absolute flex justify-center w-full max-w-2xl h-fit'>
      <div className="w-full rounded-lg overflow-hidden shadow-lg bg-white ">
        <div className='flex justify-between pr-2'>
          <div className="flex gap-2">
            {countries.map((country) => (
              <TabButton
                key={country.code}
                country={country.code}
                flag={country.flag}
                setIsModalOpen={setIsModalOpen}
                isSelected={selectedCountry.code === country.code}
                onClick={() => setSelectedCountry(country)}
              />
            ))}
          </div>
          <button onClick={() => setIsModalOpen(false)}>
            <X />
          </button>
        </div>

        <div className="space-y-6 px-4 py-2">
          <TabContent
            type={activeTab}
            items={selectedCountry.data}
          />
        </div>
      </div>
    </div>
    // </div>
  );
};