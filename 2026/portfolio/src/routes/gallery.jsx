import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGalleryImages } from "../lib/contentfulGallery";
import ImageModal from "../components/ImageModal";
import { useInViewFade } from "../hooks/useInViewFade";

const gridColsOptions = [2, 4, 5];

/* ----------------------------------------
   Contentful image helpers
----------------------------------------- */

const buildImage = (url, width, quality = 80) => {
  if (url.includes(".gif")) {
    // For GIFs, still apply width but keep GIF format
    // Some CDNs can resize GIFs properly
    return `${url}?w=${width}&fm=gif`;
  }

  return `${url}?w=${width}&fm=webp&q=${quality}`;
};

const buildSrcSet = (url, widths = [600, 1200, 1800, 2400]) => {
  if (url.includes(".gif")) {
    // For GIFs, create srcSet with GIF format
    return widths.map((w) => `${url}?w=${w}&fm=gif ${w}w`).join(", ");
  }

  return widths.map((w) => `${buildImage(url, w)} ${w}w`).join(", ");
};
/* ----------------------------------------
   Fade-in image wrapper
----------------------------------------- */

function FadeInImage({ item, onClick }) {
  const { ref, isVisible } = useInViewFade();

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`
        cursor-pointer transition-all duration-700 ease-out
        hover:opacity-80
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      <img
        src={buildImage(item.url, 1200)}
        srcSet={buildSrcSet(item.url)}
        sizes="
  (max-width: 768px) 50vw,
  (max-width: 1024px) 33vw,
  25vw
"
        alt={item.title}
        className="w-full h-auto"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/* ----------------------------------------
   Gallery
----------------------------------------- */

export default function Gallery() {
  const { data: images = [], isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: getGalleryImages,
  });

  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortMode, setSortMode] = useState("chronological");
  const [selectedImage, setSelectedImage] = useState(null);
  const [gridCols, setGridCols] = useState(
    () => gridColsOptions[Math.floor(Math.random() * gridColsOptions.length)],
  );

  useEffect(() => {
    setGridCols(
      gridColsOptions[Math.floor(Math.random() * gridColsOptions.length)],
    );
  }, [selectedYear, selectedType, sortMode, images.length]);

  const colsClass =
    gridCols === 2
      ? "md:grid-cols-2"
      : gridCols === 4
      ? "md:grid-cols-4"
      : "md:grid-cols-5";

  const widthClass =
    gridCols === 2 ? "md:max-w-[80vw] md:mx-auto" : "md:max-w-none";

  /* -----------------------------
     Filters
  ----------------------------- */

  const years = useMemo(
    () =>
      [...new Set(images.map((i) => i.year).filter(Boolean))].sort(
        (a, b) => b - a,
      ),
    [images],
  );

  const types = useMemo(() => {
    const allTypes = [...new Set(images.map((i) => i.type).filter(Boolean))];
    return allTypes.filter((type) => type !== "advisory");
  }, [images]);

  /* -----------------------------
     Filtered + sorted images
  ----------------------------- */

  const filteredImages = useMemo(() => {
    let filtered = images.filter((img) => {
      const yearMatch =
        selectedYear === "all" || img.year === Number(selectedYear);

      const typeMatch =
        selectedType === "all"
          ? img.type !== "advisory"
          : img.type === selectedType;

      return yearMatch && typeMatch;
    });

    if (sortMode === "chronological") {
      filtered = [...filtered].sort((a, b) => (b.year || 0) - (a.year || 0));
    }

    if (sortMode === "random") {
      filtered = [...filtered].sort(() => Math.random() - 0.5);
    }

    return filtered;
  }, [images, selectedYear, selectedType, sortMode]);

  /* -----------------------------
     Loading
  ----------------------------- */

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-neutral-500 text-xs">Loading…</div>
      </div>
    );
  }

  /* -----------------------------
     Render
  ----------------------------- */

  return (
    <div className="min-h-screen bg-black pb-12 text-white">
      {/* Filters */}
      <div
        className="
          fixed z-40
          top-15 left-1/2 -translate-x-1/2
          md:top-6 md:left-6 md:right-auto md:translate-x-0
          flex gap-4 md:gap-2
          max-w-[90vw] md:max-w-2xl
          justify-center md:justify-start
          px-2 py-3 md:px-0 md:py-0
        "
      >
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-transparent md:border border-neutral-800 text-xs uppercase px-3 py-1"
        >
          <option value="all">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-transparent md:border border-neutral-800 text-xs uppercase px-3 py-1"
        >
          <option value="all">All Types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value)}
          className="bg-transparent md:border border-neutral-800 text-xs uppercase px-3 py-1"
        >
          <option value="chronological">Chronological</option>
          <option value="random">Random</option>
        </select>
      </div>

      {/* Grid */}
      <div className="pt-24 px-6">
        <div className={`grid grid-cols-2 ${colsClass} gap-[30px] ${widthClass}`}>
          {filteredImages.map((item) =>
            item.kind === "richtext" ? (
              <div
                key={item.id}
                className="col-span-2 md:col-span-full border border-neutral-800 p-4"
              >
                {item.richtext && <RichTextBlock document={item.richtext} />}
              </div>
            ) : (
              <FadeInImage
                key={item.id}
                item={item}
                onClick={() => setSelectedImage(item)}
              />
            ),
          )}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center text-neutral-600 text-xs mt-12">
            No images found
          </div>
        )}
      </div>

      {/* Modal */}
      <ImageModal
        image={selectedImage}
        allImages={images}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
