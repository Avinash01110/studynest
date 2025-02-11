import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "swiper/css/bundle";
import BuyForm from "../../../components/BuyFrom/BuyForm";
import HelmetConfig from "../../../utils/HelmetConfig";
import { getCurrencySymbolByCountry } from "../../../utils/Currency";
import ImageModal from "../../../components/ImageModal/ImageModal";
import {
  IoLocationSharp,
  IoShieldCheckmark,
  IoBusiness,
} from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaGraduationCap } from "react-icons/fa6";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { Image } from "lucide-react";
import { FaMoneyBillWave } from "react-icons/fa";

const PropertyDetail = () => {
  const { PropertyId } = useParams();
  const [apartmentsData, setApartmentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // const apartment = apartmentsData.find((apt) => apt._id === PropertyId);
  const [apartment, setapartment] = useState({});

  useEffect(() => {
    const fetchPropertyById = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URI}/api/propertyauth/property/${PropertyId}`
        );
        setapartment(response.data.property);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchedData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URI}/api/propertyauth/properties`
        );
        setApartmentsData(response.data.properties);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyById();
    fetchedData();
  }, []); // Empty dependency array to run only once

  const recommendedApartments = apartmentsData
    .filter((apt) => apt._id !== PropertyId)
    .slice(0, 3);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  // const renderStars = (rating) => {
  //   const fullStars = Math.floor(rating);
  //   const halfStar = rating % 1 !== 0;
  //   const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  //   return (
  //     <div className="flex items-center space-x-1">
  //       {/* {[...Array(fullStars)].map((_, i) => (
  //         <span key={`full-${i}`} className="text-pink-500 text-2xl">
  //           ★
  //         </span>
  //       ))}
  //       {halfStar && <span className="text-pink-500 text-2xl">☆</span>}
  //       {[...Array(emptyStars)].map((_, i) => (
  //         <span key={`empty-${i}`} className="text-gray-300 text-2xl">
  //           ★
  //         </span>
  //       ))} */}
  //     </div>
  //   );
  // };
  // Scroll to the target section when a tab is clicked
  const scrollToSection = (section, margin = 150) => {
    const element = document.getElementById(section);

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - margin;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="ml-4 transition duration-500 ease-in-out">
          <Oval
            visible={true}
            height="20"
            width="20"
            secondaryColor="#2c2c2c"
            strokeWidth={4}
            strokeWidthSecondary={4}
            color="#242A56"
            ariaLabel="oval-loading"
          />
        </div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (error || !apartment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">Something went wrong: {error}</p>
        <button
          className="text-primary-100 underline"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <HelmetConfig
        title={`${apartment.title}, ${apartment.city}`}
        description={`Discover ${apartment.title}, located in ${apartment.city}. Book your ideal student accommodation with StudyNest today.`}
      />

      <div className="min-h-screen py-8 bg-offwhite/50">
        {apartment ? (
          <div>
            {/* Image Slider */}
            <div className="mb-6 lg:px-20 md:px-10 xs:px-6">
              <div className="info mb-6 flex flex-col gap-2">
                <h1 className="text-3xl sm:text-4xl text-voilet font-semibold font-sans">
                  {apartment.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  <p className="flex gap-2 items-center text-nowrap text-sm sm:text-lg text-voilet font-sans font-medium">
                    <FaGraduationCap className="text-darkpink" /> Student
                    Accomodation
                  </p>
                  <p className="flex gap-2 items-center text-nowrap text-sm sm:text-lg text-voilet font-sans font-medium">
                    <IoShieldCheckmark className="text-darkpink" /> On-site
                    verification
                  </p>
                </div>
                <div className="flex flex-col-reverse lg:flex-row lg:justify-between gap-2 lg:gap-6">
                  <p className="flex gap-2 items-center text-sm sm:text-lg text-voilet font-sans font-medium">
                    <IoLocationSharp className="text-darkpink" />{" "}
                    {apartment.city}, {apartment.country}
                  </p>
                  <p className="flex gap-2 items-center text-sm sm:text-lg text-voilet font-sans font-medium">
                    <IoBusiness className="text-darkpink" />
                    {apartment.university}
                  </p>

                  {/* <div className="flex items-center border-2 border-pink-100 bg-pink-50 px-4 py-1 rounded-lg gap-2">
              {renderStars(apartment.rating)}
              <span className="text-gray-600">
                ({apartment.reviews.length} reviews)
              </span>
            </div> */}
                </div>
              </div>
              <div className="flex w-full max-h-[400px] gap-2">
                {/* Large image */}
                <div
                  onClick={() => openModal(apartment.images[1])}
                  className="lg:w-1/2 xs:w-full cursor-pointer relative"
                >
                  <img
                    src={apartment.images && apartment.images[0]}
                    alt="Large Image"
                    className="w-full h-full object-cover rounded-md"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 right-2 flex flex-row gap-2 px-2 py-2 items-center justify-center bg-black/60 rounded-xl text-lg text-white font-sans lg:hidden">
                    <Image size={20} />{" "}
                    {apartment.images && apartment.images.length}
                  </div>
                </div>

                {/* Grid of smaller images */}
                <div className="w-1/2 lg:grid lg:grid-cols-2 gap-2 lg:grid-rows-2 xs:hidden">
                  {apartment.images &&
                    apartment.images.slice(1, 4).map((image, index) => (
                      <div
                        onClick={() => openModal(apartment.images[index + 1])}
                        key={index}
                        className="overflow-hidden rounded-md cursor-pointer"
                      >
                        <img
                          src={image}
                          alt={`Image ${index + 2}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  {apartment.images && apartment.images.length > 4 && (
                    <div
                      key={4}
                      className="relative overflow-hidden rounded-md opacity-75 w-full h-full cursor-pointer"
                      onClick={() => openModal(apartment.images[0])}
                    >
                      <img
                        src={(apartment.images && apartment.images[4]) || ""}
                        alt="Others"
                        className="w-full h-full object-cover blur-sm"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white text-2xl font-medium">
                          +{apartment.images.length - 4} others
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 w-full h-16 z-10">
              <div className="flex md:justify-center border-b gap-10 w-full overflow-x-scroll no-scrollbar">
                <button
                  className={`py-2 px-4 text-lg font-semibold transition duration-300 ease-in-out border-b-2 ${
                    activeTab === "Overview"
                      ? "border-darkpink text-voilet"
                      : "text-gray-600 hover:border-darkpink hover:text-voilet"
                  }`}
                  onClick={() => {
                    setActiveTab("Overview");
                    scrollToSection("overview");
                  }}
                >
                  Overview
                </button>
                <button
                  className={`py-2 px-4 text-lg font-semibold transition duration-300 ease-in-out border-b-2 ${
                    activeTab === "Facilities"
                      ? "border-darkpink text-voilet"
                      : "text-gray-600 hover:border-darkpink hover:text-voilet"
                  }`}
                  onClick={() => {
                    setActiveTab("Facilities");
                    scrollToSection("facilities");
                  }}
                >
                  Facilities
                </button>
                <button
                  className={`py-2 px-4 text-lg font-semibold transition duration-300 ease-in-out border-b-2 ${
                    activeTab === "roomTypes"
                      ? "border-darkpink text-voilet"
                      : "text-gray-600 hover:border-darkpink hover:text-voilet"
                  }`}
                  onClick={() => {
                    setActiveTab("roomTypes");
                    scrollToSection("roomTypes");
                  }}
                >
                  RoomTypes
                </button>
                <button
                  className={`py-2 px-4 text-lg font-semibold transition duration-300 ease-in-out border-b-2 ${
                    activeTab === "Services"
                      ? "border-darkpink text-voilet"
                      : "text-gray-600 hover:border-darkpink hover:text-voilet"
                  }`}
                  onClick={() => {
                    setActiveTab("Services");
                    scrollToSection("services");
                  }}
                >
                  Services
                </button>
                <button
                  className={`py-2 px-4 text-lg font-semibold transition duration-300 ease-in-out border-b-2 ${
                    activeTab === "Properties"
                      ? "border-darkpink text-voilet"
                      : "text-gray-600 hover:border-darkpink hover:text-voilet"
                  }`}
                  onClick={() => {
                    setActiveTab("Properties");
                    scrollToSection("properties");
                  }}
                >
                  Properties
                </button>
              </div>
            </div>

            {/* Section Contents */}
            <div
              id="overview"
              className="w-full py-6 flex lg:flex-row flex-col justify-between relative lg:px-20 px-10 lg:gap-10 gap-4 bg-bg-200"
            >
              {/* Left Section */}
              <div className="mb-6 lg:w-[65%] w-full ">
                {/* Overview Section */}
                <h2 className="text-2xl font-sans text-accent-100 font-semibold mb-6">
                  Overview
                </h2>
                <div className="description mb-8">
                  {apartment?.description ? (
                    (() => {
                      const words = apartment.description.split(" ");
                      const isLongDescription = words.length > 50;

                      return (
                        <>
                          <p className="mt-2 text-justify">
                            {isExpanded
                              ? apartment.description
                              : `${words.slice(0, 50).join(" ")}${
                                  isLongDescription ? "..." : ""
                                }`}
                          </p>
                          {isLongDescription && (
                            <button
                              onClick={() => setIsExpanded(!isExpanded)}
                              className="text-primary-200 underline underline-offset-2 text-lg flex gap-1 items-center"
                            >
                              {isExpanded ? (
                                <>
                                  View Less <IoIosArrowUp />
                                </>
                              ) : (
                                <>
                                  View More <IoIosArrowDown />
                                </>
                              )}
                            </button>
                          )}
                        </>
                      );
                    })()
                  ) : (
                    <p>No description available.</p>
                  )}
                </div>

                {/* Amenities Section */}
                {apartment.amenities && (
                  <div id="facilities" className="w-full py-2 mt-4">
                    <h2 className="text-2xl font-sans text-accent-100 font-semibold mb-4">
                      Amenities
                    </h2>
                    <div className="amenities">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {apartment.amenities.map((category, index) => (
                          <div
                            key={index}
                            className="mb-4 border border-gray-500 bg-gray-50 px-8 py-4 rounded-lg"
                          >
                            <h3 className="text-lg text-accent-100 font-semibold mb-2">
                              {category.title}
                            </h3>
                            <ul className="list-decimal px-4 grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-2">
                              {category.items.map((item, itemIndex) => (
                                <li
                                  className="text-accent-100 font-medium text-sm"
                                  key={itemIndex}
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {apartment.roomTypes && (
                  <div id="roomTypes" className="w-full py-2">
                    <h2 className="text-2xl font-sans text-accent-100 font-semibold mb-4">
                      Room Types
                    </h2>
                    <div className="roomTypes">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {apartment.roomTypes.map((category, index) => (
                          <div
                            key={index}
                            className="mb-4 border border-gray-500 bg-gray-50 px-8 py-4 rounded-lg gap-2 flex flex-row justify-between flex-wrap"
                          >
                            <h3 className="text-md text-accent-100 font-medium">
                              {category.title}
                            </h3>
                            <h3 className="flex flex-row gap-2 justify-center items-center text-md text-accent-100 font-medium">
                              <FaMoneyBillWave />{" "}
                              {getCurrencySymbolByCountry(apartment.country)}
                              {category.price}/week
                            </h3>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Services Section */}
                {apartment.services && (
                  <div id="services" className="w-full md:w-1/2 py-2">
                    <h2 className="text-2xl font-sans text-accent-100 font-semibold mb-4">
                      Services
                    </h2>
                    <div className="services border border-gray-500 bg-gray-50 py-4 px-8 rounded-lg">
                      <ul className="list-decimal px-4 grid grid-cols-1 xs:grid-cols-2 gap-4">
                        {apartment.services.map((service, index) => (
                          <li
                            className="text-accent-100 font-medium text-md"
                            key={index}
                          >
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Section */}
              <aside className="form mt-8 h-full sticky top-[9.5rem]">
                <BuyForm apartment={apartment} />
              </aside>
            </div>

            {/* Similar Apartments */}
            <div id="properties" className="mt-4 lg:px-20 md:px-10 xs:px-6">
              <h2 className="text-2xl font-sans text-primary-100 font-semibold mb-6">
                Similar Properties
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {recommendedApartments.map((apt) => (
                  <a
                    key={apt._id}
                    href={`/Property/${apt._id}`}
                    className="block bg-white border rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
                  >
                    <img
                      src={apt.images[0]}
                      alt={apt.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{apt.title}</h3>
                      <p className="text-gray-500">{apt.city}</p>
                      <p className="text-pink font-bold">
                        {getCurrencySymbolByCountry(apt.country)}
                        {apt.price}/week
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            {modalOpen && (
              <ImageModal
                images={apartment.images}
                selectedImage={selectedImage}
                onClose={closeModal}
              />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-lg text-voilet">Property not found.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyDetail;
