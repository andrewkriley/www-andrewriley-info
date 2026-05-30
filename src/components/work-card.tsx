import Link from "next/link";

type WorkCardProps = {
  title: string;
  label: string;
  description: string;
  proof: string;
  href: string;
};

export function WorkCard({
  title,
  label,
  description,
  proof,
  href,
}: WorkCardProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-72 flex-col justify-between rounded-card border border-border-subtle bg-surface-card p-7 shadow-sm transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-soft"
    >
      <div>
        <span className="rounded-full bg-surface-inverse px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-text-inverse">
          {label}
        </span>
        <h3 className="mt-6 text-2xl font-bold tracking-tight text-text-primary group-hover:text-brand-secondary">
          {title}
        </h3>
        <p className="mt-4 leading-7 text-text-secondary">
          {description}
        </p>
      </div>
      <p className="mt-8 text-sm font-semibold text-text-muted">{proof}</p>
    </Link>
  );
}
