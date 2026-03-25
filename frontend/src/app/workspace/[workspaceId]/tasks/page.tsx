"use client";

import type { TaskStatus } from "@/types";

const columns: { status: TaskStatus; label: string }[] = [
  { status: "TODO", label: "To Do" },
  { status: "IN_PROGRESS", label: "In Progress" },
  { status: "DONE", label: "Done" },
];

export default function TaskBoardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Task Board</h1>
        <button className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium hover:opacity-90 transition">
          Add Task
        </button>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div
            key={col.status}
            className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 min-h-[400px]"
          >
            <h2 className="font-semibold mb-4">{col.label}</h2>
            <div className="space-y-3">
              {/* Task cards rendered here via drag-and-drop */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
