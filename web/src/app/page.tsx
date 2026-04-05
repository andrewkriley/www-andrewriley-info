import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-brand-primary-muted)]">
        Technical leadership · Building · Learning
      </p>
      <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight text-[var(--color-text)] sm:text-5xl">
        Andrew Riley
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-muted)]">
        I lead with a builder mindset: shipping systems, experimenting in the homelab, and
        staying curious about how technology and people work together. This site is where
        projects, writing, and interests live.
      </p>

      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold text-[var(--color-text)]">
          Purpose &amp; values
        </h2>
        <ul className="mt-4 space-y-3 text-[var(--color-text-muted)]">
          <li>
            <strong className="text-[var(--color-text)]">Build in the open</strong> — share
            what breaks, what ships, and what I learn along the way.
          </li>
          <li>
            <strong className="text-[var(--color-text)]">Stay technical</strong> — hands-on
            with infrastructure, automation, and the craft of reliable systems.
          </li>
          <li>
            <strong className="text-[var(--color-text)]">Grow through curiosity</strong> —
            treat side quests and experiments as part of the job, not a distraction.
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold text-[var(--color-text)]">
          Explore
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { href: "/projects/", label: "Projects", hint: "Things I’m building" },
            { href: "/blog/", label: "Blog", hint: "Posts from the Hugo era onward" },
            { href: "/speaking/", label: "Speaking", hint: "Talks & appearances" },
            { href: "/guides/", label: "Guides", hint: "How-tos & references" },
            { href: "/media/", label: "Media", hint: "Elsewhere on the web" },
            { href: "/contact/", label: "Contact", hint: "Say hello" },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-lg border border-[var(--color-border)] bg-white p-5 transition-colors hover:border-[var(--color-brand-primary-muted)]"
            >
              <span className="font-heading text-lg font-semibold text-[var(--color-text)]">
                {card.label}
              </span>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{card.hint}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
