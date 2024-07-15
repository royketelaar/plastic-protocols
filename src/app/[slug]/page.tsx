// app/[slug]/page.tsx

import { fetchEntryBySlug, fetchEntries } from '../lib/contentful';
import { notFound } from 'next/navigation';

// interface PageProps {
//   params: {
//     slug: string;
//   };
// }

export async function generateStaticParams() {
  const entries = await fetchEntries(); // Fetch all entries from your CMS
  return entries.map((entry: any) => ({
    slug: entry.fields.slug,
  }));
}

export default async function Page({ params }: any) {
  const entry = await fetchEntryBySlug(params.slug);

  if (!entry) {
    notFound();
  }

  return (
    <div>
      <h1>{entry.title?.toString()}</h1>
      {/* <p>{entry.body?.toString()}</p> */}
    </div>
  );
}
