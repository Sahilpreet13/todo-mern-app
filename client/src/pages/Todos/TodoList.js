import React, { useEffect, useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import Card from "../../components/Card/Card";
import TodoServices from "../../Services/TodoServices";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
  const [allTask, setAllTask] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState(""); // 🔥 NEW

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("todoapp"));
  const id = user?.user?.id;

  // 🔐 protect route
  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
    }
  }, []);

  // fetch tasks
  const getUserTask = async () => {
    try {
      const { data } = await TodoServices.getAllTodo(id);
      setAllTask(data?.todos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserTask();
  }, []);

  // 📊 stats
  const total = allTask.length;
  const completed = allTask.filter((t) => t.isCompleted).length;
  const pending = allTask.filter((t) => !t.isCompleted).length;

  // 🔥 COMBINED FILTER + SEARCH
  const filteredTasks = allTask
    .filter((task) => {
      if (filter === "completed") return task.isCompleted;
      if (filter === "pending") return !task.isCompleted;
      return true;
    })
    .filter(
      (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <>
      <div className="container">
        <h1>My Todos Dashboard</h1>

        {/* 📊 STATS */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>{total}</h3>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card green">
            <h3>{completed}</h3>
            <p>Completed</p>
          </div>

          <div className="stat-card red">
            <h3>{pending}</h3>
            <p>Pending</p>
          </div>
        </div>

        {/* 🔍 SEARCH BAR */}
        <input
          type="text"
          placeholder="Search your task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "15px",
          }}
        />

        {/* 🔘 FILTER BUTTONS */}
        <div className="filter-buttons">
          <button
            onClick={() => setFilter("all")}
            className={`btn ${filter === "all" ? "active-filter" : ""}`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`btn ${filter === "completed" ? "active-filter" : ""}`}
          >
            Completed
          </button>

          <button
            onClick={() => setFilter("pending")}
            className={`btn ${filter === "pending" ? "active-filter" : ""}`}
          >
            Pending
          </button>
        </div>

        {/* 🧩 TASK LIST */}
        <Card allTask={filteredTasks} getUserTask={getUserTask} />
      </div>
    </>
  );
};

export default TodoList;
