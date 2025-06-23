import express from "express";
import Task from "../models/task.model.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }
    const task = await Task.create({
      title,
      description,
    });
    if (!task) {
      return res.status(500).json({ message: "Failed to create task" });
    }
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({});
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    console.log("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  // ** update is the task is completed or not
  try {
    const { id } = req.params;
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      return res
        .status(400)
        .json({ message: "Completed status must be a boolean" });
    }

    const task = await Task.findByIdAndUpdate(id, { completed }, { new: true });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.log("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
