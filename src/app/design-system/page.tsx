import type { Metadata } from "next";

import { LinkButton } from "@/components/link-button";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { WorkCard } from "@/components/work-card";
import { featuredWork } from "@/data/site";
import {
  designSystemPalette,
  designSystemProfile,
  designSystemSource,
} from "@/generated/design-system";
import type { Post } from "@/lib/content";

const surfaces = [
  {
    label: "Page",
    token: "surface-page",
    className: "bg-surface-page",
    textClassName: "text-text-primary",
    metaClassName: "text-text-secondary",
  },
  {
    label: "Card",
    token: "surface-card",
    className: "bg-surface-card",
    textClassName: "text-text-primary",
    metaClassName: "text-text-secondary",
  },
  {
    label: "Muted",
    token: "surface-muted",
    className: "bg-surface-muted",
    textClassName: "text-text-primary",
    metaClassName: "text-text-secondary",
  },
  {
    label: "Inverse",
    token: "surface-inverse",
    className: "bg-surface-inverse",
    textClassName: "text-text-inverse",
    metaClassName: "text-text-inverse/80",
  },
];

const samplePost: Post = {
  slug: "design-system-sample",
  title: "Sample build note",
  description:
    "A compact example of how article cards should feel across the site.",
  date: "2026-05-10T00:00:00+10:00",
  tags: ["sample"],
  categories: ["technology"],
  content: "",
};

export const metadata: Metadata = {
  title: "Design System",
  description:
    "Working sample sheet for the Andrew Riley personal profile from andrewkriley/design-system.",
};

export default function DesignSystemPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading
        eyebrow="Design system"
        title="A blue-green system for Health Build Play Lead."
        description={`${designSystemProfile.tagline} Tokens are resolved from the ${designSystemSource.profileId} profile in ${designSystemSource.repo}@${designSystemSource.ref}.`}
      />

      <section className="mt-8 rounded-card border border-border-subtle bg-surface-card p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-secondary">
          Source
        </p>
        <p className="mt-3 text-lg font-bold text-text-primary">
          {designSystemProfile.name} · {designSystemSource.profileId}
        </p>
        <p className="mt-2 text-sm leading-6 text-text-secondary">
          {designSystemProfile.purpose}
        </p>
        <p className="mt-4 text-sm text-text-muted">
          Pinned to{" "}
          <a
            href={designSystemSource.url}
            className="font-semibold text-brand-secondary underline underline-offset-2"
          >
            {designSystemSource.repo}@{designSystemSource.ref}
          </a>
          . Resolution follows{" "}
          <a
            href={designSystemSource.consumeDoc}
            className="font-semibold text-brand-secondary underline underline-offset-2"
          >
            CONSUME.md
          </a>
          .
        </p>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-2">
        <div className="rounded-card border border-border-subtle bg-surface-card p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-text-primary">Voice</h2>
          <p className="mt-3 leading-7 text-text-secondary">
            {designSystemProfile.voice.summary}
          </p>
          <p className="mt-4 text-sm leading-6 text-text-muted">
            Tone: {designSystemProfile.tone.primary}
          </p>
        </div>
        <div className="rounded-card border border-border-subtle bg-surface-card p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-text-primary">Values</h2>
          <ul className="mt-3 space-y-3 text-text-secondary">
            {designSystemProfile.values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-text-primary">Palette</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-5">
          {designSystemPalette.map((colour) => (
            <article
              key={colour.token}
              className="overflow-hidden rounded-card border border-border-subtle bg-surface-card shadow-sm"
            >
              <div className={`h-32 ${colour.className}`} />
              <div className="p-5">
                <h3 className="font-bold text-text-primary">{colour.name}</h3>
                <p className="mt-1 text-sm font-semibold text-text-muted">
                  {colour.hex}
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  {colour.token}
                </p>
                <p className="mt-1 text-xs text-text-muted">{colour.path}</p>
                <p className="mt-4 text-sm leading-6 text-text-secondary">
                  {colour.usage}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-text-primary">Surfaces</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {surfaces.map((surface) => (
            <div
              key={surface.token}
              className={`rounded-card border border-border-subtle p-6 shadow-sm ${surface.className}`}
            >
              <p className={`font-bold ${surface.textClassName}`}>
                {surface.label}
              </p>
              <p className={`mt-2 text-sm ${surface.metaClassName}`}>
                {surface.token}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-secondary">
            Typography
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-text-primary">
            Useful things, tangible ideas, growing people.
          </h2>
          <p className="mt-5 text-lg leading-8 text-text-secondary">
            Body copy should feel calm and readable. The palette can be bright,
            but long-form text stays grounded through softer blue-grey tokens.
          </p>
        </div>
        <div className="rounded-card border border-border-subtle bg-surface-card p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-secondary">
            Eyebrow label
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight text-text-primary">
            Heading One
          </h1>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-text-primary">
            Heading Two
          </h2>
          <p className="mt-5 leading-8 text-text-secondary">
            Paragraph text uses `text-secondary` and should carry most content
            without feeling too dark or too loud.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-text-primary">Buttons</h2>
        <div className="mt-5 flex flex-wrap gap-3 rounded-card border border-border-subtle bg-surface-card p-6 shadow-sm">
          <LinkButton href="/build">Primary button</LinkButton>
          <LinkButton href="/uses" variant="secondary">
            Secondary button
          </LinkButton>
          <LinkButton href="/#about" variant="ghost">
            Ghost button
          </LinkButton>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-text-primary">Cards</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <WorkCard {...featuredWork[0]} />
          <PostCard post={samplePost} />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-text-primary">Chips And Lists</h2>
        <div className="mt-5 grid gap-5 rounded-card border border-border-subtle bg-surface-card p-6 shadow-sm md:grid-cols-2">
          <div>
            <div className="flex flex-wrap gap-2">
              {["Health", "Build", "Play", "Lead"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-brand-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-primary"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <ul className="space-y-3 text-text-secondary">
            <li>Build visible proof, not just claims.</li>
            <li>Build the work clearly enough for others to join.</li>
            <li>Play keeps creativity and better questions alive.</li>
          </ul>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-text-primary">Form Elements</h2>
        <div className="mt-5 grid gap-4 rounded-card border border-border-subtle bg-surface-card p-6 shadow-sm md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-text-primary">
            Name
            <input
              className="rounded-2xl border border-border-subtle bg-surface-page px-4 py-3 font-normal text-text-primary outline-none transition focus:border-brand-primary"
              placeholder="Andrew Riley"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-text-primary">
            Focus area
            <select className="rounded-2xl border border-border-subtle bg-surface-page px-4 py-3 font-normal text-text-primary outline-none transition focus:border-brand-primary">
              <option>Health</option>
              <option>Build</option>
              <option>Play</option>
              <option>Lead</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-text-primary md:col-span-2">
            Message
            <textarea
              className="min-h-32 rounded-2xl border border-border-subtle bg-surface-page px-4 py-3 font-normal text-text-primary outline-none transition focus:border-brand-primary"
              placeholder="What are we exploring?"
            />
          </label>
        </div>
      </section>
    </div>
  );
}
