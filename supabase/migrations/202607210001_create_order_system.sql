create extension if not exists pgcrypto;

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 100),
  phone text not null check (phone ~ '^[6-9][0-9]{9}$'),
  address text not null check (char_length(trim(address)) between 5 and 500),
  pin_code text not null check (pin_code ~ '^[1-9][0-9]{5}$'),
  city text not null check (char_length(trim(city)) between 2 and 100),
  state text not null check (char_length(trim(state)) between 2 and 100),
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_id uuid not null references public.customers(id) on delete restrict,
  bundle text not null check (bundle in ('10 × 33g Sachets','20 × 33g Sachets','50 × 33g Sachets','100 × 33g Sachets','250g Pack')),
  quantity integer not null check (quantity > 0),
  notes text check (notes is null or char_length(notes) <= 1000),
  status text not null default 'new' check (status in ('new','confirmed','dispatched','delivered','cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists customers_phone_idx on public.customers(phone);
create index if not exists customers_created_at_idx on public.customers(created_at desc);
create index if not exists orders_customer_id_idx on public.orders(customer_id);
create index if not exists orders_status_created_at_idx on public.orders(status, created_at desc);
create index if not exists orders_created_at_idx on public.orders(created_at desc);

alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.admin_users enable row level security;

create policy "Admins can read customers"
on public.customers for select to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid()));

create policy "Admins can read orders"
on public.orders for select to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid()));

create policy "Admins can update order status"
on public.orders for update to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid()))
with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

create policy "Admins can view their access record"
on public.admin_users for select to authenticated
using (user_id = auth.uid());

create or replace function public.submit_order(
  customer_name text,
  customer_phone text,
  customer_address text,
  customer_pin_code text,
  customer_city text,
  customer_state text,
  selected_bundle text,
  order_quantity integer,
  order_notes text default null
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  new_customer_id uuid;
  new_order_number text;
begin
  if trim(customer_name) = '' or customer_phone !~ '^[6-9][0-9]{9}$'
     or trim(customer_address) = '' or customer_pin_code !~ '^[1-9][0-9]{5}$'
     or trim(customer_city) = '' or trim(customer_state) = '' or order_quantity < 1 then
    raise exception 'Invalid order details';
  end if;

  if selected_bundle not in ('10 × 33g Sachets','20 × 33g Sachets','50 × 33g Sachets','100 × 33g Sachets','250g Pack') then
    raise exception 'Invalid bundle';
  end if;

  insert into public.customers (name, phone, address, pin_code, city, state)
  values (trim(customer_name), customer_phone, trim(customer_address), customer_pin_code, trim(customer_city), trim(customer_state))
  returning id into new_customer_id;

  loop
    new_order_number := 'RGM-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8));
    begin
      insert into public.orders (order_number, customer_id, bundle, quantity, notes)
      values (new_order_number, new_customer_id, selected_bundle, order_quantity, nullif(trim(order_notes), ''));
      exit;
    exception when unique_violation then
      -- Generate another readable order number on the extremely unlikely collision.
    end;
  end loop;

  return new_order_number;
end;
$$;

revoke all on public.customers from anon, authenticated;
revoke all on public.orders from anon, authenticated;
revoke all on public.admin_users from anon, authenticated;
grant select on public.customers to authenticated;
grant select, update (status) on public.orders to authenticated;
grant select on public.admin_users to authenticated;
revoke all on function public.submit_order(text,text,text,text,text,text,text,integer,text) from public;
grant execute on function public.submit_order(text,text,text,text,text,text,text,integer,text) to anon, authenticated;
