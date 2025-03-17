"use client";

type TimelineItemProps = {
  className?: string;
  event?: string;
  time?: string;
//   description?: string;
};

const TimelineItem: React.FC<TimelineItemProps> = ({
  className = "",
  event = "",
  time = "",
//   description = "",
}) => {

  return (
    <li
        className="mt-2 mb-5 ms-4">
        <div
            className="absolute w-3 h-3 bg-gray-200 rounded-full mt-5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
        </div>
        <div
          className={`${className}`}>
            <p className="mb-1 text-lg font-semibold leading-none text-[#515351]">{event}</p>
            <h3 className="text-lg text-[#515351]">{time}</h3>
            {/* <p className="text-base font-normal text-gray-500 dark:text-[#515351]">{description}</p> */}
        </div>
    </li>
  );
};

export default TimelineItem;
