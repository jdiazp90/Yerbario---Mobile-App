import { fieldLabelClass, peerSelectedClass } from "@/lib/ui";

/**
 * Segmented 1–N rating control. Replaces the tiny native <select> for the
 * 1–5 cata scales (amargor, espuma) with N full-size tap targets. Built on
 * native radio inputs so it works with server-action <form>s (value lands in
 * FormData) and the browser's own required-group validation — no client JS.
 */
export function RatingInput({
  name,
  label,
  max = 5,
  defaultValue,
  required,
}: {
  name: string;
  label: string;
  max?: number;
  defaultValue?: number | null;
  required?: boolean;
}) {
  const values = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className={fieldLabelClass}>{label}</legend>
      <div className="flex gap-1.5">
        {values.map((n) => (
          <label key={n} className="flex-1">
            <input
              type="radio"
              name={name}
              value={n}
              required={required}
              defaultChecked={defaultValue === n}
              className="peer sr-only"
            />
            <span className={`flex min-h-[46px] cursor-pointer select-none items-center justify-center rounded-md border border-line bg-surface text-[15px] font-bold tabular-nums text-ink-muted transition-colors hover:border-line-strong hover:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40 ${peerSelectedClass}`}>
              {n}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
