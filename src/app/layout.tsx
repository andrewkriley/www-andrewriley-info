import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/data/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Andrew Riley - Build, Lead, Play, Health",
    template: "%s | Andrew Riley",
  },
  description: site.description,
  openGraph: {
    title: "Andrew Riley - Build, Lead, Play, Health",
    description: site.description,
    url: site.url,
    siteName: "Andrew Riley",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
