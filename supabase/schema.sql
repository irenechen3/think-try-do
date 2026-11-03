-- Think Try Go — Founding Families waitlist
-- Run once in the Supabase SQL editor (Dashboard → SQL → New query).

create extension if not exists "pgcrypto";

create table if not exists public.waitlist_signups (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),

  parent_first_name text    not null,
  email             text    not null,
  whatsapp          text,

  -- 3 = "under 4", 13 = "13 or older"
  child_ages        smallint[] not null,
  child_count       smallint   not null,

  location          text not null check (location in ('coronado','nueva_gorgona','chame','san_carlos','other')),
  location_other    text,

  interests         text[] not null,
  interest_other    text,
  duration          text not null check (duration in ('2h','2.5h','3h','no_preference')),
  preferred_days    text[] not null,
  language          text not null check (language in ('en','es','either')),
  love_to_try       text,

  consent           boolean not null default false,
  ui_locale         text not null default 'en',

  utm_source        text,
  utm_medium        text,
  utm_campaign      text,
  utm_content       text,
  referrer          text
);

create index if not exists waitlist_signups_created_at_idx on public.waitlist_signups (created_at desc);
create index if not exists waitlist_signups_email_idx on public.waitlist_signups (lower(email));

-- Lock the table down: only the server (service role key) can read/write.
-- The browser never talks to Supabase directly.
alter table public.waitlist_signups enable row level security;
-- (No policies = anon/authenticated roles have no access. Service role bypasses RLS.)


-- ---------------------------------------------------------------------------
-- Handy views for validating demand
-- ---------------------------------------------------------------------------

-- One row per family (latest submission wins if someone signs up twice).
create or replace view public.waitlist_families as
select distinct on (lower(email)) *
from public.waitlist_signups
order by lower(email), created_at desc;

create or replace view public.demand_by_interest as
select unnest(interests) as interest, count(*) as families
from public.waitlist_families group by 1 order by 2 desc;

create or replace view public.demand_by_day as
select unnest(preferred_days) as day, count(*) as families
from public.waitlist_families group by 1 order by 2 desc;

create or replace view public.demand_by_age as
select unnest(child_ages) as age, count(*) as children
from public.waitlist_families group by 1 order by 1;

create or replace view public.demand_by_location as
select coalesce(nullif(location_other, ''), location) as location, count(*) as families
from public.waitlist_families group by 1 order by 2 desc;

create or replace view public.demand_by_duration as
select duration, count(*) as families
from public.waitlist_families group by 1 order by 2 desc;

create or replace view public.demand_by_language as
select language, count(*) as families
from public.waitlist_families group by 1 order by 2 desc;

-- Views inherit nothing from RLS by default; keep them server-only too.
revoke all on public.waitlist_families, public.demand_by_interest, public.demand_by_day,
  public.demand_by_age, public.demand_by_location, public.demand_by_duration,
  public.demand_by_language from anon, authenticated;
