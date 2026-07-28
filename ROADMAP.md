# Yerbario — Roadmap

Methodology: Agile / lightweight Scrum, adapted for a solo-designer + AI-assisted execution model (same pattern as VRx Connect 3.0).

**Sprint review process:** no formal Scrum ceremony (no stakeholders, no scheduled demo). At the end of each sprint: re-check the sprint goal, run the resulting flow end-to-end in the browser, then decide together what rolls into the next sprint's backlog vs. what's done.

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

[ ] Eventos materos — eventos, conferencias y catas en tu ciudad
    Priority: Could | Owner: Full-stack | Effort: L
    Notes: post-MVP, anotado por José (2026-07-28). Falta definir fuente de
    datos (carga manual/comunidad vs. agregación de terceros) antes de poder
    estimar mejor.

[ ] Tiendas — directorio de comercios del mundo matero en Argentina
    Priority: Could | Owner: Full-stack | Effort: XL
    Notes: post-MVP, anotado por José (2026-07-28). Se imagina tipo
    "Mercado Libre" pero orientado a mate, fetcheando info de tiendas reales.
    Se solapa conceptualmente con "Store locator" arriba — en algún momento
    conviene decidir si son la misma feature o dos separadas.

[ ] Login con Google / Apple (Supabase Auth ya soporta ambos como OAuth)
    Priority: Could | Owner: Full-stack | Effort: M
    Notes: post-MVP, anotado por José (2026-07-28). No reemplaza email/password,
    se suma como alternativa. Requiere registrar la app en Google Cloud Console
    y en Apple Developer, y cargar esas credenciales en Supabase — trabajo de
    configuración, no solo de código.
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
- [x] Repo scaffold (Next.js + Tailwind + Supabase client) (Full-stack, M)
- [x] Design tokens v1 (color/type/spacing) (Designer, M)
- [x] Supabase schema migration (Yerba, Review, User, WikiEntry) (Full-stack, M)
- [x] Auth flow (Full-stack, S)
- [x] Yerba catalog CRUD (Full-stack, M)
- [x] Review form v1 (Full-stack, L)
- [x] Ranking list view (Frontend, M)
```

See `sprint-01-prompt.md` for the ready-to-paste kickoff prompt for this sprint.

Sprint 1 shipped the technical flow end-to-end (auth, CRUD, cata, ranking) with the approved tokens wired in, but every screen is functional-only scaffolding — plain cards, no imagery, no real visual composition. That polish was deliberately deferred, not forgotten — see Sprint 1.5 below.

---

## Sprint 1.5 — Visual & Mobile-First Polish

```
Goal: Take the Sprint 1 screens (catalog, review form, ranking, auth) from
      functional scaffolding to something that actually looks like a product —
      designed mobile-first, not just responsive.
Not a features sprint: no new data, no new routes — same screens, real design pass.

Tasks:
- [x] Mobile-first layout pass on every Sprint 1 screen (currently centered-desktop-first)
- [x] Card composition & visual hierarchy (catalog list, ranking list)
- [x] Imagery — yerba photos actually showing, empty-state illustration/treatment
- [x] Score chip, tags, and button polish beyond bare Tailwind utility styling
- [x] Loading/empty state treatment (currently plain text)
- [x] Revisit against the Design Tokens v1 artifact — make sure the shipped screens
      actually reach the bar that artifact set, not just the right hex codes
