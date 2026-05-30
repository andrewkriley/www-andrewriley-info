import Link from "next/link";

import { HeaderSocialLinks } from "@/components/header-social-links";
import { site } from "@/data/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border-subtle bg-surface-page/88 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-1.5">
        <Link href="/" className="group">
          <span className="block text-sm font-medium text-text-secondary transition group-hover:text-text-primary">
            Andrew Riley, but you can call me Riles
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1 text-sm font-medium text-text-secondary transition hover:bg-surface-muted hover:text-text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <HeaderSocialLinks />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
