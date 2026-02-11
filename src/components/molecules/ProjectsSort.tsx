import Button from "../atoms/Button";
import { useTranslations } from "next-intl";

export default function ProjectsSort() {
  const t = useTranslations("projects");

  return (
    <div className="w-full z-25">
      <div className="flex flex-row items-center justify-between w-full">
        <p
          className="text-[var(--color-text)] flex-shrink-0 font-medium text-sm
        "
        >
          {t("sortBy")}
        </p>
        {/* Filters */}
        <div className="flex flex-row w-full gap-2 items-center justify-around mx-6">
          <Button
            className="text-[#393E41] px-2 py-1 rounded-2xl bg-[#B5B9BC] hover:bg-[#A0A4A6] text-sm"
            isDisabled={true}
          >
            {t("deadline")}
          </Button>
          <Button
            className="text-[#393E41] px-2 py-1 rounded-2xl bg-[#B5B9BC] hover:bg-[#A0A4A6] text-sm"
            isDisabled={true}
          >
            {t("tasksLeft")}
          </Button>
          <Button
            className="text-[#393E41] px-2 py-1 rounded-2xl bg-[#B5B9BC] hover:bg-[#A0A4A6] text-sm"
            isDisabled={true}
          >
            {t("rewards")}
          </Button>
        </div>
      </div>
      <div className="w-full border-b border-gray-200 mt-2" />
    </div>
  );
}
