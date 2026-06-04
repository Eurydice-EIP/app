export type CreateTaskDTO = {
  title: string;
  description: string;
  dueAt: string;
  projectId: number;
  importance: number;
  estimatedTime: number;
};
