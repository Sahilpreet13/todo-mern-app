import React, { useState } from "react";
import TodoServices from "../Services/TodoServices";
import toast from "react-hot-toast";

const CreateTodo = ({ setShowModal, getUserTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("todoapp"));
      const createdBy = userData?.user?.id;

      if (!title || !description) {
        return toast.error("Fill all fields");
      }

      await TodoServices.createTodo({
        title,
        description,
        createdBy,
        priority,
        dueDate,
      });

      toast.success("Task Created");
      setShowModal(false);
      getUserTask();
    } catch (err) {
      toast.error("Error creating task");
    }
  };

  return (
    <div className="custom-modal">
      <div className="custom-modal-box">
        <h3>Create Task</h3>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Create
          </button>

          <button className="btn" onClick={() => setShowModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTodo;
