"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import ScrollToTop from "../components/ScrollToTop";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 👇 Yaha future me aur bhi paths daal sakte ho jisme Navbar hide hoga
  const noNavbarPaths = ["/", "/register", "/forgot-password", "/reset-password", "/login"];

  const hideNavbar = noNavbarPaths.includes(pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      {/* key={pathname} forces a remount on route change, which re-triggers
          the .page-fade-in CSS animation — a lightweight page transition
          with no extra JS/animation library. */}
      <main className="container-fluid mt-4 page-fade-in" key={pathname}>
        {children}
      </main>

      {!hideNavbar && (
        <footer className="bg-light mt-5 py-3 border-top">
          <div className="container text-center small text-muted">
            &copy; {new Date().getFullYear()} My ERP System — Version 1.0.0
          </div>
        </footer>
      )}

      {!hideNavbar && <ScrollToTop />}
    </>
  );
}
