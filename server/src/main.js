import express from "express";
import connectMongo from "./config/database.config.js";
import apiRoutes from "./API/index.js";
import cors from "cors";
const app = express();
const PORT = 3000;

async function bootstrapServer() {
  try {
    await connectMongo();
    app.use(express.json());
    app.use(cors());
    app.use("/api/task", apiRoutes);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error during server bootstrap:", error);
  }
}

bootstrapServer().catch((error) => {
  console.error("Failed to bootstrap server:", error);
  process.exit(1);
});
