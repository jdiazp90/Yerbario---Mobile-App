# Yerbario — Project Brief
_Yerba Mate Review & Wiki App_

Status: Kickoff / Pre-Sprint 1
Owner: José Díaz (Product Design, Design Systems, AI-assisted delivery)
Doc type: Product foundation — read before ROADMAP.md and sprint-01-prompt.md

---

## 1. Problem & Opportunity

Mate drinkers currently track their yerba experiences informally — spreadsheets, notes apps, or scattered blog posts. There is no dedicated, well-designed app that treats yerba mate with the same rigor that Untappd gives beer or Vivino gives wine: structured tasting notes, a personal ranking, and a reference library for the equipment and rituals around the drink (bombillas, mate gourd types, cebado technique).

Yerbario is a mobile-first app to log, rate, and rank yerba mate brands/varieties through structured tasting reviews, plus a curated Wiki covering mate types, bombillas, and preparation knowledge.

---

## 2. Competitive Benchmark (quick pass)

| App | Category | What it does well | Relevant takeaway for Yerbario |
|---|---|---|---|
| **Untappd** | Beer | <cite index="7-1">Lets users rate beer, earn badges, share photos, review venue tap lists, see friends' check-ins, and get similar-drink suggestions</cite>. <cite index="6-1">Individual ratings roll up into a public composite score per beer</cite>. | Badges/gamification drive repeat logging. A composite score per item (not just personal) makes the catalog useful to browse even before you've tried something. |
| **Vivino** | Wine | <cite index="15-1">Instant label scan surfaces a community rating plus a tasting-note summary built from many reviews</cite>, and <cite index="10-1">a personal "Match for You" score is calculated once a user has rated a handful of wines</cite>. | A personalized "this matches your taste" score (built from bitterness/intensity/cut preferences) is a strong differentiator once we have enough review data. Label scanning is a nice-to-have, not MVP. |
| **MateRonda** | Yerba mate (direct competitor, already live) | <cite index="25-1">Lets users discover and review yerba mate brands with flavor profiles for smoothness, bitterness, intensity and value, build a personal taste profile, find nearby stores that carry specific brands, and follow other mate drinkers</cite>. | This is our closest competitor and already covers store-locator + basic brand reviews + social. Yerbario's wedge should be **tasting depth** (molienda, palo %, espuma, rendimiento — a real "cata" format, not just 4 sliders) and the **Wiki** (mate types, bombillas, cebado guides), which MateRonda does not appear to offer. |
| **Mate Go** (INYM, Argentina) | Yerba mate, utility | <cite index="22-1">A government-backed app that lets users filter yerba by type (con palo, sin palo, para tereré) and locate nearby spots with hot water for mate</cite>. | Utility-only, no tasting/rating layer, no visual design polish, no wiki. Confirms there's real market interest in a mate-specific app but no one owns the "connoisseur" experience yet. |

**Positioning:** Yerbario is not trying to out-social Untappd/Vivino/MateRonda on day one. The differentiators are (1) a genuinely detailed tasting schema tailored to yerba mate specifically — not a generic 5-star import, (2) an editorial-quality Wiki that teaches the category (mate types, bombilla materials, cebado technique), and (3) a **Maridaje (pairing) guide** — what to eat with each type of yerba — which none of the benchmarked apps offer in any form. Social/community features (follow, feed, badges) are real but sequenced for a later phase, not MVP.

---

## 3. Product Scope (MVP)

### 3.1 Core Modules

1. **Cata / Review Engine**
   - Brand, variety/edition (e.g. Selección Especial, Padrón Uruguayo), origin (AR/UY/BR/PY)
   - Overall score (1–10)
   - Structured tasting notes: aroma, bitterness intensity, cut/molienda (fina/gruesa), stick presence (con palo/sin palo), foam quality (espuma), yield/steeping duration (rendimiento/cebada count)
   - Free-text verdict ("why this ranking")
   - Optional photo

2. **Dynamic Ranking**
   - Personal ranking, auto-sorted by score or user-defined criteria
   - Podium-style view for top entries

3. **Filters & Tags**
   - By type: Suave, Compuesta/Digestiva, Fuerte/Sin palo, Padrón Uruguayo
   - By origin country, by brand

