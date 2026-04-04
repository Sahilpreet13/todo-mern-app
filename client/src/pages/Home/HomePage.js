import React, { useEffect, useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import Card from "../../components/Card/Card";
import TodoServices from "../../Services/TodoServices";
import CreateTodo from "../../components/CreateTodo";

const HomePage = () => {
  const [allTask, setAllTask] = useState([]);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData?.user?.id;

  // 🔄 Fetch tasks
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

  // 🔍 SEARCH FILTER (title + description)
  const filteredTasks = allTask.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="container">
        <h1>Your Tasks</h1>

        {/* 🔍 SEARCH + CREATE */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            width: "100%",
          }}
        >
          <input
            type="text"
            placeholder="Search your task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "300px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <button
            className="btn btn-primary"
            onClick={() => setShowCreate(true)}
          >
            + Create Task
          </button>
        </div>

        {/* 🧩 TASK LIST */}
        <Card allTask={filteredTasks} getUserTask={getUserTask} />

        {/* ➕ CREATE MODAL */}
        {showCreate && (
          <CreateTodo setShowModal={setShowCreate} getUserTask={getUserTask} />
        )}
      </div>
    </>
  );
};

export default HomePage;
