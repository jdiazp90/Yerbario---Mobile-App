-- Yerbario — aroma flavor wheel (Sprint 1.75 Should)
-- Adds a controlled-vocabulary tag array alongside the existing free-text
-- aroma_note, instead of replacing it outright — tags make aroma comparable
-- across reviews (and eventually filterable), while aroma_note stays for
-- anything the vocabulary doesn't capture.

alter table public.review
  add column aroma_tags text[] not null default '{}';
