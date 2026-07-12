export type Task = {
  id: number;
  title: string;
  description?: string;
  dueAt: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED";
  projectId: number;
  importance: number;
  estimatedTime: number;
  completedAt: number | null;
  xp: number;
};
