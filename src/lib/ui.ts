// Shared className tokens + tiny helpers for the Sprint 1.5 visual pass.
// Everything here derives from the approved Design Tokens v1 (globals.css);
// raw primitives are only referenced via arbitrary values (bg-[var(--green-100)]).

// Buttons — all clear the 44px mobile touch-target floor (min-h-11).
// Primary is solid espresso (REV 3: "monochrome confident") rather than the
// brand-green gradient from REV 2 — green stays reserved for the score
// signal so it doesn't compete with every button/chip on screen for the
// same color.
export const btnPrimary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[var(--espresso-900)] px-4 text-sm font-bold text-ink-inverse shadow-[0_1px_0_rgba(255,255,255,.2)_inset,0_3px_10px_-3px_rgba(26,18,16,.45)] transition-colors hover:bg-[var(--espresso-700)] active:translate-y-px";
export const btnSecondary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-line bg-surface px-4 text-sm font-bold text-ink transition-colors hover:border-line-strong active:translate-y-px";
export const btnGhost =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 text-sm font-bold text-brand transition-colors hover:bg-[var(--green-50)] active:translate-y-px";

// Shared "selected" treatment for filter chips / segmented pickers — same
// solid-espresso language as btnPrimary, for a peer-checked (radio/checkbox)
// sibling.
export const peerSelectedClass =
  "peer-checked:border-transparent peer-checked:bg-[var(--espresso-900)] peer-checked:text-ink-inverse! peer-checked:shadow-[0_1px_0_rgba(255,255,255,.2)_inset,0_2px_8px_-3px_rgba(26,18,16,.45)]";

// Same treatment, for a plain conditional className (no peer/radio involved
// — e.g. a Link-based tab or toggle where "selected" comes from the route).
export const selectedPillClass =
  "border-transparent bg-[var(--espresso-900)] text-ink-inverse shadow-[0_1px_0_rgba(255,255,255,.2)_inset,0_2px_8px_-3px_rgba(26,18,16,.45)]";

// Form controls.
export const inputClass =
  "min-h-[46px] w-full rounded-md border border-line bg-surface px-3.5 text-[15px] text-ink outline-none transition placeholder:text-ink-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/25";
export const textareaClass =
  "w-full rounded-md border border-line bg-surface px-3.5 py-3 text-[15px] leading-relaxed text-ink outline-none transition placeholder:text-ink-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/25";
export const fieldClass = "flex flex-col gap-2";
export const fieldLabelClass = "text-[13px] font-bold text-ink";
export const fieldHintClass = "font-medium text-ink-muted";

// Card surface — gradient + layered shadow, shared by catalog/ranking rows,
// empty states, and skeletons so they all read as one elevated system.
export const cardClass =
  "rounded-lg border border-[color-mix(in_srgb,var(--line)_45%,transparent)] bg-[image:var(--surface-grad)] shadow-[var(--card-shadow)] transition-shadow hover:shadow-[var(--card-shadow-hover)]";

// Chrome (topbar / bottom nav) — frosted glass over scrolling content.
export const chromeClass =
  "bg-[color:var(--chrome-bg)] [backdrop-filter:var(--chrome-blur)] [-webkit-backdrop-filter:var(--chrome-blur)]";

// Score color cut — same 7 / 4 thresholds as always, now just a solid dot
// color (REV 3: quiet score) instead of a filled/gradient badge. The color
// still encodes real state (good/mid/bad cata) — only the container changed.
export function scoreDotClass(score: number): string {
  if (score >= 7) return "bg-brand";
  if (score >= 4) return "bg-warning-fill";
  return "bg-danger";
}
