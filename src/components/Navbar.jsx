import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <NavLink
          className="navbar-brand fs-4 d-inline-flex align-items-center"
          to="/"
        >
          <i className="bx bxs-folder me-2 text-danger"></i>Folder
          <span className="text-danger">X</span>
        </NavLink>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav fs-6 ms-lg-5 ps-lg-5">
            <NavLink
              className={({ isActive }) =>
                `nav-link me-5 ps-lg-5 ${isActive ? "text-primary" : ""}`
              }
              aria-current="page"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link me-5 ps-lg-5 ${isActive ? "text-primary" : ""}`
              }
              aria-current="page"
              to="/about"
            >
              About
            </NavLink>
          </div>

          <NavLink
            className={({ isActive }) =>
              `nav-link me-5 mb-2 mb-lg-0 ${isActive ? "d-none" : ""}`
            }
            to="/login"
          >
            LogIn
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `nav-link me-5 ${isActive ? "d-none" : ""}`
            }
            to="/register"
          >
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
