import React, { useState } from "react";
import CountryModal from "../../components/SearchTab/SearchTab";
import PropertyDetail from "../Property/PropertyDetail/PropertyDetail";
import Hero from "./components/Hero";
import Parameters from "./components/Parameters"
import TopCities from "./components/TopCities";
import WhyWe from "./components/WhyWe";
import Options from "./components/Options";
import EasyBook from "./components/EasyBook";
import Testimonials from "./components/Testimonials";
import { apartmentsData } from "../../components/Data/Data";
import bannerVideo from "../../assets/video/Banner_video.mp4";


const Home = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredApartments, setFilteredApartments] = useState(apartmentsData);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
  };
  
  const handleClick= () => {
    setIsModalOpen(true);
  }

  const handleSearch = () => {
    // Filter logic
    const query = searchTerm;
    const filtered = apartmentsData.filter(
      (apartment) =>
        apartment.title.toLowerCase().includes(query) ||
        apartment.city.toLowerCase().includes(query) ||
        apartment.country.toLowerCase().includes(query)
    );
    setFilteredApartments(filtered);
  };

  return (
    <div className="flex flex-col gap-10">
      <Hero apartmentsData={apartmentsData} handleSearch={handleSearch} searchTerm={searchTerm} handleChange={handleChange} bannerVideo={bannerVideo} handleClick={handleClick} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      <Parameters />

      <TopCities />

      {/* Apartments Section */}
      {/* <div className="Apartment px-4">
        <h1 className="font-semibold text-2xl underline">Top Apartments</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredApartments.map((apartment) => (
            <ApartmentCard
              key={apartment.id}
              {...apartment}
              onClick={() => setSelectedApartment(apartment)}
            />
          ))}
        </div>
        {filteredApartments.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No apartments found.</p>
        )}
      </div> */}

      <WhyWe />

      <Options />

      <EasyBook />

      <Testimonials />

      {selectedApartment && (
        <PropertyDetail
          apartment={selectedApartment}
          onClose={() => setSelectedApartment(null)}
        />
      )}
      
    </div>
  );
};

export default Home;
