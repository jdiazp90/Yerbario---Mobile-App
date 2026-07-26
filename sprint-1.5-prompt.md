# Sprint 1.5 Kickoff Prompt — Yerbario (Visual & Mobile-First Polish)
Paste this into Claude Code (or a fresh session) to start Sprint 1.5. Read `PROJECT-BRIEF.md` and `ROADMAP.md` first (specifically the "Sprint 1.5 — Visual & Mobile-First Polish" section) — the repo already has a working app, this sprint does not touch data or routes.

You are acting as a Senior Product Designer and Frontend Engineer. Sprint 1 of Yerbario shipped the full technical flow end to end — auth, yerba catalog CRUD, the review ("cata") form, and a personal ranking view, all wired to the approved design tokens (mate green / parchment / espresso, Manrope-only type system). It works. It does not look like a real app yet — every screen is bare functional scaffolding: plain bordered cards, no imagery, centered-desktop-first layouts, no real visual hierarchy.

Sprint 1.5 Goal
Take every existing Sprint 1 screen from "functional scaffolding" to something that actually looks like a polished, attractive product — designed **mobile-first**, not just responsive. No new features, no new data, no new routes: same screens, a real design pass.

Screens in scope (all already built, all need a real pass):
- Home (`/`)
- Login / signup (`/login`, `/signup`, `/signup/check-email`)
- Yerba catalog list + new/edit forms (`/catalog`, `/catalog/new`, `/catalog/[id]/edit`)
- Review form ("cata") (`/catalog/[id]/review/new`)
- Personal ranking with filters (`/ranking`)

Do this in order:
1. **Mobile-first layout audit**
   Go through every screen above as it exists today and note where it's actually desktop-first-that-happens-to-shrink rather than designed mobile-first (touch target sizes, spacing rhythm, form field stacking, nav/back patterns, filter UI on small screens). Show this before redesigning.
2. **Visual direction refresh**
   Using the existing Design Tokens v1 (color/type already approved — don't re-litigate palette or Manrope) propose real component compositions: card design for the catalog/ranking lists, the score chip, tag/badge styling, form field styling, button hierarchy, empty/loading states. Show this — mockup or in-browser — before wiring it into every screen, same gate as Sprint 1's tokens sign-off.
3. **Imagery**
   Yerba photos should actually render where `image_url` exists, with a considered placeholder/empty treatment where it doesn't (not a broken image icon or blank space).
4. **Rebuild each screen** against the approved direction from step 2, mobile-first, then confirm it still holds up at desktop widths.
5. **Verify in the browser** — every screen, both a real yerba/review (with data) and an empty state, at mobile width first, then desktop.

Constraints
- No new features, fields, tables, or routes — this is a visual pass on what already exists.
- Don't touch the approved color tokens or the Manrope-only type decision from Sprint 1 — extend them, don't relitigate them.
- Mobile-first means designed at mobile width first, not "add a few responsive classes to the desktop version."
- Sign off on the component direction (step 2) before rebuilding all five screens against it.

Let's start with Phase 1: the mobile-first layout audit.
