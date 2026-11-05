import Link from "next/link";
import { topicLabels, type JournalTopic } from "@/lib/journal-topics";

export function TopicTags({ topics }: { topics: JournalTopic[] }) {
  return <ul aria-label="Topics" className="mt-4 flex flex-wrap gap-2">
    {topics.map(topic => <li key={topic}><Link href={`/journal?topic=${topic}`} className="inline-block rounded-full border border-border-subtle px-3 py-1 text-xs text-text-secondary hover:border-brand-primary hover:text-brand-primary">{topicLabels[topic]}</Link></li>)}
  </ul>;
}
