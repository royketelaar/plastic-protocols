import React, { useState } from "react";
import MenuContent from "./MenuContent";

interface NavigationProps {
  pages: { title: string; slug: string }[];
}

const HamburgerMenu = ({ pages }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleMenu}
        className={`hamburger hamburger--squeeze ${
          isOpen ? "is-active" : ""
        } p-4`}
        type="button"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
      {isOpen && <MenuContent pages={pages} onClose={toggleMenu} />}
    </div>
  );
};

export default HamburgerMenu;
