# Yerbario — Roadmap

Methodology: Agile / lightweight Scrum, adapted for a solo-designer + AI-assisted execution model (same pattern as VRx Connect 3.0).

---

## Epics

```
Epic 1: Foundations & Design System
  Goal: Working scaffold, database schema, auth, and a real token-based design system
  Covers: Repo setup, Supabase schema, auth flow, design tokens (color/type/spacing), component primitives

Epic 2: Cata / Review Engine
  Goal: Users can log a structured yerba mate tasting review
  Covers: Yerba catalog CRUD, review form (aroma, bitterness, cut, foam, yield, verdict, score), photo upload

Epic 3: Ranking & Discovery
  Goal: Reviews become a browsable, sortable personal ranking
  Covers: Podium/list ranking view, filters (type, origin, stick presence), sort logic

Epic 4: Wiki / Encyclopedia
  Goal: A curated reference library for mate culture and equipment
  Covers: Mate types, bombilla guide, cebado technique guides, editorial content layout

Epic 5: Maridaje / Pairing Guide
  Goal: Curated food-pairing recommendations tied to yerba type/intensity
  Covers: PairingEntry content model, pairing list/detail views, cross-linking from Yerba detail page (later)

Epic 6: Social Layer (Phase 2 — not MVP)
  Goal: Follow other users, see their rankings, lightweight community
  Covers: Profiles, following, activity feed

Epic 7: Store Locator (Phase 2 — evaluate)
  Goal: Find where to buy a given yerba nearby
  Covers: Map integration, store data — overlaps with Mate Go / MateRonda, needs a differentiation angle before committing
```

---

## Prioritized Backlog (MoSCoW)

### Must Have
```
[ ] Define design tokens (color, type, spacing) and app visual direction
    Priority: Must | Owner: Designer | Effort: M
    Notes: Warm/organic palette per PROJECT-BRIEF.md §6

[ ] Set up Supabase project + schema (Yerba, Review, User, WikiEntry)
    Priority: Must | Owner: Full-stack | Effort: M

[ ] Auth flow (sign up / log in)
    Priority: Must | Owner: Full-stack | Effort: S

[ ] Yerba catalog CRUD (add/edit a yerba entry)
    Priority: Must | Owner: Full-stack | Effort: M

[ ] Review form v1 (structured cata fields + overall score)
    Priority: Must | Owner: Full-stack | Effort: L

[ ] Personal ranking view (list, sorted by score)
    Priority: Must | Owner: Frontend | Effort: M

[ ] Basic filters (type, stick presence, origin)
    Priority: Must | Owner: Frontend | Effort: S

[ ] Wiki v1: mate types + bombilla guide (static curated content)
    Priority: Must | Owner: Designer/Content | Effort: M

[ ] Maridaje v1: pairing guide by yerba type/intensity (static curated content)
    Priority: Must | Owner: Designer/Content | Effort: S
    Notes: No competitor benchmarked has this — real differentiator, keep it in MVP scope
```

### Should Have
```
[ ] Photo upload on reviews
    Priority: Should | Owner: Full-stack | Effort: S

[ ] Podium-style ranking view (visual, not just list)
    Priority: Should | Owner: Frontend | Effort: M

[ ] Cebado/technique guide section in Wiki
    Priority: Should | Owner: Designer/Content | Effort: S

[ ] App name/trademark collision check (Yerbario vs. existing apps)
    Priority: Should | Owner: José | Effort: S
```

### Could Have
```
[ ] "Match for You" personalized score (needs review data baseline)
    Priority: Could | Owner: Full-stack | Effort: L

[ ] Store locator (where to buy a given yerba nearby)
    Priority: Could | Owner: Full-stack | Effort: XL
    Notes: Direct overlap with Mate Go / MateRonda — needs a clear differentiation angle before scheduling

[ ] Social layer: follow, activity feed
    Priority: Could | Owner: Full-stack | Effort: XL
```

### Won't Have (now)
```
[ ] Label/barcode scanning (Vivino-style)
[ ] Badges/gamification (Untappd-style)
[ ] Native mobile app (React Native) — revisit if PWA adoption validates demand
```

---

## Sprint 1 Plan

```
Sprint 1 Goal: Working scaffold with design tokens, schema, auth, and a first end-to-end
               flow: add a yerba → write a review → see it in the ranking.
Duration: 1–2 weeks

Tasks:
- [ ] Repo scaffold (Next.js + Tailwind + Supabase client) (Full-stack, M)
- [ ] Design tokens v1 (color/type/spacing) (Designer, M)
- [ ] Supabase schema migration (Yerba, Review, User, WikiEntry) (Full-stack, M)
- [ ] Auth flow (Full-stack, S)
- [ ] Yerba catalog CRUD (Full-stack, M)
- [ ] Review form v1 (Full-stack, L)
- [ ] Ranking list view (Frontend, M)
```

See `sprint-01-prompt.md` for the ready-to-paste kickoff prompt for this sprint.

---

## Red Flags to Watch

- Solo designer + AI-assisted dev (no separate frontend/backend owner yet) — keep Sprint 1 scope tight; don't let Review Engine and Wiki both land in the same sprint.
- MateRonda already exists in this exact space — Epic 7 (store locator) and Epic 6 (social) risk becoming "me too" features. Keep MVP focused on the tasting-depth + Wiki + Maridaje differentiation before investing there.
- Wiki and Maridaje content are editorial work, not just engineering — budget writing time, not only dev time, for Epic 4 and Epic 5.
