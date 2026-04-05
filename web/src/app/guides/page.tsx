import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guides",
  description: "How-tos and reference material.",
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-4xl font-semibold text-[var(--color-text)]">Guides</h1>
      <p className="mt-4 text-[var(--color-text-muted)]">
        Dedicated guides will live here. Technical walkthroughs from the Hugo era are in the{" "}
        <Link href="/blog/" className="text-[var(--color-link)] hover:text-[var(--color-link-hover)]">
          blog
        </Link>{" "}
        for now.
      </p>
    </div>
  );
}
