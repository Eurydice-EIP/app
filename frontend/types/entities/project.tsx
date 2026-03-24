export type Project = {
  id: number;
  title: string;
  image: string;
  description?: string;
  doneTasks: number;
  totalTasks: number;
  xp: number;
  reward: number;
  remainingTime: number;
};
