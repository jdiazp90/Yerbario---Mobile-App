import { ORIGIN_LABELS, STICK_LABELS, TYPE_LABELS } from "@/lib/yerba-labels";
import type { Database } from "@/types/database";

const inputClass =
  "rounded-md border border-line bg-surface px-3 py-2 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/30";

export function YerbaForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: Database["public"]["Tables"]["yerba"]["Row"];
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm text-ink">
        Marca
        <input
          name="brand"
          type="text"
          required
          defaultValue={defaultValues?.brand}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-ink">
        Variedad / edición
        <input
          name="variety_name"
          type="text"
          required
          placeholder="Ej. Selección Especial"
          defaultValue={defaultValues?.variety_name}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-ink">
        Tipo
        <select
          name="type"
          required
          defaultValue={defaultValues?.type ?? ""}
          className={inputClass}
        >
          <option value="" disabled>
            Elegí una opción
          </option>
          {Object.entries(TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-ink">
        Palo
        <select
          name="stick_presence"
          required
          defaultValue={defaultValues?.stick_presence ?? ""}
          className={inputClass}
        >
          <option value="" disabled>
            Elegí una opción
          </option>
          {Object.entries(STICK_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-ink">
        Origen
        <select
          name="origin_country"
          required
          defaultValue={defaultValues?.origin_country ?? ""}
          className={inputClass}
        >
          <option value="" disabled>
            Elegí una opción
          </option>
          {Object.entries(ORIGIN_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-ink">
        Foto (URL, opcional)
        <input
          name="image_url"
          type="url"
          placeholder="https://..."
          defaultValue={defaultValues?.image_url ?? ""}
          className={inputClass}
        />
      </label>

      <button
        type="submit"
        className="mt-2 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-ink-inverse transition-colors hover:bg-brand-hover"
      >
        {submitLabel}
      </button>
    </form>
  );
}
