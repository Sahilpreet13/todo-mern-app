const express = require("express");
const {
  createTodoController,
  getTodoController,
  deleteTodoController,
  updateTodoController,
} = require("../controllers/todoController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// CREATE TODO
router.post("/create", authMiddleware, createTodoController);

// GET ALL TODOS (use GET instead of POST)
router.get("/getAll/:userId", authMiddleware, getTodoController);

// DELETE TODO
router.delete("/delete/:id", authMiddleware, deleteTodoController);

// UPDATE TODO
router.put("/update/:id", authMiddleware, updateTodoController);

module.exports = router;
