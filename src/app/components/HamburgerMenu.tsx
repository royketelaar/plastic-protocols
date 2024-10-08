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
        className={`xl:hidden hamburger hamburger--squeeze z-20 sticky ${
          isOpen ? "is-active" : ""
        } h-24`}
        type="button"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>

      {isOpen && (
        <div className="xl:hidden fixed inset-0 bg-sky-950 z-10 pt-24 mx-auto max-w-4xl xl:max-w-full px-8 ">
          <MenuContent pages={pages} onClose={toggleMenu} />
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
