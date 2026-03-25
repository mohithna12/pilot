"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Users, CheckSquare, Clock } from "lucide-react";
import { CreateWorkspaceModal } from "@/components/workspace/create-workspace-modal";
import { JoinWorkspaceModal } from "@/components/workspace/join-workspace-modal";
import { formatTimeRemaining } from "@/lib/utils";

interface WorkspaceListItem {
  id: string;
  name: string;
  hackathonName: string;
  theme: string | null;
  startTime: string;
  endTime: string;
  role: string;
  memberCount: number;
  taskCount: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [workspaces, setWorkspaces] = useState<WorkspaceListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    fetch("/api/workspaces")
      .then((res) => res.json())
      .then((data) => setWorkspaces(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-black dark:border-gray-700 dark:border-t-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Workspaces</h1>
            {session?.user?.name && (
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Welcome back, {session.user.name}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowJoin(true)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition"
            >
              Join Workspace
            </button>
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium hover:opacity-90 transition"
            >
              <Plus className="w-4 h-4" />
              New Workspace
            </button>
          </div>
        </div>

        {workspaces.length === 0 ? (
          <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 flex flex-col items-center justify-center text-center">
            <p className="text-gray-400 text-lg mb-4">
              No workspaces yet. Create one to get started!
            </p>
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium hover:opacity-90 transition"
            >
              <Plus className="w-4 h-4" />
              Create your first workspace
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.map((ws) => (
              <WorkspaceCard key={ws.id} workspace={ws} />
            ))}
          </div>
        )}
      </div>

      <CreateWorkspaceModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
      />
      <JoinWorkspaceModal
        open={showJoin}
        onClose={() => setShowJoin(false)}
      />
    </div>
  );
}

function WorkspaceCard({ workspace }: { workspace: WorkspaceListItem }) {
  const now = Date.now();
  const end = new Date(workspace.endTime).getTime();
  const start = new Date(workspace.startTime).getTime();
  const hasStarted = now >= start;
  const hasEnded = now >= end;
  const timeRemaining = end - now;

  let statusLabel: string;
  let statusColor: string;
  if (hasEnded) {
    statusLabel = "Ended";
    statusColor = "text-gray-400";
  } else if (hasStarted) {
    statusLabel = formatTimeRemaining(timeRemaining) + " left";
    statusColor = timeRemaining < 2 * 60 * 60 * 1000 ? "text-red-500" : "text-green-600 dark:text-green-400";
  } else {
    statusLabel = "Not started";
    statusColor = "text-yellow-600 dark:text-yellow-400";
  }

  return (
    <Link
      href={`/workspace/${workspace.id}`}
      className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-gray-400 dark:hover:border-gray-600 transition block"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg">{workspace.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {workspace.hackathonName}
          </p>
        </div>
        <span className={`text-xs font-medium ${statusColor}`}>
          {statusLabel}
        </span>
      </div>

      {workspace.theme && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {workspace.theme}
        </p>
      )}

      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          {workspace.memberCount}
        </span>
        <span className="flex items-center gap-1">
          <CheckSquare className="w-3.5 h-3.5" />
          {workspace.taskCount} tasks
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {Math.round((end - start) / (1000 * 60 * 60))}h
        </span>
      </div>
    </Link>
  );
}
