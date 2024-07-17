import * as contentful from "contentful";

const client = contentful.createClient({
  ***REMOVED***
  ***REMOVED***
  ***REMOVED***
});

export const fetchEntryBySlug = async (slug: string) => {
  try {
    console.log("slug", slug);
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
      select: ["fields.title"],
    });
    return entries.items.map((item: any) => item.fields.title.toLowerCase());
  } catch (error) {
    console.error(error);
    return [];
  }
};
