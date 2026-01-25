import { contentfulClient } from "./contentful";

export async function getCV() {
  const response = await contentfulClient.getEntries({
    content_type: "cv",
    include: 3,
  });

  const cv = response.items[0];
  if (!cv) return null;

  return {
    title: cv.fields.title || "",
    sections:
      (cv.fields.sections || [])
        .map((section) => ({
          id: section.sys.id,
          title: section.fields.title || "",
          order: section.fields.order ?? 0,
          items:
            (section.fields.cvItems || [])
              .map((item) => ({
                id: item.sys.id,
                text: item.fields.cvItem || "",
                date: item.fields.date || "",
                order: item.fields.order ?? 0,
              }))
              .sort((a, b) => a.order - b.order),
        }))
        .sort((a, b) => a.order - b.order),
  };
}
