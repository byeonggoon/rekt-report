-- rekt-report initial schema
-- Shared Supabase instance — all tables prefixed rr_ (isolation pattern from stableblacklist's sbl_)

-- gen_random_uuid() lives in pgcrypto (already enabled on Supabase, but be explicit)
create extension if not exists pgcrypto;

-- 사건: 등록된 익스플로잇/해킹 인시던트
create table if not exists rr_incidents (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  hacker_addresses jsonb not null,          -- [{ address, chain }]
  incident_at timestamptz not null,          -- 사건 발생 시각 (추적 시작 기준점)
  status text not null default 'registered', -- registered | tracing | traced | failed
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 추적 잡: 사건당 1..n회 실행 (재실행 허용)
create table if not exists rr_trace_jobs (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid not null references rr_incidents(id) on delete cascade,
  status text not null default 'queued',     -- queued | running | completed | failed
  config jsonb not null,                     -- { pruneThreshold, maxHops, maxAddresses, dustCutoff }
  hop_count int not null default 0,
  visited_count int not null default 0,
  taint_coverage numeric,                    -- 0..1: 종착점에 귀속된 오염 자금 비율
  error text,
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz not null default now()
);

-- 체크포인트: 홉 단위 진행 기록 — 잡 재개성 + 대시보드 진행 표시를 동시에 담당
create table if not exists rr_checkpoints (
  id bigint generated always as identity primary key,
  job_id uuid not null references rr_trace_jobs(id) on delete cascade,
  hop int not null,
  frontier jsonb not null,                   -- 다음 홉에서 확장할 [{ address, chain, taintRatio, taintedAmount }]
  visited jsonb not null,                    -- 이 홉까지 방문한 주소 요약 (카운트/상위 항목)
  created_at timestamptz not null default now(),
  unique (job_id, hop)
);

-- 종착점: 추적이 멈춘 지점의 분류 결과
create table if not exists rr_endpoints (
  id bigint generated always as identity primary key,
  job_id uuid not null references rr_trace_jobs(id) on delete cascade,
  address text not null,
  chain text not null,
  type text not null,                        -- cex | dormant | mixer | bridge-out | pruned
  entity_name text,                          -- CEX/믹서 라벨 (chasechain entity DB 판정)
  tainted_amount text not null,              -- base units, bigint 문자열
  token_symbol text not null,
  taint_ratio numeric not null,
  path_tx_hashes jsonb not null,             -- 시드 → 이 주소까지의 경로 TX 해시
  created_at timestamptz not null default now()
);

-- 증거 패키지: 생성된 표준형 리포트
create table if not exists rr_evidence_packages (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid not null references rr_incidents(id) on delete cascade,
  job_id uuid not null references rr_trace_jobs(id) on delete cascade,
  pdf_url text,
  methodology text not null,                 -- taint 방식 명시 (예: haircut, prune 1%, maxHops 10)
  summary jsonb not null,                    -- 종착점별 합계 등 대시보드용 요약
  generated_at timestamptz not null default now()
);

create index if not exists rr_trace_jobs_incident_idx on rr_trace_jobs(incident_id);
create index if not exists rr_checkpoints_job_idx on rr_checkpoints(job_id);
create index if not exists rr_endpoints_job_idx on rr_endpoints(job_id);
