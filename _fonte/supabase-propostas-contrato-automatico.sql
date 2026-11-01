-- =============================================================
--  PROPOSTAS · CONTRATO NA HORA DO ACEITE  (rodar UMA vez no SQL Editor do Supabase)
--  Se o contrato estiver completo (sem campos a preencher), ele é liberado
--  para o cliente assim que ele aceita a proposta.
-- =============================================================
create or replace function public.proposta_contrato_completo(p_id uuid)
returns boolean language plpgsql stable security definer set search_path = public as $$
declare r public.propostas; d jsonb; c jsonb; k text;
begin
  select * into r from public.propostas where id = p_id;
  if not found then return false; end if;
  d := coalesce(r.dados, '{}'::jsonb); c := coalesce(r.contratante, '{}'::jsonb);
  if jsonb_array_length(coalesce(r.contrato->'clausulas', '[]'::jsonb)) = 0 then return false; end if;
  foreach k in array array['razao','cnpj','endereco','representante','cpf'] loop
    if coalesce(trim(c->>k), '') = '' then return false; end if;
  end loop;
  foreach k in array array['data_evento','local','carga_horaria','formato','participantes'] loop
    if coalesce(trim(d->'detalhes'->>k), '') = '' or lower(trim(d->'detalhes'->>k)) in ('a combinar','a definir','[a preencher]') then return false; end if;
  end loop;
  foreach k in array array['estrutura','inclui','pagamento','itens'] loop
    if jsonb_typeof(d->k) is distinct from 'array' or jsonb_array_length(d->k) = 0 then return false; end if;
  end loop;
  return true;
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
  elsif p_tipo not in ('baixou_pdf_proposta','baixou_pdf_contrato','abriu_contrato','enviou_assinado','falou_whatsapp','enviou_comprovante') then
    raise exception 'tipo invalido';
  end if;

  insert into public.proposta_eventos (proposta_id, tipo, detalhe)
  values (r.id, p_tipo, coalesce(p_dados,'{}'::jsonb) || jsonb_build_object('versao', r.versao));
  return jsonb_build_object('ok', true, 'status', novo);
end $$;
revoke execute on function public.proposta_contrato_completo(uuid) from public, anon;
grant execute on function public.proposta_contrato_completo(uuid) to authenticated;
