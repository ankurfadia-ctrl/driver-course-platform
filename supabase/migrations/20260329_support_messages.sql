create table if not exists public.support_messages (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.support_requests(id) on delete cascade,
  sender_role text not null check (sender_role in ('admin', 'student')),
  sender_user_id uuid,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists support_messages_request_id_idx
  on public.support_messages (request_id, created_at);
