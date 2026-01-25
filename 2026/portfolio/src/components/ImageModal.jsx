import React, { useMemo } from "react";
import { X } from "lucide-react";
import RichTextBlock from "./RichTextBlock";

export default function ImageModal({ image, allImages, onClose }) {
  const similarImages = useMemo(() => {
    if (!image) return [];
    return allImages
      .filter(
        (img) =>
          img.url !== image.url &&
          (img.type === image.type || img.year === image.year)
      )
      .slice(0, 4);
  }, [image, allImages]);

  if (!image || image.kind !== "media") return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

      {/* Modal */}
      <div
        className="relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {image.description ? (
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="space-y-3">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-auto rounded-lg"
              />
              {image.credits && (
                <p className="text-xs text-neutral-500 text-center">
                  {image.credits}
                </p>
              )}
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-light">{image.title}</h2>

              <div className="flex gap-3 text-xs text-neutral-400">
                {image.year && (
                  <span className="px-3 py-1 border border-neutral-700 rounded-full">
                    {image.year}
                  </span>
                )}
                {image.type && (
                  <span className="px-3 py-1 border border-neutral-700 rounded-full">
                    {image.type}
                  </span>
                )}
              </div>

              <div className="text-sm text-neutral-300 leading-relaxed">
                <RichTextBlock document={image.description} />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 max-w-4xl mx-auto space-y-3">
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-auto rounded-lg"
            />
            {image.credits && (
              <p className="text-xs text-neutral-500 text-center">
                {image.credits}
              </p>
            )}
          </div>
        )}

        {similarImages.length > 0 && (
          <div className="border-t border-neutral-800 p-8">
            <h3 className="text-xs uppercase tracking-wide text-neutral-500 mb-4">
              Other Images of Interest
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {similarImages.map((simImg) => (
                <div
                  key={simImg.url}
                  className="cursor-pointer hover:opacity-70"
                  onClick={() => window.location.reload()}
                >
                  <img
                    src={simImg.url}
                    alt={simImg.title}
                    className="rounded"
                  />
                  <p className="text-xs text-neutral-400 mt-2">
                    {simImg.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
