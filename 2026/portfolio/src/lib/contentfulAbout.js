import { contentfulClient } from "./contentful";

export async function getAbout() {
  const response = await contentfulClient.getEntries({
    content_type: "about",
    limit: 1,
  });

  const item = response.items[0];
  if (!item) return null;

  return {
    title: item.fields.title || "About",
    text: item.fields.text || null,
  };
}
