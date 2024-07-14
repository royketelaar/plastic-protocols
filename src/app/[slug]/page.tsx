"use client";

import { usePathname } from "next/navigation";
import { fetchEntryBySlug } from "../lib/contentful";
import { useEffect, useState } from "react";

export default function Page() {
  const slug = usePathname().substring(1);
  const [entry, setEntry] = useState<any | null>(null);

  useEffect(() => {
    fetchEntryBySlug(slug).then((entry) => {
      setEntry(entry);
    });
  }, [slug]);

  return (
    <div>
      <h1>{entry?.title}</h1>
      <p>
        {JSON.stringify(entry?.body)}
      </p>
    </div>
  );
}
