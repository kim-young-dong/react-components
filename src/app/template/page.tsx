"use client";
import Carousel from "./components/Carousel";
import { useEffect } from "react";
import "./styles.css";

const images = [
  "https://via.placeholder.com/1040",
  "https://via.placeholder.com/1040",
  "https://via.placeholder.com/1040",
  "https://via.placeholder.com/1040",
  "https://via.placeholder.com/1040",
];
const scrollItem = Array.from({ length: 5 }, (_, i) => i);
export default function OpenLogo() {
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      const delta = Math.sign(event.deltaY);
      const currentScroll = window.scrollY;
      const screenHeight = window.innerHeight;
      const nextScroll = currentScroll + delta * screenHeight;
      window.scrollTo({
        top: nextScroll,
        behavior: "smooth",
      });
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);
  return (
    <>
      {/* 전체화면 스크롤 */}

      {scrollItem.map((item, index) => (
        <div
          key={index}
          className={`scrolls h-screen flex items-center justify-center relative`}
        >
          <Carousel images={images} />
        </div>
      ))}
    </>
  );
}
