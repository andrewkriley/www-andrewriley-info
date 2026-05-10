import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-secondary">
        Not found
      </p>
      <h1 className="mt-4 text-4xl font-black text-text-primary">
        This page is not on the workbench.
      </h1>
      <p className="mt-5 text-lg leading-8 text-text-secondary">
        It may have moved during the 2026 rebuild.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-surface-inverse px-5 py-3 text-sm font-semibold text-text-inverse"
      >
        Go home
      </Link>
    </section>
  );
}
