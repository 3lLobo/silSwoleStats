create table public.users (
  id uuid not null primary key, -- UUID from auth.users
  email text,
  provider text,
  full_name text
);
comment on table public.users is 'Profile data for each user.';
comment on column public.users.id is 'References the internal Supabase Auth user.';

create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, email, provider)
  values (new.id, new.email, new.provider);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();