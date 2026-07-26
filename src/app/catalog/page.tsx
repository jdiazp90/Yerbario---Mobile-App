import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ORIGIN_LABELS, STICK_LABELS, TYPE_LABELS } from "@/lib/yerba-labels";

export default async function CatalogPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: yerbas } = await supabase
    .from("yerba")
    .select("*")
    .order("brand");

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-16">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">
            Catálogo
          </h1>
          <p className="text-sm text-ink-muted">
            Yerbas cargadas por la comunidad.
          </p>
        </div>
        {user ? (
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/ranking"
              className="text-sm font-semibold text-brand"
            >
              Tu ranking
            </Link>
            <Link
              href="/catalog/new"
              className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-ink-inverse transition-colors hover:bg-brand-hover"
            >
              + Agregar
            </Link>
          </div>
        ) : (
          <Link
            href="/login"
            className="shrink-0 text-sm font-semibold text-brand"
          >
            Iniciá sesión para agregar
          </Link>
        )}
      </div>

      {!yerbas?.length ? (
        <p className="text-sm text-ink-muted">
          Todavía no hay yerbas cargadas.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {yerbas.map((yerba) => (
            <li
              key={yerba.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-line bg-surface px-5 py-4 shadow-sm"
            >
              <div className="flex flex-col gap-1.5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                    {yerba.brand}
                  </span>
                  <h2 className="text-lg font-bold text-ink">
                    {yerba.variety_name}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-line bg-canvas px-2.5 py-0.5 text-xs font-semibold text-ink-muted">
                    {TYPE_LABELS[yerba.type]}
                  </span>
                  <span className="rounded-full border border-line bg-canvas px-2.5 py-0.5 text-xs font-semibold text-ink-muted">
                    {STICK_LABELS[yerba.stick_presence]}
                  </span>
                  <span className="rounded-full border border-line bg-canvas px-2.5 py-0.5 text-xs font-semibold text-ink-muted">
                    {ORIGIN_LABELS[yerba.origin_country]}
                  </span>
                </div>
              </div>
              {user && (
                <div className="flex shrink-0 flex-col items-end gap-1.5 text-sm font-semibold">
                  <Link href={`/catalog/${yerba.id}/review/new`} className="text-brand">
                    Catar
                  </Link>
                  <Link href={`/catalog/${yerba.id}/edit`} className="text-ink-muted">
                    Editar
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
