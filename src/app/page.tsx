"use client";
import Button from "@/components/atoms/Button";
import Task from "@/components/molecules/Task";

export default function Home() {
  return (
    <div>
      <p className="justify-center flex text-3xl font-bold text-[#A3D8C1]">WELCOME BACK JOHN DOE</p>
      <p className="justify-center flex text-xl font-bold text-[#343534]">You have a packed day ahead of you</p>
      <Button
        className="ml-4 rounded-xl px-4 py-2 text-[#A3D8C1] bg-[#F4F7F8] border-[#A3D8C1] border-2 border-b-4 hover:bg-[#A3D8C1] hover:text-[#F4F7F8]"
        onClick={() => {
          alert("Button clicked!");
        }}
      >
        Test button
      </Button>
      <Task
        className="my-4 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#A3D8C1] border-2"
        task="Drink a plant"
        description="Be water"
        xp={15}
        money={5}
      >
      </Task>
      <Task
        className="my-4 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#A3D8C1] border-2"
        task="Eat the tartiflette"
        description="FOOD !"
        xp={10}
        money={2}
      >
      </Task>
      <Task
        className="my-4 rounded-xl px-4 py-2 bg-[#F4F7F8] border-[#A3D8C1] border-2"
        task="Eat the water"
        description="Be tartiflette"
        xp={50}
        money={8}
      >
      </Task>

    </div>
  );
}
