import type { ReactNode } from "react";
import {
  btnPrimary,
  fieldClass,
  fieldLabelClass,
  inputClass,
  textareaClass,
} from "@/lib/ui";
import { Select } from "./ui";
import { RatingInput } from "./rating-input";
import { PhotoUploadField } from "./photo-upload-field";
import { AromaPicker } from "./aroma-picker";

/* Visual grouping only — sub-section header for a run of related fields
   within the same scrolling form. Doesn't change what gets submitted. */
function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5 border-t border-line/60 pt-5 first:border-t-0 first:pt-0">
      <span className="text-[13px] font-extrabold uppercase tracking-wide text-ink-muted">
        {title}
      </span>
      {children}
    </div>
  );
}

export function ReviewForm({
  action,
  brand,
}: {
  action: (formData: FormData) => void;
  brand: string;
}) {
  return (
    <form action={action} className="flex flex-col gap-5">
      <FormSection title="Cómo la preparaste">
        <div className={fieldClass}>
          <span className={fieldLabelClass}>Molienda</span>
          <Select name="cut_type" required defaultValue="">
            <option value="" disabled>
              Elegí una opción
            </option>
            <option value="fina">Fina</option>
            <option value="gruesa">Gruesa</option>
          </Select>
        </div>

        <PhotoUploadField
          fileFieldName="molienda_photo_file"
          currentUrlFieldName="molienda_photo_url"
          label="Foto de la molienda"
          brand={brand}
        />
      </FormSection>

      <FormSection title="Cómo salió">
        <label className={fieldClass}>
          <span className={fieldLabelClass}>Puntaje general (1–10)</span>
          <input
            name="overall_score"
            type="number"
            min={1}
            max={10}
            step={0.5}
            required
            className={inputClass}
          />
        </label>

        <RatingInput name="bitterness_intensity" label="Amargor" required />
        <RatingInput name="foam_quality" label="Espuma" required />

        <AromaPicker />
      </FormSection>

      <FormSection title="Tu veredicto">
        <label className={fieldClass}>
          <span className={fieldLabelClass}>
            Notas adicionales{" "}
            <span className="font-medium text-ink-muted">· opcional</span>
          </span>
          <textarea
            name="aroma_note"
            rows={2}
            placeholder="Algo que las etiquetas no capturaron..."
            className={textareaClass}
          />
        </label>

        <label className={fieldClass}>
          <span className={fieldLabelClass}>Rendimiento</span>
          <textarea
            name="yield_notes"
            rows={2}
            placeholder="Cuántas cebadas aguantó, cómo evolucionó..."
            className={textareaClass}
          />
        </label>

        <label className={fieldClass}>
          <span className={fieldLabelClass}>Veredicto</span>
          <textarea
            name="verdict"
            rows={3}
            required
            placeholder="¿Por qué le pusiste este puntaje?"
            className={textareaClass}
          />
        </label>

        <PhotoUploadField
          fileFieldName="photo_file"
          currentUrlFieldName="photo_url"
          label="Foto de la cata"
          brand={brand}
          size="lg"
        />
      </FormSection>

      <button type="submit" className={`${btnPrimary} mt-1 w-full`}>
        Guardar cata
      </button>
    </form>
  );
}
