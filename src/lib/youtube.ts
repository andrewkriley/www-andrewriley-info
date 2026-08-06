const channelId = "UC5xDemMp-QJYs9WWlXJqZ9g";
const channelHandle = "@rilesdj";
const popularPageUrl = `https://www.youtube.com/${channelHandle}/videos?view=0&sort=p&flow=grid`;
const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

/** Known popular uploads used when live YouTube fetches fail. */
const fallbackVideos = [
  {
    id: "X6s_CDV9hGo",
    title: "Riles Radio Ep 001 - Energetic House (new studio layout, 3 Deck mix)",
  },
  {
    id: "J3h1y1gxK_Q",
    title: "Jammin July Tunes - HipHop, Disco, House and Drum & Bass",
  },
  {
    id: "9QqJkI8Crg4",
    title: "AI narration of a DJ with a sharp satire tone | Learning AI",
  },
  {
    id: "8eCKILPnENE",
    title: "Dancing Tech House DJ Mix February 2024",
  },
];

export type YouTubeVideo = {
  id: string;
  title: string;
  url: string;
  embedUrl: string;
};

function toVideo(id: string, title: string): YouTubeVideo {
  return {
    id,
    title,
    url: `https://www.youtube.com/watch?v=${id}`,
    embedUrl: `https://www.youtube.com/embed/${id}`,
  };
}

function decodeXmlEntities(value: string): string {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

function tagValue(entry: string, tagName: string): string | undefined {
  const match = entry.match(
    new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`),
  );
  return match?.[1] ? decodeXmlEntities(match[1].trim()) : undefined;
}

function parseYouTubeFeed(xml: string): YouTubeVideo[] {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map((match) => {
      const entry = match[1];
      const id = tagValue(entry, "yt:videoId");
      const title = tagValue(entry, "title") ?? "DJ Riles YouTube video";
      if (!id) return undefined;
      return toVideo(id, title);
    })
    .filter((video): video is YouTubeVideo => Boolean(video));
}

function extractYtInitialData(html: string): unknown | undefined {
  const match = html.match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/);
  if (!match?.[1]) return undefined;
  try {
    return JSON.parse(match[1]) as unknown;
  } catch {
    return undefined;
  }
}

function parsePopularVideosFromPage(html: string): YouTubeVideo[] {
  const data = extractYtInitialData(html);
  if (!data) return [];

  const videos: YouTubeVideo[] = [];
  const seen = new Set<string>();

  function walk(node: unknown): void {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    const record = node as Record<string, unknown>;
    const lockup = record.lockupViewModel as
      | {
          contentId?: string;
          onTap?: {
            innertubeCommand?: {
              watchEndpoint?: { videoId?: string };
            };
          };
          metadata?: {
            lockupMetadataViewModel?: {
              title?: { content?: string };
            };
          };
        }
      | undefined;

    if (lockup) {
      const id =
        lockup.contentId ||
        lockup.onTap?.innertubeCommand?.watchEndpoint?.videoId;
      const title =
        lockup.metadata?.lockupMetadataViewModel?.title?.content ||
        "DJ Riles YouTube video";

      if (id && !seen.has(id)) {
        seen.add(id);
        videos.push(toVideo(id, title));
      }
    }

    for (const value of Object.values(record)) {
      walk(value);
    }
  }

  walk(data);
  return videos;
}

async function fetchPopularViaDataApi(
  limit: number,
): Promise<YouTubeVideo[] | undefined> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return undefined;

  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("channelId", channelId);
  url.searchParams.set("order", "viewCount");
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", String(limit));
  url.searchParams.set("key", apiKey);

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`YouTube Data API returned ${response.status}`);
  }

  const payload = (await response.json()) as {
    items?: Array<{
      id?: { videoId?: string };
      snippet?: { title?: string };
    }>;
  };

  return (payload.items ?? [])
    .map((item) => {
      const id = item.id?.videoId;
      if (!id) return undefined;
      return toVideo(id, item.snippet?.title ?? "DJ Riles YouTube video");
    })
    .filter((video): video is YouTubeVideo => Boolean(video));
}

async function fetchPopularViaChannelPage(
  limit: number,
): Promise<YouTubeVideo[]> {
  const response = await fetch(popularPageUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`YouTube popular page returned ${response.status}`);
  }

  return parsePopularVideosFromPage(await response.text()).slice(0, limit);
}

/** @deprecated Prefer getPopularYouTubeVideos — kept for callers that want latest. */
export async function getLatestYouTubeVideos(
  limit = 4,
): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch(feedUrl, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`YouTube feed returned ${response.status}`);
    }

    const videos = parseYouTubeFeed(await response.text()).slice(0, limit);
    if (videos.length > 0) return videos;
  } catch {
    // Fall through to popular/fallback.
  }

  return getPopularYouTubeVideos(limit);
}

export async function getPopularYouTubeVideos(
  limit = 4,
): Promise<YouTubeVideo[]> {
  try {
    const fromApi = await fetchPopularViaDataApi(limit);
    if (fromApi && fromApi.length > 0) {
      return fromApi.slice(0, limit);
    }
  } catch {
    // Try channel popular page next.
  }

  try {
    const fromPage = await fetchPopularViaChannelPage(limit);
    if (fromPage.length > 0) {
      return fromPage;
    }
  } catch {
    // Keep the Play page buildable if YouTube is unreachable.
  }

  return fallbackVideos.slice(0, limit).map((video) =>
    toVideo(video.id, video.title),
  );
}
