import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { btnPrimary, cardClass, chromeClass } from "@/lib/ui";
import { ORIGIN_LABELS, STICK_LABELS, TYPE_LABELS } from "@/lib/yerba-labels";
import { BottomNav } from "@/components/bottom-nav";
import { EmptyState, QuietScore, Tag } from "@/components/ui";
import { YerbaImage } from "@/components/yerba-image";
import { ImageLightbox } from "@/components/image-lightbox";
import {
  ArrowLeft,
  GlobeIcon,
  LeafGlyph,
  PencilIcon,
  StarIcon,
} from "@/components/icons";

export default async function YerbaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: yerba } = await supabase
    .from("yerba_rankings")
    .select("*")
    .eq("id", id)
    .single();

  if (!yerba) notFound();

  const { data: reviews } = await supabase
    .from("review")
    .select("*")
    .eq("yerba_id", id)
    .order("created_at", { ascending: false });

  const userIds = [...new Set((reviews ?? []).map((r) => r.user_id))];
  const { data: profiles } = userIds.length
    ? await supabase.from("profiles").select("id, display_name").in("id", userIds)
    : { data: [] as { id: string; display_name: string | null }[] };
  const nameById = new Map(
    (profiles ?? []).map((p) => [p.id, p.display_name ?? "Matero anónimo"]),
  );

  const hasReviews = yerba.review_count > 0;

  return (
    <div className="flex min-h-full flex-col">
      <main className="flex-1 pb-28 md:pb-12">
        <div className="relative mx-auto max-w-2xl">
          <ImageLightbox
            src={yerba.image_url}
            alt={`${yerba.brand} ${yerba.variety_name}`}
          >
            <YerbaImage
              src={yerba.image_url}
              alt={`${yerba.brand} ${yerba.variety_name}`}
              brand={yerba.brand}
              className="aspect-square w-full"
              rounded="rounded-none"
            />
          </ImageLightbox>

          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <Link
              href="/catalog"
              aria-label="Volver"
              className={`grid h-10 w-10 place-items-center rounded-full text-ink shadow-sm ${chromeClass}`}
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            {user && (
              <Link
                href={`/catalog/${yerba.id}/edit`}
                aria-label="Editar yerba"
                className={`grid h-10 w-10 place-items-center rounded-full text-ink shadow-sm ${chromeClass}`}
              >
                <PencilIcon />
              </Link>
            )}
          </div>
        </div>

        <div className="relative -mt-6 rounded-t-3xl bg-[image:var(--canvas-grad)] shadow-[0_-12px_20px_-16px_rgba(26,18,16,.3)]">
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 pt-6">
            <div className="flex flex-col gap-2">
              <div className="text-xs font-bold uppercase tracking-wide text-brand">
                {yerba.brand}
              </div>
              <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-ink">
                {yerba.variety_name}
              </h1>
              <p className="text-sm text-ink-muted">
                {TYPE_LABELS[yerba.type]} · {STICK_LABELS[yerba.stick_presence]} ·{" "}
                {ORIGIN_LABELS[yerba.origin_country]}
              </p>
            </div>

            <div className="grid grid-cols-3 rounded-lg border-y border-line/60 py-4">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <StarIcon className="h-4 w-4 text-ink-muted" />
                <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                  Puntaje
                </span>
                {hasReviews ? (
                  <QuietScore score={yerba.avg_score} />
                ) : (
                  <span className="text-[13.5px] font-extrabold text-ink-muted">—</span>
                )}
              </div>
              <div className="flex flex-col items-center gap-1.5 border-x border-line/60 text-center">
                <LeafGlyph className="h-4 w-4 text-ink-muted" />
                <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                  Catas
                </span>
                <span className="text-[15px] font-extrabold text-ink">
                  {yerba.review_count}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <GlobeIcon className="h-4 w-4 text-ink-muted" />
                <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                  Origen
                </span>
                <span className="text-[13.5px] font-extrabold text-ink">
                  {ORIGIN_LABELS[yerba.origin_country]}
                </span>
              </div>
            </div>

            {user && (
              <Link
                href={`/catalog/${yerba.id}/review/new`}
                className={`${btnPrimary} w-full`}
              >
                Catar esta yerba
              </Link>
            )}

            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-extrabold text-ink">Catas</h2>

              {!reviews?.length ? (
                <EmptyState
                  title="Todavía nadie la cató"
                  message="Sé el primero en registrar una cata estructurada de esta yerba."
                />
              ) : (
                <ul className="flex flex-col gap-3">
                  {reviews.map((review) => (
                    <li
                      key={review.id}
                      className={`flex flex-col gap-3 p-4 ${cardClass}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-ink">
                            {nameById.get(review.user_id)}
                          </span>
                          <span className="text-xs text-ink-muted">
                            {new Date(review.created_at).toLocaleDateString(
                              "es-AR",
                              { day: "numeric", month: "short", year: "numeric" },
                            )}
                          </span>
                        </div>
                        <QuietScore score={review.overall_score} />
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {review.cut_type && (
                          <Tag variant="neutral">Molienda {review.cut_type}</Tag>
                        )}
                        {review.bitterness_intensity && (
                          <Tag variant="neutral">
                            Amargor {review.bitterness_intensity}/5
                          </Tag>
                        )}
                        {review.foam_quality && (
                          <Tag variant="neutral">Espuma {review.foam_quality}/5</Tag>
                        )}
                      </div>

                      {(review.aroma_tags ?? []).length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {review.aroma_tags.map((tag) => (
                            <Tag key={tag} variant="type">
                              {tag}
                            </Tag>
                          ))}
                        </div>
                      )}

                      {review.verdict && (
                        <p className="text-sm leading-relaxed text-ink">
                          {review.verdict}
                        </p>
                      )}

                      {review.aroma_note && (
                        <p className="text-sm leading-relaxed text-ink-muted">
                          <span className="font-semibold text-ink">Aroma:</span>{" "}
                          {review.aroma_note}
                        </p>
                      )}

                      {(review.photo_url || review.molienda_photo_url) && (
                        <div className="flex gap-2">
                          {review.photo_url && (
                            <YerbaImage
                              src={review.photo_url}
                              alt="Foto de la cata"
                              brand={yerba.brand}
                              className="h-20 w-20"
                            />
                          )}
                          {review.molienda_photo_url && (
                            <YerbaImage
                              src={review.molienda_photo_url}
                              alt={`Foto de la molienda${
                                review.cut_type ? ` (${review.cut_type})` : ""
                              }`}
                              brand={yerba.brand}
                              className="h-20 w-20"
                            />
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>

      <BottomNav active="catalog" />
    </div>
  );
}
