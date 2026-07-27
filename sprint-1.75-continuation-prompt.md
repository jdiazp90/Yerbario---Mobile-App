# Sprint 1.75 Continuation Prompt — Yerbario (Auth UX fixes + wrap-up)

Paste this into a fresh Claude Code session to continue exactly where the last one left off. Read `PROJECT-BRIEF.md` and `ROADMAP.md` first — specifically the "Sprint 1.75" section (research findings + MoSCoW) near the bottom.

## ⚠️ Before anything else

**Nothing from this work is committed yet.** `git status` shows a large uncommitted diff (an entire visual redesign + several features) sitting in the working tree. Do not run any destructive git command (`checkout .`, `reset --hard`, `clean`) without checking with the user first — this is not throwaway state, it's a full sprint of unsaved work. Consider proposing a commit (or a few logical commits) once the immediate task below is done, if the user wants that.

## Where things stand

Sprint 1.5 (mobile-first visual pass) and Sprint 1.75 (community signal, Wiki/Maridaje, photo upload, and a full visual redirection) are functionally **done** and verified in-browser with real data. In order, this sprint went through:

1. **Sprint 1.5** — mobile-first audit → component-direction mockup sign-off → rebuilt all Sprint 1 screens (home, login/signup, catalog, cata form, ranking) against it.
2. **Sprint 1.75 Must** — surfaced the already-existing `yerba_rankings` view (avg_score/review_count) on the catalog; built a new yerba detail page (`/catalog/[id]`); added a `molienda_photo_url` column + form field; shipped Wiki v1 + Maridaje v1 with real researched content (not placeholders) at `/wiki` and `/wiki/maridaje`.
3. **Sprint 1.75 Should** — reviews from other users visible on the yerba detail page; replaced the free-text aroma field with a controlled-vocabulary tag picker (`aroma_tags text[]`), grounded in real yerba mate tasting descriptor research.
4. **Mid-sprint, user-requested additions:**
   - Real photo upload via Supabase Storage (`yerba-photos` bucket), replacing the old paste-a-URL fields entirely, for yerba portada + cata photo + molienda photo. User tested this live and confirmed it works.
   - Tap-to-expand lightbox for the yerba portada.
   - **A full visual redirection** (the user flagged the first "premium" pass as "AI slop" — generic rounded-lg/soft-gradient/glassmorphism). Landed on: **solid espresso (`--espresso-900`) for all selection states and primary CTAs** instead of the green gradient (green is now reserved only for the score signal), **quiet score display** (small color-coded dot + tabular number, `QuietScore` in `src/components/ui.tsx`) instead of a colored badge, **squircle imagery** (`rounded-2xl`), a real catalog search, and a restructured yerba detail page (full-bleed square hero, floating frosted back/edit buttons, a rounded-top "sheet" of content, an icon stat row for Puntaje/Catas/Origen). Utility icons (back, chevron, camera, close, zoom, edit, search, globe, star) were swapped to real **Material Symbols** paths (extracted once from `@material-symbols/svg-400`, inlined in `src/components/icons.tsx` — no runtime dependency). Brand icons (wordmark, leaf, mate gourd, bottom-nav tabs) stayed hand-drawn on purpose.
5. All of this is documented in `ROADMAP.md` under "Sprint 1.75" with the full MoSCoW and the "REV 3" design-decision writeups — read that section for the *why* behind each choice before changing any of it.

**6 migrations exist and are confirmed applied to the live Supabase project** (via manual SQL Editor pastes — no service role key is available in `.env.local`, only the anon key, so migrations can never be applied by Claude directly): `0001_initial_schema.sql` (pre-existing) through `0006_photo_storage.sql`. If you write a new migration, tell the user explicitly to copy it from the file (not from chat — copying from a chat bubble corrupted a paste earlier this session) and paste it into the SQL Editor themselves.

**Not yet independently re-verified:** the ranking page (`/ranking`) with the new quiet-score/squircle treatment — it requires a logged-in session, which Claude cannot create (never enter passwords on the user's behalf). Ask the user to eyeball it if it hasn't come up yet.

## Immediate next task — approved, not yet started

A `/ux-researcher` audit (this session) found that **the auth flow has no password-reset path at all** — `src/lib/actions/auth.ts` only has `login`/`signup`/`logout`, no `resetPasswordForEmail`/`updateUser`. The user hit this exact wall personally (forgot their password, no way back in). Research grounding: ~10% of active users get stuck in reset flows monthly and 75% of those quit (losing ~7.5% of MAU); password resets are 20–50% of support tickets industry-wide. Full write-up and sourcing is in the chat history / can be redone quickly if needed.

**Agreed scope to build now (the two Musts from that audit):**
1. **Forgot-password flow**: a "¿Olvidaste tu contraseña?" link on `/login` → a request-reset page (email input) → `supabase.auth.resetPasswordForEmail()` → an auth callback route that exchanges the recovery token for a session → a new-password page that calls `supabase.auth.updateUser({ password })`.
2. **"Reenviar email de confirmación"** on `/signup/check-email`, using Supabase's `resend()` method — closes the current dead-end where a lost/delayed confirmation email leaves the user stuck.

Should-tier follow-up (fine to slip to Sprint 2, don't block on it): friendlier signup error copy (e.g. "ese email ya está registrado") — leave login's generic "invalid credentials" message as-is, that ambiguity is intentional (prevents account-enumeration).

## How to work in this repo

- **This is not the Next.js you know** — Next 16.2.12, App Router, breaking changes vs. training data. Read the relevant guide under `node_modules/next/dist/docs/` before writing routing/server-action/auth-callback code (per `AGENTS.md`).
- Stack: Next 16.2.12, React 19.2.4, Tailwind v4, Supabase (`@supabase/ssr`, `@supabase/supabase-js`). Server Actions live in `src/lib/actions/`, using `src/lib/supabase/server.ts`'s `createClient()`.
- Design tokens (mate green / parchment / espresso, Manrope) are locked from Sprint 1 — don't relitigate them. The REV 3 monochrome-confident treatment (`btnPrimary`, `peerSelectedClass`, `selectedPillClass` in `src/lib/ui.ts`) is the current, approved interactive-element language — new UI (like a reset-password form) should match it, not reinvent something.
- Verify changes in the Browser pane via `preview_start` with the `yerbario-dev` config in `.claude/launch.json` (never `Bash`/`PowerShell` for running the dev server). If you see stale "export doesn't exist" errors right after an edit, it's very likely Turbopack cache staleness, not your code — check a **fresh tab** before assuming a real bug; if it persists, stop the server, delete `.next`, and restart.
- The user (José, product designer, AI-assisted delivery) is decisive and fast in front of visual comparisons but reacts hard against generic/templated output — ground design choices in the subject (yerba mate culture) and this project's own token system, not default "AI app" patterns (soft gradients everywhere, rounded-lg-everything, purple, Inter/Space Grotesk, glassmorphism as decoration). When a visual decision is non-trivial, a quick Artifact mockup for sign-off beats guessing.

Start by reading `src/lib/actions/auth.ts` and the Supabase docs' password-reset guide, then propose the two new routes/pages needed before writing code.
