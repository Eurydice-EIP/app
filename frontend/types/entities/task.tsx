export type Task = {
  id?: number;
  title: string;
  dueAt: string;
  status: string;
  projectId: number;
  importance: number;
  estimatedTime: number;
};
