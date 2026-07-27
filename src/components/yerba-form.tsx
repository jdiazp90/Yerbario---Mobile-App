import { ORIGIN_LABELS, STICK_LABELS, TYPE_LABELS } from "@/lib/yerba-labels";
import {
  btnPrimary,
  fieldClass,
  fieldLabelClass,
  inputClass,
} from "@/lib/ui";
import type { Database } from "@/types/database";
import { Select } from "./ui";
import { PhotoUploadField } from "./photo-upload-field";

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
    <form action={action} className="flex flex-col gap-5">
      <label className={fieldClass}>
        <span className={fieldLabelClass}>Marca</span>
        <input
          name="brand"
          type="text"
          required
          defaultValue={defaultValues?.brand}
          className={inputClass}
        />
      </label>

      <label className={fieldClass}>
        <span className={fieldLabelClass}>Variedad / edición</span>
        <input
          name="variety_name"
          type="text"
          required
          placeholder="Ej. Selección Especial"
          defaultValue={defaultValues?.variety_name}
          className={inputClass}
        />
      </label>

      <div className={fieldClass}>
        <span className={fieldLabelClass}>Tipo</span>
        <Select name="type" required defaultValue={defaultValues?.type ?? ""}>
          <option value="" disabled>
            Elegí una opción
          </option>
          {Object.entries(TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      <div className={fieldClass}>
        <span className={fieldLabelClass}>Palo</span>
        <Select
          name="stick_presence"
          required
          defaultValue={defaultValues?.stick_presence ?? ""}
        >
          <option value="" disabled>
            Elegí una opción
          </option>
          {Object.entries(STICK_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      <div className={fieldClass}>
        <span className={fieldLabelClass}>Origen</span>
        <Select
          name="origin_country"
          required
          defaultValue={defaultValues?.origin_country ?? ""}
        >
          <option value="" disabled>
            Elegí una opción
          </option>
          {Object.entries(ORIGIN_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      <PhotoUploadField
        fileFieldName="image_file"
        currentUrlFieldName="current_image_url"
        label="Portada"
        brand={defaultValues?.brand ?? "?"}
        defaultValue={defaultValues?.image_url}
        size="lg"
      />

      <button type="submit" className={`${btnPrimary} mt-1 w-full`}>
        {submitLabel}
      </button>
    </form>
  );
}
