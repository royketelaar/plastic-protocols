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
      <button onClick={toggleMenu} className="p-4">
        {/* Hamburger Icon */}
        <div className="space-y-2">
          <span className="block w-8 h-0.5 bg-black"></span>
          <span className="block w-8 h-0.5 bg-black"></span>
          <span className="block w-8 h-0.5 bg-black"></span>
        </div>
      </button>
      {isOpen && <MenuContent pages={pages} onClose={toggleMenu} />}
    </div>
  );
};

export default HamburgerMenu;
