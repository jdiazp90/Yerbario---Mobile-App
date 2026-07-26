import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/actions/auth";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let displayName: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .single();
    displayName = profile?.display_name ?? null;
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        Sprint 1 · Phase 4
      </span>
      <h1 className="text-3xl font-bold tracking-tight text-ink">Yerbario</h1>

      {user ? (
        <>
          <p className="max-w-md text-base text-ink-muted">
            Hola, {displayName ?? user.email} — auth conectada.
          </p>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-line-strong"
            >
              Cerrar sesión
            </button>
          </form>
        </>
      ) : (
        <>
          <p className="max-w-md text-base text-ink-muted">
            Todavía sin catálogo ni catas — arrancá creando tu cuenta.
          </p>
          <div className="flex gap-3">
            <Link
              href="/signup"
              className="rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-ink-inverse transition-colors hover:bg-brand-hover"
            >
              Registrate
            </Link>
            <Link
              href="/login"
              className="rounded-md border border-line px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-line-strong"
            >
              Iniciar sesión
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
