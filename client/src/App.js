import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import About from "./pages/About/About";
import TodoList from "./pages/Todos/TodoList";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/Layout/Navbar";
import { Toaster } from "react-hot-toast";
import "./App.css";

// 🔐 Protected Route
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("todoapp"));
  return user?.token ? children : <Navigate to="/login" />;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  // 🚫 Routes where navbar should NOT show
  const hideNavbarRoutes = ["/", "/login", "/register"];

  // load dark mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
    }
  }, []);

  // apply dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  return (
    <>
      {/* 🔝 CONDITIONAL NAVBAR */}
      {!hideNavbarRoutes.includes(location.pathname) && (
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      )}

      {/* 🌐 ROUTES */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 Protected */}
        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <TodoList />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* 🔔 Toast */}
      <Toaster />
    </>
  );
}

export default App;
