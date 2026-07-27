import { fieldLabelClass, peerSelectedClass } from "@/lib/ui";
import { AROMA_CATEGORIES } from "@/lib/aroma-labels";

/**
 * Controlled-vocabulary aroma tag picker, grouped by category. Multi-select
 * via native checkboxes sharing the `aroma_tags` name — formData.getAll picks
 * up every checked value, no client JS needed. Visual pattern mirrors
 * RatingInput's peer-checked gradient chip.
 */
export function AromaPicker({ defaultValues }: { defaultValues?: string[] }) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className={fieldLabelClass}>
        Notas de aroma <span className="font-medium text-ink-muted">· elegí las que apliquen</span>
      </legend>
      <div className="flex flex-col gap-3">
        {AROMA_CATEGORIES.map((group) => (
          <div key={group.category} className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-ink-muted">
              {group.category}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {group.tags.map((tag) => (
                <label key={tag} className="cursor-pointer">
                  <input
                    type="checkbox"
                    name="aroma_tags"
                    value={tag}
                    defaultChecked={defaultValues?.includes(tag)}
                    className="peer sr-only"
                  />
                  <span className={`inline-flex min-h-9 items-center rounded-full border border-line bg-surface px-3.5 text-[13px] font-semibold text-ink-muted transition-colors hover:border-line-strong ${peerSelectedClass}`}>
                    {tag}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
