import Link from "next/link";
import { experienceHighlights } from "@/data/experience";

export function ProofStrip() {
  return <section aria-label="Experience highlights" className="mx-auto grid max-w-6xl gap-4 px-5 py-8 lg:grid-cols-3">
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
  </section>;
}
