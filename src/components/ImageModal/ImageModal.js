import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation, Pagination } from 'swiper/modules';
import "swiper/css/bundle"; // Import Swiper styles

const ImageModal = ({ images, selectedImage, onClose }) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 md:px-0 xs:px-4"
            onClick={onClose}
        >
            <div
                className="relative w-full lg:max-w-5xl md:max-w-2xl sm:max-w-xl xs:max-w-sm rounded-lg overflow-hidden shadow-lg h-[37rem] xs:h-fit"
                onClick={(e) => e.stopPropagation()} // Prevent click on modal content from closing the modal
            >
                {/* Main Swiper for showing large images */}
                <Swiper
                    modules={[Thumbs, Navigation, Pagination]}
                    navigation
                    thumbs={{ swiper: thumbsSwiper }}
                    pagination={{ clickable: true }} // Pagination for main swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    className="rounded-lg"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index} className="flex justify-center">
                            <img src={image} alt={`Image ${index}`} className="w-full object-cover md:h-[28rem] xs:h-[20rem]" />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Thumbs Swiper for smaller images */}
                <Swiper
                    modules={[Thumbs]}
                    watchSlidesProgress
                    onSwiper={setThumbsSwiper}
                    spaceBetween={6}
                    slidesPerView={5}
                    breakpoints={{
                        350: { slidesPerView: 3, spaceBetween: 2 },
                        640: { slidesPerView: 4, spaceBetween: 4 },
                        780: { slidesPerView: 4, spaceBetween: 4 },
                        900: { slidesPerView: 4, spaceBetween: 4 },
                        1100: { slidesPerView: 5, spaceBetween: 6 },
                        1270: { slidesPerView: 5, spaceBetween: 6 },
                      }}
                    className="mt-4 rounded-lg"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image}
                                alt={`Thumbnail ${index}`}
                                className="h-[6rem] w-full cursor-pointer rounded-md border-2 border-transparent hover:border-blue-500 transition-all"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* Close Button */}
            <button
                className="absolute top-4 right-8 xs:right-2 md:right-4 text-white rounded-full text-3xl"
                onClick={onClose}
            >
                &times;
            </button>
        </div>
    );
};

export default ImageModal;
