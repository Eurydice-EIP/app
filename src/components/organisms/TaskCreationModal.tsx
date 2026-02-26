"use client";

import Button from "../atoms/Button";
import { useState } from "react";
import { Project } from "@/types/Project";
import { createTask } from "@/api/Tasks";

export default function TaskCreationModal({
  // selectedProject,
  projects,
  isModalTaskOpen,
  onTaskCreated,
  setIsModalTaskOpen,
}: {
  selectedProject: Project | null;
  projects: Project[];
  isModalTaskOpen: boolean;
  onTaskCreated?: () => void;
  setIsModalTaskOpen: (open: boolean) => void;
}) {
  const taskCreationPercentage = 50;
  const [isBlocked, setIsBlocked] = useState(false);

  const handleCreateTask = async () => {
    const title = (
      document.querySelector('input[name="title"]') as HTMLInputElement
    )?.value;
    const deadline = (
      document.querySelector('input[name="deadline"]') as HTMLInputElement
    )?.value;
    const projectId = (
      document.querySelector('select[name="project"]') as HTMLSelectElement
    )?.value;
    const importance = (
      document.querySelector(
        'input[name="rating-importance"]:checked',
      ) as HTMLInputElement
    )?.ariaLabel;
    const duration = (
      document.querySelector(
        'input[name="rating-duration"]:checked',
      ) as HTMLInputElement
    )?.ariaLabel;
    // const isBlocked = (
    //   document.querySelector('input[type="checkbox"]') as HTMLInputElement
    // )?.checked;
    // const blockingTask = isBlocked
    //   ? (
    //       document.querySelector(
    //         "select[name='blocking-task']",
    //       ) as HTMLSelectElement
    //     )?.value
    //   : null;

    await createTask({
      title: title || "Untitled Task",
      dueAt: deadline || new Date().toISOString(),
      projectId: projectId ? Number(projectId) : 0,
      importance: importance ? parseInt(importance) : 1,
      estimatedTime: duration ? parseInt(duration) : 1,
    });

    onTaskCreated?.();
    setIsModalTaskOpen(false);
  };

  return (
    <dialog id="taskCreationModal" className="modal" open={isModalTaskOpen}>
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="flex flex-row items-center justify-between w-full gap-4">
          <form method="dialog">
            <button
              className="btn btn-lg btn-circle btn-ghost border-[var(--color-widget-border)]"
              onClick={() => setIsModalTaskOpen(false)}
            >
              ✕
            </button>
          </form>
          <progress
            className="
          progress w-full h-4 bg-[#B9E3E7]
          [&::-webkit-progress-value]:bg-[#36B2BE]
          [&::-moz-progress-bar]:bg-[#36B2BE]
          "
            value={taskCreationPercentage}
            max={100}
          />
          <span className="text-lg font-bold text-[var(--color-primary)]">
            {taskCreationPercentage}%
          </span>
        </div>
        <div className="flex flex-col mx-16 ">
          <h3 className="text-2xl">Let&apos;s create a task !</h3>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-light text-lg">
              Title
            </legend>
            <input
              type="text"
              name="title"
              className="input rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-600 w-full"
              placeholder="Type here"
              required
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-light text-lg">
              Deadline
            </legend>
            <input
              type="date"
              name="deadline"
              className="input rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-600 w-full"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-light text-lg">
              Project
            </legend>
            <select
              className="select w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              name="project"
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-light text-lg">
              Importance
            </legend>
            <div className="flex flex-row gap-4 items-center">
              <p className="text-sm font-light text-gray-500 text-center w-1/4">
                Not Important
              </p>
              <div className="rating flex flex-row justify-between w-full">
                <input
                  type="radio"
                  name="rating-importance"
                  className="mask mask-star h-10 w-10"
                  aria-label="1 star"
                />
                <input
                  type="radio"
                  name="rating-importance"
                  className="mask mask-star h-10 w-10"
                  aria-label="2 star"
                />
                <input
                  type="radio"
                  name="rating-importance"
                  className="mask mask-star h-10 w-10"
                  aria-label="3 star"
                />
                <input
                  type="radio"
                  name="rating-importance"
                  className="mask mask-star h-10 w-10"
                  aria-label="4 star"
                />
                <input
                  type="radio"
                  name="rating-importance"
                  className="mask mask-star h-10 w-10"
                  aria-label="5 star"
                />
              </div>
              <p className="text-sm font-light text-gray-500 text-center w-1/4">
                VERY Important
              </p>
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend font-light text-lg">
              Duration
            </legend>
            <div className="flex flex-row gap-4 items-center">
              <p className="text-sm font-light text-gray-500 text-center w-1/4">
                Little to no time
              </p>
              <div className="rating flex flex-row justify-between w-full">
                <input
                  type="radio"
                  name="rating-duration"
                  className="mask mask-star h-10 w-10"
                  aria-label="1 star"
                />
                <input
                  type="radio"
                  name="rating-duration"
                  className="mask mask-star h-10 w-10"
                  aria-label="2 star"
                />
                <input
                  type="radio"
                  name="rating-duration"
                  className="mask mask-star h-10 w-10"
                  aria-label="3 star"
                />
                <input
                  type="radio"
                  name="rating-duration"
                  className="mask mask-star h-10 w-10"
                  aria-label="4 star"
                />
                <input
                  type="radio"
                  name="rating-duration"
                  className="mask mask-star h-10 w-10"
                  aria-label="5 star"
                />
              </div>
              <p className="text-sm font-light text-gray-500 text-center w-1/4">
                A lot of time
              </p>
            </div>
          </fieldset>
          <fieldset className="fieldset">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4 items-center">
                <p className="fieldset-legend font-light text-lg text-center">
                  Is blocked
                </p>
                <input
                  type="checkbox"
                  className="toggle checked:bg-[#36B2BE]"
                  onChange={(e) => setIsBlocked(e.target.checked)}
                />
              </div>
              {isBlocked ? (
                <select
                  className="select w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  defaultValue="task-blocking"
                  name="blocking-task"
                >
                  <option disabled>Blocking Task</option>
                  <option>Task01</option>
                  <option>Task02</option>
                  <option>Task03</option>
                </select>
              ) : (
                <div className="h-10"></div>
              )}
            </div>
          </fieldset>
        </div>
        <div className="flex flex-row items-center justify-between gap-4 mt-8">
          <Button
            className="border-[#36B2BE] border-1
             text-[#36B2BE] font-bold px-4 py-2 my-2 rounded-full text-sm"
            onClick={() => setIsModalTaskOpen(false)}
          >
            Create task in project
          </Button>
          <Button
            className="bg-[#36B2BE] text-[#FFFFFF] font-bold px-4 py-2 my-2 rounded-full text-sm mt-8"
            onClick={() => handleCreateTask()}
          >
            Create task
          </Button>
        </div>
      </div>
    </dialog>
  );
}
