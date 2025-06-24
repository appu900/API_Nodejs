import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Task from "../models/task.model.js";
import app from "../main.js"; // This should only include app (not app.listen)

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await Task.deleteMany(); // Clean up
});

describe("Task API Integration", () => {
  test("POST /api/tasks - should create a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Test Task", description: "This is a test" });

    expect(res.statusCode).toBe(201);
    expect(res.body.task.title).toBe("Test Task");
  });

  test("POST /api/tasks - missing fields", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/required/);
  });

  test("GET /api/tasks - should return all tasks", async () => {
    await Task.create({ title: "A", description: "B" });

    const res = await request(app).get("/api/tasks");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("PUT /api/tasks/:id - should update task completion", async () => {
    const task = await Task.create({ title: "A", description: "B" });

    const res = await request(app)
      .put(`/api/tasks/${task._id}`)
      .send({ completed: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.task.completed).toBe(true);
  });

  test("DELETE /api/tasks/:id - should delete a task", async () => {
    const task = await Task.create({ title: "A", description: "B" });

    const res = await request(app).delete(`/api/tasks/${task._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted successfully/);
  });
});