```

Shipped as a "premium sutil" pass (REV 2): layered card shadows + surface gradient,
frosted-glass topbar/tab bar, gradient score chip/buttons, a real app shell
(topbar + bottom tabs), segmented 1–5 rating control, and illustrated empty/skeleton
states — all on the existing tokens, no palette or type changes.

Sequencing: before or alongside Sprint 2 (Wiki v1 + Maridaje v1) — José to decide which comes first when Sprint 1.5 starts.

See `sprint-1.5-prompt.md` for the ready-to-paste kickoff prompt for this sprint.

---

## Sprint 1.75 — Community Signal, Yerba Detail, Visual Identity (research-informed)

Prompted by a UX/competitive research pass right after Sprint 1.5 — not a new epic,
but a re-prioritization of existing Should/Could items plus two concrete new adds,
grounded in direct competitive benchmarking (MateRonda turned out far more
feature-complete than PROJECT-BRIEF.md's original quick pass assumed) and cross-niche
patterns from Untappd, Vivino, Beli, and specialty-coffee tasting apps.

**Key findings:**
- MateRonda already ships a community score, store locator, social circles
  ("Rondas"), and check-ins with badges — free, live on iOS/Android/web. The exact
  features our original backlog marked "Phase 2 / evaluate" (social, store locator)
  are what its positive reviews cite as most loved.
- No competitor — MateRonda included — has a Wiki or Maridaje module. The
  tasting-depth + editorial-content differentiation thesis from PROJECT-BRIEF.md
  still holds, but only once that content actually ships (Sprint 2, not yet built).
- Every taste-niche app benchmarked (Untappd, Vivino, Beli, Tasting Grounds) has some
  social signal, even a lightweight passive one ("see what others tried"). Yerbario
  had none at all — not even passive.
- The `yerba_rankings` view (`avg_score`, `review_count`) has existed since the
  Sprint 1 schema migration but was never queried by the app. Near-zero-cost fix.
- US yerba mate market: ~6.7% CAGR; the organic/craft/loose-leaf premium segment is
  growing fastest (organic +50%) — validates the connoisseur/premium positioning
  already chosen in PROJECT-BRIEF.md §6.
- Package/box photography is the #1 recall mechanism in every benchmarked app
  (Vivino label scan, Untappd can/bottle photos) — yerba packaging is especially
  iconic in this category. A close-up "molienda" (leaf cut) photo per cata is a real,
  low-competition add: no competitor documents the actual leaf texture tasted.

### MoSCoW for this pass

Must:
```
[x] Surface yerba_rankings (avg_score/review_count) on the catalog list
[x] Yerba detail page (/catalog/[id]) — hero portada, community score, all public
    reviews for that yerba
[x] Molienda close-up photo per review (molienda_photo_url column, separate from the
    general cata photo_url — cut_type is a per-review attribute, not per-yerba)
[x] Wiki v1 + Maridaje v1 (already on the Sprint 2 backlog — reaffirmed as the core
    differentiator vs. MateRonda, now with added urgency given its parity elsewhere)
```

Shipped as `/wiki` (encyclopedia: mate types — calabaza, imperial, torpedo, camionero —
plus a bombilla guide and cebado/curado technique) and `/wiki/maridaje` (5 pairing
entries), with real researched content (see `supabase/migrations/0004_wiki_maridaje_content.sql`)
replacing the original placeholder rows — not just a placeholder scaffold.

Should:
```
[x] Reviews from other users visible on the yerba detail page (ships as part of the
    Must above — no follow/social-graph needed yet, reviews were already public-read)
[x] Controlled-vocabulary aroma tags + a visual flavor wheel, replacing free-text
    aroma_note (pattern borrowed from specialty-coffee tasting apps)
[ ] Curated/"official" portada once more than one user uploads a photo for the same
    yerba — portada stays open/unmoderated for now
```

Aroma tags shipped as a grouped chip picker (`aroma_tags text[]`, see
`supabase/migrations/0005_aroma_tags.sql`) — vocabulary grounded in real yerba mate
tasting descriptors (Verde/herbáceo, Tostado/ahumado, Terroso/amaderado,
Cítrico/floral, Otros), not invented. `aroma_note` stays as an optional supplementary
free-text field rather than being fully replaced — kept for nuance the tags miss.

### Mid-sprint addition — real photo upload + image lightbox

Flagged during testing: every "photo" field (yerba portada, cata photo, molienda
photo) was a paste-a-URL text input, not a real upload — a Sprint 1 "Should have"
that never actually got built. Fixed:

```
[x] Real photo upload via Supabase Storage (public `yerba-photos` bucket, see
    supabase/migrations/0006_photo_storage.sql), replacing the paste-a-URL field
    entirely — a tap opens the device's camera/gallery, with a live preview
