import React, { useState } from "react";
import EditTodo from "../EditTodo";
import toast from "react-hot-toast";
import TodoServices from "../../Services/TodoServices";

const Card = ({ allTask, getUserTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  // 🗑 DELETE
  const handleDelete = async (id) => {
    try {
      await TodoServices.deleteTodo(id);
      toast.success("Task Deleted");
      getUserTask();
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  // ✅ TOGGLE COMPLETE
  const handleToggle = async (task) => {
    try {
      const updatedData = {
        ...task,
        isCompleted: !task.isCompleted,
      };

      await TodoServices.updateTodo(task._id, updatedData);

      toast.success(`Marked as ${!task.isCompleted ? "Completed" : "Pending"}`);

      getUserTask();
    } catch (error) {
      toast.error("Error updating task");
    }
  };

  return (
    <>
      <div className="card-container">
        {allTask?.map((task) => {
          // 🚨 OVERDUE LOGIC
          const isOverdue =
            task.dueDate &&
            new Date(task.dueDate) < new Date() &&
            !task.isCompleted;

          return (
            <div
              className={`card ${isOverdue ? "overdue" : ""}`}
              key={task._id}
            >
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              {/* 📅 DATE */}
              <p className="due-date">
                📅{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "No Date"}
              </p>

              {/* 🔥 PRIORITY */}
              <span
                className={`priority-badge ${
                  task.priority === "high"
                    ? "high"
                    : task.priority === "medium"
                      ? "medium"
                      : "low"
                }`}
              >
                {task.priority?.toUpperCase()}
              </span>

              {/* ✅ STATUS */}
              <span
                className={`status-badge ${
                  task.isCompleted ? "completed-badge" : "pending-badge"
                }`}
              >
                {task.isCompleted ? "Completed" : "Pending"}
              </span>

              {/* 🚨 OVERDUE BADGE */}
              {isOverdue && <span className="overdue-badge">Overdue</span>}

              {/* 🔘 TOGGLE */}
              <label className="toggle-container">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleToggle(task)}
                />
                <span>
                  Mark as {task.isCompleted ? "Pending" : "Completed"}
                </span>
              </label>

              {/* BUTTONS */}
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <button
                  className="btn btn-primary"
                  onClick={() => setSelectedTask(task)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ✏️ EDIT MODAL */}
      {selectedTask && (
        <EditTodo
          task={selectedTask}
          setShowModal={() => setSelectedTask(null)}
          getUserTask={getUserTask}
        />
      )}
    </>
  );
};

export default Card;
