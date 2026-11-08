import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-light",
  secondary: "bg-gold text-ink hover:brightness-95",
  outline: "border border-brand text-brand hover:bg-brand hover:text-white",
  ghost: "text-brand hover:bg-sage",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type StyleOptions = { variant?: Variant; size?: Size; className?: string };

/** Use with next-intl's <Link> to get a link that looks like a button. */
export function buttonVariants({ variant = "primary", size = "md", className }: StyleOptions = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> & Pick<StyleOptions, "variant" | "size">) {
  return <button className={buttonVariants({ variant, size, className })} {...props} />;
}
