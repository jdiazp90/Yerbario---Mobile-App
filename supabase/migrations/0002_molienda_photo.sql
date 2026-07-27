-- Yerbario — molienda photo (Sprint 1.75, research-informed backlog)
-- Adds a second, dedicated photo field on review for a close-up of the leaf
-- cut/texture, separate from the general cata photo_url — cut_type is a
-- per-review attribute (varies bag to bag), so this documents what the
-- reviewer actually saw, not a catalog-level property of the yerba.

alter table public.review
  add column molienda_photo_url text;
