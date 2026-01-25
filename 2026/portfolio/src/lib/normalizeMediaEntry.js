// export function normalizeMediaEntry(entry, extra = {}) {
//   const asset = entry.fields.media;
//   const file = asset?.fields?.file;
//   const richtext = entry.fields.richtext || null;

//   // ❌ Invalid entry
//   if (!file && !richtext) return null;

//   return {
//     id: entry.sys.id,
//     kind: file ? "media" : "richtext",

//     // media
//     url: file ? `https:${file.url}` : null,

//     // rich text
//     richtext,

//     // shared metadata
//     title: entry.fields.title || "",
//     caption: entry.fields.caption || "",
//     credits: entry.fields.credits || [],
//     date: entry.fields.date || null,
//     year: entry.fields.date
//       ? new Date(entry.fields.date).getFullYear()
//       : null,

//     ...extra,
//   };
// }


export function normalizeMediaEntry(entry, { type }) {
  if (!entry?.fields?.media?.fields?.file?.url) return null;

  return {
    id: entry.sys.id,
    kind: "media",
    url: entry.fields.media.fields.file.url,
    title: entry.fields.title || "",
    year: entry.fields.date ? new Date(entry.fields.date).getFullYear() : null,
    credits: entry.fields.credits || [],
    type,
    // <-- Map richtext to description
    description: entry.fields.richtext || null,
  };
}