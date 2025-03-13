"use client";
import Button from "@/components/atoms/Button";

export default function Home() {
  return (
    <div>
      <p className="text-2xl font-bold text-[#A3D8C1]">Home</p>
      <Button
        className="ml-4 rounded-lg px-4 py-2 text-[#A3D8C1] bg-[#F4F7F8] border-[#A3D8C1] border-2 border-4 hover:bg-[#A3D8C1] hover:text-[#F4F7F8]"
        onClick={() => {
          alert("Button clicked!");
        }}
      >
        Test button
      </Button>
    </div>
  );
}
