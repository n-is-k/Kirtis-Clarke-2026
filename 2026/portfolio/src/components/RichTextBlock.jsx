// src/components/RichTextBlock.jsx
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p className="text-xs leading-relaxed text-neutral-400">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <h2 className="text-xs uppercase tracking-wide text-neutral-500 mt-6 mb-2">
        {children}
      </h2>
    ),
  },
};

export default function RichTextBlock({ document }) {
  return documentToReactComponents(document, options);
}
