import { useEffect, useState } from "react";
import { getProjects } from "../lib/contentfulProjects";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import CustomMuxPlayer from "../components/MuxPlayer";

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

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-neutral-500 text-xs uppercase tracking-wide">
          Loading…
        </div>
      </div>
    );
  }

  const selectedProject = projects[selectedProjectIndex];
  if (!selectedProject) return null;

  // 🔑 Rebuild Base44-style image array
  const images = [
    ...(selectedProject.primaryMedia || []),
    ...(selectedProject.secondaryMedia || []),
  ];

  const heroImage = images[0] || null;
  const additionalImages = images.slice(1);

  const nextProject = () => {
    setSelectedProjectIndex((prev) => (prev + 1) % projects.length);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevProject = () => {
    setSelectedProjectIndex(
      (prev) => (prev - 1 + projects.length) % projects.length,
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-black text-white w-screen overflow-x-hidden">
      {/* Project Navigation */}
      <div className="fixed top-6 hidden md:flex gap-2 left-6 z-40 flex gap-6">
        {projects.map((project, index) => (
          <button
            key={project.id}
            onClick={() => {
              setSelectedProjectIndex(index);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`text-xs uppercase tracking-wide transition-opacity ${
              selectedProjectIndex === index
                ? "opacity-100"
                : "opacity-40 hover:opacity-60"
            }`}
          >
            {project.title}
          </button>
        ))}
      </div>

      {/* Hero Image */}
      <div className="relative h-screen w-full">
        {heroImage ? (
          <img
            src={heroImage}
            alt={selectedProject.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-black flex items-center justify-center">
            <span className="text-neutral-600 text-xs uppercase">
              Coming Soon
            </span>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-6 bg-gradient-to-t from-black/80 to-transparent">
          <button
            onClick={prevProject}
            className="text-xs uppercase tracking-wide hover:opacity-60 transition-opacity"
          >
            ← Previous
          </button>

          <h1 className="text-xs uppercase tracking-wide">
            {selectedProject.title}
          </h1>

          <button
            onClick={nextProject}
            className="text-xs uppercase tracking-wide hover:opacity-60 transition-opacity"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Sticky Title */}
      <div className="sticky top-0 z-30 bg-black border-b border-neutral-800 px-6 py-4">
        <h1 className="text-xs uppercase tracking-wide">
          {selectedProject.title}
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {selectedProject.description && (
          <div className="mb-12">
            <h2 className="text-xs uppercase tracking-wide text-neutral-500 mb-4">
              About
            </h2>
            <p className="text-xs leading-relaxed text-neutral-400 whitespace-pre-wrap">
              {/* {selectedProject.description} */}
              {documentToReactComponents(
                selectedProject.description,
                richTextOptions,
              )}
            </p>
          </div>
        )}
        {/* Credits */}

        {selectedProject.credits?.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xs uppercase tracking-wide text-neutral-500 mb-4">
              Credits
            </h2>
            <p className="text-xs leading-relaxed text-neutral-400 whitespace-pre-wrap">
              {selectedProject.credits.join(", ")}
            </p>
          </div>
        )}
        {/* MuxPlayer */}
        {selectedProject.muxPlaybackId && (
          <div id="my-video-section" className="img-contain background-b my-12">
            <CustomMuxPlayer
              playbackId={selectedProject.muxPlaybackId}
              title={selectedProject.title}
            />
          </div>
        )}

        {/* Additional Images */}
        {additionalImages.length > 0 && (
          <div className="space-y-10 ">
            {additionalImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${selectedProject.title} ${index + 2}`}
                className="w-auto max-h-[100vh] m-auto p-4"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

{
  /* <div id="my-video-section" className="img-contain background-b">
  <CustomMuxPlayer playbackId="cG5OKT8RwNsuEy9HBC8NRJnYaiWCYZchZ8UY00UI8B02A" />
</div>; */
}
