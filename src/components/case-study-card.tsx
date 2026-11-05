import Link from "next/link";

export type CaseStudy = {
  title: string;
  category: string;
  description: string;
  evidence: string;
  href: string;
};

export function CaseStudyCard({ title, category, description, evidence, href }: CaseStudy) {
  return <article className="flex h-full flex-col rounded-2xl border border-border-subtle bg-surface-card p-6">
    <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">{category}</p>
    <h3 className="mt-4 text-xl font-semibold text-text-primary">{title}</h3>
    <p className="mt-3 flex-1 leading-7 text-text-secondary">{description}</p>
    <p className="mt-5 border-t border-border-subtle pt-4 text-sm text-text-muted">{evidence}</p>
    <Link className="mt-5 font-semibold text-brand-primary hover:underline" href={href}>Explore the work →</Link>
  </article>;
}
