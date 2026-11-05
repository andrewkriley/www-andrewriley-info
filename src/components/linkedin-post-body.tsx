import Image from "next/image";
import type { Post } from "@/lib/content";

// Imported social text is rendered as text, never evaluated as MDX or HTML.
function LinkedText({ text }: { text: string }) {
  return text.split(/(https?:\/\/[^\s]+)/g).map((part, index) => {
    if (!/^https?:\/\//.test(part)) return part;
    const url = part.replace(/[.,;!?]+$/, "");
    return <span key={index}><a className="break-words" href={url} target="_blank" rel="noreferrer">{url}</a>{part.slice(url.length)}</span>;
  });
}

export function LinkedInPostBody({ post }: { post: Post }) {
  return <>
    {post.content.split(/\n\s*\n/).map((paragraph, index) => <p key={index} className="whitespace-pre-line break-words"><LinkedText text={paragraph} /></p>)}
    {post.images?.map(image => <figure key={image.src} className="my-8">
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(min-width: 768px) 768px, 100vw" className="h-auto w-full rounded-xl object-contain" />
    </figure>)}
  </>;
}
