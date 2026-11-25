-- RAIO-X DO ENCANTAMENTO — tabela dos diagnósticos (danieldonato.com.br/raiox)
-- Rode UMA vez no Supabase: SQL Editor → New query → colar tudo → Run.
-- Segurança: o público (chave pública do site) só consegue ENVIAR um diagnóstico.
-- Ler, filtrar e apagar fica restrito a quem entra pelo login do painel (mesmo login das Propostas).

create table if not exists public.raiox_diagnosticos (
  id uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),
  nome text not null check (char_length(nome) between 2 and 120),
  empresa text not null check (char_length(empresa) between 1 and 120),
  cargo text not null check (char_length(cargo) between 1 and 80),
  whatsapp text not null check (whatsapp ~ '^[0-9]{10,11}$'),
  consentimento boolean not null check (consentimento),
  contato_comercial boolean not null default false,
  respostas smallint[] not null check (array_length(respostas, 1) = 10 and 0 <= all(respostas) and 2 >= all(respostas)),
  pontuacao smallint not null default 0,
  nivel text not null default '',
  interesse boolean not null default false,
  origem text check (origem is null or char_length(origem) <= 40)
);

-- A pontuação e o nível são calculados pelo próprio banco (ninguém consegue enviar uma nota falsa).
create or replace function public.raiox_calcula() returns trigger
language plpgsql as $$
declare t int := 0; r smallint;
begin
  foreach r in array new.respostas loop t := t + r; end loop;
  new.pontuacao := t;
  new.nivel := case when t <= 7 then 'Cultura em desenvolvimento'
                    when t <= 14 then 'Cultura em evolução'
                    else 'Cultura fortalecida' end;
  if tg_op = 'INSERT' then
    new.criado_em := now();
    new.interesse := false;
  end if;
  return new;
end $$;

drop trigger if exists raiox_calcula on public.raiox_diagnosticos;
create trigger raiox_calcula before insert or update of respostas on public.raiox_diagnosticos
  for each row execute function public.raiox_calcula();

alter table public.raiox_diagnosticos enable row level security;

drop policy if exists "raiox envia" on public.raiox_diagnosticos;
create policy "raiox envia" on public.raiox_diagnosticos for insert to anon, authenticated with check (true);

drop policy if exists "raiox admin le" on public.raiox_diagnosticos;
create policy "raiox admin le" on public.raiox_diagnosticos for select to authenticated using (true);

drop policy if exists "raiox admin apaga" on public.raiox_diagnosticos;
create policy "raiox admin apaga" on public.raiox_diagnosticos for delete to authenticated using (true);

revoke all on public.raiox_diagnosticos from anon, authenticated;
grant insert on public.raiox_diagnosticos to anon, authenticated;
grant select, delete on public.raiox_diagnosticos to authenticated;

-- Marca "clicou em Quero desenvolver minha equipe". Só altera esse campo, e só de um diagnóstico cujo id a pessoa já tem.
create or replace function public.raiox_interesse(p_id uuid) returns void
language sql security definer set search_path = public as $$
  update public.raiox_diagnosticos set interesse = true where id = p_id;
$$;
revoke all on function public.raiox_interesse(uuid) from public;
grant execute on function public.raiox_interesse(uuid) to anon, authenticated;

create index if not exists raiox_diagnosticos_criado_em on public.raiox_diagnosticos (criado_em desc);
