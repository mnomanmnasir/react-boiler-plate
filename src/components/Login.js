import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaLock } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap CSS

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    return <p className="text-danger text-center">AuthContext is not available. Check App.js</p>;
  }

  const { login } = authContext;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", formData);
      login(res.data.token, res.data.user);
      toast.success("Login Successful");
      navigate("/products");
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center text-primary mb-4">Login</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        {/* Divider */}
        <div className="text-center my-3">
          <span className="text-muted">OR</span>
        </div>

        {/* Register Link */}
        <p className="text-center">
          Don't have an account?{" "}
          <span
            className="text-primary fw-bold cursor-pointer"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
