import Link from "next/link";

import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle bg-surface-card/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-text-muted">
            Andrew Riley
          </p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-text-secondary">
            Health, build, play, and lead across wellbeing, technology, DIY,
            music, and professional work.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/uses"
            className="text-sm font-medium text-text-secondary hover:text-text-primary"
          >
            /uses
          </Link>
          <Link
            href="/design-system"
            className="text-sm font-medium text-text-secondary hover:text-text-primary"
          >
            /design-system
          </Link>
          {site.socials.map((social) => (
            <Link
              key={social.href}
              href={social.href}
              className="text-sm font-medium text-text-secondary hover:text-text-primary"
            >
              {social.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
