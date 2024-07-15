import { fetchEntryBySlug } from "../lib/contentful";
import { notFound } from "next/navigation";

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
