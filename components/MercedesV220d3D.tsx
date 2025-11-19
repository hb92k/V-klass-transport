"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function MercedesV220dSlider() {
  const [showSlider, setShowSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = ["/v220d1.png", "/v220d2.png", "/v220d3.png", "/v220d4.png"];

  const prevSlide = () =>
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextSlide = () =>
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative flex flex-col items-center justify-center p-4 text-center">
      {!showSlider && (
        <button
          onClick={() => setShowSlider(true)}
          className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-white bg-black bg-opacity-30 text-white text-sm transition transform duration-300 hover:bg-opacity-50 hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 24 24" className="mb-1">
            <path d="M3 13l1.5-4.5h15L21 13v7h-2v-2H5v2H3v-7zm2.5-2.5L5 13h14l-0.5-2.5h-14zM6 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
          </svg>
          Voir
        </button>
      )}

      {showSlider && (
        <div className="w-full max-w-3xl flex flex-col items-center relative">
          <h2 className="text-white text-2xl md:text-3xl mb-6">Mercedes V220d 2024</h2>

          <div className="relative w-full">
            <Image
              src={images[currentIndex]}
              alt={`Mercedes V220d ${currentIndex + 1}`}
              width={1200}
              height={675}
              className="w-full rounded-xl"
              priority={false}
            />

            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-30 text-white rounded-full flex items-center justify-center text-xl transition hover:bg-opacity-50"
              aria-label="Précédent"
            >
              ◀
            </button>

            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-30 text-white rounded-full flex items-center justify-center text-xl transition hover:bg-opacity-50"
              aria-label="Suivant"
            >
              ▶
            </button>
          </div>

          <p className="text-white mt-4">{currentIndex + 1} / {images.length}</p>

          <button
            onClick={() => setShowSlider(false)}
            className="absolute bottom-4 right-4 flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-white bg-black bg-opacity-30 text-white text-sm transition transform duration-300 hover:bg-opacity-50 hover:scale-110"
            aria-label="Retour"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 24 24" className="mb-1">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
            Retour
          </button>
        </div>
      )}
    </div>
  );
}