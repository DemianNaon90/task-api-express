// src/config/db.js
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Conexión usando Promises
export const connectDB = async () => {
  const db = await open({
    filename: "./tasks.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      done INTEGER DEFAULT 0
    )
  `);

  return db;
};
