import { create } from "zustand";
import type {
  Workspace,
  WorkspaceMember,
  Task,
  Milestone,
  Idea,
  Notification,
  ProgressStats,
} from "@/types";

interface WorkspaceState {
  workspace: Workspace | null;
  members: WorkspaceMember[];
  tasks: Task[];
  milestones: Milestone[];
  ideas: Idea[];
  notifications: Notification[];

  setWorkspace: (workspace: Workspace) => void;
  setMembers: (members: WorkspaceMember[]) => void;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  removeTask: (id: string) => void;
  setMilestones: (milestones: Milestone[]) => void;
  setIdeas: (ideas: Idea[]) => void;
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  getProgressStats: () => ProgressStats | null;
  reset: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspace: null,
  members: [],
  tasks: [],
  milestones: [],
  ideas: [],
  notifications: [],

  setWorkspace: (workspace) => set({ workspace }),
  setMembers: (members) => set({ members }),
  setTasks: (tasks) => set({ tasks }),

  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),

  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),

  removeTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

  setMilestones: (milestones) => set({ milestones }),
  setIdeas: (ideas) => set({ ideas }),
  setNotifications: (notifications) => set({ notifications }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  getProgressStats: () => {
    const { workspace, tasks } = get();
    if (!workspace) return null;

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "DONE").length;
    const inProgressTasks = tasks.filter(
      (t) => t.status === "IN_PROGRESS"
    ).length;
    const todoTasks = tasks.filter((t) => t.status === "TODO").length;
    const completionPercent =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const now = Date.now();
    const end = new Date(workspace.endTime).getTime();
    const start = new Date(workspace.startTime).getTime();
    const timeRemainingMs = Math.max(0, end - now);
    const totalTime = end - start;
    const timeElapsedPercent =
      totalTime > 0
        ? Math.round(((totalTime - timeRemainingMs) / totalTime) * 100)
        : 100;

    let riskLevel: "LOW" | "MEDIUM" | "HIGH" = "LOW";
    const ratio = completionPercent / Math.max(timeElapsedPercent, 1);
    if (ratio < 0.5) riskLevel = "HIGH";
    else if (ratio < 0.8) riskLevel = "MEDIUM";

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      todoTasks,
      completionPercent,
      timeRemainingMs,
      riskLevel,
    };
  },

  reset: () =>
    set({
      workspace: null,
      members: [],
      tasks: [],
      milestones: [],
      ideas: [],
      notifications: [],
    }),
}));
