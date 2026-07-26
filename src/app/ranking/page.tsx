import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ORIGIN_LABELS, STICK_LABELS, TYPE_LABELS } from "@/lib/yerba-labels";
import type { OriginCountry, StickPresence, YerbaType } from "@/types/database";

function scoreChipClass(score: number) {
  if (score >= 7) return "bg-brand";
  if (score >= 4) return "bg-warning-fill";
  return "bg-danger";
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

  const { type, stick_presence, origin_country } = await searchParams;

  let query = supabase
    .from("review")
    .select(
      "id, overall_score, yerba!inner(id, brand, variety_name, type, stick_presence, origin_country)",
    )
    .eq("user_id", user.id)
    .order("overall_score", { ascending: false });

  if (type) query = query.eq("yerba.type", type);
  if (stick_presence) query = query.eq("yerba.stick_presence", stick_presence);
  if (origin_country) query = query.eq("yerba.origin_country", origin_country);

  const { data: reviews } = await query;

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-16">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">
          Tu ranking
        </h1>
        <p className="text-sm text-ink-muted">
          Tus catas, ordenadas por puntaje.
        </p>
      </div>

      <form className="flex flex-wrap items-end gap-3 rounded-lg border border-line bg-surface p-4">
        <label className="flex flex-col gap-1 text-xs font-semibold text-ink-muted">
          Tipo
          <select
            name="type"
            defaultValue={type ?? ""}
            className="rounded-md border border-line bg-canvas px-2.5 py-1.5 text-sm text-ink"
          >
            <option value="">Todos</option>
            {Object.entries(TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-semibold text-ink-muted">
          Palo
          <select
            name="stick_presence"
            defaultValue={stick_presence ?? ""}
            className="rounded-md border border-line bg-canvas px-2.5 py-1.5 text-sm text-ink"
          >
            <option value="">Todos</option>
            {Object.entries(STICK_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-semibold text-ink-muted">
          Origen
          <select
            name="origin_country"
            defaultValue={origin_country ?? ""}
            className="rounded-md border border-line bg-canvas px-2.5 py-1.5 text-sm text-ink"
          >
            <option value="">Todos</option>
            {Object.entries(ORIGIN_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="rounded-md bg-brand px-4 py-1.5 text-sm font-semibold text-ink-inverse transition-colors hover:bg-brand-hover"
        >
          Filtrar
        </button>
      </form>

      {!reviews?.length ? (
        <p className="text-sm text-ink-muted">
          Todavía no cargaste ninguna cata con estos filtros.
        </p>
      ) : (
        <ol className="flex flex-col gap-3">
          {reviews.map((review, i) => {
            const yerba = review.yerba;
            return (
              <li
                key={review.id}
                className="flex items-center gap-4 rounded-lg border border-line bg-surface px-5 py-4 shadow-sm"
              >
                <span className="w-6 shrink-0 text-center text-sm font-bold text-ink-muted">
                  {i + 1}
                </span>
                <span
                  className={`flex shrink-0 items-baseline gap-0.5 rounded-md px-3 py-1.5 text-base font-extrabold tabular-nums text-ink-inverse ${scoreChipClass(review.overall_score)}`}
                >
                  {review.overall_score}
                  <small className="text-xs font-bold opacity-85">/10</small>
                </span>
                <div className="flex flex-col gap-1">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                      {yerba.brand}
                    </span>
                    <h2 className="text-base font-bold text-ink">
                      {yerba.variety_name}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-full border border-line bg-canvas px-2 py-0.5 text-xs font-semibold text-ink-muted">
                      {TYPE_LABELS[yerba.type]}
                    </span>
                    <span className="rounded-full border border-line bg-canvas px-2 py-0.5 text-xs font-semibold text-ink-muted">
                      {STICK_LABELS[yerba.stick_presence]}
                    </span>
                    <span className="rounded-full border border-line bg-canvas px-2 py-0.5 text-xs font-semibold text-ink-muted">
                      {ORIGIN_LABELS[yerba.origin_country]}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </main>
  );
}
