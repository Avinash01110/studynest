import React, { useState, useEffect } from "react";
import PropertyDetail from "./PropertyDetail/PropertyDetail";
import ApartmentCard from "../../components/Card/Card";
import { apartmentsData } from "../../components/Data/Data";
// import daisyui from "daisyui";

const Property = () => {
  const [filteredApartments, setFilteredApartments] = useState(apartmentsData);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [minPrice, setMinPrice] = useState(""); // Min price state
  const [maxPrice, setMaxPrice] = useState(""); // Max price state

  // Effect to load countries from apartments data
  useEffect(() => {
    const uniqueCountries = Array.from(
      new Set(apartmentsData.map((apt) => apt.country))
    );
    setCountries(uniqueCountries);
  }, []);

  // Effect to load cities based on selected country
  useEffect(() => {
    if (selectedCountry) {
      const uniqueCities = Array.from(
        new Set(
          apartmentsData
            .filter((apt) => apt.country === selectedCountry)
            .map((apt) => apt.city)
        )
      );
      setCities(uniqueCities);
      setSelectedCity(""); // Reset city when country changes
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  // Effect to filter apartments based on country, city, and price range
  useEffect(() => {
    const filtered = apartmentsData.filter((apt) => {
      const isCountryMatch =
        !selectedCountry || apt.country === selectedCountry;
      const isCityMatch = !selectedCity || apt.city === selectedCity;

      // Price filter logic
      const isPriceMatch =
        (!minPrice || apt.price >= parseInt(minPrice)) &&
        (!maxPrice || apt.price <= parseInt(maxPrice));

      return isCountryMatch && isCityMatch && isPriceMatch;
    });

    setFilteredApartments(filtered);
  }, [selectedCountry, selectedCity, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <aside className="bg-white py-4 px-6 border-b border-primary-100 flex justify-between items-center">
        <h2 className="text-lg font-medium text-accent-100 font-sans">
          Filters
        </h2>
        <div className="flex gap-4">
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-semibold text-gray-600 mb-2"
            >
              Country
            </label>
            <select
              id="country"
              aria-label="Select country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full py-1 px-2 border-2 border-primary-100 rounded-lg outline-none text-accent-100 text-sm font-medium font-sans"
            >
              <option
                value=""
                className="text-accent-100 text-sm font-medium font-sans"
              >
                All Countries
              </option>
              {countries.map((country) => (
                <option
                  className="text-accent-100 text-sm font-medium font-sans"
                  key={country}
                  value={country}
                >
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-semibold text-gray-600 mb-2"
            >
              City
            </label>
            <select
              id="city"
              aria-label="Select city"
              className="w-full py-1 px-2 border-2 border-primary-100 rounded-lg outline-none text-accent-100 text-sm font-medium font-sans"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedCountry}
            >
              <option value=""
              className="text-accent-100 text-sm font-medium font-sans"
              >All Cities</option>
              {cities.map((city) => (
                <option className="text-accent-100 text-sm font-medium font-sans" key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label
              htmlFor="priceRange"
              className="block text-sm font-semibold text-gray-600 mb-2"
            >
              Price Range
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                id="minPrice"
                className="w-full py-1 px-2 border-2 border-primary-100 rounded-lg outline-none text-accent-100 text-sm font-medium font-sans"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min Price"
                min="0"
              />
              <input
                type="number"
                id="maxPrice"
                className="w-full py-1 px-2 border-2 border-primary-100 rounded-lg outline-none text-accent-100 text-sm font-medium font-sans"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max Price"
                min="0"
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold font-sans text-accent-100 mb-8">
          Available{" "}
          <span className="text-4xl text-primary-200 font-bold">
            Properties
          </span>
        </h1>

        {/* Filtered Apartments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredApartments.map((apt) => (
            <ApartmentCard
              key={apt.id}
              {...apt}
              onClick={() => setSelectedApartment(apt)}
            />
          ))}
        </div>

        {/* No results message */}
        {filteredApartments.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No apartments found.</p>
        )}
      </main>

      {selectedApartment && (
        <PropertyDetail
          apartment={selectedApartment}
          onClose={() => setSelectedApartment(null)}
        />
      )}
    </div>
  );
};

export default Property;
