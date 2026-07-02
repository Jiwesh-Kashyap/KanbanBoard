import express from "express";
import { prisma } from "../prismaClient.js";
import { requireAuth } from "../middlewares/auth.js";

const boardRouter = express.Router();

boardRouter.use(requireAuth);

async function getDefaultBoardAndColumns(userId: string) {
  let board = await prisma.board.findFirst({
    where: { userId },
    include: { columns: true }
  });

  if (!board) {
    board = await prisma.board.create({
      data: {
        title: "My Agile Board",
        userId: userId,
        columns: {
          create: [
            { title: "TODO", order: 1 },
            { title: "IN_PROGRESS", order: 2 },
            { title: "DONE", order: 3 },
          ]
        }
      },
      include: { columns: true }
    });
  } else if (board.columns.length === 0) {
      await prisma.column.createMany({
          data: [
            { title: "TODO", order: 1, boardId: board.id },
            { title: "IN_PROGRESS", order: 2, boardId: board.id },
            { title: "DONE", order: 3, boardId: board.id },
          ]
      });
      board = (await prisma.board.findFirst({
        where: { userId },
        include: { columns: true }
      })) as any;
  }
  return board;
}

// GET all tasks mapped to frontend format
boardRouter.get("/api/boards", async (req, res) => {
  try {
    const board = await getDefaultBoardAndColumns(res.locals.userId);
    
    const dbTasks = await prisma.task.findMany({
      where: { column: { boardId: board!.id } },
      include: { column: true },
      orderBy: { priority: "desc" }
    });

    const tasks = dbTasks.map(t => ({
      id: t.id,
      title: t.title,
      priority: t.priority,
      status: t.column.title // Maps Column title to React "status"
    }));

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// POST a new task
boardRouter.post("/api/boards", async (req, res) => {
  try {
    const { title, priority, status } = req.body;
    const board = await getDefaultBoardAndColumns(res.locals.userId);
    
    const targetColumn = board!.columns.find(c => c.title === (status || "TODO"));
    if (!targetColumn) return res.status(400).json({message: "Invalid status"});

    const newTask = await prisma.task.create({
      data: {
        title,
        content: "", // Added because your DB schema requires it
        order: 1,    // Added because your DB schema requires it
        priority,
        columnId: targetColumn.id
      },
    });

    res.json({
        id: newTask.id,
        title: newTask.title,
        priority: newTask.priority,
        status: targetColumn.title
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
});

// PUT (update) a task
boardRouter.put("/api/boards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, priority, status } = req.body;
    
    const board = await getDefaultBoardAndColumns(res.locals.userId);
    const targetColumn = board!.columns.find(c => c.title === status);

    const dataToUpdate: any = {};
    if (title !== undefined) dataToUpdate.title = title;
    if (priority !== undefined) dataToUpdate.priority = priority;
    if (targetColumn) dataToUpdate.columnId = targetColumn.id;

    const updatedTask = await prisma.task.update({
      where: { id: id },
      data: dataToUpdate,
      include: { column: true }
    });

    res.json({
        id: updatedTask.id,
        title: updatedTask.title,
        priority: updatedTask.priority,
        status: updatedTask.column.title
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task" });
  }
});

// DELETE a single task
boardRouter.delete("/api/boards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id: id },
    });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
});

// DELETE all tasks
boardRouter.delete("/api/boards", async (req, res) => {
  try {
    const board = await getDefaultBoardAndColumns(res.locals.userId);
    const columnIds = board!.columns.map(c => c.id);

    await prisma.task.deleteMany({
      where: { columnId: { in: columnIds } },
    });
    res.json({ message: "All tasks deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting all tasks" });
  }
});

export default boardRouter;
