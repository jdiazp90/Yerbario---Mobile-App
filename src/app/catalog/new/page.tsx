import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createYerba } from "@/lib/actions/yerba";
import { YerbaForm } from "@/components/yerba-form";
import { TopBar } from "@/components/top-bar";

export default async function NewYerbaPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await searchParams;

  return (
    <div className="flex min-h-full flex-col">
      <TopBar back="/catalog" />
      <main className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-6 px-6 pb-16 pt-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-[26px] font-extrabold tracking-tight text-ink">
            Agregar yerba
          </h1>
          <p className="text-sm text-ink-muted">Sumá una entrada al catálogo.</p>
        </div>

        {error && (
          <p className="rounded-md border border-danger bg-surface px-4 py-3 text-sm font-medium text-danger">
            {error}
          </p>
        )}

        <YerbaForm action={createYerba} submitLabel="Agregar" />
      </main>
    </div>
  );
}
