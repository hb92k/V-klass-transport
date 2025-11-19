"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function TaxiNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    
    { href: "/titi", label: "Commander mon Taxi" },
    { href: "/about", label: "Réserver pour plus tard" },
    { href: "/toto", label: "La Flotte" },
  ];

  return (
    <nav className="w-full bg-transparent p-4 flex items-center justify-between relative">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image src="/lumineux.png" alt="Logo" width={100} height={30} />
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 items-center">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-black text-lg font-medium px-4 py-2 rounded-full transition duration-300 hover:bg-white hover:text-black"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-black focus:outline-none"
        >
          {/* Burger icon */}
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white bg-opacity-90 rounded-lg flex flex-col gap-2 p-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-black text-lg font-medium px-4 py-2 rounded-full transition duration-300 hover:bg-white hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
