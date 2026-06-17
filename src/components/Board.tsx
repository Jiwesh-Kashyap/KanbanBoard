import { useState } from "react";
import TaskCard from "./TaskCard";
import NewTaskForm from "./NewTaskForm";

export interface Task {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
}

const initialTaks: Task[] = [
  { id: "1", title: "Setup Vite Project", status: "DONE" },
  { id: "2", title: "Learn TS Interfaces", status: "IN_PROGRESS" },
  { id: "3", title: "Implement Drag and Drop", status: "TODO" },
  { id: "4", title: "Workout Tracker", status: "DONE" },
  { id: "5", title: "Workout Tracker 2", status: "DONE" },
  { id: "6", title: "Workout Tracker 3", status: "DONE" },
];

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>(initialTaks);
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
