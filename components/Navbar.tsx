"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function TaxiNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/titi", label: "Commander mon Taxi" },
    { href: "/about", label: "Réserver pour plus tard" },
  ];

  return (
    <nav className="w-full bg-transparent p-4 flex items-center justify-between relative z-50">
      <Link href="/" className="flex items-center z-50">
        <Image src="/lumineux.png" alt="Logo" width={120} height={40} className="w-auto h-auto" />
      </Link>

      <div className="hidden md:flex gap-6 items-center">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-black text-lg font-medium px-4 py-2 rounded-full transition duration-300 hover:bg-black/60 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="md:hidden z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none p-2 rounded-lg bg-black/30 backdrop-blur-sm"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-6 p-8 md:hidden z-40"
          onClick={() => setMenuOpen(false)}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-2xl font-semibold w-full text-center py-4 rounded-xl transition duration-300 hover:bg-white/20 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}