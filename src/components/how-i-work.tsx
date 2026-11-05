import Link from "next/link";
import { workingPillars } from "@/data/experience";

export function HowIWork() {
  return <section id="how-i-work" className="scroll-mt-44 md:scroll-mt-24 mx-auto max-w-6xl px-5 py-16" aria-labelledby="how-i-work-heading">
    <h2 id="how-i-work-heading" className="text-3xl font-bold">How I work</h2>
    <p className="mt-4 max-w-3xl leading-7 text-text-secondary">Five steps, with a real example of each.</p>
    <ol className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
      {workingPillars.map((pillar, index) => <li key={pillar.label} className="flex flex-col rounded-2xl border border-border-subtle bg-surface-card p-5">
        <p className="text-xs font-semibold tracking-widest text-brand-primary">0{index + 1}</p>
        <h3 className="mt-2 text-xl font-bold">{pillar.label}</h3>
        <div className="mt-4">
          <p className="text-xs leading-5 text-text-muted">{pillar.context}</p>
          <h4 className="mt-2 font-semibold">{pillar.title}</h4>
          <p className="mt-3 text-sm leading-6 text-text-secondary">{pillar.example}</p>
        </div>
        <Link href={pillar.href} className="mt-auto pt-5 text-sm font-semibold text-brand-primary hover:underline">Read the {pillar.label.toLowerCase()} example →</Link>
      </li>)}
    </ol>
  </section>;
}
