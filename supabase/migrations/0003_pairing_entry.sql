-- Yerbario — Wiki v1 + Maridaje v1 scaffold (Sprint 1.75 Must)
-- pairing_entry mirrors wiki_entry's access pattern: publicly readable,
-- curated by admin only (no insert/update/delete policy — writes go through
-- the Supabase dashboard, not the app's anon/authenticated client).

create table public.pairing_entry (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  linked_yerba_type text check (linked_yerba_type in ('tradicional', 'compuesta', 'despalada')),
  description text not null,
  image_url text,
  order_index integer not null default 0
);

alter table public.pairing_entry enable row level security;

create policy "Pairing entries are publicly readable"
  on public.pairing_entry for select
  using (true);

-- ── Placeholder content ──────────────────────────────────────────────────
-- Scaffold-only examples so /wiki and /wiki/maridaje aren't empty on first
-- load. Replace with real editorial content (José, Designer/Content owner
-- per ROADMAP.md) — these rows are safe to delete once real entries exist.

insert into public.wiki_entry (category, title, body, order_index) values
(
  'mate_type',
  '[Ejemplo] Mate calabaza',
  'Contenido de ejemplo — reemplazar con texto real.' || chr(10) || chr(10) ||
  'El mate calabaza es el recipiente tradicional hecho a partir del fruto seco y vaciado de la planta Lagenaria siceraria. Es el formato más asociado a la imagen clásica del mate en Argentina, Uruguay y Paraguay.' || chr(10) || chr(10) ||
  'Antes del primer uso se "cura": se llena con yerba usada y agua caliente durante un día, para sellar las paredes internas y evitar que absorban sabores no deseados en las primeras cebadas.',
  1
),
(
  'mate_type',
  '[Ejemplo] Mate imperial',
  'Contenido de ejemplo — reemplazar con texto real.' || chr(10) || chr(10) ||
  'El mate imperial es de metal (generalmente alpaca o acero) con un cuerpo más ancho y una base más estable que el calabaza tradicional. Es más resistente a golpes y no requiere curado previo.',
  2
),
(
  'bombilla',
  '[Ejemplo] Bombilla recta vs. con resorte',
  'Contenido de ejemplo — reemplazar con texto real.' || chr(10) || chr(10) ||
  'La bombilla recta es la más simple: un tubo con un filtro perforado en la punta. La bombilla con resorte (o "de muelle") tiene un resorte enrollado en el extremo, que actúa como filtro más fino y es más fácil de limpiar sin desarmar.' || chr(10) || chr(10) ||
  'El material también varía: acero inoxidable (el más común y económico), alpaca (aleación tradicional, buen conductor térmico) y bambú (más artesanal, requiere más cuidado).',
  1
),
(
  'technique',
  '[Ejemplo] Cómo cebar correctamente',
  'Contenido de ejemplo — reemplazar con texto real.' || chr(10) || chr(10) ||
  'Llená el mate hasta 2/3 con yerba, tapá la boca con la mano y girá el mate boca abajo para asentar el polvo fino antes de destaparlo. Inclinalo a 45° y agregá un poco de agua tibia (no caliente) en el espacio que quedó libre para humedecer la yerba antes del primer cebado.' || chr(10) || chr(10) ||
  'Recién ahí colocá la bombilla, en el costado húmedo, y empezá a cebar con agua a 70-80°C — nunca hirviendo, quema la yerba y la vuelve amarga antes de tiempo.',
  1
)
;

insert into public.pairing_entry (title, linked_yerba_type, description, order_index) values
(
  '[Ejemplo] Facturas y mate dulce',
  'compuesta',
  'Contenido de ejemplo — reemplazar con texto real.' || chr(10) || chr(10) ||
  'Una yerba compuesta o suave, tomada dulce, acompaña bien la grasitud de una factura de manteca sin competir en intensidad. El dulzor del mate corta el empalago del glaseado.',
  1
),
(
  '[Ejemplo] Queso y mate amargo',
  'tradicional',
  'Contenido de ejemplo — reemplazar con texto real.' || chr(10) || chr(10) ||
  'Un mate tradicional amargo, con buen cuerpo, funciona como contrapunto a quesos semicurados — el amargor limpia el paladar de la grasa del queso entre bocado y bocado, similar al rol que cumple un vino tinto seco.',
  2
)
;
