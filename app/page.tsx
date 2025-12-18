"use client";
import React, { useState } from "react";
import Image from "next/image";
import IntroSlide from "../components/IntroSlide";

export default function MercedesV220d3D() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = ["/v220d1.png", "/v220d2.png", "/v220d3.png", "/v220d4.png"];

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl mb-8">
        <IntroSlide />
      </div>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="px-6 py-3 text-lg rounded-lg bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
        >
          Voir Mercedes V220d
        </button>
      ) : (
        <div className="relative max-w-3xl w-full bg-black/40 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/30">
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Mercedes V220d
            </h3>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={prev}
                className="px-3 py-1 text-lg bg-slate-200 hover:bg-slate-300 rounded transition-colors"
                aria-label="Image précédente"
              >
                ◀
              </button>
              <button
                onClick={next}
                className="px-3 py-1 text-lg bg-slate-200 hover:bg-slate-300 rounded transition-colors"
                aria-label="Image suivante"
              >
                ▶
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 rounded transition-colors font-semibold"
              >
                Fermer
              </button>
            </div>
          </div>

          <div className="relative w-full aspect-video">
            <Image
              src={images[index]}
              alt={`Mercedes V220d ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="rounded-lg object-contain"
              priority={false}
            />
          </div>

          <p className="mt-3 text-sm text-slate-600 text-center">
            {index + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}