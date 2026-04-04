const express = require("express");
const {
  registerController,
  loginControler,
} = require("../controllers/userController");

const router = express.Router();

// REGISTER
router.post("/register", registerController);

// LOGIN
router.post("/login", loginControler);

module.exports = router;
