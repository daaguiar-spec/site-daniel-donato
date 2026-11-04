-- =============================================================
--  PROPOSTAS · ACOMPANHAMENTO DAS VISITAS  (rodar UMA vez no SQL Editor do Supabase)
--  Permite registrar o resumo de cada visita (até onde foi, tempo, cliques).
-- =============================================================
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
    -- contrato completo (sem campos a preencher): libera na hora
    if public.proposta_contrato_completo(r.id) then
      novo := 'contrato_liberado';
      update public.propostas set status = novo where id = r.id;
      insert into public.proposta_eventos (proposta_id, tipo, detalhe) values (r.id, 'contrato_liberado_auto', jsonb_build_object('versao', r.versao));
    end if;
  elsif p_tipo = 'ajuste_proposta' then
    if r.status not in ('enviada','visualizada','em_ajuste') then raise exception 'proposta ja respondida'; end if;
    novo := 'em_ajuste';
    update public.propostas set status = novo where id = r.id;
  elsif p_tipo = 'ajuste_contrato' then
    if r.status not in ('contrato_liberado','contrato_em_ajuste') then raise exception 'contrato indisponivel'; end if;
    novo := 'contrato_em_ajuste';
    update public.propostas set status = novo where id = r.id;
  elsif p_tipo not in ('baixou_pdf_proposta','baixou_pdf_contrato','abriu_contrato','enviou_assinado','falou_whatsapp','enviou_comprovante','resumo') then
    raise exception 'tipo invalido';
  end if;

  insert into public.proposta_eventos (proposta_id, tipo, detalhe)
  values (r.id, p_tipo, coalesce(p_dados,'{}'::jsonb) || jsonb_build_object('versao', r.versao));
  return jsonb_build_object('ok', true, 'status', novo);
end $$;
