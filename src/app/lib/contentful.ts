import * as contentful from "contentful";

const spaceToken = process.env.CONTENTFUL_SPACE_TOKEN as string;
const environmentToken = process.env.CONTENTFUL_ENVIRONMENT_TOKEN as string;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN as string;

const client = contentful.createClient({
  space: spaceToken,
  environment: environmentToken,
  accessToken: accessToken,
});

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
      select: ["fields.title", "fields.slug"],
    })

    return entries.items.map((item: any) => ({
      title: item.fields.title.toLowerCase(),
      slug: item.fields.slug,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
