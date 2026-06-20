import { useState } from "react";
import Board from "./components/Board";
import NewTaskForm from "./components/NewTaskForm";
export interface Task {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
}

const initialTasks: Task[] = [
  { id: "1", title: "Setup Vite Project", status: "DONE" },
  { id: "2", title: "Learn TS Interfaces", status: "IN_PROGRESS" },
  { id: "3", title: "Implement Drag and Drop", status: "TODO" },
  { id: "4", title: "Workout Tracker", status: "DONE" },
  { id: "5", title: "Workout Tracker 2", status: "DONE" },
  { id: "6", title: "Workout Tracker 3", status: "DONE" },
  {id: "7", title: "Priority implementation", status: "IN_PROGRESS"}
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleAddTask = (title: string) => {
    const newId = String(tasks.length + 1);
    const newTask: Task = { id: newId, title: title, status: "TODO" };
    setTasks((c) => [...c, newTask]);
  };

  const handleUpdateTask = (
    id: string,
    status: "TODO" | "IN_PROGRESS" | "DONE"
  ) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status: status };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="app-container flex flex-col align-middle w-full m-auto">
      <h1 className="text-4xl mb-10 align-middle">Agile Tracker</h1>
      {/* <NewTaskForm onAddTask={handleAddTask} /> */}
      <Board tasks={tasks} onUpdateTask={handleUpdateTask} />
    </div>
  );
}
