"use client";

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Team</h1>
        <button className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium hover:opacity-90 transition">
          Invite Member
        </button>
      </div>

      {/* Team members list */}
      <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 text-gray-400">
        Team members, skills, and workload distribution will appear here.
      </div>
    </div>
  );
}
