"use client";

import { useState } from "react";
import { Priority, PRIORITY_LABELS } from "@/types/todo";

type Props = {
  onAdd: (title: string, priority: Priority) => void;
};

export default function AddTodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed, priority);
    setTitle("");
    setPriority(1);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="新しいTODOを入力..."
        className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-base text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-700"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value) as Priority)}
        className="shrink-0 rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-400 dark:focus:ring-zinc-700"
      >
        {([1, 2, 3] as Priority[]).map((p) => (
          <option key={p} value={p}>
            優先度: {PRIORITY_LABELS[p]}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="shrink-0 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        追加
      </button>
    </form>
  );
}
