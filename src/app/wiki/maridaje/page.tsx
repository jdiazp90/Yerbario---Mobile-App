import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { cardClass } from "@/lib/ui";
import { TYPE_LABELS } from "@/lib/yerba-labels";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { EmptyState, Tag } from "@/components/ui";
import { YerbaImage } from "@/components/yerba-image";
import { WikiSectionToggle } from "@/components/wiki-section-toggle";

function excerpt(text: string, max = 140) {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max).trimEnd()}…` : flat;
}

export default async function MaridajePage() {
  const supabase = await createClient();
  const { data: entries } = await supabase
    .from("pairing_entry")
    .select("*")
    .order("order_index");

  return (
    <div className="flex min-h-full flex-col">
      <TopBar active="wiki" />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-28 pt-5 md:pb-12">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-ink">
              Maridaje
            </h1>
            <p className="text-sm text-ink-muted">
              Qué comer con cada tipo de yerba.
            </p>
          </div>

          <WikiSectionToggle active="maridaje" />

          {!entries?.length ? (
            <EmptyState
              title="Todavía no hay maridajes cargados"
              message="Esta sección está en construcción — volvé pronto."
            />
          ) : (
            <ul className="flex flex-col gap-3">
              {entries.map((entry) => (
                <li key={entry.id}>
                  <Link
                    href={`/wiki/maridaje/${entry.id}`}
                    className={`flex gap-3.5 p-3 ${cardClass}`}
                  >
                    <YerbaImage
                      src={entry.image_url}
                      alt={entry.title}
                      brand={entry.title}
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      {entry.linked_yerba_type && (
                        <Tag variant="type">
                          {TYPE_LABELS[entry.linked_yerba_type]}
                        </Tag>
                      )}
                      <h2 className="text-[16.5px] font-extrabold leading-tight text-ink">
                        {entry.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-ink-muted">
                        {excerpt(entry.description)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <BottomNav active="wiki" />
    </div>
  );
}
