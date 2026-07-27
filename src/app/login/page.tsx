import Link from "next/link";
import { login } from "@/lib/actions/auth";
import {
  btnPrimary,
  fieldClass,
  fieldLabelClass,
  inputClass,
} from "@/lib/ui";
import { TopBar } from "@/components/top-bar";

export default async function LoginPage({
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
            Iniciar sesión
          </h1>
          <p className="text-sm text-ink-muted">
            Entrá para ver tu ranking y cargar catas.
          </p>
        </div>

        {error && (
          <p className="rounded-md border border-danger bg-surface px-4 py-3 text-sm font-medium text-danger">
            {error}
          </p>
        )}

        <form action={login} className="flex flex-col gap-4">
          <label className={fieldClass}>
            <span className={fieldLabelClass}>Email</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className={inputClass}
            />
          </label>
          <label className={fieldClass}>
            <span className={fieldLabelClass}>Contraseña</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={inputClass}
            />
          </label>
          <button type="submit" className={`${btnPrimary} mt-1 w-full`}>
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-ink-muted">
          ¿No tenés cuenta?{" "}
          <Link href="/signup" className="font-bold text-brand">
            Registrate
          </Link>
        </p>
      </main>
    </div>
  );
}
