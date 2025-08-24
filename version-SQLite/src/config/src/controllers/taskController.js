// src/controllers/taskController.js
let db;

export const setDB = (database) => {
  db = database;
};

// GET /tasks
export const getTasks = async (req, res) => {
  const tasks = await db.all("SELECT * FROM tasks");
  res.json(tasks.map(t => ({ ...t, done: !!t.done }))); // convertir 0/1 a boolean
};

// POST /tasks
export const createTask = async (req, res) => {
  try {
    const { title, description, done } = req.body;
    if (!title) return res.status(400).json({ error: "El título es obligatorio" });

    const result = await db.run(
      "INSERT INTO tasks (title, description, done) VALUES (?, ?, ?)",
      [title, description || "", done ? 1 : 0]
    );

    const newTask = await db.get("SELECT * FROM tasks WHERE id = ?", [result.lastID]);
    res.status(201).json({ ...newTask, done: !!newTask.done });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /tasks/:id
export const updateTask = async (req, res) => {
  try {
    const { title, description, done } = req.body;
    const id = req.params.id;

    const task = await db.get("SELECT * FROM tasks WHERE id = ?", [id]);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });

    await db.run(
      "UPDATE tasks SET title = ?, description = ?, done = ? WHERE id = ?",
      [
        title || task.title,
        description || task.description,
        done !== undefined ? (done ? 1 : 0) : task.done,
        id,
      ]
    );

    const updatedTask = await db.get("SELECT * FROM tasks WHERE id = ?", [id]);
    res.json({ ...updatedTask, done: !!updatedTask.done });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await db.get("SELECT * FROM tasks WHERE id = ?", [id]);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });

    await db.run("DELETE FROM tasks WHERE id = ?", [id]);
    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
