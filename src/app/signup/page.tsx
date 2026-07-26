import Link from "next/link";
import { signup } from "@/lib/actions/auth";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 px-6 py-24">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-ink">
          Crear cuenta
        </h1>
        <p className="text-sm text-ink-muted">
          Registrate para empezar a catar y armar tu ranking.
        </p>
      </div>

      {error && (
        <p className="rounded-md border border-danger bg-surface px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      <form action={signup} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm text-ink">
          Nombre
          <input
            name="display_name"
            type="text"
            required
            className="rounded-md border border-line bg-surface px-3 py-2 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-ink">
          Email
          <input
            name="email"
            type="email"
            required
            className="rounded-md border border-line bg-surface px-3 py-2 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-ink">
          Contraseña
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="rounded-md border border-line bg-surface px-3 py-2 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-ink-inverse transition-colors hover:bg-brand-hover"
        >
          Crear cuenta
        </button>
      </form>

      <p className="text-center text-sm text-ink-muted">
        ¿Ya tenés cuenta?{" "}
        <Link href="/login" className="font-semibold text-brand">
          Iniciar sesión
        </Link>
      </p>
    </main>
  );
}
