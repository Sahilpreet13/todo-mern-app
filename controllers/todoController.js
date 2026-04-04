const todoModel = require("../models/todoModel");

// CREATE TODO
const createTodoController = async (req, res) => {
  try {
    const { title, description, createdBy, priority, dueDate } = req.body;

    if (!title || !description || !createdBy) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const todo = await todoModel.create({
      title,
      description,
      createdBy,
      priority: priority || "low", // ✅ default if not sent
      dueDate,
    });

    res.status(201).send({
      success: true,
      message: "Task created successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create todo API",
    });
  }
};

// GET TODOS
const getTodoController = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User ID is required",
      });
    }

    const todos = await todoModel
      .find({ createdBy: userId })
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Todos fetched successfully",
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get todo API",
    });
  }
};

// DELETE TODO
const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await todoModel.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).send({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete todo API",
    });
  }
};

// UPDATE TODO
const updateTodoController = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }, // 🔥 returns updated document
    );

    if (!updatedTodo) {
      return res.status(404).send({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Task updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update todo API",
    });
  }
};

module.exports = {
  createTodoController,
  getTodoController,
  deleteTodoController,
  updateTodoController,
};
