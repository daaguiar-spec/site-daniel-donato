-- =============================================================
--  PROPOSTA + CONTRATO ON-LINE  (rodar UMA vez no SQL Editor do Supabase)
--  Cria as tabelas da página /proposta e do painel /proposta/painel.
--
--  ANTES DE RODAR: confira o(s) e-mail(s) que podem entrar no painel
--  (linha "insert into public.proposta_admins" mais abaixo).
--  É o mesmo e-mail e senha usados no painel de estatísticas (/admin).
-- =============================================================

-- ---------- quem pode administrar as propostas ----------
create table if not exists public.proposta_admins (
  email text primary key
);
insert into public.proposta_admins (email) values
  ('daaguiar@gmail.com'), ('comercial@sinapseonline.com')   -- troque/adicione aqui: ('outro@email.com'), ...
on conflict do nothing;
alter table public.proposta_admins enable row level security;

create or replace function public.eh_admin_proposta()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.proposta_admins
                 where lower(email) = lower(coalesce(auth.jwt()->>'email','')));
$$;

drop policy if exists "admins leem admins" on public.proposta_admins;
create policy "admins leem admins" on public.proposta_admins for select to authenticated using (public.eh_admin_proposta());

-- ---------- propostas ----------
create table if not exists public.propostas (
  id            uuid primary key default gen_random_uuid(),
  codigo        text not null unique default substr(md5(random()::text || clock_timestamp()::text), 1, 12),
  cliente       text not null,
  vendedor      text,
  fone          text,
  status        text not null default 'rascunho',
  versao        int  not null default 1,
  dados         jsonb not null default '{}'::jsonb,   -- textos, itens, valores, condições
  contrato      jsonb not null default '{}'::jsonb,   -- cláusulas do contrato
  contratante   jsonb,                                -- dados preenchidos pelo cliente no aceite
  aceite        jsonb,                                -- quem aceitou, quando, aparelho
  criado_em     timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  publicado_em  timestamptz
);
alter table public.propostas drop constraint if exists propostas_status_check;
alter table public.propostas add constraint propostas_status_check check (status in
  ('rascunho','enviada','visualizada','em_ajuste','aprovada','contrato_liberado','contrato_em_ajuste','assinado','recusada','arquivada'));

create table if not exists public.proposta_versoes (
  id          bigserial primary key,
  proposta_id uuid not null references public.propostas(id) on delete cascade,
  versao      int  not null,
  dados       jsonb not null,
  contrato    jsonb not null,
  criado_em   timestamptz not null default now()
);
create index if not exists proposta_versoes_idx on public.proposta_versoes (proposta_id, versao);

create table if not exists public.proposta_eventos (
  id          bigserial primary key,
  proposta_id uuid not null references public.propostas(id) on delete cascade,
  tipo        text not null,
  detalhe     jsonb,
  criado_em   timestamptz not null default now()
);
create index if not exists proposta_eventos_idx on public.proposta_eventos (proposta_id, criado_em desc);

alter table public.propostas        enable row level security;
alter table public.proposta_versoes enable row level security;
alter table public.proposta_eventos enable row level security;

drop policy if exists "admins propostas" on public.propostas;
create policy "admins propostas" on public.propostas for all to authenticated
  using (public.eh_admin_proposta()) with check (public.eh_admin_proposta());
drop policy if exists "admins versoes" on public.proposta_versoes;
create policy "admins versoes" on public.proposta_versoes for all to authenticated
  using (public.eh_admin_proposta()) with check (public.eh_admin_proposta());
drop policy if exists "admins eventos" on public.proposta_eventos;
create policy "admins eventos" on public.proposta_eventos for all to authenticated
  using (public.eh_admin_proposta()) with check (public.eh_admin_proposta());

-- ---------- o cliente abre o link (só com o código) ----------
create or replace function public.proposta_ver(p_codigo text, p_registrar boolean default true)
returns jsonb language plpgsql security definer set search_path = public as $$
declare r public.propostas; adm boolean := public.eh_admin_proposta(); ant record; mostra_contrato boolean;
begin
  select * into r from public.propostas where codigo = p_codigo;
  if not found then return null; end if;
  if r.status in ('rascunho','arquivada') and not adm then return null; end if;

  if p_registrar and not adm then
    insert into public.proposta_eventos (proposta_id, tipo, detalhe) values (r.id, 'visualizou', jsonb_build_object('versao', r.versao));
    if r.status = 'enviada' then update public.propostas set status = 'visualizada' where id = r.id; r.status := 'visualizada'; end if;
  end if;

  select dados, contrato into ant from public.proposta_versoes
   where proposta_id = r.id and versao = r.versao - 1 order by id desc limit 1;

  mostra_contrato := adm or r.status in ('contrato_liberado','contrato_em_ajuste','assinado');

  return jsonb_build_object(
    'codigo', r.codigo, 'cliente', r.cliente, 'vendedor', r.vendedor, 'fone', r.fone,
    'status', r.status, 'versao', r.versao, 'publicado_em', coalesce(r.publicado_em, r.atualizado_em),
    'dados', r.dados,
    'contrato', case when mostra_contrato then r.contrato else null end,
    'contratante', r.contratante, 'aceite', r.aceite,
    'anterior', case when ant is null then null else jsonb_build_object('dados', ant.dados, 'contrato', case when mostra_contrato then ant.contrato else null end) end,
    'previa', adm
  );
