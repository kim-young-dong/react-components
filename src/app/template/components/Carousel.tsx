"use client";
import tw from "tailwind-styled-components";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function Carousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <CarouselContainer>
      {/* 이미지 슬라이드 */}
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 relative h-full">
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 이전/다음 화살표 버튼 */}
      <CarouselController onClick={prevSlide} className="left-4">
        <IoIosArrowBack size={48} />
      </CarouselController>
      <CarouselController onClick={nextSlide} className="right-4">
        <IoIosArrowForward size={48} />
      </CarouselController>

      {/* 하단 인디케이터 버튼 */}
      <CarouselIndicator>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full 
              ${
                currentIndex === index
                  ? "bg-blue-500"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
          />
        ))}
      </CarouselIndicator>
    </CarouselContainer>
  );
}

const CarouselContainer = tw.div`
  carousel_container
  w-full h-screen
  relative
  overflow-hidden
`;
const CarouselItem = tw.div`
  carousel_item
  w-full
  relative
`;
const CarouselController = tw.button`
  carousel_controller
  p-2
  absolute top-1/2
  transform -translate-y-1/2
  rounded-full shadow-md
  hover:bg-gray-400 bg-gray-300
`;
const CarouselIndicator = tw.div`
  flex justify-center
  absolute bottom-4 left-1/2
  transform -translate-x-1/2
  space-x-2
`;
