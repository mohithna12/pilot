export type MemberRole = "OWNER" | "MEMBER";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  createdAt: Date;
}

export interface Workspace {
  id: string;
  name: string;
  hackathonName: string;
  theme: string | null;
  startTime: Date;
  endTime: Date;
  ownerId: string;
  inviteCode: string | null;
  createdAt: Date;
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  role: MemberRole;
  skills: string[];
  user?: User;
}

export interface Idea {
  id: string;
  workspaceId: string;
  title: string;
  description: string;
  techStack: string[];
  feasibilityScore: number | null;
  selected: boolean;
  createdAt: Date;
}

export interface Milestone {
  id: string;
  workspaceId: string;
  title: string;
  deadline: Date | null;
  orderIndex: number;
  tasks?: Task[];
}

export interface Task {
  id: string;
  workspaceId: string;
  milestoneId: string | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: number;
  assignedTo: string | null;
  estimatedHours: number | null;
  dueTime: Date | null;
  tags: string[];
  orderIndex: number;
  createdAt: Date;
  assignee?: User;
}

export interface FileUpload {
  id: string;
  workspaceId: string;
  uploadedBy: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  tag: string | null;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  workspaceId: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: Date;
}

// AI response types
export interface GeneratedIdea {
  title: string;
  description: string;
  techStack: string[];
  feasibilityScore: number;
  estimatedHours: number;
  features: string[];
}

export interface GeneratedPlan {
  milestones: {
    title: string;
    deadline: string;
    tasks: {
      title: string;
      description: string;
      estimatedHours: number;
      priority: number;
      tags: string[];
      suggestedAssignee?: string;
    }[];
  }[];
  scopeCuts: string[];
}

export interface GeneratedSubmission {
  readme: string;
  devpost: string;
  pitchScript: string;
  slideOutline: string[];
}

// Progress stats
export interface ProgressStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  todoTasks: number;
  completionPercent: number;
  timeRemainingMs: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
}
