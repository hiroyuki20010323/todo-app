-- todosテーブルに優先度（priority）カラムを追加
-- 値の意味: 1=低、2=中、3=高
ALTER TABLE public.todos
  ADD COLUMN priority INTEGER NOT NULL DEFAULT 1;

-- 優先度の妥当性を保証するCHECK制約（オプション）
ALTER TABLE public.todos
  ADD CONSTRAINT todos_priority_check CHECK (priority >= 1 AND priority <= 3);
