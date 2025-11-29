"use client";

import Tick from "../atoms/Tick"

type TaskInlineProps = {
  className?: string;
  task?: string;
  taskNumber?: string;
};

const TaskInline: React.FC<TaskInlineProps> = ({
  className = "",
  task = "",
  taskNumber = "00"
}) => {
  return (
    <div className={`${className}`}>
      <div className="flex">
          <span className="my-3 text-[20px] font-normal text-[#393E41]">{taskNumber}</span>
          <span className="flex-auto my-3 ml-6 text-[20px] font-normal text-[#393E41]">{task}</span>
          <Tick
            onClick={() => {
              alert("Completed a task!");
            }}
            fillColor="group-hover:fill-[#B5B9BC]"
          ></Tick>
      </div>
    </div>
  );
};

export default TaskInline;


// "use client";

// import Button from "../atoms/Button";

// type InlineTaskProps = {
//   className?: string;
//   buttonClassName?: string;
//   task?: string;
// };

// const InlineTask: React.FC<InlineTaskProps> = ({
//   className = "",
//   buttonClassName = "",
//   task = "",
// }) => {
//   return (
//     <div className={`${className}`}>
//       <div className="grid grid-cols-2 gap-4">
//         <div className="justify-start">
//           <p className="my-2 text-2xl font-bold text-[#515351]">{task}</p>
//         </div>
//         <div className="flex justify-end">
//           <Button
//             className={`${buttonClassName}`}
//             onClick={() => {
//               alert("Button clicked!");
//             }}
//           >
//             Done
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InlineTask;
