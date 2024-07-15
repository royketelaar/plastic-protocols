"use client";

import { useEffect, useState } from "react";
import { fetchEntries } from "../lib/contentful";

// components/Navigation.tsx
const Navigation = () => {
  const [pages, setPages] = useState<any[]>([]);
  useEffect(() => {
    fetchEntries().then((entries) => {
      // Filter or process entries as needed to get page entries
      setPages(entries as any);
    });
  }, []);
  return (
    <nav className="h-24">
      <ul className="flex items-center justify-center space-x-4">
        {pages.map((page) => (
          <li key={page.sys.id}>
            <a
              href={`/${page.fields.title.toLowerCase()}`}
              className="text-white hover:text-gray-300 font-bold"
            >
              {page.fields.title.toLowerCase()}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
