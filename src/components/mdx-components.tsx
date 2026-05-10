import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

function Anchor(props: ComponentPropsWithoutRef<"a">) {
  const href = props.href ?? "";

  if (href.startsWith("/")) {
    return <Link href={href} {...props} />;
  }

  return <a target="_blank" rel="noreferrer" {...props} />;
}

export const mdxComponents = {
  a: Anchor,
};