end $$;

-- ---------- o cliente responde (aceite, ajustes, PDF, contrato assinado) ----------
create or replace function public.proposta_responder(p_codigo text, p_tipo text, p_dados jsonb default '{}'::jsonb)
returns jsonb language plpgsql security definer set search_path = public as $$
declare r public.propostas; novo text;
begin
  if length(coalesce(p_dados::text,'')) > 12000 then raise exception 'dados grandes demais'; end if;
  select * into r from public.propostas where codigo = p_codigo for update;
  if not found or r.status in ('rascunho','arquivada') then raise exception 'proposta indisponivel'; end if;
  novo := r.status;

  if p_tipo = 'aceite' then
    if r.status not in ('enviada','visualizada','em_ajuste') then raise exception 'proposta ja respondida'; end if;
    novo := 'aprovada';
    update public.propostas set
      status = novo,
      aceite = coalesce(p_dados->'aceite','{}'::jsonb) || jsonb_build_object('quando', now(), 'versao', r.versao),
      contratante = p_dados->'contratante'
    where id = r.id;
  elsif p_tipo = 'ajuste_proposta' then
    if r.status not in ('enviada','visualizada','em_ajuste') then raise exception 'proposta ja respondida'; end if;
    novo := 'em_ajuste';
    update public.propostas set status = novo where id = r.id;
  elsif p_tipo = 'ajuste_contrato' then
    if r.status not in ('contrato_liberado','contrato_em_ajuste') then raise exception 'contrato indisponivel'; end if;
    novo := 'contrato_em_ajuste';
    update public.propostas set status = novo where id = r.id;
  elsif p_tipo not in ('baixou_pdf_proposta','baixou_pdf_contrato','abriu_contrato','enviou_assinado','falou_whatsapp') then
    raise exception 'tipo invalido';
  end if;

  insert into public.proposta_eventos (proposta_id, tipo, detalhe)
  values (r.id, p_tipo, coalesce(p_dados,'{}'::jsonb) || jsonb_build_object('versao', r.versao));
  return jsonb_build_object('ok', true, 'status', novo);
end $$;

-- ---------- o administrador publica uma nova versão ----------
create or replace function public.proposta_publicar(p_id uuid, p_dados jsonb, p_contrato jsonb)
returns jsonb language plpgsql security definer set search_path = public as $$
declare r public.propostas; novo text;
begin
  if not public.eh_admin_proposta() then raise exception 'sem permissao'; end if;
  select * into r from public.propostas where id = p_id for update;
  if not found then raise exception 'nao encontrada'; end if;

  -- guarda a versão que o cliente já viu, se algo mudou
  if r.status <> 'rascunho' and (r.dados is distinct from p_dados or r.contrato is distinct from p_contrato) then
    insert into public.proposta_versoes (proposta_id, versao, dados, contrato) values (r.id, r.versao, r.dados, r.contrato);
    novo := case r.status when 'em_ajuste' then 'enviada' when 'contrato_em_ajuste' then 'contrato_liberado' else r.status end;
    update public.propostas set dados = p_dados, contrato = p_contrato, versao = r.versao + 1,
      status = novo, publicado_em = now(), atualizado_em = now() where id = r.id;
    insert into public.proposta_eventos (proposta_id, tipo, detalhe) values (r.id, 'nova_versao', jsonb_build_object('versao', r.versao + 1));
    return jsonb_build_object('ok', true, 'versao', r.versao + 1, 'status', novo);
  end if;

  update public.propostas set dados = p_dados, contrato = p_contrato, atualizado_em = now() where id = r.id;
  return jsonb_build_object('ok', true, 'versao', r.versao, 'status', r.status);
end $$;

revoke execute on function public.proposta_ver(text, boolean) from public;
revoke execute on function public.proposta_responder(text, text, jsonb) from public;
revoke execute on function public.proposta_publicar(uuid, jsonb, jsonb) from public, anon;
grant execute on function public.proposta_ver(text, boolean) to anon, authenticated;
grant execute on function public.proposta_responder(text, text, jsonb) to anon, authenticated;
grant execute on function public.proposta_publicar(uuid, jsonb, jsonb) to authenticated;
grant execute on function public.eh_admin_proposta() to anon, authenticated;
