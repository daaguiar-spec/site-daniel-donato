-- =============================================================
--  Site Daniel Donato — estatísticas da Apresentação comercial (rodar UMA vez)
--  Guarda o "cliente" e o "vendedor" que vêm no link personalizado.
-- =============================================================

alter table public.site_eventos add column if not exists cliente text;
alter table public.site_eventos add column if not exists vendedor text;

drop policy if exists "site registra" on public.site_eventos;
create policy "site registra" on public.site_eventos for insert to anon, authenticated
  with check (
    char_length(coalesce(pagina,''))      <= 200 and
    char_length(coalesce(origem,''))      <= 60  and
    char_length(coalesce(dispositivo,'')) <= 20  and
    char_length(coalesce(visitante,''))   <= 64  and
    char_length(coalesce(cliente,''))     <= 80  and
    char_length(coalesce(vendedor,''))    <= 60
  );

create or replace function public.site_apresentacao(dias int default 30)
returns jsonb
language sql stable security invoker
set search_path = public
as $$
  with e as (
    select * from public.site_eventos
    where pagina like '/apresentacao%'
      and criado_em >= (date_trunc('day', now() at time zone 'America/Sao_Paulo') - make_interval(days => greatest(dias,1) - 1)) at time zone 'America/Sao_Paulo'
  )
  select jsonb_build_object(
    'aberturas', (select count(*) from e where tipo = 'visita'),
    'clientes',  (select count(distinct lower(cliente)) from e where tipo = 'visita' and coalesce(cliente,'') <> ''),
    'whatsapp',  (select count(*) from e where tipo = 'whatsapp'),
    'por_cliente', coalesce((select jsonb_agg(x order by x.ultimo desc) from (
        select max(cliente) cliente, max(vendedor) vendedor,
               count(*) filter (where tipo = 'visita') aberturas,
               count(*) filter (where tipo = 'whatsapp') whatsapp,
               to_char(max(criado_em) at time zone 'America/Sao_Paulo', 'YYYY-MM-DD"T"HH24:MI') ultimo
        from e where coalesce(cliente,'') <> ''
        group by lower(cliente), lower(coalesce(vendedor,''))
        order by max(criado_em) desc limit 100) x), '[]'::jsonb),
    'por_vendedor', coalesce((select jsonb_agg(x order by x.aberturas desc) from (
        select coalesce(nullif(max(vendedor),''),'(sem vendedor)') vendedor,
               count(distinct lower(cliente)) filter (where coalesce(cliente,'') <> '') clientes,
               count(*) filter (where tipo = 'visita') aberturas,
               count(*) filter (where tipo = 'whatsapp') whatsapp
        from e group by lower(coalesce(vendedor,''))) x), '[]'::jsonb)
  );
$$;

revoke execute on function public.site_apresentacao(int) from public, anon;
grant execute on function public.site_apresentacao(int) to authenticated;
