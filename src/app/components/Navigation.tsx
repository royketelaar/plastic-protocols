"use client";
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";
import Link from "next/link";

interface NavigationProps {
  pages: { title: string; slug: string }[];
}

const Navigation = ({ pages }: NavigationProps) => {
  return (
    <nav className="flex items-center h-24 justify-between">
      {/* Logo  */}
      <Link className="ml-4 z-20" href={'/'}>
        <Image
          src="/logo.svg"
          alt="Plastic Protocols Logo"
          width={150}
          height={0}
        />
      </Link>
      {/* Mobile menu */}
      <HamburgerMenu pages={pages} />
    </nav>
  );
};

export default Navigation;
