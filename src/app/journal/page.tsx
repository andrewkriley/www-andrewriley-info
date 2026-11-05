import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/content";
export const metadata: Metadata = { title: "Journal", description: "Notes on architecture, leadership, AI experiments and hands-on engineering." };
export default function JournalPage(){const posts=getAllPosts();return <section className="mx-auto max-w-6xl px-5 py-16"><p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">Thinking out loud</p><h1 className="mt-4 text-5xl font-bold tracking-tight">Notes from the workbench.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary">Ideas, experiments, architectural decisions and lessons from building and leading. Not everything here is a finished solution. Sometimes the most valuable outcome is a better question.</p><div className="mt-12 grid gap-5 md:grid-cols-2">{posts.map(post=><PostCard key={post.slug} post={post}/>)}</div></section>}
