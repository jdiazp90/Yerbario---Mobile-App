import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { cardClass, selectedPillClass } from "@/lib/ui";
import { WIKI_CATEGORY_LABELS } from "@/lib/wiki-labels";
import type { WikiCategory } from "@/types/database";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { EmptyState, Tag } from "@/components/ui";
import { YerbaImage } from "@/components/yerba-image";
import { WikiSectionToggle } from "@/components/wiki-section-toggle";

function excerpt(body: string, max = 140) {
  const flat = body.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max).trimEnd()}…` : flat;
}

export default async function WikiPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: WikiCategory }>;
}) {
  const { category } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("wiki_entry")
    .select("*")
    .order("category")
    .order("order_index");
  if (category) query = query.eq("category", category);
  const { data: entries, error } = await query;
  if (error) {
    console.error("wiki_entry query failed:", error);
  }

  return (
    <div className="flex min-h-full flex-col">
      <TopBar active="wiki" />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-28 pt-5 md:pb-12">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-ink">
              Wiki
            </h1>
            <p className="text-sm text-ink-muted">
              Tipos de mate, bombillas y técnica de cebado.
            </p>
          </div>

          <WikiSectionToggle active="enciclopedia" />

          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Link
              href="/wiki"
              className={`flex min-h-10 flex-none cursor-pointer items-center rounded-full border px-3.5 text-[13px] font-semibold transition-colors ${
                !category
                  ? selectedPillClass
                  : "border-line bg-surface text-ink-muted hover:border-line-strong"
              }`}
            >
              Todos
            </Link>
            {Object.entries(WIKI_CATEGORY_LABELS).map(([value, label]) => (
              <Link
                key={value}
                href={`/wiki?category=${value}`}
                className={`flex min-h-10 flex-none cursor-pointer items-center rounded-full border px-3.5 text-[13px] font-semibold transition-colors ${
                  category === value
                    ? selectedPillClass
                    : "border-line bg-surface text-ink-muted hover:border-line-strong"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {!entries?.length ? (
            <EmptyState
              title={error ? "DEBUG: query failed" : "Todavía no hay entradas acá"}
              message={
                error
                  ? `DEBUG ${error.code ?? ""}: ${error.message}`
                  : "Esta sección de la Wiki está en construcción — volvé pronto."
              }
            />
          ) : (
            <ul className="flex flex-col gap-3">
              {entries.map((entry) => (
                <li key={entry.id}>
                  <Link
                    href={`/wiki/${entry.id}`}
                    className={`flex gap-3.5 p-3 ${cardClass}`}
                  >
                    <YerbaImage
                      src={entry.image_url}
                      alt={entry.title}
                      brand={entry.title}
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <Tag variant="type">
                        {WIKI_CATEGORY_LABELS[entry.category]}
                      </Tag>
                      <h2 className="text-[16.5px] font-extrabold leading-tight text-ink">
                        {entry.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-ink-muted">
                        {excerpt(entry.body)}
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
