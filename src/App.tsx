import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./components/Board";
import NewTaskForm from "./components/NewTaskForm";
import Signup from "./components/Signup";
import Signin from "./components/Signin";

export interface Task {
  id: string;
  title: string;
  priority: number;
  status: "TODO" | "IN_PROGRESS" | "DONE";
}

const initialTasks: Task[] = [
  { id: "1", title: "Setup Vite Project", priority: 1, status: "DONE" },
  { id: "2", title: "Learn TS Interfaces", priority: 1, status: "IN_PROGRESS" },
  { id: "3", title: "Implement Drag and Drop", priority: 1, status: "TODO" },
  { id: "4", title: "Workout Tracker", priority: 1, status: "DONE" },
  { id: "5", title: "Workout Tracker 2", priority: 1, status: "DONE" },
  { id: "6", title: "Workout Tracker 3", priority: 2, status: "DONE" },
  {
    id: "7",
    title: "Priority implementation",
    priority: 1,
    status: "IN_PROGRESS",
  },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  tasks.sort(function (a, b) {
    return b.priority - a.priority;
  });

  const handleAddTask = (title: string, priority: number) => {
    const newId = String(tasks.length + 1);
    const newTask: Task = { id: newId, title, priority, status: "TODO" };
    setTasks((c) => [...c, newTask]);
    tasks.sort(function (a, b) {
      return b.priority - a.priority;
    });
  };

  const handleUpdateTask = (
    id: string,
    status: "TODO" | "IN_PROGRESS" | "DONE",
  ) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status: status };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const handleEditTask = (id: string, title: string, priority: number) => {
    const editedTasks = tasks.map((task) => {
      if (task.id === id) return { ...task, id, title, priority };
      return task;
    });
    setTasks(editedTasks);
  };
  return (
    <BrowserRouter>
      <div className="app-container flex flex-col align-middle w-full m-auto">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="text-4xl mb-10 align-middle">Agile Tracker</h1>
                <NewTaskForm onAddTask={handleAddTask} />
                <Board
                  tasks={tasks}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                />
              </>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
