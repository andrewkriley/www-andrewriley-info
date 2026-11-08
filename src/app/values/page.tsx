import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Values",
  description: "Health, family, creativity, curiosity and accountability: the values that guide how Andrew Riley lives and works.",
};

const values = [
  {
    id: "health",
    title: "Health",
    statement: "I need to look after myself so I can look out for others.",
  },
  {
    id: "family",
    title: "Family",
    statement: "Everything we achieve takes a village. Help me look after mine so I can play my part in looking after yours.",
    reflection: "Safety, security and trust are the foundation.",
  },
  {
    id: "creativity-curiosity",
    title: "Creativity & curiosity",
    statement: "I don’t settle for the status quo. I ask, ‘Imagine if we…’ and make room to explore, experiment and share what we tried.",
  },
  {
    id: "accountability",
    title: "Accountability",
    statement: "Everyone plays their part in the team. I take ownership of my actions and outcomes. When I get something wrong, I acknowledge it, share what I learned and explain what I’ll do differently. I encourage and empower others to do the same.",
  },
];

export default function ValuesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-16 sm:pt-24">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-primary">My values</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">What matters shapes how I show up.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">These values guide how I look after myself, care for others, explore possibilities and take responsibility.</p>
      </section>
      <section aria-label="My four values" className="mx-auto grid max-w-6xl gap-5 px-5 py-8 md:grid-cols-2">
        {values.map((value) => (
          <article id={value.id} key={value.id} className="scroll-mt-32 rounded-2xl border border-border-subtle bg-surface-card p-7 sm:p-9">
            <h2 className="text-2xl font-bold text-brand-primary">{value.title}</h2>
            <p className="mt-5 text-lg leading-8 text-text-primary">{value.statement}</p>
            {value.reflection && <p className="mt-4 leading-7 text-text-secondary">{value.reflection}</p>}
          </article>
        ))}
      </section>
      <div className="mx-auto flex max-w-6xl flex-wrap gap-6 px-5 pb-16 pt-6">
        <Link href="/about" className="font-semibold text-brand-primary hover:underline">My story →</Link>
        <Link href="/#how-i-work" className="font-semibold text-brand-primary hover:underline">How I work →</Link>
      </div>
    </>
  );
}
