"use client";

type ProgressBarProps = {
  className?: string;
  barClassName?: string;
  completion?: number;
  max_value?: number;
  percentage?: boolean;
  display?: boolean;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  className = "",
  barClassName = "",
  completion = 0,
  max_value = 0,
  percentage = true,
  display = true,
}) => {
  return (
    <div className={`${className}`}>
      <div className="relative w-full">
        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[#515351]">
          {display &&
            (percentage ? (
              <p>{completion.toFixed(0)}%</p>
            ) : (
              <p>
                {completion} / {max_value}
              </p>
            ))}
        </div>
        <div
          className={`${barClassName}`}
          role="progressbar"
          aria-valuenow={completion}
          aria-valuemin={0}
          aria-valuemax={max_value}
        >
          <div
            className="flex flex-col justify-center rounded-full overflow-hidden bg-[#A3D8C1] transition-all duration-500"
            style={{ width: `${(completion * 100) / max_value}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
