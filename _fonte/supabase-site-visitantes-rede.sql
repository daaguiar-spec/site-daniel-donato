-- =============================================================
--  Site Daniel Donato — 2ª estimativa de visitantes (rodar UMA vez)
--  O IP NUNCA é salvo: no momento da visita ele é combinado com o
--  navegador e com um segredo que muda todo dia, e vira um código
--  embaralhado (SHA-256) que não dá para reverter.
-- =============================================================

create extension if not exists pgcrypto with schema extensions;

alter table public.site_eventos add column if not exists rede text;

-- segredo diário (ninguém lê pelo site: RLS ligado e sem política)
create table if not exists public.site_segredo (
  dia    date primary key,
  valor  text not null
);
alter table public.site_segredo enable row level security;
revoke all on public.site_segredo from anon, authenticated;

create or replace function public.site_marca_rede()
returns trigger
language plpgsql security definer
set search_path = public, extensions
as $$
declare
  h   json;
  ip  text;
  ua  text;
  hoje date := (now() at time zone 'America/Sao_Paulo')::date;
  seg text;
begin
  begin h := current_setting('request.headers', true)::json; exception when others then h := null; end;
  ip := coalesce(h->>'cf-connecting-ip', split_part(coalesce(h->>'x-forwarded-for',''), ',', 1), h->>'x-real-ip', '');
  ua := coalesce(h->>'user-agent', '');
  select valor into seg from public.site_segredo where dia = hoje;
  if seg is null then
    insert into public.site_segredo(dia, valor) values (hoje, encode(gen_random_bytes(32), 'hex'))
      on conflict (dia) do nothing;
    select valor into seg from public.site_segredo where dia = hoje;
    delete from public.site_segredo where dia < hoje - 1;   -- segredos antigos somem
  end if;
  new.rede := case when trim(ip) = '' then null
              else encode(digest(seg || '|' || trim(ip) || '|' || ua, 'sha256'), 'hex') end;
  return new;
end;
$$;

drop trigger if exists site_marca_rede on public.site_eventos;
create trigger site_marca_rede before insert on public.site_eventos
  for each row execute function public.site_marca_rede();

-- resumo do painel, agora com a 2ª estimativa
create or replace function public.site_estatisticas(dias int default 30)
returns jsonb
language sql stable security invoker
set search_path = public
as $$
  with e as (
    select * from public.site_eventos
    where criado_em >= (date_trunc('day', now() at time zone 'America/Sao_Paulo') - make_interval(days => greatest(dias,1) - 1)) at time zone 'America/Sao_Paulo'
  ),
  v as (select *, to_char(criado_em at time zone 'America/Sao_Paulo', 'YYYY-MM-DD') as d from e where tipo = 'visita')
  select jsonb_build_object(
    'visitas',    (select count(*) from v),
    'visitantes', (select count(distinct visitante) from v),
    'visitantes_rede', (select coalesce(sum(n),0) from (select count(distinct rede) n from v where rede is not null group by d) x),
    'com_rede',   (select count(*) from v where rede is not null),
    'whatsapp',   (select count(*) from e where tipo = 'whatsapp'),
    'por_dia', coalesce((select jsonb_agg(jsonb_build_object('dia', d, 'visitas', n, 'visitantes', u, 'visitantes_rede', r) order by d)
                from (select d, count(*) n, count(distinct visitante) u, count(distinct rede) r from v group by 1) x), '[]'::jsonb),
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
