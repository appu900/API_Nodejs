import express from "express";
import taskRoutes from "./API/index.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/tasks", taskRoutes);

export default app;
