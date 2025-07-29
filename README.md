# Task Manager

A simple full-stack Task Manager built with **.NET 8 (C#)** on the backend and **React + TypeScript** on the frontend.

---

## Tech Stack

| Part      | Tech                 |
|-----------|----------------------|
| Backend   | .NET 8 Web API (C#)   |
| Frontend  | React + TypeScript    |
| Styling   | Bootstrap 5 + custom CSS |
| API Calls | Axios                |

---

##  Features

- Add new tasks  
- View all tasks  
- Mark tasks as completed / uncompleted  
- Delete tasks  
- Filter tasks: All / Active / Completed  

---

## Project Structure

```
TaskManagerApi/       → .NET backend project
task-manager/         → React frontend project
```

---

## How to Run

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
- [Node.js + npm](https://nodejs.org/)
- Code editor (VS Code or similar)

---

### Run the backend

```bash
cd TaskManagerApi
dotnet run
```

This starts the server at:  
**http://localhost:5167**

---

### Run the frontend

```bash
cd task-manager
npm install
npm run dev
```

Then open your browser at:  
**http://localhost:3000**

---

## Enhancements

- Clean and responsive UI styled with Bootstrap 5 and custom CSS
- Task filtering (All / Active / Completed) with active tab highlighting
- Interactive features: hover effects, keyboard shortcuts, styled buttons
- Input validation and helpful messages for task completion or errors
---

## Unit Testing

- Added a separate **TaskManagerApi.Tests** project using **xUnit**
- Covers all key service operations: adding, updating, deleting tasks
- Ensures logic correctness and improves backend reliability

### Run Tests

```bash
cd TaskManagerApi.Tests
dotnet test
```