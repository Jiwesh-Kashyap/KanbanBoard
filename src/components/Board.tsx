import TaskCard from "./TaskCard";
import type { Task } from "../App.tsx";

interface BoardProps {
  tasks: Task[];
  onUpdateTask(taskId: string, status: "TODO" | "IN_PROGRESS" | "DONE"): void;
}

export default function Board({ tasks, onUpdateTask }: BoardProps) {
  const toDo = tasks.filter((t) => t.status === "TODO");
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS");
  const done = tasks.filter((t) => t.status === "DONE");

  const handleDropInToDo = (e: React.DragEvent<HTMLDivElement>) => {
    const taskId = e.dataTransfer.getData("text/plain");
    console.log("DROPPED IN TODO! Task ID:", taskId);
    onUpdateTask(taskId, "TODO");
  };
  const handleDropInInProgress = (e: React.DragEvent<HTMLDivElement>) => {
    const taskId = e.dataTransfer.getData("text/plain");
    console.log("DROPPED IN IN_PROGRESS! Task ID:", taskId);
    onUpdateTask(taskId, "IN_PROGRESS");
  };
  const handleDropInDone = (e: React.DragEvent<HTMLDivElement>) => {
    const taskId = e.dataTransfer.getData("text/plain");
    console.log("DROPPED IN DONE! Task ID:", taskId);
    onUpdateTask(taskId, "DONE");
  };
  return (
    <div className="flex flex-row w-full gap-4 justify-center m-auto">
      <div
        className="column h-full min-h-96 border-4 border-red-500"
        onDragOver={(e) => {e.preventDefault();
            console.log("Hovering over TO DO!");
        }}
        // onDragEnter={(e) => e.preventDefault()}
        onDrop={handleDropInToDo}

      >
        <h2 className="text-2xl font-bold">To Do</h2>
        <hr />
        <ol>
          {toDo.map((t) => (
            <TaskCard key={t.id} subject={t.title} id={t.id} />
          ))}
        </ol>
      </div>
      <div
        className="column h-full min-h-96"
        onDragOver={(e) => {
            e.preventDefault()
            console.log("Hovering over IN!");
        }}
        onDrop={handleDropInInProgress}
      >
        <h2 className="text-2xl font-bold">In Progress</h2>
        <hr />
        <ol>
          {inProgress.map((t) => (
            <TaskCard key={t.id} subject={t.title} id={t.id} />
          ))}
        </ol>
      </div>
      <div
        className="column h-full min-h-96"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropInDone}
      >
        <h2 className="text-2xl font-bold">Done</h2>
        <hr />
        <ol>
          {done.map((t) => (
            <TaskCard key={t.id} subject={t.title} id={t.id} />
          ))}
        </ol>
      </div>
    </div>
  );
}
