export type Project = {
  id?: string;
  title: string;
  image: string;
  description?: string;
  doneTasks: number;
  totalTasks: number;
  xp: number;
  reward: number;
  remainingTime: number;
};

export type ProjectCreationData = {
  title: string;
  dueAt: string;
  type: string;
  importance: number;
  estimatedTime: number;
};
