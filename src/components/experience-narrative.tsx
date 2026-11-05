import Link from "next/link";
import { experiencePersonas } from "@/data/experience";

export function ExperienceNarrative() {
  return <section id="experience" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-16" aria-labelledby="experience-heading">
    <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">Experience that connects strategy and execution</p>
    <h2 id="experience-heading" className="mt-4 max-w-3xl text-3xl font-bold">Lead the people. Architect the path. Build to learn.</h2>
    <p className="mt-5 max-w-3xl leading-8 text-text-secondary">These are three connected parts of how I work. Leading teams taught me how to create shared direction. Architecture taught me to connect ambition with constraints. Engineering keeps those decisions grounded in how systems behave.</p>
    <div className="mt-9 grid gap-6 lg:grid-cols-3">
      {experiencePersonas.map(persona => <article key={persona.id} id={`persona-${persona.id}`} className="rounded-2xl border border-border-subtle bg-surface-card p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">{persona.label}</p>
        <h3 className="mt-3 text-xl font-bold">{persona.title}</h3>
        <p className="mt-4 leading-7 text-text-secondary">{persona.description}</p>
        <ul className="mt-6 space-y-4 border-t border-border-subtle pt-5">{persona.evidence.map(item => <li key={item.href}><Link href={item.href} className="font-semibold text-brand-primary hover:underline">{item.label} →</Link><p className="mt-1 text-xs leading-5 text-text-muted">{item.context}</p></li>)}</ul>
      </article>)}
    </div>
    <Link href="/about#journey" className="mt-7 inline-block font-semibold text-brand-primary hover:underline">Explore the career behind the work →</Link>
  </section>;
}
