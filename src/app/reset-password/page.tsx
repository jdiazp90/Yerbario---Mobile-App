import { updatePassword } from "@/lib/actions/auth";
import {
  btnPrimary,
  fieldClass,
  fieldHintClass,
  fieldLabelClass,
  inputClass,
} from "@/lib/ui";
import { TopBar } from "@/components/top-bar";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-full flex-col">
      <TopBar />
      <main className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-6 px-6 pb-16 pt-10">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[26px] font-extrabold tracking-tight text-ink">
            Elegí una contraseña nueva
          </h1>
          <p className="text-sm text-ink-muted">
            Ya confirmamos que sos vos. Escribí tu nueva contraseña.
          </p>
        </div>

        {error && (
          <p className="rounded-md border border-danger bg-surface px-4 py-3 text-sm font-medium text-danger">
            {error}
          </p>
        )}

        <form action={updatePassword} className="flex flex-col gap-4">
          <label className={fieldClass}>
            <span className={fieldLabelClass}>
              Contraseña nueva <span className={fieldHintClass}>· mínimo 6</span>
            </span>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              className={inputClass}
            />
          </label>
          <label className={fieldClass}>
            <span className={fieldLabelClass}>Confirmar contraseña</span>
            <input
              name="confirm_password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              className={inputClass}
            />
          </label>
          <button type="submit" className={`${btnPrimary} mt-1 w-full`}>
            Guardar contraseña
          </button>
        </form>
      </main>
    </div>
  );
}
