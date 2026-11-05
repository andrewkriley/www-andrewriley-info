"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { journalTopics, type JournalTopic } from "@/lib/journal-topics";

type Entry = { slug: string; source: "linkedin" | "journal"; topics: JournalTopic[]; card: ReactNode };
const pageSize = 24;
const sourceOptions = [["all", "All entries"], ["journal", "Journal articles"], ["linkedin", "From LinkedIn"]];
const buttonClass = (active: boolean) => `rounded-xl border px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary ${active ? "border-brand-primary bg-brand-primary text-text-inverse" : "border-border-subtle text-text-secondary hover:border-brand-primary"}`;

// Keep the archive itself in the static HTML. Only URL synchronisation needs
// the search-parameter boundary, so readers and crawlers still receive entries.
function JournalLocation({ onChange }: { onChange: (query: string) => void }) {
  const query = useSearchParams().toString();
  useEffect(() => { onChange(query); }, [query, onChange]);
  return null;
}

export function JournalArchive({ entries }: { entries: Entry[] }) {
  const [query, setQuery] = useState("");
  const params = new URLSearchParams(query);
  const router = useRouter();
  const source = sourceOptions.some(([key]) => key === params.get("source")) ? params.get("source")! : "all";
  const topic = journalTopics.some(([key]) => key === params.get("topic")) ? params.get("topic")! : "all";
  const posts = entries.filter(entry => (source === "all" || entry.source === source) && (topic === "all" || entry.topics.includes(topic as JournalTopic)));
  const pages = Math.max(1, Math.ceil(posts.length / pageSize));
  const requestedPage = Number(params.get("page") || 1);
  const page = Number.isSafeInteger(requestedPage) ? Math.max(1, Math.min(requestedPage, pages)) : 1;

  function navigate(key: "source" | "topic" | "page", value: string) {
    const next = new URLSearchParams();
    if (source !== "all") next.set("source", source);
    if (topic !== "all") next.set("topic", topic);
    if (value !== "all" && value !== "1") next.set(key, value);
    else next.delete(key);
    router.replace(`/journal${next.size ? `?${next}` : ""}`, { scroll: false });
  }

  return <>
    <Suspense fallback={null}><JournalLocation onChange={setQuery} /></Suspense>
    <nav aria-label="Filter journal by source" className="mt-8 flex flex-wrap gap-3">
      {sourceOptions.map(([value, label]) => <button key={value} type="button" onClick={() => navigate("source", value)} aria-pressed={source === value} className={buttonClass(source === value)}>{label}</button>)}
    </nav>
    <div className="mt-7 border-t border-border-subtle pt-6">
      <p className="mb-3 text-sm font-semibold text-text-primary">Explore by topic</p>
      <nav aria-label="Filter journal by topic" className="flex flex-wrap gap-2">
        <button type="button" onClick={() => navigate("topic", "all")} aria-pressed={topic === "all"} className={buttonClass(topic === "all")}>All topics</button>
        {journalTopics.map(([value, label]) => <button key={value} type="button" onClick={() => navigate("topic", value)} aria-pressed={topic === value} className={buttonClass(topic === value)}>{label}</button>)}
      </nav>
      <p className="mt-3 text-sm text-text-muted">Choose a source and a topic to narrow the journal. Some entries explore more than one theme.</p>
    </div>
    <p className="mt-5 text-sm text-text-muted" role="status" aria-live="polite">{posts.length} {posts.length === 1 ? "entry" : "entries"}{posts.length > 0 ? ` · Page ${page} of ${pages}` : ""}</p>
    {posts.length ? <div className="mt-8 grid gap-5 md:grid-cols-2">{posts.slice((page - 1) * pageSize, page * pageSize).map(entry => <div key={entry.slug}>{entry.card}</div>)}</div> : <div className="mt-8 rounded-2xl border border-border-subtle bg-surface-card p-6"><h2 className="text-xl font-semibold">No entries match these filters.</h2><p className="mt-2 text-text-secondary">Try another topic or choose All entries to explore both sources.</p><button type="button" onClick={() => router.replace("/journal", { scroll: false })} className="mt-4 font-semibold text-brand-primary">Clear filters</button></div>}
    <nav aria-label="Journal pages" className="mt-10 flex flex-wrap items-center gap-4">
      {page > 1 && <button type="button" className="font-semibold text-brand-primary" onClick={() => navigate("page", String(page - 1))}>← Newer entries</button>}
      {page < pages && <button type="button" className="font-semibold text-brand-primary" onClick={() => navigate("page", String(page + 1))}>Older entries →</button>}
    </nav>
  </>;
}
