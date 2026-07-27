import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createReview } from "@/lib/actions/review";
import { ReviewForm } from "@/components/review-form";
import { STICK_LABELS } from "@/lib/yerba-labels";
import { TopBar } from "@/components/top-bar";
import { YerbaImage } from "@/components/yerba-image";

export default async function NewReviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { id } = await params;
  const { error } = await searchParams;

  const { data: yerba } = await supabase
    .from("yerba")
    .select("*")
    .eq("id", id)
    .single();

  if (!yerba) notFound();

  const createReviewForYerba = createReview.bind(null, id);

  return (
    <div className="flex min-h-full flex-col">
      <TopBar back="/catalog" />
      <main className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-6 px-6 pb-16 pt-8">
        <div className="flex items-center gap-3">
          <YerbaImage
            src={yerba.image_url}
            alt={`${yerba.brand} ${yerba.variety_name}`}
            brand={yerba.brand}
            className="h-14 w-14"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold uppercase tracking-wide text-brand">
              {yerba.brand} · {STICK_LABELS[yerba.stick_presence]}
            </span>
            <h1 className="text-xl font-extrabold tracking-tight text-ink">
              Catar {yerba.variety_name}
            </h1>
          </div>
        </div>

        {error && (
          <p className="rounded-md border border-danger bg-surface px-4 py-3 text-sm font-medium text-danger">
            {error}
          </p>
        )}

        <ReviewForm action={createReviewForYerba} brand={yerba.brand} />
      </main>
    </div>
  );
}
