import Link from "next/link";
import { login } from "@/lib/actions/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 px-6 py-24">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-ink">
          Iniciar sesión
        </h1>
        <p className="text-sm text-ink-muted">
          Entrá para ver tu ranking y cargar catas.
        </p>
      </div>

      {error && (
        <p className="rounded-md border border-danger bg-surface px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      <form action={login} className="flex flex-col gap-4">
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
            className="rounded-md border border-line bg-surface px-3 py-2 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-ink-inverse transition-colors hover:bg-brand-hover"
        >
          Entrar
        </button>
      </form>

      <p className="text-center text-sm text-ink-muted">
        ¿No tenés cuenta?{" "}
        <Link href="/signup" className="font-semibold text-brand">
          Registrate
        </Link>
      </p>
    </main>
  );
}
