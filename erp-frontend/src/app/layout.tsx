import "./globals.css";
import Script from "next/script";
import LayoutContent from "./layout-content"; // 👈 alag client component import

export const metadata = {
  title: "My ERP System",
  description: "Manufacturing ERP built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Bootstrap 5 CSS is now @import'd inside globals.css (into a low-
            priority cascade layer) instead of linked here directly — see
            the comment at the top of globals.css for why. */}

        {/* Bootstrap Icons */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css"
          rel="stylesheet"
        />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Custom CSS */}
        {/* <link href="/assets/css/app.css" rel="stylesheet" /> */}
      </head>
      <body>
        {/* 👇 Ye client component ke andar children pass karenge */}
        <LayoutContent>{children}</LayoutContent>

        {/* ✅ Bootstrap JS Bundle (with Popper) — powers .dropdown-menu.show,
            .modal.show, .collapse.show etc. that globals.css animates */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />

        {/* Custom JS */}
        {/* <Script src="/assets/js/app.js" strategy="afterInteractive" /> */}
      </body>
    </html>
  );
}
