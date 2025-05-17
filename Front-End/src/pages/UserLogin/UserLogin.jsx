import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./UserLogin.css";
import api from "../../api/api";

function UserLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    let isValidate = true;
    const newError = { email: "", password: "" };

    if (!form.email) {
      newError.email = "Email is required";
      isValidate = false;
    }
    if (!form.password) {
      newError.password = "Password is required";
      isValidate = false;
    }
    setErrors(newError);
    return isValidate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await api.post('/auth/login',form)
        console.log(response)
      } catch (error) {
        console.log('user login error',error)
      }
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Welcome Back!</h1>
          </div>
          <form className="input-from" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                className="input-filed"
                placeholder="Enter Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <div className="error-message">{errors.email}</div>
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="input-filed"
                placeholder="Enter Your Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <div className="error-message">{errors.password}</div>
            </div>
            <div className="btn-class">
              <button className="btn-login">Login</button>
            </div>
          </form>
          <div className="signup-redirect">
            Don't have an account?{" "}
            <a href="#" className="signup-link" onClick={handleSignup}>
              Sign up
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserLogin;
