import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/data/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Andrew Riley - From Breadboards to Boardrooms",
    template: "%s | Andrew Riley",
  },
  description: site.description,
  openGraph: {
    title: "Andrew Riley - From Breadboards to Boardrooms",
    description: site.description,
    url: site.url,
    siteName: "Andrew Riley",
    type: "website",
  },
};

const themeScript = `
try {
  const theme = window.localStorage.getItem("theme-preference");
  if (theme === "light" || theme === "dark") {
    document.documentElement.dataset.theme = theme;
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
} catch {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
