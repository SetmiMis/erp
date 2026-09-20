"use client";
import { useEffect, useState } from "react";

/**
 * Floating "scroll to top" action button. Pure presentation, no business
 * logic — appears once the page is scrolled down, smooth-scrolls to top on
 * click. Mounted once in layout-content.tsx.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      title="Scroll to top"
      className={`fab no-print ${visible ? "" : "fab-hidden"}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  );
}
