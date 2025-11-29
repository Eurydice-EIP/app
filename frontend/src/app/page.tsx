import ProjectsBar from "@/components/organisms/ProjectsBar";
import TaskWidget from "@/components/organisms/TaskWidget";

export default function Home() {
  return (
    <div className="flex flex-row gap-8 p-8">
      <ProjectsBar></ProjectsBar>
      <TaskWidget className="border-[#B5B9BC] border-1 rounded-[40px] color-[#F5F3EE] px-8 py-4 w-[584px] h-[521px]"></TaskWidget>
    </div>
  );
}
