import React from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../assets/images/hero.jpg";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* HEADER */}
      <div className="header">
        <h2>📝 Todo App</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn" onClick={() => navigate("/login")}>
            Login
          </button>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className="landing-wrapper">
        {/* LEFT TEXT */}
        <div className="landing-text">
          <h1>
            Organize your work <br />
            <span>efficiently.</span>
          </h1>

          <p>
            Manage your daily tasks, stay productive, and never miss anything.
          </p>

          <div className="landing-buttons">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>

            <button className="btn" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="landing-image">
          <img src={Hero} alt="hero" />
        </div>
      </div>
    </>
  );
};

export default Landing;
