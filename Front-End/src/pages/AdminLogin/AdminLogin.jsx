import "./AdminLogin.css";
import React,{useState,useEffect} from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

function UserLogin() {

  const navigate = useNavigate()
  const [form,setForm] = useState({email:'',password:''})
  const [errors,setErrors] = useState({email:'',password:''})

useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    console.log("admin is", admin);

    if (admin) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const validate = ()=>{
      let isValidate = true    
      const newErrors = {email:'',password:''}

      if(!form.email){
        newErrors.email = 'Email is required'
        isValidate = false
      }
      if(!form.password){
        newErrors.password = 'Password is required'
        isValidate = false
      }
      setErrors(newErrors)
      return isValidate
  }
  const handleSubmit = async(e)=>{
     e.preventDefault();
    if(validate()){
       try {
         const response = await api.post('/admin/login',form)
        console.log('response is',response.data)
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
        localStorage.setItem('token',response.data.token)
        navigate('/dashboard')
       } catch (error) {
        console.log('login faild error',error)
        alert(error.response.data.msg)
       }
    }
  }
  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Admin Panel</h1>
          </div>
          <form className="input-from"  onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                className="input-filed"
                placeholder="Enter Your Email"
                value={form.email}
                onChange={(e)=> setForm({...form,email:e.target.value})}
              />
              {errors && <p style={{color:'red'}}>{errors.email}</p>}
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="input-filed"
                placeholder="Enter Your Password"
                value={form.password}
                onChange={(e)=> setForm({...form,password:e.target.value})}
              />
              {errors && <p style={{color:'red'}}>{errors.password}</p>}
            </div>
            <div className="btn-class">
              <button className="btn-login">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserLogin;
