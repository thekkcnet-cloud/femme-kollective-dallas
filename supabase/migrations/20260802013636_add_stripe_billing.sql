alter table public.membership_plans
  add column stripe_product_id text unique,
  add column stripe_price_id text unique;

update public.membership_plans set
  stripe_product_id = case slug
    when 'first-timer' then 'prod_UznvCuEWfWA03J'
    when 'starter' then 'prod_Uznvptpq6ZUQko'
    when 'enthusiast' then 'prod_UznvJaBYQ1nH8q'
    when 'unlimited-vip' then 'prod_UznvKSFz3K8CfX'
  end,
  stripe_price_id = case slug
    when 'first-timer' then 'price_1TzoKCECd0ECkskHukQfx9tp'
    when 'starter' then 'price_1TzoKCECd0ECkskHGim4Fu55'
    when 'enthusiast' then 'price_1TzoKCECd0ECkskHPSApxGmL'
    when 'unlimited-vip' then 'price_1TzoKCECd0ECkskHy6RJqT4I'
  end;

create table public.payment_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  plan_id uuid references public.membership_plans(id) on delete restrict,
  customer_email text not null,
  stripe_checkout_session_id text not null unique,
  stripe_customer_id text,
  stripe_payment_intent_id text,
  stripe_subscription_id text,
  amount_total integer,
  currency text not null default 'usd',
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'paid', 'no_payment_required', 'refunded', 'failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index payment_orders_user_idx on public.payment_orders(user_id, created_at desc);
create index payment_orders_customer_email_idx on public.payment_orders(lower(customer_email));

create table public.stripe_webhook_events (
  event_id text primary key,
  event_type text not null,
  processed_at timestamptz not null default now()
);

alter table public.stripe_webhook_events enable row level security;

create trigger payment_orders_updated_at before update on public.payment_orders
for each row execute function private.set_updated_at();

alter table public.payment_orders enable row level security;

create policy "Users read own payment orders" on public.payment_orders
for select to authenticated
using ((select auth.uid()) = user_id or (select private.is_admin()));

grant select on public.payment_orders to authenticated;

insert into public.membership_plans
  (slug, name, price_cents, billing_interval, class_credits, is_unlimited, perks, is_featured, stripe_product_id, stripe_price_id)
values
  ('drop-in', 'Single Class Drop-In', 3000, 'one_time', 1, false, array['One studio class'], false, 'prod_UznvE0szuocqwT', 'price_1TzoKCECd0ECkskHkRB2S29t');
