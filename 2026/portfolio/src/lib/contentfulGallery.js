import { contentfulClient } from "./contentful";
import { normalizeMediaEntry } from "./normalizeMediaEntry";

export async function getGalleryImages() {
  const res = await contentfulClient.getEntries({
    content_type: "gallery",
    include: 4,
  });

  const gallery = res.items[0];
  if (!gallery) return [];

  const categories = gallery.fields.types || [];

  const items = categories.flatMap((category) => {
    const type = category.fields.type;
    const mediaItems = category.fields.categoryMedia || [];

    return mediaItems
  .map((entry) => normalizeMediaEntry(entry, { type }))
  .filter(Boolean);
  });

  return items;
}
