import labels from "@/data/journal-topics.json";

export type JournalTopic = keyof typeof labels;
export const journalTopics = Object.entries(labels) as [JournalTopic, string][];
export const topicLabels = labels;

export function readTopics(value: unknown, slug: string): JournalTopic[] {
  if (!Array.isArray(value) || !value.length || value.some(topic => typeof topic !== "string" || !Object.hasOwn(labels, topic))) {
    throw new Error(`Missing or unknown reviewed journal topic: ${slug}`);
  }
  return [...new Set(value)] as JournalTopic[];
}
