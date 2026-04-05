import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speaking",
  description: "Talks, panels, and appearances.",
};

export default function SpeakingPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-4xl font-semibold text-[var(--color-text)]">Speaking</h1>
      <p className="mt-4 text-[var(--color-text-muted)]">
        Talks and appearances will be listed here. If you are organising an event and want to
        connect, use the{" "}
        <a href="/contact/" className="text-[var(--color-link)] hover:text-[var(--color-link-hover)]">
          contact form
        </a>
        .
      </p>
    </div>
  );
}
