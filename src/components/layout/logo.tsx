import { cn } from "@/lib/utils";

/**
 * Provisional logo (drawn to match the mockup). Replace the <LogoMark /> SVG
 * with the official logo if the mosque supplies one.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 64"
      aria-hidden="true"
      className={cn("text-brand", className)}
      fill="currentColor"
      fillRule="evenodd"
    >
      {/* Crescent + finial */}
      <path d="M40 2.2a4.4 4.4 0 1 0 4.1 6.2 3.5 3.5 0 1 1-4.1-6.2Z" />
      <rect x="39.2" y="9.5" width="1.6" height="5" rx=".8" />
      {/* Main onion dome */}
      <path d="M40 14c-2.6 4.6-14 8.3-14 18.5h28C54 22.3 42.6 18.6 40 14Z" />
      <rect x="24" y="32.5" width="32" height="3" rx="1" />
      {/* Prayer hall with three arched openings */}
      <path d="M21 36h38v22H21V36Zm6 22v-9a3 3 0 0 1 6 0v9h-6Zm10 0V46a3 3 0 0 1 6 0v12h-6Zm10 0v-9a3 3 0 0 1 6 0v9h-6Z" />
      {/* Side domes */}
      <path d="M11 44c0-4.3 3.4-7 6-8.5 2.6 1.5 6 4.2 6 8.5H11Z" />
      <path d="M57 44c0-4.3 3.4-7 6-8.5 2.6 1.5 6 4.2 6 8.5H57Z" />
      <path d="M12 45h10v13H12V45Zm3 13v-6.5a2 2 0 0 1 4 0V58h-4Z" />
      <path d="M58 45h10v13H58V45Zm3 13v-6.5a2 2 0 0 1 4 0V58h-4Z" />
      {/* Tall minaret (right) */}
      <path d="M73 5.5c.9 1.7 2.6 2.7 2.6 4.8h-5.2c0-2.1 1.7-3.1 2.6-4.8Z" />
      <rect x="70.6" y="10.8" width="4.8" height="47.2" rx=".6" />
      <rect x="69.4" y="21" width="7.2" height="1.8" rx=".6" />
      <rect x="69.4" y="34" width="7.2" height="1.8" rx=".6" />
      {/* Small minaret (left) */}
      <path d="M6 17c.8 1.5 2.3 2.4 2.3 4.2H3.7C3.7 19.4 5.2 18.5 6 17Z" />
      <rect x="3.9" y="21.6" width="4.2" height="36.4" rx=".6" />
      <rect x="2.9" y="30" width="6.2" height="1.6" rx=".6" />
      {/* Ground */}
      <rect x="0" y="58.5" width="80" height="3" rx="1.5" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="h-11 w-auto lg:h-12" />
      <span className="leading-none">
        <span className="block font-logo text-base font-semibold text-brand lg:text-lg">
          Mosquée
        </span>
        <span className="mt-0.5 block font-logo text-xl font-semibold text-brand lg:text-[26px]">
          Al-Houda
        </span>
        <span className="mt-1.5 block ps-0.5 text-[10px] font-medium tracking-[0.55em] text-ink/70">
          ILLZACH
        </span>
      </span>
    </span>
  );
}
