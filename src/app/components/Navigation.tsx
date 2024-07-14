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
    <nav>
      <ul>
        {pages.map((page) => (
          <li key={page.sys.id}>
            <a href={`/${page.fields.title.toLowerCase()}`}>
              {page.fields.title.toLowerCase()}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
