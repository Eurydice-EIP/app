import SearchBar from "../molecules/SearchBar";
import Task from "../molecules/Task";

const ProjectTasks = () => {
  const tasks = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    task: `Task ${index + 1}`,
    description: `Description for task ${index + 1}`,
    xp: 15,
    money: 5,
  }));

  return (
    <div>
      <SearchBar />
      <div className="grid grid-cols-2 pt-5 gap-y-2 gap-x-4">
        {tasks.map((task) => (
          <Task
            key={task.id}
            className="my-2 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"
            task={task.task}
            description={task.description}
            xp={task.xp}
            money={task.money}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectTasks;
