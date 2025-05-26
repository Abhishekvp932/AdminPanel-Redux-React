import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./UserLogin.css";
import api from "../../api/api";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import {useDispatch ,useSelector} from 'react-redux'
import { setUser ,setToken} from "../../features/userSlice";
import { useEffect } from "react";


function UserLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const {user} = useSelector((state)=> state.user.user)

  useEffect(()=>{
    const users = JSON.parse(localStorage.getItem("user"));
    if(user && users){
      navigate('/home')
    }
  })
  const dispatch = useDispatch()

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
        const response = await api.post("/auth/login", form);

        Toastify({
          text: response.data.msg,
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          close: true,
        }).showToast();
       dispatch(setUser(response.data.user))
       dispatch(setToken({token:response.data.token}))
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token',response.data.token)
        navigate('/home')
      } catch (error) {
        console.log("user login error", error);
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
