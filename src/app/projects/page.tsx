"use client";

import { fetchTasks, createTask } from "@/api/Tasks";
import React, { useEffect, useState } from "react";
import { Tasks } from "@/types/Tasks";
import Button from "@/components/atoms/Button";

export default function Projects() {
  const [tasks, setTasks] = useState<Tasks[] | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const result = await fetchTasks();
        if (!mounted) return;
        setTasks(result);
      } catch (err) {
        console.error("Failed to load greeting:", err);
        if (mounted) setTasks(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleCreateTask = async () => {
    const newTask: Tasks = {
      title: "New Task",
      dueAt: new Date().toISOString(),
      userId: 1,
      projectId: 1,
      importance: 3,
      estimatedTime: 4,
    };
    try {
      const createdTask = await createTask(newTask);
      setTasks((prevTasks) =>
        prevTasks ? [...prevTasks, createdTask] : [createdTask]
      );
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  return (
    <div className="flex flex-row gap-10 p-8 text-black">
      Projects
      <Button
        className="border-[#B5B9BC] border-1 rounded-full"
        onClick={handleCreateTask}
      >
        Create Task
      </Button>
      {tasks ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading tasks...</p>
      )}
    </div>
  );
}
