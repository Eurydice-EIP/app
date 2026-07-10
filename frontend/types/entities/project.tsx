export type Project = {
  id: number;
  title: string;
  description?: string;
  dueAt: string;
  type: string;
  importance: number;
  estimatedTime: number;
  status: string;
  totalTasks: number;
  completedTasks: number;



  image: string;
  xp: number;
  reward: number;
};
