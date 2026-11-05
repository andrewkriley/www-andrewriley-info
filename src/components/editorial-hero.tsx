import Image from "next/image";
import Link from "next/link";

type EditorialHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  sectionLinks?: { href: string; label: string }[];
};

export function EditorialHero({ eyebrow, title, description, image, imageAlt, primary, secondary, sectionLinks }: EditorialHeroProps) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[1.15fr_0.85fr] md:py-24">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-primary">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">{description}</p>
        {(primary || secondary) && <div className="mt-8 flex flex-wrap gap-3">
          {primary && <Link href={primary.href} className="rounded-xl bg-brand-primary px-5 py-3 font-semibold text-text-inverse transition hover:opacity-90">{primary.label}</Link>}
          {secondary && <Link href={secondary.href} className="rounded-xl border border-border-subtle px-5 py-3 font-semibold text-text-primary transition hover:bg-surface-muted">{secondary.label}</Link>}
        </div>}
        {sectionLinks?.length ? <nav aria-label="Explore this page" className="mt-8 flex flex-wrap gap-3">
          {sectionLinks.map((link, index) => <Link key={link.href} href={link.href} className={`rounded-xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary ${index === 0 ? "bg-brand-primary text-text-inverse hover:opacity-90" : "border border-border-subtle text-text-primary hover:bg-surface-muted"}`}>{link.label}</Link>)}
        </nav> : null}
      </div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border-subtle bg-surface-muted sm:aspect-[5/4] md:aspect-[4/5]">
        <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-center" />
      </div>
    </section>
  );
}
