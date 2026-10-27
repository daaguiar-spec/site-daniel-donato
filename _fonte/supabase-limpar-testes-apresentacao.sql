-- =============================================================
--  Apresentação comercial — remover aberturas de TESTE (rodar no SQL Editor do Supabase)
--  Apaga só os eventos destes 3 testes. Nada mais é alterado.
-- =============================================================

-- PASSO 1 — CONFERIR (só mostra, não apaga nada). Deve listar 8 visitas.
select criado_em at time zone 'America/Sao_Paulo' as quando, tipo, cliente, vendedor, dispositivo
from public.site_eventos
where pagina like '/apresentacao%'
  and (lower(trim(cliente)), lower(trim(coalesce(vendedor,'')))) in (
        ('daniel teste',   'daniel donato'),
        ('djalma',         'daniel'),
        ('sérgio holanda', 'daniel donato')
      )
order by criado_em;

-- PASSO 2 — APAGAR (só depois de conferir o passo 1). Não tem volta.
delete from public.site_eventos
where pagina like '/apresentacao%'
  and (lower(trim(cliente)), lower(trim(coalesce(vendedor,'')))) in (
        ('daniel teste',   'daniel donato'),
        ('djalma',         'daniel'),
        ('sérgio holanda', 'daniel donato')
      );
