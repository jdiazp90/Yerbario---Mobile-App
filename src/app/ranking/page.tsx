import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ORIGIN_LABELS, STICK_LABELS, TYPE_LABELS } from "@/lib/yerba-labels";
import { btnPrimary, cardClass, selectedPillClass } from "@/lib/ui";
import type { OriginCountry, StickPresence, YerbaType } from "@/types/database";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { EmptyState, QuietScore, YerbaTags } from "@/components/ui";
import { YerbaImage } from "@/components/yerba-image";
import { FilterRow } from "@/components/filter-row";

const MEDALS = ["", "g1", "g2", "g3"];
const MEDAL_CLASS: Record<string, string> = {
  g1: "border-transparent bg-gradient-to-br from-[#c9a24a] to-[#a97f2e] text-white shadow-sm",
  g2: "border-transparent bg-gradient-to-br from-[#9aa0a6] to-[#767c82] text-white shadow-sm",
  g3: "border-transparent bg-gradient-to-br from-[#c08552] to-[#9c6538] text-white shadow-sm",
};

// A yerba needs at least this many catas to enter the global ranking — a
// single 10/10 cata shouldn't outrank one with 50 catas averaging 8.5. Simple
// hard floor for now; revisit with a Bayesian/weighted average if the catalog
// grows enough that ties right at the floor start to matter.
const GLOBAL_MIN_REVIEWS = 3;

type RankRow = {
  key: string;
  yerbaId: string;
  brand: string;
  variety_name: string;
  type: YerbaType;
  stick_presence: StickPresence;
  origin_country: OriginCountry;
  image_url: string | null;
  score: number;
};

