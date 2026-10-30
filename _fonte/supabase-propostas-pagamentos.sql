-- =============================================================
--  PROPOSTAS · PAGAMENTOS  (rodar UMA vez no SQL Editor do Supabase, depois do supabase-propostas.sql)
--  Guarda as parcelas recebidas e mostra o Pix para o cliente.
-- =============================================================
alter table public.propostas add column if not exists pagamentos jsonb not null default '[]'::jsonb;
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
    'contratante', r.contratante, 'aceite', r.aceite, 'pagamentos', r.pagamentos,
    'anterior', case when ant is null then null else jsonb_build_object('dados', ant.dados, 'contrato', case when mostra_contrato then ant.contrato else null end) end,
    'previa', adm
  );
end $$;
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
  elsif p_tipo not in ('baixou_pdf_proposta','baixou_pdf_contrato','abriu_contrato','enviou_assinado','falou_whatsapp','enviou_comprovante') then
    raise exception 'tipo invalido';
  end if;

  insert into public.proposta_eventos (proposta_id, tipo, detalhe)
  values (r.id, p_tipo, coalesce(p_dados,'{}'::jsonb) || jsonb_build_object('versao', r.versao));
  return jsonb_build_object('ok', true, 'status', novo);
end $$;
