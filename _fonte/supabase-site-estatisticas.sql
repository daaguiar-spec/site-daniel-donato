-- =============================================================
--  Site Daniel Donato — estatísticas (rodar UMA vez no SQL Editor do Supabase)
--  Registra visitas e cliques no WhatsApp de forma ANÔNIMA (sem nome, e-mail ou IP).
--  Fica separado das estatísticas do portal CX em Foco.
-- =============================================================

create table if not exists public.site_eventos (
  id          bigint generated always as identity primary key,
  criado_em   timestamptz not null default now(),
  tipo        text not null check (tipo in ('visita','whatsapp')),
  pagina      text,
  origem      text,
  dispositivo text,
  visitante   text
);
create index if not exists site_eventos_criado_em_idx on public.site_eventos (criado_em);

alter table public.site_eventos enable row level security;

drop policy if exists "site registra" on public.site_eventos;
drop policy if exists "site admin le" on public.site_eventos;

-- Qualquer visitante pode REGISTRAR (com limites de tamanho)…
create policy "site registra" on public.site_eventos for insert to anon, authenticated
  with check (
    char_length(coalesce(pagina,''))      <= 200 and
    char_length(coalesce(origem,''))      <= 60  and
    char_length(coalesce(dispositivo,'')) <= 20  and
    char_length(coalesce(visitante,''))   <= 64
  );
-- …mas só quem está logado (mesma conta da Redação do portal) pode LER.
create policy "site admin le" on public.site_eventos for select to authenticated using (true);

grant insert on public.site_eventos to anon, authenticated;
grant select on public.site_eventos to authenticated;

create or replace function public.site_estatisticas(dias int default 30)
returns jsonb
language sql stable security invoker
set search_path = public
as $$
  with e as (
    select * from public.site_eventos
    where criado_em >= (date_trunc('day', now() at time zone 'America/Sao_Paulo') - make_interval(days => greatest(dias,1) - 1)) at time zone 'America/Sao_Paulo'
  ),
  v as (select * from e where tipo = 'visita')
  select jsonb_build_object(
    'visitas',    (select count(*) from v),
    'visitantes', (select count(distinct visitante) from v),
    'whatsapp',   (select count(*) from e where tipo = 'whatsapp'),
    'por_dia', coalesce((select jsonb_agg(jsonb_build_object('dia', d, 'visitas', n, 'visitantes', u) order by d)
                from (select to_char(criado_em at time zone 'America/Sao_Paulo', 'YYYY-MM-DD') d, count(*) n, count(distinct visitante) u
                      from v group by 1) x), '[]'::jsonb),
    'paginas', coalesce((select jsonb_agg(jsonb_build_object('pagina', pagina, 'n', n) order by n desc)
                from (select pagina, count(*) n from v group by 1 order by 2 desc limit 12) x), '[]'::jsonb),
    'origens', coalesce((select jsonb_agg(jsonb_build_object('origem', origem, 'n', n) order by n desc)
                from (select origem, count(*) n from v where origem is not null group by 1) x), '[]'::jsonb),
    'dispositivos', coalesce((select jsonb_agg(jsonb_build_object('dispositivo', dispositivo, 'n', n) order by n desc)
                from (select dispositivo, count(*) n from v where dispositivo is not null group by 1) x), '[]'::jsonb),
    'whatsapp_paginas', coalesce((select jsonb_agg(jsonb_build_object('pagina', pagina, 'n', n) order by n desc)
                from (select pagina, count(*) n from e where tipo = 'whatsapp' group by 1 order by 2 desc limit 10) x), '[]'::jsonb)
  );
$$;

revoke execute on function public.site_estatisticas(int) from public, anon;
grant execute on function public.site_estatisticas(int) to authenticated;
