import type { ReactNode } from "react";
import { ORIGIN_LABELS, STICK_LABELS, TYPE_LABELS } from "@/lib/yerba-labels";
import type { OriginCountry, StickPresence, YerbaType } from "@/types/database";
import { btnPrimary } from "@/lib/ui";
import { FilterRow } from "./filter-row";
import { ChevronDown } from "./icons";

/* Collapsible wrapper around the three yerba filters (tipo/palo/origen).
   <details> instead of client state — opens by itself when a filter is
   already active from the URL, closed by default otherwise, so the filters
   aren't permanently taking up space above the results. Fields inside a
   closed <details> still submit with the surrounding <form>, so this stays
   zero-JS like the rest of the filtering. */
export function FilterPanel({
  type,
  stickPresence,
  originCountry,
  hiddenFields,
}: {
  type?: YerbaType;
  stickPresence?: StickPresence;
  originCountry?: OriginCountry;
  hiddenFields?: ReactNode;
}) {
  const activeCount = [type, stickPresence, originCountry].filter(Boolean).length;

  return (
    <details className="group" open={activeCount > 0}>
      <summary className="flex min-h-11 w-fit cursor-pointer list-none items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--line)_35%,transparent)] bg-surface px-3.5 text-[13px] font-semibold text-ink-muted transition-colors hover:border-line-strong [&::-webkit-details-marker]:hidden">
        Filtros{activeCount > 0 ? ` · ${activeCount}` : ""}
        <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
      </summary>
      <div className="flex flex-col gap-2.5 pt-3">
        {hiddenFields}
        <FilterRow name="type" selected={type} options={Object.entries(TYPE_LABELS)} />
        <FilterRow
          name="origin_country"
          selected={originCountry}
          options={Object.entries(ORIGIN_LABELS)}
        />
        <div className="flex items-center gap-3 pt-0.5">
          <FilterRow
            name="stick_presence"
            selected={stickPresence}
            options={Object.entries(STICK_LABELS)}
          />
          <button type="submit" className={`${btnPrimary} flex-none`}>
            Aplicar
          </button>
        </div>
      </div>
    </details>
  );
}
