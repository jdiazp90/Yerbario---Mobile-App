import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/actions/auth";
import { btnPrimary, btnSecondary, cardClass } from "@/lib/ui";
import { WIKI_CATEGORY_LABELS } from "@/lib/wiki-labels";
import { LogoMark } from "@/components/icons";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { EmptyState, QuietScore, Tag, YerbaTags } from "@/components/ui";
import { YerbaImage } from "@/components/yerba-image";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex min-h-full flex-col">
        <TopBar active="home" user={null} />
        <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-7 px-6 py-14">
          <div className="flex flex-col items-center gap-4 text-center">
            <LogoMark className="h-16 w-16" />
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-ink">
                Yerbario
              </h1>
              <p className="text-[15px] leading-relaxed text-ink-muted">
                Catas estructuradas, tu ranking personal y una wiki de yerba
                mate. Empezá a registrar lo que tomás.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/signup" className={`${btnPrimary} w-full`}>
              Registrate
            </Link>
            <Link href="/login" className={`${btnSecondary} w-full`}>
              Iniciar sesión
            </Link>
            <Link
              href="/catalog"
              className="mt-1 text-center text-sm font-semibold text-brand"
            >
              Ver catálogo sin cuenta →
            </Link>
            <Link
              href="/wiki"
              className="text-center text-sm font-semibold text-brand"
            >
              Ver la Wiki →
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user.id)
    .single();
  const name = profile?.display_name ?? user.email ?? "";
  const initial = name.trim()[0]?.toUpperCase() ?? "?";

  const { data: topReviews } = await supabase
    .from("review")
    .select("id, overall_score, yerba!inner(id, brand, variety_name, image_url)")
    .eq("user_id", user.id)
    .order("overall_score", { ascending: false })
    .limit(5);

  const { data: topYerbas } = await supabase
    .from("yerba_rankings")
    .select("*")
    .gt("review_count", 0)
    .order("avg_score", { ascending: false })
    .limit(3);

  const { data: topWiki } = await supabase
    .from("wiki_entry")
    .select("*")
    .order("order_index")
    .limit(3);

  return (
    <div className="flex min-h-full flex-col">
      <TopBar active="home" user={{ initial }} />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-28 pt-6 md:pb-12">
        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-brand">
              Tu rincón matero
            </span>
            <h1 className="text-[26px] font-extrabold leading-tight tracking-tight text-ink">
              Hola, {name}
            </h1>
            <p className="text-sm text-ink-muted">
              Seguí catando y armando tu ranking personal de yerbas.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">
              Tu ranking
            </h2>

            {topReviews?.length ? (
              <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {topReviews.map((review) => {
                  const yerba = review.yerba;
                  return (
                    <Link
                      key={review.id}
                      href={`/catalog/${yerba.id}`}
                      className={`flex w-[136px] flex-none scroll-ml-4 flex-col gap-2 p-2.5 [scroll-snap-align:start] ${cardClass}`}
                    >
                      <YerbaImage
                        src={yerba.image_url}
                        alt={`${yerba.brand} ${yerba.variety_name}`}
                        brand={yerba.brand}
                        className="aspect-square w-full"
                        rounded="rounded-2xl"
                      />
                      <div className="flex flex-col gap-1">
                        <span className="truncate text-[11px] font-bold uppercase tracking-wide text-brand">
                          {yerba.brand}
                        </span>
                        <span className="line-clamp-1 text-[13.5px] font-extrabold leading-tight text-ink">
                          {yerba.variety_name}
                        </span>
                        <QuietScore score={review.overall_score} />
                      </div>
                    </Link>
                  );
                })}
                <Link
                  href="/ranking"
                  className="flex w-[136px] flex-none scroll-ml-4 flex-col items-center justify-center gap-1 rounded-lg bg-[var(--espresso-900)] p-4 text-center text-[13.5px] font-extrabold leading-snug text-ink-inverse [scroll-snap-align:start]"
                >
                  Ver ranking completo →
                </Link>
              </div>
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
            )}
          </section>

          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">
                Catálogo
              </h2>
              <Link href="/catalog" className="text-[13px] font-bold text-brand">
                Ver todo
              </Link>
            </div>

            {topYerbas?.length ? (
              <ul className="flex flex-col gap-3">
                {topYerbas.map((yerba) => (
                  <li key={yerba.id}>
                    <Link
                      href={`/catalog/${yerba.id}`}
                      className={`flex items-center gap-3.5 p-3 ${cardClass}`}
                    >
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
                          <h3 className="text-[15px] font-extrabold leading-tight text-ink">
                            {yerba.variety_name}
                          </h3>
                        </div>
                        <YerbaTags
                          type={yerba.type}
                          stick={yerba.stick_presence}
                          origin={yerba.origin_country}
                        />
                      </div>
                      <QuietScore score={yerba.avg_score} />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-muted">
                Todavía no hay yerbas puntuadas por la comunidad.
              </p>
            )}
          </section>

          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">
                Wiki
              </h2>
              <Link href="/wiki" className="text-[13px] font-bold text-brand">
                Ver todo
              </Link>
            </div>

            {topWiki?.length ? (
              <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {topWiki.map((entry) => (
                  <Link
                    key={entry.id}
                    href={`/wiki/${entry.id}`}
                    className={`flex w-[150px] flex-none scroll-ml-4 flex-col gap-2 overflow-hidden ${cardClass}`}
                  >
                    <YerbaImage
                      src={entry.image_url}
                      alt={entry.title}
                      brand={entry.title}
                      className="aspect-[4/3] w-full"
                      rounded="rounded-t-lg rounded-b-none"
                    />
                    <div className="flex flex-col gap-1 px-3 pb-3">
                      <Tag variant="type">
                        {WIKI_CATEGORY_LABELS[entry.category]}
                      </Tag>
                      <span className="line-clamp-2 text-[13.5px] font-extrabold leading-snug text-ink">
                        {entry.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-ink-muted">
                Todavía no hay artículos en la wiki.
              </p>
            )}
          </section>

          <form action={logout} className="pt-1 text-center">
            <button
              type="submit"
              className="text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </main>
      <BottomNav active="home" />
    </div>
  );
}
