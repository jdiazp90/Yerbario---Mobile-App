-- Yerbario — initial schema (Sprint 1, Phase 3)
-- Tables: profiles, yerba, review, wiki_entry.
-- PairingEntry is deferred to the Maridaje epic — out of Sprint 1 scope.

create extension if not exists pgcrypto;

-- ── profiles ────────────────────────────────────────────────────────────
-- Brief calls this entity "User", but auth.users already exists (Supabase
-- Auth), so this is the public profile row it's extended with — 1:1 via
-- shared primary key, populated by the trigger below on sign-up.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are publicly readable"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Creates a profile row whenever someone signs up.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── yerba ───────────────────────────────────────────────────────────────
-- avg_score is intentionally NOT a column here (brief marks it "computed")
-- — see the yerba_rankings view below instead, to avoid a stale cached value.
create table public.yerba (
  id uuid primary key default gen_random_uuid(),
  brand text not null,
  variety_name text not null,
  type text not null check (type in ('tradicional', 'compuesta', 'despalada')),
  stick_presence text not null check (stick_presence in ('con_palo', 'sin_palo')),
  origin_country text not null check (origin_country in ('AR', 'UY', 'BR', 'PY')),
  image_url text,
  created_at timestamptz not null default now()
);

create index yerba_type_idx on public.yerba (type);
create index yerba_origin_country_idx on public.yerba (origin_country);
create index yerba_stick_presence_idx on public.yerba (stick_presence);

alter table public.yerba enable row level security;

create policy "Yerba catalog is publicly readable"
  on public.yerba for select
  using (true);

create policy "Authenticated users can add yerba"
  on public.yerba for insert
  to authenticated
  with check (true);

create policy "Authenticated users can edit yerba"
  on public.yerba for update
  to authenticated
  using (true);

-- ── review ──────────────────────────────────────────────────────────────
create table public.review (
  id uuid primary key default gen_random_uuid(),
  yerba_id uuid not null references public.yerba (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  overall_score numeric(3, 1) not null check (overall_score >= 1 and overall_score <= 10),
  aroma_note text,
  bitterness_intensity smallint check (bitterness_intensity between 1 and 5),
  cut_type text check (cut_type in ('fina', 'gruesa')),
  foam_quality smallint check (foam_quality between 1 and 5),
  yield_notes text,
  verdict text,
  photo_url text,
  created_at timestamptz not null default now()
);

create index review_yerba_id_idx on public.review (yerba_id);
create index review_user_id_idx on public.review (user_id);

alter table public.review enable row level security;

create policy "Reviews are publicly readable"
  on public.review for select
  using (true);

create policy "Users can add their own reviews"
  on public.review for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can edit their own reviews"
  on public.review for update
  using (auth.uid() = user_id);

create policy "Users can delete their own reviews"
  on public.review for delete
  using (auth.uid() = user_id);

-- ── wiki_entry ──────────────────────────────────────────────────────────
-- Curated by admin only — no insert/update/delete policy, so writes go
-- through the Supabase dashboard (service role), not the app's anon client.
create table public.wiki_entry (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('mate_type', 'bombilla', 'technique')),
  title text not null,
  body text not null,
  image_url text,
  order_index integer not null default 0
);

alter table public.wiki_entry enable row level security;

create policy "Wiki entries are publicly readable"
  on public.wiki_entry for select
  using (true);

-- ── yerba_rankings view ─────────────────────────────────────────────────
-- Backs the Sprint 1 ranking list: avg_score + review_count per yerba.
create view public.yerba_rankings as
select
  y.*,
  coalesce(avg(r.overall_score), 0)::numeric(3, 1) as avg_score,
  count(r.id) as review_count
from public.yerba y
left join public.review r on r.yerba_id = y.id
group by y.id;
