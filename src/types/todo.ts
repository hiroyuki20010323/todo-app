export type Priority = 1 | 2 | 3;

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  created_at: string;
  user_id: string;
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  1: "低",
  2: "中",
  3: "高",
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  1: "bg-blue-100 text-blue-800",
  2: "bg-yellow-100 text-yellow-800",
  3: "bg-red-100 text-red-800",
};
