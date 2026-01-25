export function normalizeProjectBlocks(project) {
  const blocks = [];

  // Primary media
  if (project.fields.primaryMedia?.length) {
    project.fields.primaryMedia.forEach((asset) => {
      const file = asset?.fields?.file;
      if (!file) return;

      blocks.push({
        kind: "media",
        id: asset.sys.id,
        url: `https:${file.url}`,
        title: project.fields.title || "",
        credits: project.fields.credits || [],
      });
    });
  }

  // Description (rich text)
  if (project.fields.description) {
    blocks.push({
      kind: "richtext",
      id: `${project.sys.id}-description`,
      richtext: project.fields.description,
    });
  }

  // Secondary media
  if (project.fields.secondaryMedia?.length) {
    project.fields.secondaryMedia.forEach((asset) => {
      const file = asset?.fields?.file;
      if (!file) return;

      blocks.push({
        kind: "media",
        id: asset.sys.id,
        url: `https:${file.url}`,
        title: project.fields.title || "",
        credits: project.fields.credits || [],
      });
    });
  }

  // Optional extra rich text field
  if (project.fields.richtext) {
    blocks.push({
      kind: "richtext",
      id: `${project.sys.id}-richtext`,
      richtext: project.fields.richtext,
    });
  }

  return blocks;
}
