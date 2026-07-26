import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createReview } from "@/lib/actions/review";
import { ReviewForm } from "@/components/review-form";
import { STICK_LABELS } from "@/lib/yerba-labels";

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
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 px-6 py-16">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand">
          {yerba.brand} · {STICK_LABELS[yerba.stick_presence]}
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-ink">
          Catar {yerba.variety_name}
        </h1>
      </div>

      {error && (
        <p className="rounded-md border border-danger bg-surface px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      <ReviewForm action={createReviewForYerba} />
    </main>
  );
}
