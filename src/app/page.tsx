export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        Sprint 1 · Phase 2
      </span>
      <h1 className="text-3xl font-bold tracking-tight text-ink">Yerbario</h1>
      <p className="max-w-md text-base text-ink-muted">
        Scaffold levantado — Next.js, Tailwind y los tokens de la Phase 1
        wireados. Todavía sin schema, auth ni cata.
      </p>
    </main>
  );
}
