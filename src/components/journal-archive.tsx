"use client";

import { useState, type ReactNode } from "react";

type Entry = { slug: string; source: "linkedin" | "journal"; card: ReactNode };
const pageSize = 24;

export function JournalArchive({ entries }: { entries: Entry[] }) {
  const [source, setSource] = useState("all");
  const [page, setPage] = useState(1);
  const posts = entries.filter(entry => source === "all" || entry.source === source);
  const pages = Math.max(1, Math.ceil(posts.length / pageSize));
  return <>
    <nav aria-label="Filter journal by source" className="mt-8 flex flex-wrap gap-3">
      {[["all", "All entries"], ["journal", "Journal articles"], ["linkedin", "From LinkedIn"]].map(([value, label]) => <button key={value} type="button" onClick={() => { setSource(value); setPage(1); }} aria-pressed={source === value} className={`rounded-xl border px-4 py-2 text-sm ${source === value ? "border-brand-primary bg-brand-primary text-text-inverse" : "border-border-subtle text-text-secondary"}`}>{label}</button>)}
    </nav>
    <p className="mt-5 text-sm text-text-muted" role="status">{posts.length} entries · Page {page} of {pages}</p>
    <div className="mt-8 grid gap-5 md:grid-cols-2">{posts.slice((page - 1) * pageSize, page * pageSize).map(entry => <div key={entry.slug}>{entry.card}</div>)}</div>
    <nav aria-label="Journal pages" className="mt-10 flex flex-wrap items-center gap-4">
      {page > 1 && <button type="button" className="font-semibold text-brand-primary" onClick={() => setPage(page - 1)}>← Newer entries</button>}
      {page < pages && <button type="button" className="font-semibold text-brand-primary" onClick={() => setPage(page + 1)}>Older entries →</button>}
    </nav>
  </>;
}
