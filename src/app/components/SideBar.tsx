"use client";
import MenuContent from "./MenuContent";

interface NavigationProps {
  pages: { title: string; slug: string }[];
}

const SideBar = ({ pages }: NavigationProps) => {
  return (
    <aside className="max-w-96 hidden xl:block px-8">
      <MenuContent pages={pages} />
    </aside>
  );
};

export default SideBar;