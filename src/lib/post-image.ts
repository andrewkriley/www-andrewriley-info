import fs from "node:fs";
import path from "node:path";

import type { Post } from "@/lib/content";

/**
 * Resolves post front matter `image` to a public URL.
 * Looks for files under public/images/writing/<slug>/ then public/images/writing/.
 */
export function getPostImageSrc(
  post: Pick<Post, "slug" | "image">,
): string | undefined {
  const image = post.image?.trim();
  if (!image) {
    return undefined;
  }

  if (
    image.startsWith("/") ||
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  const publicRoot = path.join(process.cwd(), "public");
  const slugFile = path.join(publicRoot, "images", "writing", post.slug, image);
  if (fs.existsSync(slugFile)) {
    return `/images/writing/${post.slug}/${image}`;
  }

  const flatFile = path.join(publicRoot, "images", "writing", image);
  if (fs.existsSync(flatFile)) {
    return `/images/writing/${image}`;
  }

  return `/images/writing/${post.slug}/${image}`;
}
