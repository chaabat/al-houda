import { cn } from "@/lib/utils";

/** Outline mosque icon (prayer-times card header). */
export function MosqueIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
    >
      <path d="M16 3v3" />
      <path d="M16 6c-1.5 2.8-8 4.6-8 10.5h16C24 10.6 17.5 8.8 16 6Z" />
      <path d="M6 29V16.5h20V29" />
      <path d="M13 29v-5a3 3 0 0 1 6 0v5" />
      <path d="M3 29h26" />
    </svg>
  );
}
