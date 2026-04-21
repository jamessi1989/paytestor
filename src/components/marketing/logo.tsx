// Crewqa logo. The mark is a 4×3 grid of squares — 12 testers, with one tile
// in teal to represent the verified/approved slot. Sharp corners match the
// GOV.UK-inspired design system. Two variants: `light` (navy on light bg),
// `dark` (white on dark bg). The accent tile is teal in both.
//
// Grid geometry (viewBox 32×32):
//   4 cols × 3 rows, 6×6 tiles, 2px gaps → 30×22 content, centered.
//   Tile x positions: 1, 9, 17, 25    Tile y positions: 5, 13, 21

import { cn } from "@/lib/utils";

type Variant = "light" | "dark";

type MarkProps = {
  variant?: Variant;
  className?: string;
  title?: string;
};

const GRID_XS = [1, 9, 17, 25];
const GRID_YS = [5, 13, 21];
// Index of the accent tile — bottom-right corner reads as a "completion" mark.
const ACCENT_COL = 3;
const ACCENT_ROW = 2;

export function LogoMark({
  variant = "light",
  className,
  title = "Crewqa",
}: MarkProps) {
  const base = variant === "dark" ? "#ffffff" : "#1e3a5f"; // primary-500
  const accent = "#14b8a6"; // accent-400

  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("block", className)}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {GRID_YS.map((y, r) =>
        GRID_XS.map((x, c) => (
          <rect
            key={`${r}-${c}`}
            x={x}
            y={y}
            width="6"
            height="6"
            fill={r === ACCENT_ROW && c === ACCENT_COL ? accent : base}
          />
        ))
      )}
    </svg>
  );
}

// Full logo: mark + wordmark. Used in marketing headers and the dashboard
// chrome. Text colour follows the variant.
export function Logo({
  variant = "light",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark variant={variant} className="h-7 w-7" />
      <span
        className={cn(
          "font-display text-lg font-bold tracking-tight",
          variant === "dark" ? "text-white" : "text-neutral-900"
        )}
      >
        Crewqa
      </span>
    </span>
  );
}
