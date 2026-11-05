import Link from "next/link";
import { experienceHighlights } from "@/data/experience";

export function ProofStrip() {
  return <section aria-label="Experience highlights" className="mx-auto grid max-w-6xl gap-3 px-5 py-8 sm:grid-cols-3">
    {experienceHighlights.map(fact => <div key={fact.value} className="flex flex-col rounded-2xl border border-border-subtle bg-surface-card p-6">
      <p className="text-4xl font-bold text-brand-primary">{fact.value}</p>
      <h2 className="mt-3 text-base font-semibold leading-6">{fact.label}</h2>
      <p className="mb-4 mt-2 text-xs leading-5 text-text-muted">{fact.context}</p>
      <Link href={fact.href} className="mt-auto text-sm font-semibold text-brand-primary hover:underline">{fact.linkLabel} →</Link>
    </div>)}
  </section>;
}
