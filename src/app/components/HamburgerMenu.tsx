import React, { useEffect, useState } from "react";
import MenuContent from "./MenuContent";
import { useGlobalContext } from "../lib/GlobalContext";

interface NavigationProps {
  pages: { title: string; slug: string }[];
}

const HamburgerMenu = ({ pages }: NavigationProps) => {
  const { isOpen, toggleMenu } = useGlobalContext();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={toggleMenu}
        className={`hamburger hamburger--squeeze ${
          isOpen ? "is-active" : ""
        } z-20 h-24`}
        type="button"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-sky-950 z-10 top-24 px-6">
          <MenuContent pages={pages} onClose={toggleMenu} />
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