[x] Tap-to-expand lightbox for the yerba portada on /catalog/[id]
[x] Yerba detail hero switched from a wide banner (h-52) to a square (aspect-square)
    treatment — most real photos here are 1:1 product/packaging shots, and the
    banner shape was cropping/letterboxing them badly
```

Server Actions body size limit raised to 20mb (`next.config.ts`) — the 1MB default
is too small for real phone photos, and the cata form can submit two at once.

### Mid-sprint addition — visual REV 3: "monochrome confident" + Material Symbols

User feedback mid-sprint: the REV 2 "premium sutil" pass (soft gradients, rounded-lg
everywhere, glassmorphism, colorful score badges) still read as generic/AI-templated
once real content was in it, not a designed product. Fixed by dropping decoration in
favor of restraint — solid espresso for anything interactive, quiet score display,
larger/rounder ("squircle") imagery, and a real icon system instead of hand-rolled
approximations of common symbols:

```
[x] Selection + primary CTA switched from the green gradient to solid espresso
    (`--espresso-900`) everywhere — btnPrimary, all filter/toggle chips (ranking,
    wiki), the rating/aroma pickers, the photo-upload camera badge. Green is now
    reserved for the score signal only, so it isn't fighting every button/chip on
    screen for the same color. `--brand-grad` removed from globals.css (unused).
[x] Score display switched from a colored badge (ScoreChip) to a quiet dot + number
    (QuietScore) everywhere — catalog, ranking, yerba detail header, per-review rows.
    The color tier (good/mid/bad) is preserved, just as a small dot instead of a
    filled pill.
[x] Catalog thumbnails enlarged to a real "squircle" (rounded-2xl, was rounded-md) —
    also applied to ranking rows for consistency
[x] Real catalog search (?q=, matches brand or variety) — was flagged as
    exploration-only in the mockup, now a real feature
[x] Yerba detail page restructured: full-bleed square hero with floating
    back/edit buttons (frosted, overlaid on the photo) instead of a top bar, a
    rounded-top "sheet" of content lifting over the photo's bottom edge, and an
    icon stat row (Puntaje / Catas / Origen) replacing the flat tag row
[x] Utility icons (back, chevron, camera, close, zoom, edit, search, globe, star)
    now use real Material Symbols (Outlined, wt 400, Apache-2.0) — paths extracted
    once from @material-symbols/svg-400 and inlined in icons.tsx, no runtime font
    request or bundle dependency. Brand-carrying icons (wordmark, leaf, mate gourd,
    bottom-nav tabs) stay hand-drawn by design — kept the app-specific character.
```

Could:
```
[ ] Pairwise ranking ("¿cuál te gustó más?") as an alternative to the 1–10 score,
    Beli-style
[ ] Provenance/terroir fields (producer, region, secado method) on the yerba catalog
    entry — rides the premium/craft market trend
[ ] Store locator — only with a clear angle MateRonda doesn't have (e.g. filter by
    rare/craft brands already in Yerbario's catalog), not a plain map clone
[ ] Badges/streaks (Untappd-style) — proven retention mechanic, premature before a
    real user base exists
[ ] "Ronda"/shared-session logging — culturally resonant (cebado is inherently
    communal) but is literally MateRonda's core identity/name; only pursue tied to
    tasting depth (e.g. a group cata where everyone scores the same yerba in one
    sitting), not a generic social-circle clone
```

Won't (for now):
```
[ ] Full social graph (follow, activity feed) — the lightweight "see all reviews on
    a yerba" above covers the core value without the graph/moderation overhead
[ ] Label/barcode scanning, native app — unchanged from the original backlog
```

---

## Red Flags to Watch

- Solo designer + AI-assisted dev (no separate frontend/backend owner yet) — keep Sprint 1 scope tight; don't let Review Engine and Wiki both land in the same sprint.
- MateRonda already exists in this exact space — Epic 7 (store locator) and Epic 6 (social) risk becoming "me too" features. Keep MVP focused on the tasting-depth + Wiki + Maridaje differentiation before investing there.
- Wiki and Maridaje content are editorial work, not just engineering — budget writing time, not only dev time, for Epic 4 and Epic 5.
