"use client";
import React, { useEffect, useRef, useState } from "react";
import { EnvelopeIcon, PhoneIcon, MapIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export default function TitiModernBackground() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [origin, setOrigin] = useState("Nanterre, France");
  const [destination, setDestination] = useState("Paris, France");

  // Nouveau : sélection du véhicule
  const [vehiclesOpen, setVehiclesOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<{
    id: string;
    name: string;
    description?: string;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setVehiclesOpen(false);
      }
    }
    if (vehiclesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [vehiclesOpen]);

  const handleShowRoute = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      origin,
      destination,
      vehicle: selectedVehicle,
    });
  };

  const proposeRoute = () => {
    setOrigin("Nanterre, France");
    setDestination("La Défense, France");
  };

  const chooseVehicle = (v: { id: string; name: string; description?: string }) => {
    setSelectedVehicle(v);
    setVehiclesOpen(false);
  };

  return (
    <div className="flex justify-center items-center mt-8 px-4">
      <div className="relative max-w-3xl w-full bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/30" ref={containerRef}>
        {/* Bouton en haut à droite + panneau de sélection véhicules */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setVehiclesOpen((s) => !s)}
              className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600/95 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
              aria-expanded={vehiclesOpen}
              aria-haspopup="true"
              aria-label="Proposer la route / choisir un véhicule"
            >
              <MapIcon className="w-4 h-4" />
              {selectedVehicle ? selectedVehicle.name : "Véhicule"}
            </button>

            {/* Panel de sélection */}
            {vehiclesOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 overflow-hidden">
                <div className="p-3">
                  <h4 className="text-sm font-semibold text-slate-800 mb-2">Choisir un véhicule</h4>
                  {/* Option simple — pour l'instant une seule voiture (Classe V Mercedes) */}
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition">
                    {/* Petite icône/illustration */}
                    <div className="flex-shrink-0 w-12 h-8 bg-slate-100 rounded-md flex items-center justify-center text-slate-600 font-semibold">
                      V
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">Mercedes Classe V</div>
                      <div className="text-xs text-slate-600">Spacieux — jusqu'à 6 passagers</div>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() =>
                          chooseVehicle({
                            id: "mercedes-v",
                            name: "Mercedes Classe V",
                            description: "Spacieux — jusqu'à 6 passagers",
                          })
                        }
                        className="ml-2 px-3 py-1 rounded-md bg-blue-600 text-white text-xs hover:bg-blue-700 transition"
                      >
                        Choisir
                      </button>
                    </div>
                  </div>

                  {/* Si tu veux ajouter d'autres véhicules plus tard, duplique le bloc ci-dessus */}

                  <div className="mt-3 text-xs text-slate-500">
                    Sélectionne un véhicule pour continuer. (Actuellement : 1 option)
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 w-full">
            <h2 className="text-slate-900 text-3xl font-bold mb-1">Contact Vklass-transport</h2>
            <p className="text-sm text-slate-700 mb-6">
              Proposez votre itinéraire ou faites une demande via le formulaire.
            </p>

            {/* Affichage du véhicule sélectionné (badge) */}
            {selectedVehicle && (
              <div className="mb-4 inline-flex items-center gap-3 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-sm">
                <span className="font-medium">{selectedVehicle.name}</span>
                <button
                  type="button"
                  onClick={() => setSelectedVehicle(null)}
                  className="ml-2 text-xs px-2 py-0.5 rounded bg-white/60 hover:bg-white transition"
                  aria-label="Supprimer véhicule sélectionné"
                >
                  x
                </button>
              </div>
            )}

            <form onSubmit={handleShowRoute} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Prénom"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input"
                  required
                />
                <input
                  type="text"
                  placeholder="Nom"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Départ"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="input"
                  required
                />
                <input
                  type="text"
                  placeholder="Arrivée"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Ville" className="input" />
                <input type="text" placeholder="Code postal" className="input" />
              </div>
              <input type="number" placeholder="Téléphone" className="input" />
              <input type="email" placeholder="Email" className="input" />
              <textarea
                placeholder="Message"
                className="input min-h-[70px] max-h-[160px] resize-y"
              ></textarea>
              <button
                type="submit"
                className="w-full py-3 flex items-center justify-center text-base font-semibold rounded-lg bg-blue-600/90 hover:bg-blue-700 text-white transition shadow hover:shadow-lg"
              >
                <ArrowPathIcon className="w-5 h-5 mr-2 -ml-1 animate-spin-slow" />
                Commander
              </button>
            </form>

            <button
              type="button"
              className="mt-4 w-full py-2 flex items-center justify-center rounded-lg bg-blue-100/60 hover:bg-blue-200 text-blue-700 font-semibold transition"
              onClick={proposeRoute}
            >
              <MapIcon className="w-5 h-5 mr-2" />
              Proposer Nanterre ↔ La Défense
            </button>
          </div>

          <div className="flex flex-col items-start gap-4 mt-8 lg:mt-0 lg:ml-4">
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">vklasstransport@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">+33 6 05 69 60 23</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .input {
          @apply w-full px-3 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 transition bg-white/60 shadow;
        }
        .animate-spin-slow {
          animation: spin 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}