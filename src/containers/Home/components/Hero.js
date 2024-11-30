import React from "react";
import { CountryTabs } from "../../../components/SearchTab/SearchTab";
import "../Home.css";

const Hero = ({ apartmentsData, handleSearch, searchTerm, handleChange, bannerVideo,isModalOpen,setIsModalOpen,handleClick }) => {

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-bg-300 relative">
        {" "}
        {/* Added pt-20 for spacing */}
        <div className="w-full h-full absolute top-0 z-0">
          <video
            src={bannerVideo}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            preload="auto"
          />
        </div>
        <div className="absolute w-full h-full bg-white/30 bg-opacity-30 z-0"></div>
        {/* Header Section */}
        <div className="w-full max-w-6xl text-center px-6 z-10">
          <h1 className="font-outline text-4xl md:text-6xl font-semibold font-sans text-bg-100 animate-fade-in">
            Find Your Dream Apartment
          </h1>
          <p className="mt-4 text-bg-200 text-lg md:text-xl animate-slide-up">
            Discover modern apartments in the best neighborhoods at competitive
            prices.
          </p>
        </div>
        {/* Search Bar Section */}
        <div className="w-full h-auto flex justify-center items-center mb-20">
          <div className="mt-10 w-full max-w-2xl flex flex-col gap-1">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Enter city, neighborhood, or title"
                value={searchTerm}
                onChange={handleChange}
                onClick={handleClick}
                className="w-full py-3 px-4 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all duration-300"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 py-2 px-6 bg-primary-100 text-white rounded-full shadow-md hover:bg-primary-100/90 transition-all duration-300"
              >
                Search
              </button>
            </div>
            <div>  
              {isModalOpen && <CountryTabs setIsModalOpen={setIsModalOpen} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
