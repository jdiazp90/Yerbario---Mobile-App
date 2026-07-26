import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateYerba } from "@/lib/actions/yerba";
import { YerbaForm } from "@/components/yerba-form";

export default async function EditYerbaPage({
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

  const updateYerbaWithId = updateYerba.bind(null, id);

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 px-6 py-24">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-ink">
          Editar yerba
        </h1>
        <p className="text-sm text-ink-muted">
          {yerba.brand} — {yerba.variety_name}
        </p>
      </div>

      {error && (
        <p className="rounded-md border border-danger bg-surface px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      <YerbaForm
        action={updateYerbaWithId}
        defaultValues={yerba}
        submitLabel="Guardar cambios"
      />
    </main>
  );
}
