-- ============================================================================
-- Klarbill — Database Schema (Supabase / PostgreSQL)
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================================

-- ----------------------------------------------------------------------------
-- profiles : 1-1 with auth.users, holds onboarding + business info
-- ----------------------------------------------------------------------------

create table if not exists public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  email           text not null,
  full_name       text,
  company_name    text,
  is_kleinunternehmer boolean default false,    -- §19 UStG
  tax_id          text,                          -- Steuernummer / USt-IdNr
  iban            text,
  bic             text,
  logo_url        text,
  locale          text default 'de',
  onboarding_step integer default 0,             -- 0..4 (welcome..done)
  plan            text default 'starter',        -- starter | pro
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- Row Level Security: each user sees only their own profile
alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

-- ----------------------------------------------------------------------------
-- Trigger: auto-create profile row on auth.users insert
-- ----------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- updated_at trigger helper
-- ----------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ============================================================================
-- Future tables (placeholders, build out in Phase 2)
-- ============================================================================
-- clients   : id, profile_id (fk), name, email, address, tax_id, ...
-- invoices  : id, profile_id, client_id, number, status, amounts, dates, xml ...
-- ============================================================================
