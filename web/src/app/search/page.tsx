import type { Metadata } from "next";
import { getSearchIndex } from "@/lib/posts";
import { SearchClient } from "./SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search blog posts.",
};

export default function SearchPage() {
  const docs = getSearchIndex();
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-4xl font-semibold text-[var(--color-text)]">Search</h1>
      <p className="mt-3 text-[var(--color-text-muted)]">
        Client-side search across post titles, tags, and excerpts.
      </p>
      <div className="mt-10">
        <SearchClient docs={docs} />
      </div>
    </div>
  );
}
