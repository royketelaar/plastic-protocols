import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ContentBody from "./components/ContentBody";
import { fetchHomepageContent } from "./lib/contentful";
import { render } from "sass";
import { renderOptions } from "./lib/renderOptions";

export default async function Home() {
  const homepageContent = (await fetchHomepageContent()) ?? ({} as any); // Fix this typing issue, it should be a Document but doesn't but creates errors somehow

  return (
    <ContentBody>
      <h2>Welcome to Plastic Protocols</h2>
      {homepageContent &&
        documentToReactComponents(homepageContent, renderOptions)}
    </ContentBody>
  );
}
