// src/controllers/taskController.js
import Task from "../models/Task.js";

// GET /tasks
export const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// POST /tasks
export const createTask = async (req, res) => {
  try {
    const { title, description, done } = req.body;
    if (!title) return res.status(400).json({ error: "El título es obligatorio" });

    const task = new Task({ title, description, done });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /tasks/:id
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });
    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
