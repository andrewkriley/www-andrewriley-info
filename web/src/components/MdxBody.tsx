import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

function MdxImg(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt, ...rest } = props;
  if (!src || typeof src !== "string") return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      className="my-6 h-auto max-w-full rounded-lg border border-[var(--color-border)]"
      loading="lazy"
      {...rest}
    />
  );
}

const components = {
  img: MdxImg,
};

export function MdxBody({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
      components={components}
    />
  );
}
