import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ORIGIN_LABELS, STICK_LABELS, TYPE_LABELS } from "@/lib/yerba-labels";
import { btnPrimary, cardClass, peerSelectedClass } from "@/lib/ui";
import type { OriginCountry, StickPresence, YerbaType } from "@/types/database";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { EmptyState, QuietScore, YerbaTags } from "@/components/ui";
import { YerbaImage } from "@/components/yerba-image";

const MEDALS = ["", "g1", "g2", "g3"];
const MEDAL_CLASS: Record<string, string> = {
  g1: "border-transparent bg-gradient-to-br from-[#c9a24a] to-[#a97f2e] text-white shadow-sm",
  g2: "border-transparent bg-gradient-to-br from-[#9aa0a6] to-[#767c82] text-white shadow-sm",
  g3: "border-transparent bg-gradient-to-br from-[#c08552] to-[#9c6538] text-white shadow-sm",
};

/* One filter group: renders as a horizontally-scrollable chip row that submits
   on change (no separate "Filtrar" button). Each chip is a real radio so the
   whole thing is one native <form> with no client JS. */
function FilterRow({
  name,
  options,
  selected,
}: {
  name: string;
  options: [value: string, label: string][];
  selected?: string;
}) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {[["", "Todas"] as [string, string], ...options].map(([value, label]) => {
        const active = (selected ?? "") === value;
        return (
          <label key={value || "all"} className="flex-none">
            <input
              type="radio"
              name={name}
              value={value}
              defaultChecked={active}
              className="peer sr-only"
            />
            <span className={`flex min-h-10 cursor-pointer items-center rounded-full border border-line bg-surface px-3.5 text-[13px] font-semibold text-ink-muted transition-colors hover:border-line-strong ${peerSelectedClass}`}>
              {label}
            </span>
          </label>
        );
      })}
    </div>
  );
}

export default async function RankingPage({
  searchParams,
}: {
  searchParams: Promise<{
    type?: YerbaType;
    stick_presence?: StickPresence;
    origin_country?: OriginCountry;
  }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user.id)
    .single();
  const initial =
    (profile?.display_name ?? user.email ?? "?").trim()[0]?.toUpperCase() ?? "?";

  const { type, stick_presence, origin_country } = await searchParams;

  let query = supabase
    .from("review")
    .select(
      "id, overall_score, yerba!inner(id, brand, variety_name, type, stick_presence, origin_country, image_url)",
    )
    .eq("user_id", user.id)
    .order("overall_score", { ascending: false });

  if (type) query = query.eq("yerba.type", type);
  if (stick_presence) query = query.eq("yerba.stick_presence", stick_presence);
  if (origin_country) query = query.eq("yerba.origin_country", origin_country);

  const { data: reviews } = await query;
  const hasFilters = Boolean(type || stick_presence || origin_country);

  return (
    <div className="flex min-h-full flex-col">
      <TopBar active="ranking" user={{ initial }} />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-28 pt-5 md:pb-12">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-ink">
              Tu ranking
            </h1>
            <p className="text-sm text-ink-muted">
              Tus catas, ordenadas por puntaje.
            </p>
          </div>

          <form className="flex flex-col gap-2.5">
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

          {!reviews?.length ? (
            hasFilters ? (
              <EmptyState
                title="Sin resultados"
                message="Ninguna de tus catas coincide con estos filtros. Probá aflojar la búsqueda."
                action={
                  <Link href="/ranking" className={btnPrimary}>
                    Limpiar filtros
                  </Link>
                }
              />
            ) : (
              <EmptyState
                title="Tu ranking está vacío"
                message="Catá tu primera yerba y aparecerá acá, ordenada por puntaje."
                action={
                  <Link href="/catalog" className={btnPrimary}>
                    Ver catálogo
                  </Link>
                }
              />
            )
          ) : (
            <ol className="flex flex-col gap-3">
              {reviews.map((review, i) => {
                const yerba = review.yerba;
                const rank = i + 1;
                const medal = MEDALS[rank] ?? "";
                return (
                  <li
                    key={review.id}
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
                      src={yerba.image_url}
                      alt={`${yerba.brand} ${yerba.variety_name}`}
                      brand={yerba.brand}
                      className="h-14 w-14"
                      rounded="rounded-2xl"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wide text-brand">
                          {yerba.brand}
                        </div>
                        <h2 className="text-[15px] font-extrabold leading-tight text-ink">
                          {yerba.variety_name}
                        </h2>
                      </div>
                      <YerbaTags
                        type={yerba.type}
                        stick={yerba.stick_presence}
                        origin={yerba.origin_country}
                      />
                    </div>
                    <QuietScore score={review.overall_score} />
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
