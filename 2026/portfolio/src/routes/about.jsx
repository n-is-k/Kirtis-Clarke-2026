import { useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { getAbout } from "../lib/contentfulAbout";

const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p className="leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <h2 className="text-xs uppercase tracking-wide text-neutral-500 mt-8 mb-2">
        {children}
      </h2>
    ),
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul className="list-disc pl-4 space-y-1">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => <li>{children}</li>,
  },
  renderMark: {
    bold: (text) => <strong className="text-white">{text}</strong>,
    italic: (text) => <em className="italic">{text}</em>,
  },
};

export default function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    getAbout().then(setAbout);
  }, []);

  if (!about) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-neutral-500 text-xs">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid place-items-center px-6 bg-black text-white">
      <div className="max-w-2xl w-full">
        <h1 className="text-xs tracking-wide uppercase mb-6 border-b border-neutral-800 pb-2">
          {about.title}
        </h1>

        <div className="space-y-4 text-xs leading-relaxed text-neutral-400">
          {documentToReactComponents(about.text, richTextOptions)}
        </div>
      </div>
    </div>
  );
}
