import React, { useState } from "react";
import toast from "react-hot-toast";
import TodoServices from "../Services/TodoServices";
import { getErrorMessage } from "../Utils/ErrorMessage";

const EditTodo = ({ task, setShowModal, getUserTask }) => {
  const [title, setTitle] = useState(task?.title);
  const [description, setDescription] = useState(task?.description);
  const [isCompleted, setIsCompleted] = useState(task?.isCompleted);
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? task.dueDate.split("T")[0] : "",
  );

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSelectChange = (e) => {
    setIsCompleted(e.target.value === "true");
  };
  //   console.log(isCompleted);
  const id = task?._id;

  //update
  const handleSubmit = async () => {
    try {
      if (!title || !description) {
        return toast.error("Please provide title and description");
      }

      const data = { title, description, isCompleted, dueDate };

      await TodoServices.updateTodo(id, data);

      toast.success("Task Updated Successfully");
      setShowModal(false);
      getUserTask();
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error));
    }
  };
  return (
    <>
      {task && (
        <div className="custom-modal">
          <div className="custom-modal-box">
            <h3>Update Task</h3>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />

            <select
              value={isCompleted}
              onChange={(e) => setIsCompleted(e.target.value === "true")}
            >
              <option value="false">Incomplete</option>
              <option value="true">Completed</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <div className="modal-actions">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Update
              </button>

              <button className="btn" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTodo;
