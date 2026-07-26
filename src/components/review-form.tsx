const inputClass =
  "rounded-md border border-line bg-surface px-3 py-2 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/30";

const SCALE_1_TO_5 = [1, 2, 3, 4, 5];

export function ReviewForm({
  action,
}: {
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm text-ink">
        Puntaje general (1–10)
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

      <label className="flex flex-col gap-1.5 text-sm text-ink">
        Molienda
        <select name="cut_type" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Elegí una opción
          </option>
          <option value="fina">Fina</option>
          <option value="gruesa">Gruesa</option>
        </select>
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5 text-sm text-ink">
          Amargor (1–5)
          <select name="bitterness_intensity" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              —
            </option>
            {SCALE_1_TO_5.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-ink">
          Espuma (1–5)
          <select name="foam_quality" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              —
            </option>
            {SCALE_1_TO_5.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm text-ink">
        Aroma
        <textarea
          name="aroma_note"
          rows={2}
          placeholder="Notas herbáceas, tostadas, cítricas..."
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-ink">
        Rendimiento
        <textarea
          name="yield_notes"
          rows={2}
          placeholder="Cuántas cebadas aguantó, cómo evolucionó..."
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-ink">
        Veredicto
        <textarea
          name="verdict"
          rows={3}
          required
          placeholder="¿Por qué le pusiste este puntaje?"
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-ink">
        Foto (URL, opcional)
        <input
          name="photo_url"
          type="url"
          placeholder="https://..."
          className={inputClass}
        />
      </label>

      <button
        type="submit"
        className="mt-2 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-ink-inverse transition-colors hover:bg-brand-hover"
      >
        Guardar cata
      </button>
    </form>
  );
}
