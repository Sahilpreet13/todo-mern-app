import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("todoapp"));

  const handleLogout = () => {
    localStorage.removeItem("todoapp");
    navigate("/login");
  };

  return (
    <div className={`header ${darkMode ? "header-dark" : ""}`}>
      <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        📝 Todo App
      </h3>

      <div className="nav-right">
        <span className="welcome-text">
          Welcome {user?.user?.username || "User"}
        </span>

        <button className="btn" onClick={() => navigate("/home")}>
          Home
        </button>

        <button className="btn" onClick={() => navigate("/todos")}>
          My Todos
        </button>

        {/* 🌙 DARK MODE TOGGLE */}
        <button className="btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
