-- TODOアプリ用のSeedデータ
-- 開発用: テストユーザーを作成し、todosにサンプルデータを挿入

-- pgcrypto拡張を有効化（パスワードハッシュ用）
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- テストユーザーをauth.usersに挿入（固定UUIDで開発用）
-- ログイン: test@example.com / password123
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-1111-1111-111111111111',
  'authenticated',
  'authenticated',
  'test@example.com',
  crypt('password123', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW()
);

-- テストユーザーのidentityを登録（ログインに必要）
INSERT INTO auth.identities (
  id,
  user_id,
  provider_id,
  identity_data,
  provider,
  created_at,
  updated_at
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  '{"sub":"11111111-1111-1111-1111-111111111111","email":"test@example.com"}',
  'email',
  NOW(),
  NOW()
);

-- RLSを一時的に無効化（開発用Seedの挿入）
ALTER TABLE public.todos DISABLE ROW LEVEL SECURITY;

-- todosにサンプルデータを挿入（5件）
INSERT INTO public.todos (title, completed, user_id) VALUES
  ('牛乳を買う', true, '11111111-1111-1111-1111-111111111111'),
  ('メールを読む', false, '11111111-1111-1111-1111-111111111111'),
  ('プロジェクトの報告書を書く', false, '11111111-1111-1111-1111-111111111111'),
  ('歯医者の予約をする', true, '11111111-1111-1111-1111-111111111111'),
  ('運動する', false, '11111111-1111-1111-1111-111111111111');

-- RLSを再度有効化
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;
