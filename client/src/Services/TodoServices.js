import axios from "axios";

// helper to get token
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("todoapp"));
  return user?.token || "";
};

// CREATE TODO → POST ✅ (correct)
const createTodo = (data) => {
  return axios.post("/api/v1/todo/create", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// GET ALL TODOS → GET ✅ (changed)
const getAllTodo = (id) => {
  return axios.get(`/api/v1/todo/getAll/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// UPDATE TODO → PUT ✅ (changed from PATCH)
const updateTodo = (id, data) => {
  console.log("🔥 USING PUT UPDATE API");
  return axios.put(`/api/v1/todo/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// DELETE TODO → DELETE ✅ (same)
const deleteTodo = (id) => {
  return axios.delete(`/api/v1/todo/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const TodoServices = { createTodo, getAllTodo, updateTodo, deleteTodo };
export default TodoServices;
