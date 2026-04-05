import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected work and things I am building.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-4xl font-semibold text-[var(--color-text)]">Projects</h1>
      <p className="mt-4 text-[var(--color-text-muted)]">
        A curated list of builds and experiments will go here. For now, many of these stories
        live in the{" "}
        <Link href="/blog/" className="text-[var(--color-link)] hover:text-[var(--color-link-hover)]">
          blog
        </Link>
        .
      </p>
    </div>
  );
}
