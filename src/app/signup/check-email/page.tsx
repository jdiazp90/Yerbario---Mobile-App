import Link from "next/link";
import { btnPrimary } from "@/lib/ui";
import { TopBar } from "@/components/top-bar";

function MailGlyph() {
  return (
    <span className="grid h-16 w-16 place-items-center rounded-full bg-[var(--green-100)] text-brand">
      <svg
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m3.5 7 8.5 6 8.5-6" />
      </svg>
    </span>
  );
}

export default function CheckEmailPage() {
  return (
    <div className="flex min-h-full flex-col">
      <TopBar />
      <main className="mx-auto flex w-full max-w-sm flex-1 flex-col items-center justify-center gap-5 px-6 pb-16 pt-10 text-center">
        <MailGlyph />
        <div className="flex flex-col gap-2">
          <h1 className="text-[26px] font-extrabold tracking-tight text-ink">
            Revisá tu email
          </h1>
          <p className="text-sm leading-relaxed text-ink-muted">
            Te mandamos un link de confirmación. Confirmá tu cuenta y después
            iniciá sesión.
          </p>
        </div>
        <Link href="/login" className={`${btnPrimary} w-full`}>
          Ir a iniciar sesión
        </Link>
      </main>
    </div>
  );
}
