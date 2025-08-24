// src/app.js
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use("/tasks", taskRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 4000;
connectDB();
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
