"use client";

type ProgressBarProps = {
  className?: string;
  barClassName?: string;
  completion?: number;
  max_value?: number;
  percentage?: boolean;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  className = "",
  barClassName = "",
  completion = 0,
  max_value = 0,
  percentage = true,
}) => {
  const percentageValue = Math.min(
    100,
    Math.max(0, (completion / max_value) * 100)
  );

  return (
    <div className={`${className} relative group`}>
      <div className="h-full w-full">
        <div
          className={`${barClassName}`}
          role="progressbar"
          aria-valuenow={completion}
          aria-valuemin={0}
          aria-valuemax={max_value}
        >
          {percentage && (
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 hidden group-hover:flex items-center justify-center w-12 h-12 text-white text-sm font-bold rounded-full shadow-md bg-white border-2 border-[#A3D8C1]">
              <span className="text-sm font-bold text-[#515351]">
                {Math.round(percentageValue)}%
              </span>
            </div>
          )}

          <div
            className="flex flex-col justify-center rounded-full bg-[#A3D8C1] transition-all duration-500 w-full"
            style={{
              height: `${percentageValue}%`,
              transformOrigin: "bottom",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
