import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import BecomeAGuest from "./BecomeAGuest.tsx";
import Imagery from "./Imagery.tsx";

// Reset scroll to the top on every route change so navigating between pages
// lands at the top. Skipped when the URL has a hash (those scroll to a section).
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/become-a-guest" element={<BecomeAGuest />} />
        <Route path="/library" element={<Imagery />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
