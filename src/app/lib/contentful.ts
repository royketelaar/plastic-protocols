import * as contentful from "contentful";

const spaceToken = process.env.CONTENTFUL_SPACE_TOKEN as string;
const environmentToken = process.env.CONTENTFUL_ENVIRONMENT_TOKEN as string;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN as string;

const client = contentful.createClient({
  space: spaceToken,
  environment: environmentToken,
  accessToken: accessToken,
});

// Fetch certain entry by slug
export const fetchEntryBySlug = async (slug: string) => {
  try {
    const entry = await client.getEntries({
      content_type: "page",
      "fields.slug": slug,
    });

    return entry?.items[0]?.fields;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Fetches all navigation entries
export const fetchNavigationEntries = async () => {
  try {
    const entries = await client.getEntries({
      content_type: "page",
      select: [
        "fields.title",
        "fields.slug",
        "fields.inNavigation",
        "fields.childPages",
      ],
    });

    return entries.items
      .filter((item: any) => item.fields.inNavigation)
      .map((item: any) => ({
        title: item.fields.title.toLowerCase(),
        slug: item.fields.slug,
        childPages: item.fields.childPages?.filter(
          (child: any) => child.sys.type === "Entry"
        ),
      }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Fetch site metadata
export const fetchSiteMetadata = async () => {
  try {
    const entries = await client.getEntries({
      content_type: "siteSettings",
      limit: 1,
    });

    const entry = entries.items[0];
    const metaTitle = entry.fields.metaTitle;
    const metaDescription = entry.fields.metaDescription;

    return { metaTitle, metaDescription };
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Fetch site homepage content
export const fetchHomepageContent = async () => {
  try {
    const entries = await client.getEntries({
      content_type: "siteSettings",
      limit: 1,
    });

    const homepageContent = entries.items[0].fields.homepageContent;

    return homepageContent;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Fetch all pages that have child pages
export const fetchPagesWithChildPages = async () => {
  try {
    const entries = await client.getEntries({
      content_type: "page",
      "fields.childPages[exists]": true,
    });

    return entries.items.map((item: any) => ({
      title: item.fields.title,
      slug: item.fields.slug,
      childPages: item.fields.childPages?.filter(
        (child: any) => child.sys.type === "Entry"
      ),
      order: item.fields.orderNumber,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
