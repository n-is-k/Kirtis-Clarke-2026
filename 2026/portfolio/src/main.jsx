import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from "./routes/index";
import Projects from "./routes/projects";
import Gallery from "./routes/gallery";
import CV from "./routes/cv";
import About from "./routes/about";
import Nav from "./components/nav";
import "./index.css";

const queryClient = new QueryClient();

// 1. FIX FOR PAGE RELOADS - This runs before React renders
(() => {
  // Check if we're coming from the 404.html redirect
  const redirect = sessionStorage.getItem("redirect");

  if (redirect) {
    sessionStorage.removeItem("redirect");

    // Only redirect if we're not already there
    if (redirect !== window.location.pathname + window.location.search) {
      window.history.replaceState(null, null, redirect);
    }
  }
})();

// 2. Your React app
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      {" "}
      {/* NO basename for custom root domain */}
      <Nav />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/projects/:slug?" element={<Projects />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>,
);
