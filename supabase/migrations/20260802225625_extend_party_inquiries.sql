alter table public.private_party_inquiries
  add column contact_method text check (contact_method in ('Call', 'Text', 'Email')),
  add column preferred_time time,
  add column party_package text check (party_package in ('Intro Party', 'Signature Party', 'VIP Party')),
  add column all_guests_21 boolean,
  add column alcohol_acknowledged boolean not null default false,
  add column safety_acknowledged boolean not null default false,
  add column bringing_food_drinks boolean,
  add column add_ons text[] not null default '{}';
