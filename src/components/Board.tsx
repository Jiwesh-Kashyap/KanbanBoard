import TaskCard from "./TaskCard";
import type { Task } from "../App.tsx";

interface BoardProps {
  tasks: Task[];
}

export default function Board({ tasks }: BoardProps) {
  const toDo = tasks.filter((t) => t.status === "TODO");
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS");
  const done = tasks.filter((t) => t.status === "DONE");

  return (
    <div className="flex flex-row w-full gap-4 justify-center " m-auto>
      <div className="column h-full min-h-65">
        <h2 className="text-2xl font-bold">To Do</h2>
        <hr className="justify-self-center-safe" />
        <ol>
          {toDo.map((t, ind) => (
            <TaskCard key={t.id} subject={t.title} index={ind + 1} />
          ))}
        </ol>
      </div>
      <div className="column h-full min-h-65">
        <h2 className="text-2xl font-bold">In Progress</h2>
        <hr />
        <ol>
          {inProgress.map((t, ind) => (
            <TaskCard key={t.id} subject={t.title} index={ind + 1} />
          ))}
        </ol>
      </div>
      <div className="column h-full min-h-65">
        <h2 className="text-2xl font-bold">Done</h2>
        <hr />
        <ol>
          {done.map((t, ind) => (
            <TaskCard key={t.id} subject={t.title} index={ind + 1} />
          ))}
        </ol>
      </div>
    </div>
  );
}
