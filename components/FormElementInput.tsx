"use client";

import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MapIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function FormElementInput() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [origin, setOrigin] = useState("Nanterre, France");
  const [destination, setDestination] = useState("Paris, France");
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [departureTime, setDepartureTime] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [vehiclesOpen, setVehiclesOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<{ id: string; name: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const calendarRef = useRef<HTMLDivElement | null>(null);
  const vehiclesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (showCalendar && calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setShowCalendar(false);
      }
      if (vehiclesOpen && vehiclesRef.current && !vehiclesRef.current.contains(e.target as Node)) {
        setVehiclesOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [showCalendar, vehiclesOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);

    // Validation simple côté client
    if (!firstName.trim() || !lastName.trim()) {
      setSuccessMessage("Merci d'indiquer votre nom et prénom.");
      return;
    }
    if (!phone.trim()) {
      setSuccessMessage("Merci d'indiquer un numéro de téléphone.");
      return;
    }
    if (!email.trim()) {
      setSuccessMessage("Merci d'indiquer votre email pour la confirmation.");
      return;
    }
    if (!departureDate) {
      setSuccessMessage("Merci de choisir une date de départ.");
      return;
    }

    setSubmitting(true);

    const finalDate = new Date(departureDate);
    if (departureTime) {
      const [hh, mm] = departureTime.split(":").map(Number);
      finalDate.setHours(hh, mm, 0, 0);
    }

    const payload = {
      firstName,
      lastName,
      phone,
      email,
      origin,
      destination,
      departure: finalDate.toISOString(),
      vehicle: selectedVehicle,
    };

    try {
      const res = await fetch("/api/send-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccessMessage("Demande reçue ! Un email de confirmation vous a été envoyé.");
        // Optionnel : Tu peux vider le formulaire ici si tu veux
      } else {
        const errorData = await res.json();
        setSuccessMessage(`Erreur : ${errorData.error || "Problème lors de l'envoi."}`);
      }
    } catch (err) {
      console.error(err);
      setSuccessMessage("Erreur réseau. Merci de réessayer.");
    }

    setSubmitting(false);
  };

  const chooseVehicle = (id: string, name: string) => {
    setSelectedVehicle({ id, name });
    setVehiclesOpen(false);
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-8">
      <div className="relative bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white">Réserver un départ</h3>
            <p className="text-sm text-gray-300 mt-1">Vos coordonnées et détails de la course.</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Bouton Date */}
            <div className="relative" ref={calendarRef}>
              <button
                type="button"
                onClick={() => setShowCalendar((s) => !s)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
              >
                <MapIcon className="w-4 h-4" />
                {departureDate ? departureDate.toLocaleDateString() : "Date & Heure"}
              </button>

              {showCalendar && (
                <div className="absolute right-0 mt-2 z-50 bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-3 w-72">
                  <DatePicker
                    inline
                    selected={departureDate}
                    onChange={(date) => setDepartureDate(date as Date)}
                    minDate={new Date()}
                  />
                  <div className="mt-3">
                    <label className="block text-xs text-gray-400 mb-1">Heure</label>
                    <input
                      type="time"
                      value={departureTime}
                      onChange={(e) => setDepartureTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-slate-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bouton Véhicule */}
            <div className="relative" ref={vehiclesRef}>
              <button
                type="button"
                onClick={() => setVehiclesOpen((s) => !s)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white text-slate-900 text-sm hover:bg-gray-200 transition border border-gray-300"
              >
                Véhicule
              </button>

              {vehiclesOpen && (
                <div className="absolute right-0 mt-2 z-50 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-3">
                  <h4 className="text-sm font-semibold text-slate-800 mb-2">Choisir un véhicule</h4>
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-100 transition cursor-pointer" onClick={() => chooseVehicle("mercedes-v", "Mercedes Classe V")}>
                    <div className="flex-shrink-0 w-12 h-8 bg-slate-200 rounded-md flex items-center justify-center text-slate-600 font-bold text-xs">VAN</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">Mercedes Classe V</div>
                      <div className="text-xs text-slate-500">Spacieux — jusqu'à 7 passagers</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedVehicle && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-200 text-sm">
            <span className="font-medium">Véhicule : {selectedVehicle.name}</span>
            <button
              type="button"
              onClick={() => setSelectedVehicle(null)}
              className="ml-1 w-5 h-5 flex items-center justify-center rounded-full bg-blue-800 hover:bg-blue-700 transition text-xs"
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="px-3 py-2 rounded-md border border-white/20 bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="text"
              placeholder="Nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="px-3 py-2 rounded-md border border-white/20 bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <PhoneIcon className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="tel"
                placeholder="Téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 px-3 py-2 rounded-md border border-white/20 bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none w-full"
                required
              />
            </div>

            <div className="relative">
              <EnvelopeIcon className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                placeholder="Email (pour la confirmation)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 px-3 py-2 rounded-md border border-white/20 bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none w-full"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Adresse de départ"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="px-3 py-2 rounded-md border border-white/20 bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="text"
              placeholder="Adresse d'arrivée"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="px-3 py-2 rounded-md border border-white/20 bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-white/10 mt-4">
            <div className="text-sm text-gray-300">
              {departureDate ? (
                <>
                  Le <span className="font-bold text-white">{departureDate.toLocaleDateString()}</span>
                  {departureTime && <> à <span className="font-bold text-white">{departureTime}</span></>}
                </>
              ) : (
                "Veuillez choisir une date"
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`px-6 py-2 rounded-md text-white font-medium transition ${
                submitting ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20"
              }`}
            >
              {submitting ? "Envoi en cours..." : "Confirmer la demande"}
            </button>
          </div>

          {successMessage && (
            <div className={`mt-2 text-sm p-3 rounded-md border ${successMessage.includes("Erreur") ? "text-red-300 border-red-900 bg-red-900/20" : "text-green-300 border-green-900 bg-green-900/20"}`}>
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}