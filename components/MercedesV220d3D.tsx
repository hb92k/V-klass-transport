"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface CarGalleryProps {
  photos: string[];
  carName?: string;
}

// Correction : On exporte directement le composant pour éviter l'erreur de "non-utilisation"
export const CarGallery: React.FC<CarGalleryProps> = ({ photos, carName = "Voiture" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () =>
    setCurrentIndex((i) => (i === 0 ? photos.length - 1 : i - 1));
  const nextSlide = () =>
    setCurrentIndex((i) => (i === photos.length - 1 ? 0 : i + 1));

  return (
    <div className="relative flex flex-col items-center justify-center p-4 text-center">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-white bg-black bg-opacity-30 text-white text-sm transition transform duration-300 hover:bg-opacity-50 hover:scale-110"
        >
          Voir la galerie
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-3xl flex flex-col items-center relative"
          >
            <h2 className="text-white text-2xl md:text-3xl mb-6">{carName}</h2>

            <div className="relative w-full">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={photos[currentIndex]}
                  alt={`${carName} ${currentIndex + 1}`}
                  width={1200}
                  height={675}
                  className="w-full rounded-xl object-cover"
                />
              </motion.div>

              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-70 text-white rounded-full flex items-center justify-center text-xl transition hover:bg-opacity-50"
                aria-label="Précédent"
              >
                &lt;
              </button>

              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-30 text-white rounded-full flex items-center justify-center text-xl transition hover:bg-opacity-50"
                aria-label="Suivant"
              >
                &gt;
              </button>
            </div>

            <p className="text-white mt-4">
              {currentIndex + 1} / {photos.length}
            </p>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute bottom-4 right-4 flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-white bg-black bg-opacity-30 text-white text-sm transition transform duration-300 hover:bg-opacity-50 hover:scale-110"
            >
              Retour
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Suppression du bloc de code qui posait problème en fin de fichiernp