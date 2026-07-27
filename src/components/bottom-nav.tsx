import Link from "next/link";
import { chromeClass } from "@/lib/ui";
import { CatalogIcon, HomeIcon, RankingIcon, WikiIcon } from "./icons";
import type { Tab } from "./top-bar";

const TABS: {
  tab: Tab;
  href: string;
  label: string;
  Icon: (p: { className?: string }) => React.ReactElement;
}[] = [
  { tab: "home", href: "/", label: "Inicio", Icon: HomeIcon },
  { tab: "catalog", href: "/catalog", label: "Catálogo", Icon: CatalogIcon },
  { tab: "ranking", href: "/ranking", label: "Ranking", Icon: RankingIcon },
  { tab: "wiki", href: "/wiki", label: "Wiki", Icon: WikiIcon },
];

/**
 * Mobile bottom tab bar over the existing routes. Hidden at md+ where the
 * TopBar carries the same nav inline. Fixed so it stays thumb-reachable;
 * screens add bottom padding to clear it.
 */
export function BottomNav({ active }: { active?: Tab }) {
  return (
    <nav
      className={`fixed inset-x-0 bottom-0 z-20 border-t border-[color-mix(in_srgb,var(--line)_45%,transparent)] shadow-[0_-8px_24px_-12px_rgba(26,18,16,.18)] md:hidden ${chromeClass}`}
    >
      <div className="mx-auto flex max-w-md">
        {TABS.map(({ tab, href, label, Icon }) => {
          const current = active === tab;
          return (
            <Link
              key={tab}
              href={href}
              aria-current={current ? "page" : undefined}
              className={`flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold transition-colors ${
                current ? "text-brand" : "text-ink-muted"
              }`}
            >
              <Icon className="h-6 w-6" />
              {label}
            </Link>
          );
        })}
      </div>
      <div style={{ height: "env(safe-area-inset-bottom)" }} />
    </nav>
  );
}
