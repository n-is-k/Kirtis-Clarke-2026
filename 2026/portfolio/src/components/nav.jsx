// // src/components/Nav.jsx
// import React from "react";
// // src/components/Nav.jsx
// import { Link, useLocation } from "react-router-dom";

// const createPageUrl = (pageName) => {
//   if (pageName === "Home") return "/";
//   return `/${pageName.toLowerCase()}`;
// };

// export default function Nav() {
//   const { pathname } = useLocation();

//   // ❌ Hide nav on homepage
//   if (pathname === "/") return null;

//   const pages = ["Home", "Gallery", "Projects", "About", "CV"];

//   return (
//     <nav className="fixed top-6 right-6 z-50 flex gap-6 text-xs tracking-wide">
//       {pages.map((page) => {
//         const path = createPageUrl(page);
//         const isActive = pathname === path;

//         return (
//           <Link
//             key={page}
//             to={path}
//             className={`uppercase transition-opacity hover:opacity-60 text-white ${
//               isActive ? "opacity-100" : "opacity-80"
//             }`}
//           >
//             {page === "Gallery" ? "Works" : page}
//           </Link>
//         );
//       })}
//     </nav>
//   );
// }

import { Link, useLocation } from "react-router-dom";

const createPageUrl = (pageName) => {
  if (pageName === "Home") return "/";
  return `/${pageName.toLowerCase()}`;
};

export default function Nav() {
  const { pathname } = useLocation();

  // Hide on homepage
  if (pathname === "/") return null;

  const pages = ["Home", "Gallery", "Projects", "About", "CV"];

  return (
    <nav
      className="
    fixed z-50
    top-4 left-1/2 -translate-x-1/2
    md:top-6 md:right-6 md:left-auto md:translate-x-0
    flex md:flex-row
    gap-3 md:gap-6
    text-white
    text-xs tracking-wide
    bg-black/80 md:bg-transparent
    backdrop-blur md:backdrop-blur-none
    px-4 py-3
    md:px-0 md:py-0
    rounded-md md:rounded-none
  "
    >
      {pages.map((page) => {
        const path = createPageUrl(page);
        const isActive = pathname === path;

        return (
          <Link
            key={page}
            to={path}
            className={`uppercase transition-opacity hover:opacity-60 ${
              isActive ? "opacity-100" : "opacity-70"
            }`}
          >
            {page === "Gallery" ? "Works" : page}
          </Link>
        );
      })}
    </nav>
  );
}
