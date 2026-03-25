"use client";

export default function WorkspaceOverview() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Workspace Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Time Remaining" value="--" />
        <StatCard label="Completion" value="0%" />
        <StatCard label="Tasks Done" value="0 / 0" />
        <StatCard label="Risk Level" value="--" />
      </div>

      {/* Milestones */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Milestones</h2>
        <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 text-gray-400">
          No milestones yet. Generate a plan from the Ideas page.
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
        <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 text-gray-400">
          No activity yet.
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
