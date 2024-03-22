import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const { token, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  async function loginUser(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post(
        ` ${import.meta.env.VITE_API_URL}auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        await login(response.data.token);
        navigate("/dashboard");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="form text-center">
        <h3>Log In</h3>
        <form className="loginform p-3 " onSubmit={loginUser}>
          <div>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
            />
          </div>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <i
              className={`bx ${
                showPassword ? "bx-hide" : "bx-show"
              } toggle-password`}
              onClick={handleShowPassword}
            ></i>
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-100 my-3">
              Log In
            </button>
            <p>
              Don't have an account?
              <Link to="/register" className="text-primary ms-1">
                Register Now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
