import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 py-12 px-4 font-sans dark:bg-zinc-950">
      <main className="w-full max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            TODO
          </h1>
          <p className="mt-1 text-base text-zinc-500 dark:text-zinc-400">
            タスクを管理して、優先度をつけましょう。
          </p>
        </div>
        <TodoList />
      </main>
    </div>
  );
}
