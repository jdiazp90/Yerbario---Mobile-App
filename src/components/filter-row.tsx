import { peerSelectedChipClass } from "@/lib/ui";

/* One filter group: renders as a horizontally-scrollable chip row that submits
   on change (no separate "Filtrar" button). Each chip is a real radio so the
   whole thing is one native <form> with no client JS. */
export function FilterRow({
  name,
  options,
  selected,
}: {
  name: string;
  options: [value: string, label: string][];
  selected?: string;
}) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {[["", "Todas"] as [string, string], ...options].map(([value, label]) => {
        const active = (selected ?? "") === value;
        return (
          <label key={value || "all"} className="flex-none">
            <input
              type="radio"
              name={name}
              value={value}
              defaultChecked={active}
              className="peer sr-only"
            />
            <span className={`flex min-h-11 cursor-pointer items-center rounded-full border border-[color-mix(in_srgb,var(--line)_35%,transparent)] bg-surface px-3.5 text-[13px] font-semibold text-ink-muted transition-[border-color,background-color,transform] duration-150 hover:border-line-strong active:scale-[0.96] active:duration-100 ${peerSelectedChipClass}`}>
              {label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
