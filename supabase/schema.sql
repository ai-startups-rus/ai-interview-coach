create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  created_at timestamp with time zone default now()
);

create table resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  content text not null,
  parsed_json jsonb,
  created_at timestamp with time zone default now()
);

create table jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  description text not null,
  analysis_json jsonb,
  created_at timestamp with time zone default now()
);

create table interviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  job_id uuid references jobs(id),
  resume_id uuid references resumes(id),
  status text default 'started',
  created_at timestamp with time zone default now()
);

create table questions (
  id uuid primary key default gen_random_uuid(),
  interview_id uuid references interviews(id),
  type text,
  question text not null,
  expected_signals jsonb
);

create table answers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid references questions(id),
  answer text not null,
  evaluation_json jsonb,
  created_at timestamp with time zone default now()
);

create table reports (
  id uuid primary key default gen_random_uuid(),
  interview_id uuid references interviews(id),
  report_json jsonb not null,
  created_at timestamp with time zone default now()
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  plan text,
  status text,
  created_at timestamp with time zone default now()
);

create table usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  event_name text not null,
  payload jsonb,
  created_at timestamp with time zone default now()
);
