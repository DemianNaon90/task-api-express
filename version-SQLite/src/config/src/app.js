// src/app.js
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import { setDB } from "./controllers/taskController.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Inicializar DB y arrancar server
const startServer = async () => {
  const db = await connectDB();
  setDB(db);

  app.use("/tasks", taskRoutes);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
};

startServer();
