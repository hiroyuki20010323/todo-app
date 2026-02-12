-- TODOアプリ用のtodosテーブルを作成
CREATE TABLE public.todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- user_idにインデックスを追加（認証ユーザーでの検索を高速化）
CREATE INDEX todos_user_id_idx ON public.todos (user_id);

-- RLS（Row Level Security）を有効化
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

-- ポリシー: 認証ユーザーは自分のtodosのみ参照可能
CREATE POLICY "Users can view own todos"
  ON public.todos
  FOR SELECT
  USING (auth.uid() = user_id);

-- ポリシー: 認証ユーザーは自分のtodosのみ作成可能
CREATE POLICY "Users can insert own todos"
  ON public.todos
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ポリシー: 認証ユーザーは自分のtodosのみ更新可能
CREATE POLICY "Users can update own todos"
  ON public.todos
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ポリシー: 認証ユーザーは自分のtodosのみ削除可能
CREATE POLICY "Users can delete own todos"
  ON public.todos
  FOR DELETE
  USING (auth.uid() = user_id);
