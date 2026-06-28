# TaskFlow — Modern MERN Stack To-Do Application

TaskFlow is a sleek, highly responsive, and secure task management web application built on the MERN stack (**MongoDB, Express.js, React, Node.js**). Featuring secure JWT-based user authentication, real-time status metrics, and advanced live search-and-filter capabilities, TaskFlow provides a robust system to track, manage, and execute your tasks.

---

## 🚀 Key Features

*   **🔒 Secure Authentication**: Full registration & login workflows using **JWT** tokens and **Bcrypt.js** password hashing.
*   **🛡️ Protected Workspace**: Route guards prevent unauthorized access to your personal dashboards.
*   **📊 Live Performance Stats**: Displays total, completed, and pending tasks in real-time.
*   **🔍 Interactive Filtering & Search**: Instant keyboard search alongside filters for *All*, *Completed*, and *Pending* tasks.
*   **⚡ Priority & Due Dates**: Organize tasks with priority badges (`low`, `medium`, `high`) and deadline scheduling.
*   **🌙 Dark Mode Support**: Sleek interface toggle that persists your preference across visits via `localStorage`.
*   **🔔 Real-Time Feedback**: Interactive success and error alerts powered by `react-hot-toast`.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, React Router v6, Axios, Bootstrap 5.3 (CDN), FontAwesome 6, React Hot Toast |
| **Backend** | Node.js, Express.js, JWT (JSON Web Token), Bcrypt.js, Morgan (Logger), Colors |
| **Database** | MongoDB, Mongoose ODM |
| **Execution** | Concurrently (Dual-server startup under a single command) |

---

## 📂 Project Structure

```text
TODO-MERN-Stack-APP/
├── client/                 # React Frontend Application
│   ├── public/             # HTML Templates & Assets (Bootstrap/FontAwesome CDNs)
│   └── src/
│       ├── components/     # Layout (Navbar) & Shared UI (Card)
│       ├── pages/          # Landing, Home, Auth (Login/Register), About, Todos
│       ├── Services/       # Axios API integration layer
│       ├── Utils/          # Helper utilities
│       ├── App.js          # Client routing & Dark Mode configurations
│       └── index.js        # React Entrypoint
│
├── config/                 # Database connector settings (mongoose)
├── controllers/            # Request handlers (User and To-Do CRUD APIs)
├── middlewares/            # Session token validators
├── models/                 # Database schemas (User & Todo)
├── routes/                 # Express API endpoints
├── .env                    # System Environment configuration
├── .gitignore              # Files excluded from version control
├── package.json            # Main package scripts and core backend dependencies
└── server.js               # Node server startup & routing setup
```

---

## 💻 Local Setup & Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16+) and a running instance of **MongoDB** (Local Community Server or MongoDB Atlas cluster) installed.

### 1. Set Up Environment Variables
Create a file named `.env` in the root of the project (`TODO-MERN-Stack-APP/`) containing:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/todo-app
DEV_MODE=development
JWT_SECRET=your_jwt_secret_key_here
```

### 2. Install Dependencies
Run the following commands to install backend and frontend dependencies:
```bash
# Install backend dependencies in the root directory
npm install

# Navigate to client directory and install frontend dependencies
cd client
npm install

# Return to root directory
cd ..
```

### 3. Run the Application
Start the development environment. **Concurrently** will boot up both the Node/Express API server and the React Web App:
```bash
npm run dev
```
*   **Backend Server** runs on: `http://localhost:5000`
*   **Frontend Client** runs on: `http://localhost:3000`

---

## 🔌 API Endpoints Summary

### User Authentication
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/user/register` | Register a new user | No |
| `POST` | `/api/v1/user/login` | Login user & return token | No |

### Task Management (To-Dos)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/todo/create` | Create a new task | Yes |
| `GET` | `/api/v1/todo/get/:userId` | Get all tasks for a user | Yes |
| `PUT` | `/api/v1/todo/update/:id` | Update task details / status | Yes |
| `DELETE` | `/api/v1/todo/delete/:id` | Delete a task | Yes |
