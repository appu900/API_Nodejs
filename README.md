## 📝 Task Manager API
## A simple Task CRUD (Create, Read, Update, Delete) RESTful API built with Node.js, Express, and MongoDB.

🚀 Features

Create a new task
View all tasks
Mark a task as completed
Delete a task


🛠️ Tech Stack

Backend: Node.js, Express
Database: MongoDB (with Mongoose)
Testing: Jest, Supertest, mongodb-memory-server
HTTP Client: Postman / Fetch


📦 Installation
git clone https://github.com/yourusername/task-api.git
cd task-api
npm install


## 🧪 Test Coverage
The Task Manager API includes comprehensive integration tests to ensure reliability and correctness of the CRUD operations. Tests are written using Jest, Supertest, and MongoDB Memory Server for in-memory database testing. Below is a summary of the test cases:
Integration Tests for Task API

POST /api/tasks - Create a Task
Verifies successful task creation with valid data (title and description), expecting a 201 status code and correct task details in the response.
Tests error handling for missing or invalid fields (e.g., empty title), expecting a 400 status code and an appropriate error message.


GET /api/tasks - Retrieve All Tasks
Confirms that all tasks are returned with a 200 status code and validates the response contains the expected number of tasks.


PUT /api/tasks/:id - Update Task Completion
Ensures a task's completion status can be updated, expecting a 200 status code and the updated task with completed: true in the response.


DELETE /api/tasks/:id - Delete a Task
Validates successful deletion of a task by ID, expecting a 200 status code and a confirmation message indicating the task was deleted.



Test Setup

Uses MongoMemoryServer to create an in-memory MongoDB instance for isolated testing.
Connects to the database before all tests and cleans up after each test by deleting all tasks.
Drops the database and stops the server after all tests are completed.

These tests cover the core CRUD functionality, error handling, and database interactions, ensuring robust API behavior.