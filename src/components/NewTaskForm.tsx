import { useState } from "react";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(1, "Title cannot be empty!"),
  priority: z.int()
});

export default function NewTaskForm({
  onAddTask,
}: {
  onAddTask: (title: string, priority: number) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const [errors, setErrors] = useState<{ title?: string; priority?: string }>(
    {}
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = {
      title: (formData.get("title") as string).trim(),
      priority: Number(formData.get("priority")),
    };

    const result = taskSchema.safeParse(formValues);
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        title: formattedErrors.title?._errors[0],
        priority: formattedErrors.priority?._errors[0],
      });
    } else {
      setErrors({});
      onAddTask(result.data.title, result.data.priority);
      setIsVisible(false);
    }
  };

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
              onSubmit={handleSubmit}
              className={`position-absolute z-10 grid grid-cols-2 grid-rows-3 gap-3 mt-10`}
            >
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                name="title"
                className="border-2 rounded-md border-double h-10"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">{errors.title}</span>
              )}

              <label htmlFor="priority">Priority(Integer): </label>
              <input
                type="text"
                name="priority"
                className="border-2 rounded-md border-double h-10"
              />
              {errors.priority && (
                <span className="text-red-500 text-sm">{errors.priority}</span>
              )}

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
