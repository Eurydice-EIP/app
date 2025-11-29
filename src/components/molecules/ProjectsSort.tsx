import Button from "../atoms/Button";

export default function ProjectsSort() {
  return (
    <div className="w-full z-25">
      <div className="flex flex-row items-center justify-between w-full">
        <p
          className="text-[#393E41] flex-shrink-0 font-medium text-sm
        "
        >
          Sort By:
        </p>
        {/* Filters */}
        <div className="flex flex-row w-full gap-2 items-center justify-around mx-6">
          <Button
            className="text-[#393E41] px-2 py-1 rounded-2xl bg-[#B5B9BC] hover:bg-[#A0A4A6] text-sm"
            isDisabled={true}
          >
            Deadline
          </Button>
          <Button
            className="text-[#393E41] px-2 py-1 rounded-2xl bg-[#B5B9BC] hover:bg-[#A0A4A6] text-sm"
            isDisabled={true}
          >
            Tasks left
          </Button>
          <Button
            className="text-[#393E41] px-2 py-1 rounded-2xl bg-[#B5B9BC] hover:bg-[#A0A4A6] text-sm"
            isDisabled={true}
          >
            Rewards
          </Button>
        </div>
      </div>
      <div className="w-full border-b border-gray-200 mt-2" />
    </div>
  );
}
