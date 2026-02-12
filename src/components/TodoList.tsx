"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Todo, Priority } from "@/types/todo";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";
import SortButton, { SortOrder } from "./SortButton";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<SortOrder>("created_at");

  const fetchTodos = useCallback(async () => {
    let query = supabase.from("todos").select("*");

    switch (sortOrder) {
      case "priority_desc":
        query = query.order("priority", { ascending: false });
        break;
      case "priority_asc":
        query = query.order("priority", { ascending: true });
        break;
      default:
        query = query.order("created_at", { ascending: false });
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching todos:", error);
    } else {
      setTodos(data as Todo[]);
    }
    setLoading(false);
  }, [sortOrder]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAdd = async (title: string, priority: Priority) => {
    const { error } = await supabase.from("todos").insert({
      title,
      priority,
      user_id: "11111111-1111-1111-1111-111111111111",
    });
    if (error) {
      console.error("Error adding todo:", error);
      return;
    }
    fetchTodos();
  };

  const handleToggle = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from("todos")
      .update({ completed })
      .eq("id", id);
    if (error) {
      console.error("Error toggling todo:", error);
      return;
    }
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed } : t))
    );
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      console.error("Error deleting todo:", error);
      return;
    }
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <AddTodoForm onAdd={handleAdd} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {todos.length} 件のTODO
        </p>
        <SortButton current={sortOrder} onChange={setSortOrder} />
      </div>

      {todos.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-zinc-200 p-12 text-center dark:border-zinc-700">
          <p className="text-zinc-400 dark:text-zinc-500">
            TODOがありません。上のフォームから追加してください。
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
