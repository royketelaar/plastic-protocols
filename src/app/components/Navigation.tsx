"use client";
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";

interface NavigationProps {
  pages: { title: string; slug: string }[];
}

const Navigation = ({ pages }: NavigationProps) => {
  return (
    <nav className="flex items-center h-24 justify-between">
      {/* Logo  */}
      <div className="ml-4">
        <Image
          src="/logo.svg"
          alt="Plastic Protocols Logo"
          width={150}
          height={0}
        />
      </div>
      {/* Mobile menu */}
      <HamburgerMenu pages={pages} />
    </nav>
  );
};

export default Navigation;