export default async function RankingPage({
  searchParams,
}: {
  searchParams: Promise<{
    view?: string;
    type?: YerbaType;
    stick_presence?: StickPresence;
    origin_country?: OriginCountry;
  }>;
}) {
  const { view: rawView, type, stick_presence, origin_country } =
    await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const view = rawView === "mine" ? "mine" : "global";
  if (view === "mine" && !user) redirect("/login");

  let initial: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .single();
    initial = (profile?.display_name ?? user.email ?? "?").trim()[0]?.toUpperCase() ?? "?";
  }

  const hasFilters = Boolean(type || stick_presence || origin_country);
  let rows: RankRow[] = [];

  if (view === "mine") {
    let query = supabase
      .from("review")
      .select(
        "id, overall_score, yerba!inner(id, brand, variety_name, type, stick_presence, origin_country, image_url)",
      )
      .eq("user_id", user!.id)
      .order("overall_score", { ascending: false });

    if (type) query = query.eq("yerba.type", type);
    if (stick_presence) query = query.eq("yerba.stick_presence", stick_presence);
    if (origin_country) query = query.eq("yerba.origin_country", origin_country);

    const { data: reviews } = await query;
    rows = (reviews ?? []).map((review) => ({
      key: review.id,
      yerbaId: review.yerba.id,
      brand: review.yerba.brand,
      variety_name: review.yerba.variety_name,
      type: review.yerba.type,
      stick_presence: review.yerba.stick_presence,
      origin_country: review.yerba.origin_country,
      image_url: review.yerba.image_url,
      score: review.overall_score,
    }));
  } else {
    let query = supabase
      .from("yerba_rankings")
      .select("*")
      .gte("review_count", GLOBAL_MIN_REVIEWS)
      .order("avg_score", { ascending: false });

    if (type) query = query.eq("type", type);
    if (stick_presence) query = query.eq("stick_presence", stick_presence);
    if (origin_country) query = query.eq("origin_country", origin_country);

    const { data: yerbas } = await query;
    rows = (yerbas ?? []).map((yerba) => ({
      key: yerba.id,
      yerbaId: yerba.id,
      brand: yerba.brand,
      variety_name: yerba.variety_name,
      type: yerba.type,
      stick_presence: yerba.stick_presence,
      origin_country: yerba.origin_country,
      image_url: yerba.image_url,
      score: yerba.avg_score,
    }));
  }

  const filterQs = new URLSearchParams();
  if (type) filterQs.set("type", type);
  if (stick_presence) filterQs.set("stick_presence", stick_presence);
  if (origin_country) filterQs.set("origin_country", origin_country);
  const withFilters = (view: "global" | "mine") => {
    const qs = new URLSearchParams(filterQs);
    if (view === "mine") qs.set("view", "mine");
    const s = qs.toString();
    return `/ranking${s ? `?${s}` : ""}`;
  };

  return (
    <div className="flex min-h-full flex-col">
      <TopBar active="ranking" user={initial ? { initial } : null} />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-28 pt-5 md:pb-12">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-ink">
              Ranking
            </h1>
            <p className="text-sm text-ink-muted">
              {view === "mine"
                ? "Tus catas, ordenadas por puntaje."
                : "Las yerbas mejor puntuadas por toda la comunidad."}
            </p>
          </div>

          <div className="flex gap-1.5 rounded-full border border-line bg-surface p-1">
            {view === "global" ? (
              <span className={`flex-1 rounded-full py-2 text-center text-sm font-bold ${selectedPillClass}`}>
                Global
              </span>
            ) : (
              <Link
                href={withFilters("global")}
                className="flex-1 rounded-full py-2 text-center text-sm font-bold text-ink-muted transition-colors hover:text-ink"
              >
                Global
              </Link>
            )}
            {view === "mine" ? (
              <span className={`flex-1 rounded-full py-2 text-center text-sm font-bold ${selectedPillClass}`}>
                Mis catas
              </span>
            ) : (
              <Link
                href={withFilters("mine")}
                className="flex-1 rounded-full py-2 text-center text-sm font-bold text-ink-muted transition-colors hover:text-ink"
              >
                Mis catas
              </Link>
            )}
          </div>

          <form className="flex flex-col gap-2.5">
            {view === "mine" && <input type="hidden" name="view" value="mine" />}
            <FilterRow
              name="type"
              selected={type}
              options={Object.entries(TYPE_LABELS)}
            />
            <FilterRow
              name="origin_country"
              selected={origin_country}
              options={Object.entries(ORIGIN_LABELS)}
            />
            <div className="flex items-center gap-3 pt-0.5">
              <FilterRow
                name="stick_presence"
                selected={stick_presence}
                options={Object.entries(STICK_LABELS)}
              />
              <button type="submit" className={`${btnPrimary} flex-none`}>
                Aplicar
              </button>
            </div>
          </form>

          {!rows.length ? (
            hasFilters ? (
              <EmptyState
                title="Sin resultados"
                message={
                  view === "mine"
                    ? "Ninguna de tus catas coincide con estos filtros. Probá aflojar la búsqueda."
                    : "Ninguna yerba coincide con estos filtros."
                }
                action={
                  <Link href={withFilters(view)} className={btnPrimary}>
                    Limpiar filtros
                  </Link>
                }
              />
            ) : view === "mine" ? (
              <EmptyState
                title="Tu ranking está vacío"
                message="Catá tu primera yerba y aparecerá acá, ordenada por puntaje."
                action={
                  <Link href="/catalog" className={btnPrimary}>
                    Ver catálogo
                  </Link>
                }
              />
            ) : (
              <EmptyState
                title="Todavía no hay ranking global"
                message={`Hacen falta al menos ${GLOBAL_MIN_REVIEWS} catas en una yerba para que entre acá — sé de los primeros en catar.`}
                action={
                  <Link href="/catalog" className={btnPrimary}>
                    Ver catálogo
                  </Link>
                }
              />
            )
          ) : (
            <ol className="flex flex-col gap-3">
              {rows.map((row, i) => {
                const rank = i + 1;
                const medal = MEDALS[rank] ?? "";
                return (
                  <li
                    key={row.key}
                    className={`flex items-center gap-3 p-3 ${cardClass} ${
                      medal === "g1"
                        ? "border-[color-mix(in_srgb,#c9a24a_40%,transparent)]"
                        : ""
                    }`}
                  >
                    <span
                      className={`grid h-8 w-8 flex-none place-items-center rounded-full border text-sm font-extrabold tabular-nums ${
                        MEDAL_CLASS[medal] ??
                        "border-line bg-canvas text-ink-muted"
                      }`}
                    >
                      {rank}
                    </span>
                    <YerbaImage
                      src={row.image_url}
                      alt={`${row.brand} ${row.variety_name}`}
                      brand={row.brand}
                      className="h-14 w-14"
                      rounded="rounded-2xl"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wide text-brand">
                          {row.brand}
                        </div>
                        <h2 className="text-[15px] font-extrabold leading-tight text-ink">
                          {row.variety_name}
                        </h2>
                      </div>
                      <YerbaTags
                        type={row.type}
                        stick={row.stick_presence}
                        origin={row.origin_country}
                      />
                    </div>
                    <QuietScore score={row.score} />
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </main>

      <BottomNav active="ranking" />
    </div>
  );
}
