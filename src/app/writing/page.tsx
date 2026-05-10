import type { Metadata } from "next";

import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Technical notes, build logs, and project writing from Andrew Riley.",
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading
        eyebrow="Writing"
        title="A working archive."
        description="All migrated posts from the previous site, now part of the portfolio as proof of thinking, learning, and making."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
