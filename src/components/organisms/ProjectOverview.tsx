import ProgressBar from "../molecules/ProgressBar";
import UpcomingTasks from "../molecules/UpcomingTasks";
import DoneRecently from "../molecules/DoneRecently";
import Advancement from "../molecules/Advancement";

const ProjectOverview = () => {
  return (
    <div>
      <p className="justify-center flex text-3xl font-bold text-[#515351]">
        Total Progress
      </p>
      <ProgressBar
        className="mt-6"
        barClassName="flex w-full h-5 bg-[#E7F3F3] rounded-full overflow-hidden"
        completion={68}
        max_value={100}
      ></ProgressBar>
      <hr className="my-6 border-1 rounded-xl border-[#B0E0E6]"></hr>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <UpcomingTasks className="mt-2 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"></UpcomingTasks>
        </div>
        <DoneRecently className="mt-2 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"></DoneRecently>
        <Advancement
          className="mt-2 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"
          xp={248}
          max_xp={2000}
          money={28}
          max_money={290}
          streak={6}
          tasks={8}
          max_tasks={42}
          days={5}
        ></Advancement>
        <div className="col-span-2 mt-2 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2 min-h-60">
          <p className="text-2xl font-bold text-[#515351]">
            Feature incoming...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
