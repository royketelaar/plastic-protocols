"use client";
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";
import Link from "next/link";

interface NavigationProps {
  pages: { title: string; slug: string }[];
}

const Navigation = ({ pages }: NavigationProps) => {
  return (
    <nav className="flex items-center h-24 justify-between mx-auto max-w-4xl">
      {/* Logo  */}
      <Link className="z-20" href={"/"}>
        <Image
          src="/logo.svg"
          alt="Plastic Protocols Logo"
          width={150}
          height={0}
        />
      </Link>
      {/* Mobile menu */}
      <HamburgerMenu pages={pages} />
      {/* Desktop menu */}
      <ul className="hidden lg:flex space-x-4 text-white ">
        {pages.map((page) => (
          <li key={page.slug}>
            <Link href={`/${page.slug}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
