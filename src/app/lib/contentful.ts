// contentful.ts
import * as contentful from "contentful";

const client = contentful.createClient({
  ***REMOVED***
  ***REMOVED*** // defaults to 'master' if not set
  ***REMOVED***
});

export const fetchEntries = async () => {
  try {
    const entries = await client.getEntries();
    return entries.items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchEntryBySlug = async (slug: string) => {
  try {
    console.log('slug', slug);
    const entry = await client.getEntries({
      content_type: "page",
      "fields.slug": slug,
    });

    console.log("entries from fetchEntryBySlug", entry?.items[0]?.fields);

    return entry?.items[0]?.fields; // Assuming slug is unique and returns only one entry
  } catch (error) {
    console.error(error);
    return null;
  }
};
