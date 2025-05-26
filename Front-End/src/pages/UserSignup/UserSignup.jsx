import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserSignup.css";
import api from "../../api/api";

import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import {useDispatch } from 'react-redux'
import { setUser ,setToken} from "../../features/userSlice";
function UserSignup() {

  const dispatch = useDispatch()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const Validate = () => {
    let isValid = true;
    const newError = { name: "", email: "", password: "", confirmPassword: "" };


       const namePattern = /^[A-Za-z]+$/;
       
    if (!form.name) {
      newError.name = "Name is required";
      isValid = false;
    }
    if(!namePattern.test(form.name)){
      newError.name = "Name should contain only letters and spaces"
      isValid = false
    }
 const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!form.email) {
      newError.email = "Email is required";
      isValid = false;
    }
    if(!emailPattern.test(form.email)){
      newError.email = "Please enter a valid email address"
      isValid = false
    }
    if(form.password < 8){
      newError.password = "Password must be at least 8 characters long"
      isValid = false
    }
    if (!form.password) {
      newError.password = "Password is required";
      isValid = false;
    }
    if (!form.confirmPassword) {
      newError.confirmPassword = "Confirm Password is required ";
      isValid = false;
    }

    if (form.password !== form.confirmPassword) {
      newError.confirmPassword = "Password is not match";
      isValid = false;
    }
    setErrors(newError);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Validate()) {
      try {
        const response = await api.post("/auth/signup", form);
        console.log(response);
        Toastify({
          text: response.data.msg,
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          close: true,
        }).showToast();
        dispatch(setUser(response.data.user))
        dispatch(setToken(response.data.token))
        navigate("/");
      } catch (error) {
        console.log("signup user error", error);
        Toastify({
          text: error.response?.data?.msg || "Signup failed",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor:
            "linear-gradient(to right,rgb(222, 124, 124),rgb(130, 35, 6))",
          close: true,
        }).showToast();
      }
    }
  };

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/");
  };
  return (
    <>
      <div className="signup-container">
        <div className="signup-card">
          <div className="login-header">
            <h1>Register</h1>
          </div>
          <form action="" onSubmit={handleSubmit} className="signup-form">
            <div className="signup-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <div className="error-message">{errors.name}</div>
            </div>

            <div className="signup-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="Enter Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <div className="error-message">{errors.email}</div>
            </div>

            <div className="signup-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter a Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <div className="error-message">{errors.password}</div>
            </div>
            <div className="signup-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter Confirm Password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />
              <div className="error-message">{errors.confirmPassword}</div>
            </div>
            <div className="btn-class">
              <button className="btn" type="submit">
                Signup
              </button>
            </div>
          </form>
          <div className="signup-redirect">
            Already have an account?{" "}
            <a href="#" className="signup-link" onClick={handleLogin}>
              Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSignup;
