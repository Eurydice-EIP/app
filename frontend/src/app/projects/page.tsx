"use client";
import Project from "@/components/molecules/Project";
import SearchBar from "@/components/molecules/SearchBar";
import RightBar from "@/components/organisms/RightBar";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-10">
      <div className="col-span-3">
        <p className="justify-center flex text-3xl font-bold text-[#A3D8C1]">
          Projects
        </p>
        <SearchBar className="mt-8"></SearchBar>
        <div>
          <p className="my-4 justify-start flex text-3xl font-bold text-[#515351]">
            Recent
          </p>
          <div className="grid grid-cols-3 gap-4">
            <Project
              className="my-2 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"
              project="Write my book"
              xp={150}
              money={10}
              completion={80}
            ></Project>
            <Project
              className="my-2 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"
              project="EIP Epitech"
              xp={2000}
              money={290}
              completion={17}
            ></Project>
            <Project
              className="my-2 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"
              project="Movies to watch"
              xp={50}
              money={5}
              completion={45}
            ></Project>
          </div>
          <hr className="my-5 border-1 rounded-xl border-[#B0E0E6]"></hr>
          <p className="justify-start flex text-3xl font-bold text-[#515351]">
            Projects
          </p>
          <Project
            className="my-4 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"
            project="Write my book"
            xp={150}
            money={10}
            completion={80}
          ></Project>
          <Project
            className="my-4 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"
            project="EIP Epitech"
            xp={2000}
            money={290}
            completion={17}
          ></Project>
          <Project
            className="my-4 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#B0E0E6] border-2"
            project="Movies to watch"
            xp={50}
            money={5}
            completion={45}
          ></Project>
        </div>
      </div>
      <div>
        <RightBar></RightBar>
      </div>
    </div>
  );
}
