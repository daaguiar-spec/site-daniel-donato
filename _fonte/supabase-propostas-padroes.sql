-- Padrões das propostas novas (botão "Tornar padrão" no painel). Rodar uma vez no SQL Editor.
create table if not exists public.proposta_padroes (
  id            text primary key default 'geral',
  valores       jsonb not null default '{}'::jsonb,
  atualizado_em timestamptz not null default now()
);
alter table public.proposta_padroes enable row level security;
drop policy if exists "admins padroes" on public.proposta_padroes;
create policy "admins padroes" on public.proposta_padroes for all to authenticated
  using (public.eh_admin_proposta()) with check (public.eh_admin_proposta());
insert into public.proposta_padroes (id) values ('geral') on conflict (id) do nothing;
notify pgrst, 'reload schema';
