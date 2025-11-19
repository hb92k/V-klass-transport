"use client";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MapIcon, PhoneIcon, EnvelopeIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export default function BookingPanel() {
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
    if (!firstName.trim() || !lastName.trim()) {
      setSuccessMessage("Merci d’indiquer votre nom et prénom.");
      return;
    }
    if (!phone.trim()) {
      setSuccessMessage("Merci d’indiquer un numéro de téléphone.");
      return;
    }
    if (!departureDate) {
      setSuccessMessage("Merci de choisir une date de départ.");
      return;
    }
    setSubmitting(true);
    let finalDate = new Date(departureDate);
    if (departureTime) {
      const [hh, mm] = departureTime.split(":").map((v) => parseInt(v, 10) || 0);
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
    console.log("Envoi de la demande :", payload);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setSuccessMessage("Demande envoyée — merci ! Nous vous recontactons bientôt.");
  };

  const chooseVehicle = (id: string, name: string) => {
    setSelectedVehicle({ id, name });
    setVehiclesOpen(false);
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-8">
      <div className="relative bg-white/40 backdrop-blur-md rounded-2xl border border-white/30 shadow-md p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 ">Réserver un départ</h3>
            <p className="text-sm text-slate-700  mt-1">Choisissez la date et l'heure, vos coordonnées et envoyez la demande.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative" ref={calendarRef}>
              <button
                type="button"
                onClick={() => setShowCalendar((s) => !s)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600   text-slate-900 text-sm hover:bg-blue-700 transition"
                aria-expanded={showCalendar}
                aria-haspopup="dialog"
              >
                <MapIcon className="w-4 h-4" />
                Choisir la date
              </button>

              {showCalendar && (
                <div className="absolute right-0 mt-2 z-40 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-3 w-72">
                  <DatePicker
                    inline
                    selected={departureDate}
                    onChange={(date) => setDepartureDate(date as Date)}
                    minDate={new Date()}
                  />
                  <div className="mt-3">
                    <label className="block text-xs text-slate-600 dark:bg-neutral-800 mb-1">Heure (optionnel)</label>
                    <input
                      type="time"
                      value={departureTime}
                      onChange={(e) => setDepartureTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={vehiclesRef}>
              <button
                type="button"
                onClick={() => setVehiclesOpen((s) => !s)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-50 text-slate-800 text-sm hover:bg-slate-100 transition border"
                aria-expanded={vehiclesOpen}
                aria-haspopup="true"
              >
                Véhicule
              </button>

              {vehiclesOpen && (
                <div className="absolute right-0 mt-2 z-40 w-64 bg-white rounded-lg shadow-lg border p-3">
                  <h4 className="text-sm font-semibold text-slate-800 mb-2">Choisir un véhicule</h4>
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition">
                    <div className="flex-shrink-0 w-12 h-8 bg-slate-100 rounded-md flex items-center justify-center text-slate-600 font-semibold">V</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">Mercedes Classe V</div>
                      <div className="text-xs text-slate-600">Spacieux — jusqu'à 7 passagers</div>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => chooseVehicle("mercedes-v", "Mercedes Classe V")}
                        className="ml-2 px-3 py-1 rounded-md bg-blue-600 text-slate-900 text-xs hover:bg-blue-700 transition"
                      >
                        Choisir
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedVehicle && (
          <div className="mt-4 inline-flex items-center gap-3 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-sm">
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="px-3 py-2 rounded-md border border-slate-200 bg-white/70 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="text"
              placeholder="Nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="px-3 py-2 rounded-md border border-slate-200 bg-white/70 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <PhoneIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="tel"
                placeholder="Téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 px-3 py-2 rounded-md border border-slate-200 bg-white/70 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none w-full"
                required
              />
            </div>

            <div className="relative">
              <EnvelopeIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 px-3 py-2 rounded-md border border-slate-200 bg-white/70 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Adresse de départ"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="px-3 py-2 rounded-md border border-slate-200 bg-white/70 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="Adresse d'arrivée"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="px-3 py-2 rounded-md border border-slate-200 bg-white/70 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-sm text-slate-700">
              <strong>Départ :</strong>{" "}
              {departureDate ? `${departureDate.toLocaleDateString()}${departureTime ? " à " + departureTime : ""}` : "Aucune date choisie"}
            </div>

            <div className="flex items-center gap-2">
              

              <button
                type="submit"
                disabled={submitting}
                className={`px-4 py-2 rounded-md text-slate-900 font-medium ${submitting ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                {submitting ? "Envoi..." : "Envoyer la demande"}
              </button>
            </div>
          </div>

          {successMessage && (
            <div className="mt-2 text-sm text-green-700 bg-green-50 p-2 rounded-md border border-green-100">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}