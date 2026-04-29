-- ============================================================================
-- ADMIN POLICIES — admins can do everything (fix for "edit/delete don't work")
-- ============================================================================
create or replace function public.is_admin()
returns boolean
language sql security definer stable
as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

drop policy if exists "admin all profiles" on profiles;
create policy "admin all profiles" on profiles for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin all categories" on service_categories;
create policy "admin all categories" on service_categories for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin all services" on services;
create policy "admin all services" on services for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin all addresses" on addresses;
create policy "admin all addresses" on addresses for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin all providers" on providers;
create policy "admin all providers" on providers for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin all bookings" on bookings;
create policy "admin all bookings" on bookings for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin all booking_log" on booking_status_log;
create policy "admin all booking_log" on booking_status_log for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin all notifications" on notifications;
create policy "admin all notifications" on notifications for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin all favorites" on favorites;
create policy "admin all favorites" on favorites for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin all reviews" on reviews;
create policy "admin all reviews" on reviews for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin all offers" on offers;
create policy "admin all offers" on offers for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin all payouts" on payouts;
create policy "admin all payouts" on payouts for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin all push" on push_tokens;
create policy "admin all push" on push_tokens for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin all rooms" on chat_rooms;
create policy "admin all rooms" on chat_rooms for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin all messages" on messages;
create policy "admin all messages" on messages for all using (public.is_admin()) with check (public.is_admin());

-- Refunds & support tables (used by admin) — make sure they exist
create table if not exists refunds (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings(id) on delete set null,
  user_id uuid references profiles(id) on delete set null,
  amount numeric(10,2) not null default 0,
  reason text,
  status text default 'pending',
  created_at timestamptz default now()
);
alter table refunds enable row level security;
drop policy if exists "admin all refunds" on refunds;
create policy "admin all refunds" on refunds for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "user own refund" on refunds;
create policy "user own refund" on refunds for select using (auth.uid() = user_id);

create table if not exists support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  subject text not null,
  body text,
  priority text default 'normal',
  status text default 'open',
  created_at timestamptz default now()
);
alter table support_tickets enable row level security;
drop policy if exists "admin all support" on support_tickets;
create policy "admin all support" on support_tickets for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "user own support" on support_tickets;
create policy "user own support" on support_tickets for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
