import Image from "next/image";
import { site } from "@/data/site";
import Link from "next/link";
import { experienceHighlights } from "@/data/experience";

export function ProofStrip() {
  return <section id="experience" aria-label="Experience highlights" className="scroll-mt-44 md:scroll-mt-24 mx-auto grid max-w-6xl gap-4 px-5 py-8 lg:grid-cols-3">
    {experienceHighlights.map(highlight => <article key={highlight.title} className="flex flex-col rounded-2xl border border-border-subtle bg-surface-card p-6">
      <h2 className="text-2xl font-bold leading-tight text-brand-primary">{highlight.title}</h2>
      <p className="mt-4 leading-7 text-text-secondary">{highlight.description}</p>
      <div className="mt-auto pt-6">
        <p className="border-t border-border-subtle pt-5 text-xs font-semibold uppercase tracking-widest text-text-muted">From the journal</p>
        <ul className="mt-4 space-y-4">{highlight.examples.map(example => <li key={example.href}>
          <Link href={example.href} className="text-sm font-semibold leading-6 text-brand-primary hover:underline">{example.label} →</Link>
          <p className="mt-1 text-xs leading-5 text-text-muted">{example.context}</p>
        </li>)}</ul>
      </div>
    </article>)}
    <div className="mt-3 grid items-center gap-6 rounded-2xl border border-border-subtle bg-surface-card p-5 md:grid-cols-2 lg:col-span-3 sm:p-6">
      <a href={site.cv.href} target="_blank" rel="noopener noreferrer" aria-label="View Andrew Riley's full CV on Canva (opens in a new tab)" className="block overflow-hidden rounded-xl border border-border-subtle bg-white transition hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary">
        <Image src={site.cv.preview.src} alt={site.cv.preview.alt} width={site.cv.preview.width} height={site.cv.preview.height} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full" />
      </a>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">My professional story</p>
        <h3 className="mt-3 text-2xl font-bold leading-tight"><Link href="/work#experience" className="hover:text-brand-primary">Explore my experience and projects →</Link></h3>
        <p className="mt-4 text-sm leading-7 text-text-secondary">A visual overview from the first page of my CV.</p>
        <a href={site.cv.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm font-semibold text-brand-primary hover:underline">View the full CV on Canva ↗</a>
      </div>
    </div>
  </section>;
}
