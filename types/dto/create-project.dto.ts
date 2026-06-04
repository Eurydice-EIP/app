export type CreateProjectDTO = {
  title: string;
  description?: string;
  dueAt: string;
  type: string;
  importance: number;
  estimatedTime: number;
};
