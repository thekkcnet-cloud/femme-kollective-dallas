create extension if not exists pgcrypto;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create type public.booking_status as enum ('confirmed', 'waitlisted', 'cancelled', 'attended', 'no_show');
create type public.inquiry_status as enum ('new', 'contacted', 'quoted', 'booked', 'closed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  emergency_contact_name text,
  emergency_contact_phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.class_types (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  duration_minutes integer not null default 60 check (duration_minutes between 15 and 240),
  level text not null default 'All levels',
  image_path text,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.instructors (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles(id) on delete set null,
  display_name text not null,
  bio text,
  specialties text[] not null default '{}',
  image_path text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.class_sessions (
  id uuid primary key default gen_random_uuid(),
  class_type_id uuid not null references public.class_types(id) on delete restrict,
  instructor_id uuid references public.instructors(id) on delete set null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  capacity integer not null default 12 check (capacity between 1 and 100),
  location_name text not null default 'Femme Kollective',
  location_address text not null default '8438 Old Hickory Trail, Dallas, TX 75237',
  is_cancelled boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

create index class_sessions_starts_at_idx on public.class_sessions(starts_at);
create index class_sessions_class_type_idx on public.class_sessions(class_type_id, starts_at);

create table public.membership_plans (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  price_cents integer not null check (price_cents >= 0),
  billing_interval text not null default 'month' check (billing_interval in ('one_time', 'month')),
  class_credits integer check (class_credits is null or class_credits > 0),
  is_unlimited boolean not null default false,
  perks text[] not null default '{}',
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.customer_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  plan_id uuid not null references public.membership_plans(id) on delete restrict,
  status text not null default 'active' check (status in ('active', 'paused', 'cancelled', 'expired')),
  credits_remaining integer check (credits_remaining is null or credits_remaining >= 0),
  current_period_start timestamptz not null default now(),
  current_period_end timestamptz,
  external_customer_id text,
  external_subscription_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index customer_memberships_user_idx on public.customer_memberships(user_id, status);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.class_sessions(id) on delete restrict,
  user_id uuid not null references public.profiles(id) on delete cascade,
  membership_id uuid references public.customer_memberships(id) on delete set null,
  status public.booking_status not null default 'confirmed',
  checked_in_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (session_id, user_id)
);

create index bookings_session_status_idx on public.bookings(session_id, status);
create index bookings_user_idx on public.bookings(user_id, created_at desc);

create table public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.class_sessions(id) on delete set null,
  offer_slug text,
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  phone text,
  message text check (message is null or char_length(message) <= 2000),
  status public.inquiry_status not null default 'new',
  created_at timestamptz not null default now()
);

create table public.private_party_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  phone text,
  occasion text not null check (occasion in ('Bachelorette', 'Birthday', 'Girls Night Out', 'Other')),
  preferred_date date,
  guest_count integer check (guest_count is null or guest_count between 2 and 60),
  message text check (message is null or char_length(message) <= 3000),
  status public.inquiry_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.marketing_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  full_name text,
  source text not null default 'website',
  consent_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create or replace function private.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function private.is_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'staff'), false);
$$;

create trigger profiles_updated_at before update on public.profiles for each row execute function private.set_updated_at();
create trigger class_types_updated_at before update on public.class_types for each row execute function private.set_updated_at();
create trigger instructors_updated_at before update on public.instructors for each row execute function private.set_updated_at();
create trigger class_sessions_updated_at before update on public.class_sessions for each row execute function private.set_updated_at();
create trigger membership_plans_updated_at before update on public.membership_plans for each row execute function private.set_updated_at();
create trigger customer_memberships_updated_at before update on public.customer_memberships for each row execute function private.set_updated_at();
create trigger bookings_updated_at before update on public.bookings for each row execute function private.set_updated_at();
create trigger private_party_inquiries_updated_at before update on public.private_party_inquiries for each row execute function private.set_updated_at();

alter table public.profiles enable row level security;
alter table public.class_types enable row level security;
alter table public.instructors enable row level security;
alter table public.class_sessions enable row level security;
alter table public.membership_plans enable row level security;
alter table public.customer_memberships enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_requests enable row level security;
alter table public.private_party_inquiries enable row level security;
alter table public.marketing_leads enable row level security;

create policy "Published class types are public" on public.class_types for select to anon, authenticated using (is_published);
create policy "Active instructors are public" on public.instructors for select to anon, authenticated using (is_active);
create policy "Upcoming sessions are public" on public.class_sessions for select to anon, authenticated using (not is_cancelled and starts_at >= now());
create policy "Active plans are public" on public.membership_plans for select to anon, authenticated using (is_active);

create policy "Users read own profile" on public.profiles for select to authenticated using ((select auth.uid()) = id or (select private.is_admin()));
create policy "Users update own profile" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "Users read own memberships" on public.customer_memberships for select to authenticated using ((select auth.uid()) = user_id or (select private.is_admin()));
create policy "Users read own bookings" on public.bookings for select to authenticated using ((select auth.uid()) = user_id or (select private.is_admin()));
create policy "Users create own bookings" on public.bookings for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users cancel own bookings" on public.bookings for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id and status = 'cancelled');

create policy "Anyone may request a booking" on public.booking_requests for insert to anon, authenticated with check (status = 'new');
create policy "Anyone may inquire about a party" on public.private_party_inquiries for insert to anon, authenticated with check (status = 'new');
create policy "Anyone may join the mailing list" on public.marketing_leads for insert to anon, authenticated with check (source = 'website');

create policy "Staff manage class types" on public.class_types for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Staff manage instructors" on public.instructors for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Staff manage sessions" on public.class_sessions for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Staff manage plans" on public.membership_plans for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Staff manage memberships" on public.customer_memberships for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Staff manage bookings" on public.bookings for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Staff manage booking requests" on public.booking_requests for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Staff manage party inquiries" on public.private_party_inquiries for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Staff manage leads" on public.marketing_leads for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

grant usage on schema public to anon, authenticated;
grant select on public.class_types, public.instructors, public.class_sessions, public.membership_plans to anon, authenticated;
grant insert on public.booking_requests, public.private_party_inquiries, public.marketing_leads to anon, authenticated;
grant select, insert, update on public.profiles, public.bookings to authenticated;
grant select on public.customer_memberships to authenticated;
grant usage on type public.booking_status, public.inquiry_status to anon, authenticated;
grant usage on schema private to authenticated;
grant execute on function private.is_admin() to authenticated;

insert into public.class_types (slug, name, description, image_path, sort_order) values
  ('pole-fitness', 'Pole Fitness', 'Build strength and embrace your power.', '/pole-fitness.png', 1),
  ('heels-choreography', 'Heels Choreography', 'Walk in confidence. Own the room.', '/heels-choreography.png', 2),
  ('lap-chair', 'Lap & Chair', 'Seductive, fierce, unapologetic.', '/lap-chair.png', 3),
  ('floorwork', 'Floorwork', 'Flow, express, feel the power.', '/floorwork.png', 4),
  ('flex-appeal', 'Flex Appeal', 'Lengthen and strengthen your dance body.', '/flex-appeal.png', 5);

insert into public.instructors (display_name, bio, specialties, image_path) values
  ('Krystal P.', 'Founder and instructor creating a judgment-free space for women to reclaim confidence through movement.', array['Pole', 'Heels', 'Floorwork'], '/professional-headshot.png');

insert into public.membership_plans (slug, name, price_cents, billing_interval, class_credits, is_unlimited, perks, is_featured) values
  ('first-timer', 'The First Timer Special', 3900, 'one_time', 3, false, array['3 classes', 'Valid for 14 days'], true),
  ('starter', 'Starter', 7900, 'month', 4, false, array['4 classes each month', 'Easy online booking', 'Cancel anytime'], false),
  ('enthusiast', 'Enthusiast', 11900, 'month', 8, false, array['8 classes each month', '10% off merch', 'Priority waitlist access'], false),
  ('unlimited-vip', 'Unlimited VIP', 14900, 'month', null, true, array['Unlimited studio classes', 'Member-only events', '10% off merch'], true);
