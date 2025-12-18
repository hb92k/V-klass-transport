"use client";
import React, { useEffect, useState } from "react";

type Props = {
  compact?: boolean;
};

export default function IntroSlide({ compact = false }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const sectionClass = compact
    ? "w-full flex items-center justify-center p-2 bg-transparent"
    : "w-full min-h-[70vh] flex items-center justify-center p-6 bg-transparent";

  const cardClass = compact
    ? "relative z-10 w-full p-3 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 shadow-sm flex items-center gap-4"
    : "relative z-10 mx-4 sm:mx-0 p-8 sm:p-12 rounded-3xl bg-black/60 backdrop-blur-lg border border-white/10 shadow-2xl flex flex-col items-start gap-6";

  const animateClass = mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3";

  return (
    <section className={sectionClass}>
      <div className={compact ? "relative w-full max-w-3xl" : "relative w-full max-w-5xl"}>
        {/* Decorative animated gradient background */}
        <style>{`
          @keyframes moveGradient { 0% {background-position:0% 50%} 50% {background-position:100% 50%} 100% {background-position:0% 50%} }
          @keyframes floatY { 0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)} }
        `}</style>

        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.18), rgba(249,115,22,0.12), rgba(236,72,153,0.12))', backgroundSize: '300% 300%', animation: 'moveGradient 8s ease infinite' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top left, rgba(255,255,255,0.04), transparent)', mixBlendMode: 'overlay' }} />

        <div className={`${cardClass} transition-all duration-600 ease-out ${animateClass}`}>
          <div className="w-full flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-7 h-7">
                  <path d="M3 11V8a2 2 0 012-2h1.2a3 3 0 015.6 0H15a2 2 0 012 2v3h1a1 1 0 011 1v4a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-4a1 1 0 011-1h0zM7 8a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
              </div>
            </div>

            <div className="flex-1 text-white">
              <h2 className={compact ? "text-lg font-semibold" : "text-3xl font-extrabold leading-tight"} style={compact ? {} : { textShadow: '0 6px 30px rgba(99,102,241,0.12), 0 2px 8px rgba(236,72,153,0.06)' }}>
                Chauffeur professionnel — 20 ans d&apos;expérience
              </h2>
              <p className={compact ? "mt-1 text-xs text-white/85" : "mt-4 text-lg text-white/90 max-w-3xl"}>
                Bonjour — je suis chauffeur chez VKlassTransport depuis une vingtaine d&apos;années. Ma priorité
                est simple : vous offrir un trajet sûr, confortable et sans souci. J&apos;accorde une attention
                particulière à la ponctualité, à la discrétion et au respect de vos attentes.
              </p>

              {!compact && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/85">
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" style={{ filter: 'drop-shadow(0 6px 14px rgba(249,115,22,0.14))' }}>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-medium">Véhicule principal : Mercedes V220d</div>
                      <div className="text-sm text-white/70">Entretien régulier, confort et sécurité</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" style={{ filter: 'drop-shadow(0 6px 14px rgba(249,115,22,0.14))' }}>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-medium">Service personnalisé</div>
                      <div className="text-sm text-white/70">Aide aux bagages, itinéraires sur-mesure, discrétion</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" style={{ filter: 'drop-shadow(0 6px 14px rgba(249,115,22,0.14))' }}>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-medium">Ponctualité</div>
                      <div className="text-sm text-white/70">Suivi précis des horaires et optimisation des trajets</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" style={{ filter: 'drop-shadow(0 6px 14px rgba(249,115,22,0.14))' }}>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-medium">Paiement & confirmation</div>
                      <div className="text-sm text-white/70">Réservation simple, confirmation par e‑mail et paiement sécurisé</div>
                    </div>
                  </div>
                </div>
              )}

              {!compact && (
                <p className="mt-6 text-sm text-white/60">Pour toute question ou demande spéciale, contactez-nous via le formulaire ou par téléphone. Je suis là pour rendre votre trajet serein.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
