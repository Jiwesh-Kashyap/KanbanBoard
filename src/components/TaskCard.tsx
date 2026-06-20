import { useState } from "react";

interface TaskCardProps {
  subject: string;
  id: string;
  priority: number;
  onDeleteTask(id: string): void;
  onEditTask(id: string, title: string, priority: number): void;
}

export default function TaskCard({
  subject,
  id,
  priority,
  onDeleteTask,
  onEditTask,
}: TaskCardProps) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", id);
  };
  const [isVisible, setIsVisible] = useState(false);
  const [editPopUpVisibility, setEditPopUpVisibility] = useState(false);
  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      className="card ml-4 mt-3 flex flex-row justify-between"
      onMouseLeave={() => setIsVisible(false)}
    >
      <h4
        className="text-2xl transition-transform hover:translate-x-2"
        onMouseEnter={() => setIsVisible(true)}
      >
        {subject}
      </h4>
      {isVisible && (
        <div className="flex flex-row gap-3">
          <button
            className="cursor-pointer transition-shadow shadow-blue-50 hover:shadow-blue-400"
            onClick={() => setEditPopUpVisibility(true)}
          >
            <img className="w-5 h-5" src="/edit-image.png" alt="edit" />
          </button>
          <button
            className="cursor-pointer transition-shadow shadow-blue-50 hover:shadow-blue-400"
            onClick={() => onDeleteTask(id)}
          >
            <img className="w-5 h-5" src="/delete-image.png" alt="delete" />
          </button>
        </div>
      )}
      {editPopUpVisibility && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50"
        onClick={() => setEditPopUpVisibility(false)}>
          <div className="relative p-8 z-10 bg-white border-2 rounded-2xl grid grid-cols-2 grid-rows-3 h-70 w-100"
          onClick={(e) => e.stopPropagation()}>
            <h1 className="text-2xl pb-10">Edit Task</h1>
            <button className="position-absolute top-8 right-8 text-red-600 font-bold"
            onClick={() => setEditPopUpVisibility(false)}>
              X
            </button>
            <form action="" className="flex flex-col">
              <label htmlFor="title" defaultValue={subject}>
                Title:{" "}
              </label>
              <input
                className="border-2 border-black rounded-md h-9"
                type="text"
                name="title"
                defaultValue={subject}
              />

              <label htmlFor="priority" defaultValue={priority}>
                Priority(1-10):{" "}
              </label>
              <input
                className="border-2 border-black rounded-md h-9"
                type="text"
                name="priority"
                defaultValue={priority}
              />
              <button
                type="submit"
                className="bg-blue-500 transition-colors justify-self-center
            cursor-pointer border-2 rounded-md m-4 px-4 col-span-2 w-40 hover:bg-blue-300"
              >
                Edit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
