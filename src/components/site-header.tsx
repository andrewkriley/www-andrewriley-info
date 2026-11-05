import Link from "next/link";
import { site } from "@/data/site";
import { HeaderSocialLinks } from "@/components/header-social-links";

export function SiteHeader() {
  return <header className="sticky top-0 z-30 border-b border-border-subtle bg-surface-page/95 backdrop-blur">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-2 gap-y-2 px-4 py-3 sm:px-5 lg:flex-nowrap">
      <Link href="/" className="shrink-0 text-[13px] font-bold tracking-wide text-text-primary sm:text-base">ANDREW RILEY <span className="text-brand-primary">.</span></Link>
      <nav aria-label="Main navigation" className="order-3 flex w-full flex-wrap items-center justify-center gap-0.5 lg:order-2 lg:ml-auto lg:w-auto">
        {site.nav.map(item => <Link key={item.href} href={item.href} className="rounded-lg px-1.5 py-2 text-[13px] font-medium text-text-secondary transition hover:bg-surface-muted hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:px-2 sm:text-sm">{item.label}</Link>)}
      </nav>
      <HeaderSocialLinks />
    </div>
  </header>;
}
