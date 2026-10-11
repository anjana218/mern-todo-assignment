# MERN To-Do List

A full-stack to-do list built with MongoDB, Express, React (Vite) and Node.js.

```
backend/      Express API + Mongoose model
frontend/     React UI (Vite)
```

## 1. Prerequisites
- Node.js (v18+) and npm
- A MongoDB connection string — either:
  - **MongoDB Atlas** (free tier, no local install): create a cluster at
    https://www.mongodb.com/cloud/atlas, add a database user, allow your IP
    (or `0.0.0.0/0` for testing), and copy the connection string, or
  - A local MongoDB server (`mongodb://localhost:27017/todo-app`)

## 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
```
Open `.env` and fill in your real `MONGO_URI`. Leave `PORT` and
`FRONTEND_ORIGIN` as-is unless you've changed the frontend's port.

Run it:
```bash
npm run dev      # nodemon, auto-restarts on changes
# or
npm start
```
You should see `Connected to MongoDB` and `Server listening on
http://localhost:5000` in the terminal. Visit http://localhost:5000 in a
browser — it should say "To-Do List API is running."

## 3. Frontend setup
Open a **second terminal** (keep the backend running):
```bash
cd frontend
npm install
npm run dev
```
Open the URL it prints (usually http://localhost:3000). You should see the
to-do list UI. Adding/completing/deleting a task should update instantly
with no page reload, and persist if you refresh (because it's now reading
from MongoDB, not localStorage).

If tasks don't load, check the browser console and the backend terminal —
the most common causes are: backend not running, wrong `MONGO_URI`, or a
CORS mismatch (`FRONTEND_ORIGIN` in `.env` must match the URL the frontend
is actually running on).

## 4. API reference
| Method | Route             | Body                          | Response             |
|--------|-------------------|--------------------------------|-----------------------|
| GET    | `/api/tasks`      | —                              | `200` + array of tasks |
| POST   | `/api/tasks`      | `{ "title": "string" }`        | `201` + created task, or `400` if title is empty |
| PUT    | `/api/tasks/:id`  | `{ "title"?, "completed"? }`   | `200` + updated task, or `404` if not found |
| DELETE | `/api/tasks/:id`  | —                              | `200` + confirmation, or `404` if not found |

## 5. Git workflow (required by the assignment)
Do this from the very start — don't build everything first and push once.

```bash
# 1. Initialise and make the first commit on main
git init
git add README.md .gitignore
git commit -m "Initial commit: project scaffold"
git branch -M main
git remote add origin <your-empty-GitHub-repo-URL>
git push -u origin main

# 2. Backend work happens on its own branch
git checkout -b feature/backend
git add backend/package.json backend/.env.example
git commit -m "Set up Express server and dependencies"
# ...keep committing as you build (Task model, GET/POST, PUT/DELETE, CORS)...
git add backend/models/Task.js
git commit -m "Add Task model"
git add backend/routes/taskRoutes.js backend/server.js
git commit -m "Add GET and POST endpoints"
git commit -m "Add PUT and DELETE endpoints"   # after further edits
git push -u origin feature/backend

# 3. Frontend work happens on its own branch (branch off main, not backend)
git checkout main
git checkout -b feature/frontend
git add frontend/
git commit -m "Scaffold React app with Vite"
git commit -m "Add TaskForm, TaskList, TaskItem components"
git commit -m "Connect frontend to backend API"
git push -u origin feature/frontend
```

Then on GitHub:
1. Open a **pull request** from `feature/backend` → `main`, review it, **merge** it.
2. Open a **pull request** from `feature/frontend` → `main`, review it, **merge** it.
3. `main` now holds the complete, working app. Never commit directly to `main`.

You should end up with **5+ commits** across the branches with messages like
"Add Task model", "Add DELETE endpoint", "Add TaskForm component" — not one
bulk upload.

## 6. Before you submit
- [ ] Both servers run cleanly with no console errors
- [ ] `.env` is **not** committed (check `git status` — it should be ignored)
- [ ] `.env.example` **is** committed, with placeholder values only
- [ ] `node_modules/` is **not** committed in either folder
- [ ] Both branches are pushed and merged into `main` via pull requests
- [ ] Take 2–3 screenshots: adding a task, a completed (struck-through) task,
      and a deleted task — plus one screenshot of the **Pull requests → Closed**
      tab on GitHub showing both merged PRs
- [ ] Zip the project (excluding `node_modules` and `.env`) as
      `RollNo_Name_Assignment2_MERN_ToDoList.zip`
