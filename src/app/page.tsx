import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ContentBody from "./components/ContentBody";
import {
  fetchHomepageContent,
  fetchPagesWithChildPages,
} from "./lib/contentful";
import { render } from "sass";
import { renderOptions } from "./lib/renderOptions";
import Link from "next/link";

export default async function Home() {
  const homepageContent = (await fetchHomepageContent()) ?? ({} as any); // TODO: Fix this typing issue, it should be a Document but doesn't but creates errors somehow
  const pagesWithChildPages = (await fetchPagesWithChildPages()) ?? [];

  // Sort pages by the order property
  const sortedPagesWithChildPages = pagesWithChildPages.sort(
    (a, b) => a.order - b.order
  );

  return (
    <ContentBody>
      {/* Homepage content */}
      {homepageContent &&
        documentToReactComponents(homepageContent, renderOptions)}
      {/* Overview of every page that has child pages, render its child pages underneath */}
      <section className="my-16">
        {sortedPagesWithChildPages.map((page) => (
          <div key={page.slug}>
            <h2 className="underlined-header mb-6">
              <Link
                className="text-sky-50 no-underline"
                href={`/${page.slug}`}
              >
                {page.title}
              </Link>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sky-50 mb-8">
              {page.childPages.map((childPage: any) => (
                <Link
                  href={`/${childPage?.fields?.slug}`}
                  className="no-underline"
                  key={childPage?.fields?.slug}
                >
                  <div className="p-8 rounded-lg shadow-lg bg-sky-900 text-sky-50">
                    <h2 className="text-2xl font-bold mb-4">
                      {childPage?.fields?.title}
                    </h2>
                    <p className="text-sky-50">
                      {childPage?.fields?.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </ContentBody>
  );
}
