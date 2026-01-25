// import { contentfulClient } from "./contentful";

// // normalize a single project into blocks
// function normalizeProjectBlocks(project) {
//   const blocks = [];

//   // convert primary + secondary media to blocks
//   const addMediaArray = (assets = []) => {
//     assets.forEach((asset) => {
//       const file = asset?.fields?.file;
//       if (!file) return;
//       blocks.push({
//         kind: "media",
//         id: asset.sys.id,
//         url: `https:${file.url}`,
//         title: project.fields.title || "",
//         credits: project.fields.credits || [],
//       });
//     });
//   };

//   addMediaArray(project.fields.primaryMedia);
//   addMediaArray(project.fields.secondaryMedia);

//   // description rich text
//   if (project.fields.description) {
//     blocks.push({
//       kind: "richtext",
//       id: `${project.sys.id}-description`,
//       richtext: project.fields.description,
//     });
//   }

//   // optional richtext field
//   if (project.fields.richtext) {
//     blocks.push({
//       kind: "richtext",
//       id: `${project.sys.id}-richtext`,
//       richtext: project.fields.richtext,
//     });
//   }

//   return blocks;
// }

// // fetch projects
// export async function getProjects() {
//   const res = await contentfulClient.getEntries({
//     content_type: "project",
//     include: 2, // resolves asset links
//     order: ["fields.position"],
//   });

//   return res.items.map((project) => ({
//     id: project.sys.id,
//     title: project.fields.title || "",
//     position: project.fields.position ?? 0,
//     credits: project.fields.credits || [],
//     blocks: normalizeProjectBlocks(project),
//   }));
// }



import { contentfulClient } from "./contentful";

export async function getProjects() {
  const response = await contentfulClient.getEntries({
    content_type: "project",
    order: ["fields.position"],
    include: 2,
  });

  return response.items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title || "",
    position: item.fields.position ?? 0,

    description: item.fields.description || null,
    muxPlaybackId: item.fields.muxPlaybackId || null,

    primaryMedia:
      item.fields.primaryMedia?.map(
        (asset) => `https:${asset.fields.file.url}`
      ) || [],

    secondaryMedia:
      item.fields.secondaryMedia?.map(
        (asset) => `https:${asset.fields.file.url}`
      ) || [],

    credits: item.fields.credits || [],
  }));
}


