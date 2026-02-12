"use client";

import { Todo, PRIORITY_LABELS, PRIORITY_COLORS } from "@/types/todo";

type Props = {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
        className="h-5 w-5 shrink-0 cursor-pointer rounded border-zinc-300 accent-zinc-900 dark:accent-zinc-100"
      />

      <span
        className={`flex-1 text-base ${
          todo.completed
            ? "text-zinc-400 line-through dark:text-zinc-500"
            : "text-zinc-900 dark:text-zinc-100"
        }`}
      >
        {todo.title}
      </span>

      <span
        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          PRIORITY_COLORS[todo.priority]
        }`}
      >
        {PRIORITY_LABELS[todo.priority]}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="shrink-0 rounded p-1.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
        aria-label="削除"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
