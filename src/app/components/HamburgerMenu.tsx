import React, { useEffect, useState } from "react";
import MenuContent from "./MenuContent";

interface NavigationProps {
  pages: { title: string; slug: string }[];
}

const HamburgerMenu = ({ pages }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        onClick={toggleMenu}
        className={`hamburger hamburger--squeeze ${
          isOpen ? "is-active" : ""
        } lg:hidden z-20 h-24`}
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
