-- =============================================================
--  Apresentação comercial — DETALHES da visita no painel (rodar UMA vez no SQL Editor do Supabase)
--  Guarda o resumo de cada visita (tempo, seções, vídeos, cliques) e mostra no painel.
-- =============================================================

alter table public.site_eventos add column if not exists detalhe jsonb;
alter table public.site_eventos drop constraint if exists site_eventos_tipo_check;
alter table public.site_eventos add constraint site_eventos_tipo_check check (tipo in ('visita','whatsapp','secao','resumo'));

drop policy if exists "site registra" on public.site_eventos;
create policy "site registra" on public.site_eventos for insert to anon, authenticated
  with check (
    char_length(coalesce(pagina,''))        <= 200 and
    char_length(coalesce(origem,''))        <= 60  and
    char_length(coalesce(dispositivo,''))   <= 20  and
    char_length(coalesce(visitante,''))     <= 64  and
    char_length(coalesce(cliente,''))       <= 80  and
    char_length(coalesce(vendedor,''))      <= 60  and
    char_length(coalesce(secao,''))         <= 30  and
    char_length(coalesce(detalhe::text,'')) <= 4000
  );

create or replace function public.site_apresentacao(dias int default 30)
returns jsonb
language sql stable security invoker
set search_path = public
as $$
  with e as (
    select *, array_position(array['capa','sobre','videos','depoimentos','solucoes','presenca','clientes','como','final'], secao) as ordem
    from public.site_eventos
    where pagina like '/apresentacao%'
      and criado_em >= (date_trunc('day', now() at time zone 'America/Sao_Paulo') - make_interval(days => greatest(dias,1) - 1)) at time zone 'America/Sao_Paulo'
  ),
  -- último resumo de cada abertura (cada abertura pode mandar até 3 atualizações)
  r as (
    select distinct on (detalhe->>'carga') *
    from e where tipo = 'resumo' and detalhe ? 'carga'
    order by detalhe->>'carga', criado_em desc
  )
  select jsonb_build_object(
    'aberturas', (select count(*) from e where tipo = 'visita'),
    'clientes',  (select count(distinct lower(cliente)) from e where tipo = 'visita' and coalesce(cliente,'') <> ''),
    'whatsapp',  (select count(*) from e where tipo = 'whatsapp'),
    'por_cliente', coalesce((select jsonb_agg(x order by x.ultimo desc) from (
        select max(e.cliente) cliente, max(e.vendedor) vendedor,
               count(*) filter (where e.tipo = 'visita') aberturas,
               count(*) filter (where e.tipo = 'whatsapp') whatsapp,
               max(e.ordem) filter (where e.tipo = 'secao') ate,
               to_char(max(e.criado_em) at time zone 'America/Sao_Paulo', 'YYYY-MM-DD"T"HH24:MI') ultimo,
               (select coalesce(sum((r.detalhe->>'tempo')::int),0) from r where lower(r.cliente) = lower(max(e.cliente)) and lower(coalesce(r.vendedor,'')) = lower(coalesce(max(e.vendedor),''))) tempo,
               (select coalesce(jsonb_agg(r.detalhe || jsonb_build_object('quando', to_char(r.criado_em at time zone 'America/Sao_Paulo','YYYY-MM-DD"T"HH24:MI'), 'aparelho', r.dispositivo) order by r.criado_em desc),'[]'::jsonb)
                  from r where lower(r.cliente) = lower(max(e.cliente)) and lower(coalesce(r.vendedor,'')) = lower(coalesce(max(e.vendedor),''))) visitas
        from e where coalesce(e.cliente,'') <> ''
        group by lower(e.cliente), lower(coalesce(e.vendedor,''))
        order by max(e.criado_em) desc limit 100) x), '[]'::jsonb),
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
