import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",   // Aligne verticalement l'image avec les liens
        gap: "50px",
        fontSize: "20px",
        padding: "10px 40px",
        listStyle: "none",
      }}
    >
      <Link href="/">
        <Image src="/lumineux.png" alt="Logo" width={80} height={80} />
      </Link>

      <Link href="/">Home</Link>
      <Link href="/about">Commander mon Taxi</Link>
      <Link href="/titi">Réserver pour plus tard</Link>
      <Link href="/toto">À propos de nous</Link>
    </nav>
  );
}
  