4. **Wiki / Encyclopedia**
   - Mate types (calabaza, imperial, camionero, torpedo, etc.)
   - Bombilla guide (materials: acero, alpaca, bambú; types: recta, con resorte/filtro)
   - Cebado / preparation technique guides
   - Structured as reference content, not user-generated (curated by admin, editable via CMS-style entries)

5. **Maridaje (Pairing) Guide**
   - Curated pairing recommendations linked to yerba type/intensity (e.g. what goes well with a fuerte/sin palo vs. a suave/compuesta)
   - Same curated-content model as the Wiki (not user-generated for MVP)
   - Can eventually link outward from a Yerba's detail page ("this pairs well with...") once both modules exist — flagged as a nice cross-linking opportunity, not a Sprint 1 requirement

### 3.2 Explicitly Out of Scope for MVP
- Social feed, following, badges (Should Have — Phase 2)
- Store locator / "where to buy" (Could Have — evaluate after MVP; direct overlap with Mate Go and MateRonda)
- Label scanning (Won't Have now — high effort, low MVP value)
- AI-personalized "match score" (Should Have — needs a review data baseline first)

---

## 4. Data Model (initial)

```
Yerba
  id
  brand
  variety_name        (e.g. "Selección Especial", "Padrón Uruguayo")
  type                (tradicional | compuesta | despalada)
  stick_presence      (con_palo | sin_palo)
  origin_country      (AR | UY | BR | PY)
  image_url
  avg_score           (computed)

Review
  id
  yerba_id            (FK -> Yerba)
  user_id             (FK -> User)
  overall_score        (1-10)
  aroma_note
  bitterness_intensity (1-5)
  cut_type            (fina | gruesa)
  foam_quality         (1-5)
  yield_notes          (rendimiento / cebada count, free text or numeric)
  verdict              (free text)
  photo_url            (optional)
  created_at

User
  id
  display_name
  avatar_url
  created_at

WikiEntry
  id
  category            (mate_type | bombilla | technique)
  title
  body                (rich text / markdown)
  image_url
  order_index

PairingEntry
  id
  title               (e.g. "Facturas y mate dulce", "Queso y mate amargo")
  linked_yerba_type    (tradicional | compuesta | despalada, or intensity tag)
  description          (rich text / markdown)
  image_url
```

---

## 5. Recommended Stack

Assumption: mobile-first experience, but shipped as a responsive web app first (fastest path to a usable MVP, installable as a PWA), following the same stack direction already validated in your own reference prompt. If a native app-store presence becomes a priority later, this can migrate to or be wrapped with React Native/Expo without a data-layer rewrite (Supabase works with both).

| Layer | Technology | Why |
|---|---|---|
| Frontend | Next.js (React) | SSR/PWA support, fast iteration, one codebase for web + installable mobile |
| Styling | Tailwind CSS | Consistent with your existing design-token workflow (`vrx-` style prefixing pattern can carry over as `yb-`) |
| Backend / DB | Supabase (Postgres) | Auth, storage (photos), and relational data in one managed service — avoids standing up a separate backend for an MVP |
| Design tokens | Style Dictionary + Tailwind theme | Matches your established token pipeline (primitive → semantic → component) |
| Hosting | Vercel | Zero-config deploys, previews per branch |

If you'd rather start from a native mobile shell instead (matching MatchUp's stack), say so before Sprint 1 and this gets swapped for React Native + Expo + Supabase.

---

## 6. Visual Direction (brief)

- Warm, organic palette: mate green, warm neutrals (parchment/cream), a dark accent (espresso/charcoal) for contrast — avoid a cold, generic "tech app" green.
- Typography: one warm serif or slab for headings (evokes ritual/tradition), one clean grotesk for UI/body text.
- Card-based review layout (photo + score + tasting tags), podium view for rankings, and a clean editorial layout for Wiki entries (long-form reading, not app chrome).
- Full WCAG AA contrast compliance carried over from your existing token/accessibility workflow.

This gets finalized as design tokens in Sprint 1 alongside the technical scaffold — see `sprint-01-prompt.md`.

---

## 7. Naming Note

"Yerbario" is the confirmed name. Given MateRonda already exists in this space, do a quick App Store / Play Store / trademark / domain name-collision check before this goes further — flagged as a Sprint 1 backlog item.
