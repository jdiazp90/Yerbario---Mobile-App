-- Yerbario — real photo upload (Sprint 1.75, user-requested follow-up)
-- Public bucket for yerba/cata photos. Same access shape as every other
-- table here: public read, authenticated write — uploads go through the
-- signed-in user's own request via the app's server actions.

insert into storage.buckets (id, name, public)
values ('yerba-photos', 'yerba-photos', true)
on conflict (id) do nothing;

create policy "Yerba photos are publicly readable"
  on storage.objects for select
  using (bucket_id = 'yerba-photos');

create policy "Authenticated users can upload yerba photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'yerba-photos');
