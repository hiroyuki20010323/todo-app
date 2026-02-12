"use client";

export type SortOrder = "priority_desc" | "priority_asc" | "created_at";

type Props = {
  current: SortOrder;
  onChange: (order: SortOrder) => void;
};

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "created_at", label: "作成日順" },
  { value: "priority_desc", label: "優先度: 高→低" },
  { value: "priority_asc", label: "優先度: 低→高" },
];

export default function SortButton({ current, onChange }: Props) {
  return (
    <select
      value={current}
      onChange={(e) => onChange(e.target.value as SortOrder)}
      className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:focus:border-zinc-400 dark:focus:ring-zinc-700"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
