import { useEffect, useState } from "react";
import { getCV } from "../lib/contentfulCV";

export default function CV() {
  const [cv, setCV] = useState(null);

  useEffect(() => {
    getCV().then(setCV);
  }, []);

  if (!cv) return null;

  return (
    <div className="min-h-screen py-20 px-6 bg-black text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xs tracking-wide uppercase mb-8 border-b border-neutral-800 pb-2">
          {cv.title}
        </h1>

        <div className="space-y-12 text-xs">
          {cv.sections.map((section) => (
            <section key={section.id}>
              <h2 className="text-xs tracking-wide uppercase mb-3 text-neutral-500">
                {section.title}
              </h2>

              <div className="space-y-2 text-neutral-400">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1fr_auto] gap-4"
                  >
                    <p>{item.text}</p>
                    <p>{item.date}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
