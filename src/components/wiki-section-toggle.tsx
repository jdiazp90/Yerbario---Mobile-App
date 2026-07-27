import Link from "next/link";
import { selectedPillClass } from "@/lib/ui";

/** Pill toggle between the Wiki's two curated sections. */
export function WikiSectionToggle({ active }: { active: "enciclopedia" | "maridaje" }) {
  const pill = (href: string, label: string, current: boolean) =>
    current ? (
      <span
        key={href}
        className={`flex-1 rounded-full py-2 text-center text-sm font-bold ${selectedPillClass}`}
      >
        {label}
      </span>
    ) : (
      <Link
        key={href}
        href={href}
        className="flex-1 rounded-full py-2 text-center text-sm font-bold text-ink-muted transition-colors hover:text-ink"
      >
        {label}
      </Link>
    );

  return (
    <div className="flex gap-1.5 rounded-full border border-line bg-surface p-1">
      {pill("/wiki", "Enciclopedia", active === "enciclopedia")}
      {pill("/wiki/maridaje", "Maridaje", active === "maridaje")}
    </div>
  );
}
