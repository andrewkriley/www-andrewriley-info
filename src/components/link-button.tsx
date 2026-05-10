import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function LinkButton({
  className,
  variant = "primary",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition",
        variant === "primary" &&
          "bg-surface-inverse text-text-inverse hover:opacity-85",
        variant === "secondary" &&
          "border border-border-subtle text-text-primary hover:border-brand-primary",
        variant === "ghost" &&
          "text-text-secondary hover:text-text-primary",
        className,
      )}
      {...props}
    />
  );
}
