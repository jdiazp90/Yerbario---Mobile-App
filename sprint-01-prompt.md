# Sprint 1 Kickoff Prompt — Yerbario

Paste this into Claude Code (or a fresh session) to start Sprint 1. Read `PROJECT-BRIEF.md` and `ROADMAP.md` first if they're in the repo.

---

You are acting as a Senior Full-Stack Engineer and UI/UX Designer. We're starting **Sprint 1** of **Yerbario**, a mobile-first web app (Next.js + Tailwind + Supabase) for logging structured yerba mate tasting reviews and browsing a curated Wiki of mate types, bombillas, and preparation technique.

Full product context is in `PROJECT-BRIEF.md` (scope, competitive positioning, data model) and `ROADMAP.md` (epics, backlog, sprint plan) — read both before writing code.

## Sprint 1 Goal
Working scaffold with a real design system, database schema, auth, and one complete end-to-end flow: **add a yerba → write a structured tasting review → see it in a ranked list.**

## Do this in order:

### 1. Design tokens & visual direction
Propose a token set (color, type, spacing) for a warm, organic aesthetic — mate green + warm neutrals (parchment/cream) + a dark accent for contrast. One warm serif/slab for headings, one clean grotesk for body/UI. Structure tokens as primitive → semantic → component (three-tier), matching a standard Style Dictionary + Tailwind theme setup. Show me the palette and type pairing before wiring it into components.

### 2. Repo scaffold
Next.js (App Router) + Tailwind CSS + Supabase client. Standard folder structure, ready to scale.

### 3. Database schema (Supabase/Postgres)
Implement this initial schema (see `PROJECT-BRIEF.md` §4 for the full field list):
- `Yerba` (brand, variety_name, type, stick_presence, origin_country, image_url, avg_score)
- `Review` (yerba_id FK, user_id FK, overall_score, aroma_note, bitterness_intensity, cut_type, foam_quality, yield_notes, verdict, photo_url, created_at)
- `User` (display_name, avatar_url, created_at)
- `WikiEntry` (category, title, body, image_url, order_index)

### 4. Auth
Basic sign-up / log-in flow via Supabase Auth.

### 5. Yerba catalog CRUD
Simple form + list to add/edit a yerba entry.

### 6. Review form v1
Build the structured "cata" component: overall score (1–10), aroma note, bitterness intensity, cut/molienda, stick presence, foam quality, yield/rendimiento notes, free-text verdict. This is the core differentiator vs. generic star-rating apps — keep the fields feeling like a real tasting sheet, not a random set of sliders.

### 7. Ranking list view
Personal ranking, auto-sorted by overall score, with basic filters (type, stick presence, origin).

## Constraints
- Keep components modular and reusable — Wiki and Social layers come in later sprints and will reuse these primitives.
- Full WCAG AA contrast compliance on every token pairing.
- Don't build Epic 4 (Wiki), Epic 5 (Social), or Epic 6 (Store Locator) yet — out of scope for this sprint.
- Sign off on the design tokens and schema with me before generating the full component set.

Let's start with Phase 1: design tokens + visual direction.
