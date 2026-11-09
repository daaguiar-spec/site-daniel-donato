-- Link de revisão interna (para a equipe ver a proposta antes do cliente, sem contar visita). Rodar uma vez no SQL Editor.
alter table public.propostas add column if not exists revisao text;
create or replace function public.proposta_revisao(p_codigo text, p_token text)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare r public.propostas; ant record;
begin
  select * into r from public.propostas where codigo = p_codigo;
  if not found or r.status = 'arquivada' or r.revisao is null or length(coalesce(p_token, '')) < 12 or r.revisao <> p_token then return null; end if;
  select dados, contrato into ant from public.proposta_versoes
   where proposta_id = r.id and versao = r.versao - 1 order by id desc limit 1;
  return jsonb_build_object(
    'codigo', r.codigo, 'cliente', r.cliente, 'vendedor', r.vendedor, 'fone', r.fone,
    'status', r.status, 'versao', r.versao, 'publicado_em', coalesce(r.publicado_em, r.atualizado_em),
    'dados', r.dados, 'contrato', r.contrato,
    'contratante', r.contratante, 'aceite', r.aceite, 'pagamentos', r.pagamentos,
    'anterior', case when ant is null then null else jsonb_build_object('dados', ant.dados, 'contrato', ant.contrato) end,
    'previa', true, 'revisao', true
  );
end $$;
grant execute on function public.proposta_revisao(text, text) to anon, authenticated;
notify pgrst, 'reload schema';
