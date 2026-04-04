import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthStyles.css";
import AuthServices from "../../Services/AuthServices";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../Utils/ErrorMessage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      return toast.error("Please fill all fields");
    }

    try {
      const res = await AuthServices.registerUser({
        email,
        password,
        username,
      });

      toast.success(res.data.message || "Registered successfully");
      navigate("/login");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={registerHandler}>
        <i className="fa-solid fa-circle-user"></i>

        <h2 style={{ marginBottom: "15px" }}>Register</h2>

        <input
          type="text"
          className="form-control"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="form-bottom">
          <p>
            Already a user? <Link to="/login">Login</Link>
          </p>

          <button type="submit" className="login-btn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
