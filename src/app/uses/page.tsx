import type { Metadata } from "next";

import { GrowingSectionsNote } from "@/components/growing-sections-note";
import { SectionHeading } from "@/components/section-heading";
import { uses } from "@/data/site";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "The hardware, software, services, and tools Andrew Riley uses for health, build, play, and lead.",
};

export default function UsesPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading
        eyebrow="Uses"
        title="The tools behind the work."
        description="Hardware, software, services, and creative tools I use for leadership, technology, homelab work, DIY, music, health, and play. Inspired by uses.tech-style pages."
      />

      <div className="mt-12 grid gap-6">
        {uses.map((section) => (
          <section
            key={section.category}
            className="rounded-card border border-border-subtle bg-surface-card p-6 shadow-sm md:p-8"
          >
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary">
                  {section.category}
                </p>
                <p className="mt-4 leading-7 text-text-secondary">
                  {section.description}
                </p>
              </div>
              <div className="grid gap-3">
                {section.items.map((item) => (
                  <article
                    key={item.name}
                    className="rounded-2xl border border-border-subtle bg-surface-muted p-5"
                  >
                    <h2 className="text-lg font-bold text-text-primary">
                      {item.name}
                    </h2>
                    <p className="mt-2 leading-7 text-text-secondary">
                      {item.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-card border border-border-subtle bg-surface-muted p-6">
        <GrowingSectionsNote />
      </div>
    </section>
  );
}
