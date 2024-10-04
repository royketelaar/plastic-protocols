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
      <nav className="flex items-center h-24 justify-between mx-auto max-w-4xl xl:max-w-full px-8 ">
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
        <div className="xl:hidden">
          <HamburgerMenu pages={pages} />
        </div>
      </nav>
    </>
  );
};

export default Navigation;
