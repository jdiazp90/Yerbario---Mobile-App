// Shared className tokens + tiny helpers for the Sprint 1.5 visual pass.
// Everything here derives from the approved Design Tokens v1 (globals.css);
// raw primitives are only referenced via arbitrary values (bg-[var(--green-100)]).

// Buttons — all clear the 44px mobile touch-target floor (min-h-11).
// Primary is solid espresso (REV 3: "monochrome confident") rather than the
// brand-green gradient from REV 2 — green stays reserved for the score
// signal so it doesn't compete with every button/chip on screen for the
// same color.
export const btnPrimary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[var(--espresso-900)] px-4 text-sm font-bold text-ink-inverse shadow-[0_1px_0_rgba(255,255,255,.2)_inset,0_3px_10px_-3px_rgba(26,18,16,.45)] transition-[background-color,transform] duration-150 hover:bg-[var(--espresso-700)] active:scale-[0.97] active:duration-100";
export const btnSecondary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-line bg-surface px-4 text-sm font-bold text-ink transition-[border-color,transform] duration-150 hover:border-line-strong active:scale-[0.97] active:duration-100";
export const btnGhost =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 text-sm font-bold text-brand transition-[background-color,transform] duration-150 hover:bg-[var(--green-50)] active:scale-[0.97] active:duration-100";

// Shared "selected" treatment for committed form choices (rating pickers,
// aroma tags) — same solid-espresso language as btnPrimary, for a
// peer-checked (radio/checkbox) sibling. Reserved for answers the user is
// actually committing to, not for transient filters — see
// peerSelectedChipClass below for those.
export const peerSelectedClass =
  "peer-checked:border-transparent peer-checked:bg-[var(--espresso-900)] peer-checked:text-ink-inverse! peer-checked:shadow-[0_1px_0_rgba(255,255,255,.2)_inset,0_2px_8px_-3px_rgba(26,18,16,.45)]";

// Same treatment, for a plain conditional className (no peer/radio involved
// — e.g. a Link-based tab or toggle where "selected" comes from the route).
export const selectedPillClass =
  "border-transparent bg-[var(--espresso-900)] text-ink-inverse shadow-[0_1px_0_rgba(255,255,255,.2)_inset,0_2px_8px_-3px_rgba(26,18,16,.45)]";

// Quiet selected treatment for filter chips — a soft brand tint instead of
// solid espresso. Filters are transient/exploratory, not a committed answer
// or a primary action, so they shouldn't carry the same visual weight as a
// real button (REV 3.1: don't make everything shout at once).
export const peerSelectedChipClass =
  "peer-checked:border-transparent peer-checked:bg-[var(--green-100)] peer-checked:text-brand-active";

// Form controls.
export const inputClass =
  "min-h-[46px] w-full rounded-md border border-line bg-surface px-3.5 text-[15px] text-ink outline-none transition placeholder:text-ink-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/25";
export const textareaClass =
  "w-full rounded-md border border-line bg-surface px-3.5 py-3 text-[15px] leading-relaxed text-ink outline-none transition placeholder:text-ink-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/25";
export const fieldClass = "flex flex-col gap-2";
export const fieldLabelClass = "text-[13px] font-bold text-ink";
export const fieldHintClass = "font-medium text-ink-muted";

// Card surface — gradient + layered shadow, shared by catalog/ranking rows,
// empty states, and skeletons so they all read as one elevated system. The
// border is deliberately faint (30% mix) — on a light surface, depth should
// read from the shadow, not from a hard outline; the border is just enough
// to keep the edge crisp against the canvas gradient behind it. active:scale
// gives every tappable card (this class sits on the whole row, so pressing a
// child button inside it presses the row too — that's fine, it reads as one
// tactile surface, not a bug) instant press feedback.
export const cardClass =
  "rounded-lg border border-[color-mix(in_srgb,var(--line)_30%,transparent)] bg-[image:var(--surface-grad)] shadow-[var(--card-shadow)] transition-[box-shadow,transform] duration-150 hover:shadow-[var(--card-shadow-hover)] active:scale-[0.99] active:duration-100";

// Chrome (topbar / bottom nav) — frosted glass over scrolling content.
export const chromeClass =
  "bg-[color:var(--chrome-bg)] [backdrop-filter:var(--chrome-blur)] [-webkit-backdrop-filter:var(--chrome-blur)]";

// Score color cut — same 7 / 4 thresholds as always, applied to the QuietScore
// star icon. The color still encodes real state (good/mid/bad cata).
export function scoreColorClass(score: number): string {
  if (score >= 7) return "text-brand";
  if (score >= 4) return "text-warning-fill";
  return "text-danger";
}
