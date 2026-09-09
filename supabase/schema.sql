-- Schema for WordyKids (PostgreSQL on Supabase)
-- Execute this script in the Supabase SQL Editor

-- 1. Profiles Table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  player_name text default 'Знайка',
  avatar text default '🦁',
  streak integer default 1,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Topic Progress Table
create table if not exists public.topic_progress (
  user_id uuid references auth.users on delete cascade not null,
  topic_id text not null,
  stars integer default 0,
  mastered_words jsonb default '[]'::jsonb,
  last_played_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (user_id, topic_id)
);

-- 3. Word Progress Table
create table if not exists public.word_progress (
  user_id uuid references auth.users on delete cascade not null,
  word_id text not null,
  topic_id text not null,
  times_correct integer default 0,
  times_wrong integer default 0,
  is_learned boolean default false,
  last_reviewed_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (user_id, word_id)
);

-- 4. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.topic_progress enable row level security;
alter table public.word_progress enable row level security;

-- 5. RLS Policies
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "Users can view own topic progress" on public.topic_progress
  for select using (auth.uid() = id);

create policy "Users can manage own topic progress" on public.topic_progress
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "Users can view own word progress" on public.word_progress
  for select using (auth.uid() = id);

create policy "Users can manage own word progress" on public.word_progress
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- 6. Trigger to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, player_name, avatar)
  values (new.id, coalesce(new.raw_user_meta_data->>'player_name', 'Супер-Знайка'), '🦁')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
