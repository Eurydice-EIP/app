"use client";

import Button from "../atoms/Button";

type InlineTaskProps = {
  className?: string;
  buttonClassName?: string;
  task?: string;
};

const InlineTask: React.FC<InlineTaskProps> = ({
  className = "",
  buttonClassName = "",
  task = "",
}) => {
  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-2 gap-4">
        <div className="justify-start">
          <p className="my-2 text-2xl font-bold text-[#515351]">{task}</p>
        </div>
        <div className="flex justify-end">
          <Button
            className={`${buttonClassName}`}
            onClick={() => {
              alert("Button clicked!");
            }}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InlineTask;
