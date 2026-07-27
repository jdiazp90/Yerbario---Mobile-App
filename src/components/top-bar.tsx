import Link from "next/link";
import { chromeClass } from "@/lib/ui";
import { ArrowLeft, LogoMark } from "./icons";

export type Tab = "home" | "catalog" | "ranking" | "wiki";

const NAV: { tab: Tab; href: string; label: string }[] = [
  { tab: "home", href: "/", label: "Inicio" },
  { tab: "catalog", href: "/catalog", label: "Catálogo" },
  { tab: "ranking", href: "/ranking", label: "Ranking" },
  { tab: "wiki", href: "/wiki", label: "Wiki" },
];

/**
 * App top bar. Two modes:
 *  - Top-level screens: wordmark + (desktop) tab links + avatar.
 *  - Sub-screens (forms): a back arrow to `back` + compact wordmark.
 * Sticky so it stays reachable while scrolling a long form on mobile.
 */
export function TopBar({
  back,
  active,
  user,
}: {
  back?: string;
  active?: Tab;
  user?: { initial: string } | null;
}) {
  return (
    <header className={`sticky top-0 z-20 border-b border-[color-mix(in_srgb,var(--line)_45%,transparent)] ${chromeClass}`}>
      <div className="mx-auto flex h-14 w-full max-w-2xl items-center gap-3 px-4">
        {back ? (
          <>
            <Link
              href={back}
              aria-label="Volver"
              className="grid h-10 w-10 flex-none place-items-center rounded-md border border-line bg-canvas text-ink transition-colors hover:border-line-strong"
            >
              <ArrowLeft />
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <LogoMark className="h-6 w-6" />
              <span className="text-[15px] font-extrabold tracking-tight">
                Yerbario
              </span>
            </Link>
          </>
        ) : (
          <Link href="/" className="flex items-center gap-2">
            <LogoMark className="h-7 w-7" />
            <span className="text-[17px] font-extrabold tracking-tight">
              Yerbario
            </span>
          </Link>
        )}

        <div className="flex-1" />

        {!back && (
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.tab}
                href={n.href}
                aria-current={active === n.tab ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                  active === n.tab
                    ? "bg-[var(--green-100)] text-brand-active"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        )}

        {!back && user && (
          <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-[var(--green-100)] text-[13px] font-extrabold text-brand">
            {user.initial}
          </span>
        )}
      </div>
    </header>
  );
}
