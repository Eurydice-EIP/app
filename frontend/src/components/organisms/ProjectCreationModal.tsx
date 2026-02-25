"use client";

import Button from "../atoms/Button";

export default function ProjectCreationModal({
  isModalProjectOpen,
  setIsModalProjectOpen,
}: {
  isModalProjectOpen: boolean;
  setIsModalProjectOpen: (open: boolean) => void;
}) {
  const handleCreateProject = () => {
    const title = (
      document.querySelector('input[type="text"]') as HTMLInputElement
    )?.value;
    const deadline = (
      document.querySelector('input[type="date"]') as HTMLInputElement
    )?.value;
    const projectType = (document.querySelector("select") as HTMLSelectElement)
      ?.value;
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

    const projectData = `
    Title: ${title || "N/A"}
    Deadline: ${deadline || "N/A"}
    Project Type: ${projectType || "N/A"}
    Importance: ${importance || "N/A"}
    Duration: ${duration || "N/A"}
    `;

    alert(projectData);

    setIsModalProjectOpen(false);
  };

  const projectCreationPercentage = 50;

  return (
    <dialog
      id="projectCreationModal"
      className="modal"
      open={isModalProjectOpen}
    >
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="flex flex-row items-center justify-between w-full gap-4">
          <form method="dialog">
            <button
              className="btn btn-lg btn-circle btn-ghost border-[var(--color-widget-border)]"
              onClick={() => setIsModalProjectOpen(false)}
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
            value={projectCreationPercentage}
            max={100}
          />
          <span className="text-lg font-bold text-[var(--color-primary)]">
            {projectCreationPercentage}%
          </span>
        </div>
        <div className="flex flex-col mx-16 ">
          <h3 className="text-2xl">Let&apos;s create a project !</h3>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-light text-lg">
              Title
            </legend>
            <input
              type="text"
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
              className="input rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-600 w-full"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-light text-lg">
              Deadline
            </legend>
            <select
              className="select w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              defaultValue="Project Type"
            >
              <option disabled>Project Type</option>
              <option>Main</option>
              <option>Side</option>
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
        </div>
        <div className="flex flex-row items-center justify-between gap-4 mt-8">
          <Button
            className="border-[#36B2BE] border-1
             text-[#36B2BE] font-bold px-4 py-2 my-2 rounded-full text-sm"
            onClick={() => setIsModalProjectOpen(false)}
          >
            Create task in project
          </Button>
          <Button
            className="bg-[#36B2BE] text-[#FFFFFF] font-bold px-4 py-2 my-2 rounded-full text-sm mt-8"
            onClick={() => handleCreateProject()}
          >
            Create project
          </Button>
        </div>
      </div>
    </dialog>
  );
}
