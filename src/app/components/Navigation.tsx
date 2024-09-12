"use client";
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";
import Link from "next/link";
import MenuContent from "./MenuContent";
import { useState } from "react";
import { useGlobalContext } from "../lib/GlobalContext";

interface NavigationProps {
  pages: { title: string; slug: string }[];
}

const Navigation = ({ pages }: NavigationProps) => {
  const { isOpen, toggleMenu } = useGlobalContext();

  return (
    <>
      <nav className="flex items-center h-24 justify-between mx-auto max-w-4xl p-6 lg:p-0">
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
      </nav>
      {/* Desktop */}
      {isOpen && (
        <aside className="hidden xl:flex fixed left-0 top-0 h-screen w-96 px-8 py-24 border-r-2">
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute top-8 left-6"
            aria-label="Close Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>

          <MenuContent
            pages={pages}
            onClose={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </aside>
      )}
    </>
  );
};

export default Navigation;
