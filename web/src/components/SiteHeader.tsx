import Link from "next/link";

const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/speaking", label: "Speaking" },
  { href: "/guides", label: "Guides" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
  { href: "/search", label: "Search" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="font-heading text-lg font-semibold text-[var(--color-text)] hover:text-[var(--color-link-hover)]"
        >
          Andrew Riley
        </Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-link)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
