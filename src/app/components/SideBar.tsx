"use client";

import { useGlobalContext } from "../lib/GlobalContext";
import MenuContent from "./MenuContent";

interface NavigationProps {
  pages: { title: string; slug: string }[];
}

const SideBar = ({ pages }: NavigationProps) => {
  // const { isOpen, toggleMenu } = useGlobalContext();

  return (
    <>
      {/* {isOpen && ( */}
        <aside className="max-w-96 hidden xl:block px-8">
          {/* Close Button */}
          {/* <button
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
          </button> */}

          <MenuContent
            pages={pages}
            // onClose={function (): void {
            //   throw new Error("Function not implemented.");
            // }}
          />
        </aside>
      {/* )} */}
    </>
  );
};

export default SideBar;
