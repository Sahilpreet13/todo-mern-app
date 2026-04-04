import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthStyles.css";
import AuthServices from "../../Services/AuthServices";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../Utils/ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    try {
      const res = await AuthServices.loginUSer({ email, password });

      if (!res?.data?.token) {
        return toast.error("Invalid login response");
      }

      localStorage.setItem("todoapp", JSON.stringify(res.data));

      toast.success(res.data.message || "Login successful");
      navigate("/home");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={loginHandler}>
        <i className="fa-solid fa-circle-user"></i>

        <h2 style={{ marginBottom: "15px" }}>Login</h2>

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
            Not a user? <Link to="/register">Register</Link>
          </p>

          <button type="submit" className="login-btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
