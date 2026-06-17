import { useState } from "react";

export default function NewTaskForm() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-500 px-4 py-2 rounded-md font-bold mb-4 
            cursor-pointer transition-transform hover:-translate-y-1 mt-2 fixed top-2 right-8 "
      >
        Add New Task
      </button>

      {isVisible && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 bg-black/50"
          onClick={() => setIsVisible(false)}
        >
          <div
            className="relative p-8 shadow-2xl bg-white border-2 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-2xl">Create New Task</h1>
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-8 right-8 font-bold text-red-500 pointer-cursor"
            >
              X
            </button>
            <form
              action="POST"
              className={`position-absolute z-10 grid grid-cols-2 grid-rows-3 gap-3 mt-10`}
            >
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                name="title"
                className="border-2 rounded-md border-double h-10"
              />

              <label htmlFor="priority">Priority: </label>
              <input
                type="text"
                name="priority"
                className="border-2 rounded-md border-double h-10"
              />

              <button
                type="submit"
                className="bg-blue-500 transition-colors justify-self-center
            cursor-pointer border-2 rounded-md m-4 px-4 col-span-2 w-40 hover:bg-blue-300"
              >
                ADD
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
