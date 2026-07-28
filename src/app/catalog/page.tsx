import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { btnPrimary, btnSecondary, cardClass, inputClass } from "@/lib/ui";
import type { OriginCountry, StickPresence, YerbaType } from "@/types/database";
import { PencilIcon, SearchIcon } from "@/components/icons";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { EmptyState, QuietScore, YerbaTags } from "@/components/ui";
import { YerbaImage } from "@/components/yerba-image";
import { FilterPanel } from "@/components/filter-panel";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    type?: YerbaType;
    stick_presence?: StickPresence;
    origin_country?: OriginCountry;
  }>;
}) {
  const { q, type, stick_presence, origin_country } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let initial: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .single();
    initial = (profile?.display_name ?? user.email ?? "?").trim()[0]?.toUpperCase() ?? "?";
  }

  let query = supabase.from("yerba_rankings").select("*").order("brand");
  if (type) query = query.eq("type", type);
  if (stick_presence) query = query.eq("stick_presence", stick_presence);
  if (origin_country) query = query.eq("origin_country", origin_country);
  const { data: allYerbas } = await query;

  const needle = q?.trim().toLowerCase();
  const yerbas = needle
    ? (allYerbas ?? []).filter(
        (y) =>
          y.brand.toLowerCase().includes(needle) ||
          y.variety_name.toLowerCase().includes(needle),
      )
    : allYerbas;

  const hasFilters = Boolean(type || stick_presence || origin_country);

  return (
    <div className="flex min-h-full flex-col">
      <TopBar active="catalog" user={initial ? { initial } : null} />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-28 pt-5 md:pb-12">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-extrabold tracking-tight text-ink">
                Catálogo
              </h1>
              <p className="text-sm text-ink-muted">
                Yerbas cargadas por la comunidad.
              </p>
            </div>
            {user ? (
              <Link href="/catalog/new" className={btnPrimary}>
                + Agregar
              </Link>
            ) : (
              <Link href="/login" className={btnSecondary}>
                Iniciá sesión para agregar
              </Link>
            )}
          </div>

          <form className="flex flex-col gap-3">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-muted" />
              <input
                type="search"
                name="q"
                defaultValue={q ?? ""}
                placeholder="Buscar yerba, marca..."
                className={`${inputClass} pl-11`}
              />
            </div>
            <FilterPanel
              type={type}
              stickPresence={stick_presence}
              originCountry={origin_country}
            />
          </form>

          {!yerbas?.length ? (
            <EmptyState
              title={needle || hasFilters ? "Sin resultados" : "El catálogo está vacío"}
              message={
                needle
                  ? `Ninguna yerba coincide con "${q}".`
                  : hasFilters
                    ? "Ninguna yerba coincide con estos filtros. Probá aflojar la búsqueda."
                    : "Todavía nadie cargó una yerba. Sé el primero en sumar una al catálogo."
              }
              action={
                needle || hasFilters ? (
                  <Link href="/catalog" className={btnPrimary}>
                    Limpiar {needle ? "búsqueda" : "filtros"}
                  </Link>
                ) : user ? (
                  <Link href="/catalog/new" className={btnPrimary}>
                    Agregar la primera
                  </Link>
                ) : (
                  <Link href="/signup" className={btnPrimary}>
                    Crear cuenta
                  </Link>
                )
              }
            />
          ) : (
            <ul className="flex flex-col gap-3">
              {yerbas.map((yerba) => (
                <li key={yerba.id} className={`flex gap-3.5 p-3 ${cardClass}`}>
                  <Link
                    href={`/catalog/${yerba.id}`}
                    className="flex min-w-0 flex-1 gap-3.5"
                  >
                    <YerbaImage
                      src={yerba.image_url}
                      alt={`${yerba.brand} ${yerba.variety_name}`}
                      brand={yerba.brand}
                      className="h-14 w-14"
                      rounded="rounded-2xl"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5 justify-center">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wide text-brand">
                          {yerba.brand}
                        </div>
                        <h2 className="text-[16.5px] font-extrabold leading-tight text-ink">
                          {yerba.variety_name}
                        </h2>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-ink-muted">
                        {yerba.review_count > 0 ? (
                          <>
                            <QuietScore score={yerba.avg_score} />
                            <span>
                              · {yerba.review_count}{" "}
                              {yerba.review_count === 1 ? "cata" : "catas"}
                            </span>
                          </>
                        ) : (
                          <span>Sin catas</span>
                        )}
                      </div>
                      <YerbaTags
                        type={yerba.type}
                        stick={yerba.stick_presence}
                        origin={yerba.origin_country}
                      />
                    </div>
                  </Link>
                  {user && (
                    <div className="flex flex-none flex-col justify-center gap-2">
                      <Link
                        href={`/catalog/${yerba.id}/review/new`}
                        className={btnPrimary}
                      >
                        Catar
                      </Link>
                      <Link
                        href={`/catalog/${yerba.id}/edit`}
                        aria-label={`Editar ${yerba.brand} ${yerba.variety_name}`}
                        className="grid min-h-11 place-items-center rounded-md border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
                      >
                        <PencilIcon />
                      </Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <BottomNav active="catalog" />
    </div>
  );
}
