"use client";

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Workspaces</h1>
          <button className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium hover:opacity-90 transition">
            New Workspace
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Workspace cards will be rendered here */}
          <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 flex items-center justify-center text-gray-400 min-h-[200px]">
            Create your first hackathon workspace
          </div>
        </div>
      </div>
    </div>
  );
}
