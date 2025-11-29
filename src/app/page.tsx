"use client";
import Label from "@/components/atoms/Label";
import Bookmark from "@/components/atoms/Bookmark";
import TaskWidget from "@/components/molecules/TaskWidget"

export default function Home() {
  return (
    <div>
      <p className="text-[#343534]">
        Fresh start
      </p>
      <Label
        className="my-2 rounded-full px-4 py-2 bg-[#E9F2DD] text-[#7DBA8E]"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 mr-2"
          >
            <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
      >1 month</Label>
      <Label
        className="my-2 rounded-full px-4 py-2 bg-[#F2EFDD] text-[#DBBA5D]"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 mr-2"
          >
            <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
      >12 days</Label>
      <Label
        className="my-2 rounded-full px-4 py-2 bg-[#F2DDDD] text-[#DB5D5D]"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 mr-2"
          >
            <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
      >3 days</Label>
      <Bookmark className="w-65 h-65"></Bookmark>
      <TaskWidget
        className="border-[#B5B9BC] border-1 rounded-[40px] color-[#F5F3EE] px-8 py-4 w-[584px] h-[521px]"
      ></TaskWidget>
    </div>
  );
}



// export default function Home() {
//   return (
//     <div className="grid grid-cols-4 gap-10">
//       <div className="col-span-3">
//         <p className="justify-center flex text-3xl font-bold text-[#A3D8C1]">
//           WELCOME BACK JOHN DOE
//         </p>
//         <p className="justify-center flex text-xl font-bold text-[#515351]">
//           You have a packed day ahead of you
//         </p>
//         <div className="grid grid-cols-2 gap-10">
//           <div className="flex flex-col mt-5">
//             <div className="grid grid-cols-2 my-2">
//               <div className="flex justify-start">
//                 <p className="justify-start flex text-3xl font-bold text-[#515351]">
//                   Tasks of the day
//                 </p>
//               </div>
//               <div className="flex justify-end">
//                 <Image
//                   src="/icons/time.svg"
//                   alt="Time icon"
//                   width={25}
//                   height={25}
//                   className="rounded-full mr-3"
//                 />
//                 <p className="justify-end flex text-3xl font-bold text-[#FF9600]">
//                   15 hours
//                 </p>
//               </div>
//             </div>
//             <hr className="mb-2 border-1 rounded-xl border-[#B0E0E6]"></hr>
//             <Task
//               className="my-2 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"
//               task="Drink a plant"
//               description="Be water"
//               xp={15}
//               money={5}
//             ></Task>
//             <Task
//               className="my-2 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"
//               task="Eat the tartiflette"
//               description="FOOD !"
//               xp={10}
//               money={2}
//             ></Task>
//             <Task
//               className="my-2 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"
//               task="Eat the water"
//               description="Be tartiflette"
//               xp={50}
//               money={8}
//             ></Task>
//           </div>
//           <div className="flex flex-col mt-5">
//             <div className="flex flex-col justify-start">
//               <div className="grid grid-cols-2 my-2">
//                 <div className="flex justify-start">
//                   <p className="justify-start flex text-3xl font-bold text-[#515351]">
//                     Planning
//                   </p>
//                 </div>
//                 <div className="flex justify-end">
//                   <p className="justify-end flex text-3xl font-bold text-[#B0E0E6]">
//                     Stats
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <hr className="mb-2 border-1 rounded-xl border-[#B0E0E6]"></hr>

//             <Timeline className="relative flex flex-col h-full border-s border-gray-200 dark:border-gray-700 justify-around">
//               <TimelineItem
//                 className="rounded-xl p-4 bg-[#F4F7F8] border-[#B0E0E6] border-2"
//                 event="Meeting"
//                 time="8h - 9h"
//               ></TimelineItem>
//               <TimelineItem
//                 className="rounded-xl p-4 bg-[#F4F7F8] border-[#B0E0E6] border-2"
//                 event="Cook tartiflette"
//                 time="12h - 14h30"
//               ></TimelineItem>
//               <TimelineItem
//                 className="rounded-xl p-4 bg-[#F4F7F8] border-[#B0E0E6] border-2"
//                 event="Eat the tartiflette"
//                 time="14h30 - 15h"
//               ></TimelineItem>
//             </Timeline>
//           </div>
//         </div>
//         <hr className="mt-2 border-1 rounded-xl border-[#B0E0E6]"></hr>
//         <p className="justify-start flex my-3 text-3xl font-bold text-[#515351]">
//           Projects
//         </p>
//         <div className="grid grid-cols-3 gap-4">
//           <Project
//             className="my-2 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"
//             project="Write my book"
//             xp={150}
//             money={10}
//             completion={80}
//           ></Project>
//           <Project
//             className="my-2 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"
//             project="EIP Epitech"
//             xp={2000}
//             money={290}
//             completion={17}
//           ></Project>
//           <Project
//             className="my-2 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"
//             project="Movies to watch"
//             xp={50}
//             money={5}
//             completion={45}
//           ></Project>
//         </div>
//       </div>

//       <div>
//         <RightBar></RightBar>
//       </div>
//     </div>
//   );
// }

