const channelId = "UC5xDemMp-QJYs9WWlXJqZ9g";
const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

const fallbackVideos = [
  "74Bb9erGsHM",
  "82x8XYJ0mhQ",
  "J3h1y1gxK_Q",
  "1vwN8mNFjrg",
];

export type YouTubeVideo = {
  id: string;
  title: string;
  url: string;
  embedUrl: string;
};

function decodeXmlEntities(value: string): string {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

function tagValue(entry: string, tagName: string): string | undefined {
  const match = entry.match(new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`));

  return match?.[1] ? decodeXmlEntities(match[1].trim()) : undefined;
}

function parseYouTubeFeed(xml: string): YouTubeVideo[] {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map((match) => {
      const entry = match[1];
      const id = tagValue(entry, "yt:videoId");
      const title = tagValue(entry, "title") ?? "DJ Riles YouTube video";

      if (!id) {
        return undefined;
      }

      return {
        id,
        title,
        url: `https://www.youtube.com/watch?v=${id}`,
        embedUrl: `https://www.youtube.com/embed/${id}`,
      };
    })
    .filter((video): video is YouTubeVideo => Boolean(video));
}

export async function getLatestYouTubeVideos(
  limit = 4,
): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch(feedUrl, {
      next: { revalidate: 60 * 60 },
    });

    if (!response.ok) {
      throw new Error(`YouTube feed returned ${response.status}`);
    }

    const videos = parseYouTubeFeed(await response.text()).slice(0, limit);

    if (videos.length > 0) {
      return videos;
    }
  } catch {
    // Keep the Play page buildable and useful if YouTube is unreachable.
  }

  return fallbackVideos.slice(0, limit).map((id) => ({
    id,
    title: "DJ Riles YouTube video",
    url: `https://www.youtube.com/watch?v=${id}`,
    embedUrl: `https://www.youtube.com/embed/${id}`,
  }));
}
