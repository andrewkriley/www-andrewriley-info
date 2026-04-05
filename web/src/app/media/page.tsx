import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media",
  description: "Podcasts, interviews, and other appearances.",
};

export default function MediaPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-4xl font-semibold text-[var(--color-text)]">Media</h1>
      <p className="mt-4 text-[var(--color-text-muted)]">
        Links to podcasts, interviews, and other media will be added here over time.
      </p>
    </div>
  );
}
