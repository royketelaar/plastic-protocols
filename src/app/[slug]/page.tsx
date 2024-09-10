import { fetchEntryBySlug } from "../lib/contentful";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import ContentBody from "../components/ContentBody";
import Link from "next/link";
import { renderOptions } from "../lib/renderOptions";


export default async function Page({ params }: { params: { slug: string } }) {
  const entry = await fetchEntryBySlug(params.slug);
  if (!entry) notFound();

  const { title, body, childPages } = entry as {
    title: string;
    body: Document;
    childPages: any[];
  };

  return (
    <ContentBody>
      <h1 className="text-4xl font-bold text-sky-50 mb-8">{title}</h1>
      {documentToReactComponents(body, renderOptions)}
      {childPages && (
        <Link
          href={`
          /${childPages[0]?.fields?.slug}
        `}
          className="no-underline"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
            {childPages.map((childPage: any) => (
              <div
                key={childPage?.fields?.slug}
                className="p-8 rounded-lg shadow-lg bg-sky-900 text-sky-100"
              >
                <h2 className="text-2xl font-bold mb-4">
                  {childPage?.fields?.title}
                </h2>
                <p className="text-white">{childPage?.fields?.description}</p>
              </div>
            ))}
          </div>
        </Link>
      )}
    </ContentBody>
  );
}
