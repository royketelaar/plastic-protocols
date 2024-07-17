import { fetchEntryBySlug } from "../lib/contentful";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document, BLOCKS, INLINES } from "@contentful/rich-text-types";
import { ReactNode } from "react";

const renderOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: (node: any, children: ReactNode) => {
      return (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title } = node.data.target.fields;
      const { url, contentType } = file;

      if (contentType.startsWith("image/")) {
        return <img src={url} alt={title} />;
      }

      // Handle other content types if needed
      return <div>Unsupported asset type: {contentType}</div>;
    },
  },
};

export default async function Page({ params }: { params: { slug: string } }) {
  const entry = await fetchEntryBySlug(params.slug);
  if (!entry) notFound();

  const { title, body } = entry as { title: string; body: Document };

  return (
    <div className="mx-auto max-w-4xl p-6 xl:p-0">
      <h1>{title}</h1>
      <div>{documentToReactComponents(body, renderOptions)}</div>
    </div>
  );
}
