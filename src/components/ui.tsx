import type { ReactNode } from "react";
import { ORIGIN_LABELS, STICK_LABELS, TYPE_LABELS } from "@/lib/yerba-labels";
import { cardClass, scoreDotClass } from "@/lib/ui";
import type {
  OriginCountry,
  StickPresence,
  YerbaType,
} from "@/types/database";
import { ChevronDown, MateGourd } from "./icons";

/* ---------- Tag / badge ---------- */

type TagVariant = "type" | "neutral" | "origin";

const TAG_STYLES: Record<TagVariant, string> = {
  type: "bg-[var(--green-100)] text-brand-active border-[var(--green-300)]",
  neutral: "bg-canvas text-ink-muted border-line",
  origin:
    "bg-[var(--parchment-100)] text-[var(--parchment-600)] border-[var(--parchment-300)]",
};

export function Tag({
  variant = "neutral",
  children,
}: {
  variant?: TagVariant;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11.5px] font-semibold leading-relaxed ${TAG_STYLES[variant]}`}
    >
      {children}
    </span>
  );
}

/* The standard yerba descriptor row: type (prominent) · stick · origin. */
export function YerbaTags({
  type,
  stick,
  origin,
}: {
  type: YerbaType;
  stick: StickPresence;
  origin: OriginCountry;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <Tag variant="type">{TYPE_LABELS[type]}</Tag>
      <Tag variant="neutral">{STICK_LABELS[stick]}</Tag>
      <Tag variant="origin">{ORIGIN_LABELS[origin]}</Tag>
    </div>
  );
}

/* ---------- Score — quiet dot + number (REV 3) ---------- */

export function QuietScore({
  score,
  size = "md",
}: {
  score: number;
  size?: "md" | "lg";
}) {
  return (
    <span className="inline-flex flex-none items-baseline gap-1.5">
      <span
        className={`h-[7px] w-[7px] rounded-full ${scoreDotClass(score)}`}
        aria-hidden="true"
      />
      <span
        className={`font-extrabold tabular-nums text-ink ${size === "lg" ? "text-lg" : "text-[15px]"}`}
      >
        {score}
        <span className="text-xs font-bold text-ink-muted">/10</span>
      </span>
    </span>
  );
}

/* ---------- Select (native, styled with a custom chevron) ---------- */

export function Select({
  name,
  defaultValue,
  required,
  children,
}: {
  name: string;
  defaultValue?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <select
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="min-h-[46px] w-full appearance-none rounded-md border border-line bg-surface pl-3.5 pr-10 text-[15px] text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/25"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
    </div>
  );
}

/* ---------- Empty state ---------- */

export function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-line bg-[image:var(--surface-grad)] px-6 py-10 text-center">
      <MateGourd className="h-24 w-24" />
      <div className="flex flex-col gap-1.5">
        <h2 className="text-lg font-extrabold text-ink">{title}</h2>
        <p className="mx-auto max-w-[32ch] text-sm leading-relaxed text-ink-muted">
          {message}
        </p>
      </div>
      {action}
    </div>
  );
}

/* ---------- Loading skeleton (mirrors the real card silhouette) ---------- */

export function SkeletonCard() {
  return (
    <div className={`flex gap-3.5 p-3 ${cardClass}`}>
      <div className="skeleton h-[72px] w-[72px] flex-none rounded-md" />
      <div className="flex flex-1 flex-col gap-2.5 pt-1">
        <div className="skeleton h-3 w-2/5 rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-5 w-3/5 rounded-full" />
      </div>
    </div>
  );
}
