import ProjectsBar from "@/components/organisms/ProjectsBar";
import TaskWidget from "@/components/organisms/TaskWidget";
import TimeTrackerWidget from "@/components/molecules/TimeTrackerWidget";
import { useTranslations } from "next-intl";
// import Button from "@/components/atoms/Button";

export default function Home() {
  const t = useTranslations("home");

  return (
    <div className="flex flex-row gap-10 p-8">
      <ProjectsBar></ProjectsBar>
      {/* <Button
        className="border-[#B5B9BC] border-1 rounded-full"
        onClick={() => {
          alert("Started timing");
        }}
      ></Button> */}
      <div className="flex-auto grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-[48px] grid-rows-7 gap-y-[27px]">
        <div className="col-span-3 md:col-span-4 lg:col-span-5 xl:col-span-7 border-[#B5B9BC] border-1 rounded-[40px] bg-[#F5F3EE]"></div>
        <TaskWidget className="col-span-3 md:col-span-4 lg:col-span-3 xl:col-span-4 row-span-3 lg:row-span-4 border-[#B5B9BC] border-1 rounded-[40px] bg-[#F5F3EE] px-8 py-4"></TaskWidget>
        <div className="col-span-3 md:col-span-2 xl:col-span-3 row-span-3 border-[#B5B9BC] border-1 rounded-[40px] bg-[#F5F3EE] p-6 text-[#343534]">
          {t("calendar")}
        </div>
        <TimeTrackerWidget
          className="col-span-3 md:col-span-2 xl:col-span-3 border-[#B5B9BC] border-1 rounded-[40px] color-[#F5F3EE] px-8"
          task="EIP"
        ></TimeTrackerWidget>
        <div className="col-span-3 md:col-span-2 xl:col-span-4 row-span-2 border-[#B5B9BC] border-1 rounded-[40px] bg-[#F5F3EE] p-6 text-[#343534]">
          {t("wip")}
        </div>
        <div className="col-span-3 md:col-span-4 lg:col-span-3 row-span-2 border-[#B5B9BC] border-1 rounded-[40px] bg-[#F5F3EE] p-6 text-[#343534]">
          {t("stats")}
        </div>
      </div>
    </div>
  );
}
