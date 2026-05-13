create table products (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  price numeric(10, 2) not null,
  image_url text,
  category text not null default 'General',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table products enable row level security;

create policy "Public can read products" on products
  for select using (true);

create policy "Admins can insert products" on products
  for insert with check (auth.role() = 'authenticated');

create policy "Admins can update products" on products
  for update using (auth.role() = 'authenticated');

create policy "Admins can delete products" on products
  for delete using (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public) values ('products', 'products', true)
on conflict (id) do nothing;

create policy "Public can read product images"
  on storage.objects for select
  using ( bucket_id = 'products' );

create policy "Admins can upload product images"
  on storage.objects for insert
  with check ( bucket_id = 'products' and auth.role() = 'authenticated' );

create policy "Admins can update product images"
  on storage.objects for update
  using ( bucket_id = 'products' and auth.role() = 'authenticated' );

create policy "Admins can delete product images"
  on storage.objects for delete
  using ( bucket_id = 'products' and auth.role() = 'authenticated' );
