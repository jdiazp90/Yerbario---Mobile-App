import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TYPE_LABELS } from "@/lib/yerba-labels";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { Tag } from "@/components/ui";
import { YerbaImage } from "@/components/yerba-image";

export default async function PairingEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: entry } = await supabase
    .from("pairing_entry")
    .select("*")
    .eq("id", id)
    .single();

  if (!entry) notFound();

  const paragraphs = entry.description
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="flex min-h-full flex-col">
      <TopBar back="/wiki/maridaje" />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-28 pt-5 md:pb-12">
        <article className="flex flex-col gap-5">
          <YerbaImage
            src={entry.image_url}
            alt={entry.title}
            brand={entry.title}
            className="h-52 w-full"
            rounded="rounded-lg"
          />

          <div className="flex flex-col gap-2">
            {entry.linked_yerba_type && (
              <Tag variant="type">{TYPE_LABELS[entry.linked_yerba_type]}</Tag>
            )}
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-ink">
              {entry.title}
            </h1>
          </div>

          <div className="flex flex-col gap-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-ink">
                {p}
              </p>
            ))}
          </div>
        </article>
      </main>

      <BottomNav active="wiki" />
    </div>
  );
}
