export type Project = {
  id: number;
  title: string;
  image: string;
  type: string;
  importance: number;
  description?: string;
  estimatedTime: number;
  doneTasks: number;
  totalTasks: number;
  xp: number;
  reward: number;
  remainingTime: number;
};
