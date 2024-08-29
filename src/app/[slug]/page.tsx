import { fetchEntryBySlug } from "../lib/contentful";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document, BLOCKS, INLINES } from "@contentful/rich-text-types";
import { ReactNode } from "react";
import Image from "next/image";
import ContentBody from "../components/ContentBody";

const renderOptions = {
  renderNode: {
    // Handle embedded hyperlinks
    [INLINES.HYPERLINK]: (node: any, children: ReactNode) => {
      return (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
    // Handle embedded assets
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title } = node.data.target.fields;
      const { url, contentType, details } = file;
      const { width } = details.image;

      if (contentType.startsWith("image/")) {
        return (
          <Image
            src={"https:" + url}
            alt={title}
            layout="responsive"
            width={width}
            height="0"
          />
        );
      }

      // Handle other content types if needed
      return <div>Unsupported asset type: {contentType}</div>;
    },
    // Handle embedded entries
    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      const entry = node.data.target;

      if (entry.sys.contentType.sys.id === "youtubeVideo") {
        const { youtubeUrl } = entry.fields;
        return (
          <div className="video-embed my-12">
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                src={`https://www.youtube.com/embed/${
                  youtubeUrl.split("v=")[1]
                }`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        );
      }
      // Add more conditions if you have other types of embeddable entries
      return null;
    },
  },
};

export default async function Page({ params }: { params: { slug: string } }) {
  const entry = await fetchEntryBySlug(params.slug);
  if (!entry) notFound();

  const { title, body } = entry as { title: string; body: Document };

  return (
    <ContentBody>{documentToReactComponents(body, renderOptions)}</ContentBody>
  );
}
