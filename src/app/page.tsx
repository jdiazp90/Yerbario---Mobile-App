import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/actions/auth";
import { btnPrimary, btnSecondary } from "@/lib/ui";
import {
  CatalogIcon,
  LogoMark,
  RankingIcon,
  WikiIcon,
} from "@/components/icons";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";

function QuickLink({
  href,
  title,
  subtitle,
  Icon,
}: {
  href: string;
  title: string;
  subtitle: string;
  Icon: (p: { className?: string }) => React.ReactElement;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-lg border border-line/60 bg-surface p-4 shadow-sm transition-colors hover:border-line-strong"
    >
      <span className="grid h-12 w-12 flex-none place-items-center rounded-md bg-[var(--green-100)] text-brand">
        <Icon className="h-6 w-6" />
      </span>
      <div className="flex flex-col">
        <span className="text-[15px] font-extrabold text-ink">{title}</span>
        <span className="text-[13px] text-ink-muted">{subtitle}</span>
      </div>
      <span className="ml-auto text-ink-muted transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let displayName: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .single();
    displayName = profile?.display_name ?? null;
  }
  const name = displayName ?? user?.email ?? "";
  const initial = name.trim()[0]?.toUpperCase() ?? "?";

  return (
    <div className="flex min-h-full flex-col">
      <TopBar active="home" user={user ? { initial } : null} />

      {user ? (
        <>
          <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-28 pt-6 md:pb-12">
            <div className="flex flex-col gap-6">
              <section className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wide text-brand">
                  Tu rincón matero
                </span>
                <h1 className="text-[26px] font-extrabold leading-tight tracking-tight text-ink">
                  Hola, {name}
                </h1>
                <p className="text-sm text-ink-muted">
                  Seguí catando y armando tu ranking personal de yerbas.
                </p>
              </section>

              <div className="flex flex-col gap-3">
                <QuickLink
                  href="/ranking"
                  title="Tu ranking"
                  subtitle="Tus catas, ordenadas por puntaje"
                  Icon={RankingIcon}
                />
                <QuickLink
                  href="/catalog"
                  title="Catálogo"
                  subtitle="Explorá y cargá yerbas nuevas"
                  Icon={CatalogIcon}
                />
                <QuickLink
                  href="/wiki"
                  title="Wiki"
                  subtitle="Tipos de mate, bombillas, cebado y maridaje"
                  Icon={WikiIcon}
                />
              </div>

              <form action={logout} className="pt-1">
                <button type="submit" className={`${btnSecondary} w-full`}>
                  Cerrar sesión
                </button>
              </form>
            </div>
          </main>
          <BottomNav active="home" />
        </>
      ) : (
        <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-7 px-6 py-14">
          <div className="flex flex-col items-center gap-4 text-center">
            <LogoMark className="h-16 w-16" />
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-ink">
                Yerbario
              </h1>
              <p className="text-[15px] leading-relaxed text-ink-muted">
                Catas estructuradas, tu ranking personal y una wiki de yerba
                mate. Empezá a registrar lo que tomás.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/signup" className={`${btnPrimary} w-full`}>
              Registrate
            </Link>
            <Link href="/login" className={`${btnSecondary} w-full`}>
              Iniciar sesión
            </Link>
            <Link
              href="/catalog"
              className="mt-1 text-center text-sm font-semibold text-brand"
            >
              Ver catálogo sin cuenta →
            </Link>
            <Link
              href="/wiki"
              className="text-center text-sm font-semibold text-brand"
            >
              Ver la Wiki →
            </Link>
          </div>
        </main>
      )}
    </div>
  );
}
