alter table public.private_party_inquiries
  add column party_type text check (party_type in ('Pole', 'Heels', 'Lap/Chair'));
