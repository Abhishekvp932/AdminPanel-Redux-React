import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './UserSignup.css'
function UserSignup() {
    const [form,setForm] = useState({name:'',email:'',password:'',confirmPassword:''})
    const [errors,setErrors] = useState({name:'',email:'',password:'',confirmPassword:''})



    const Validate = ()=>{
        let isValid = true
        const newError = {name:'',email:'',password:'',confirmPassword:''}

        if(!form.name){
            newError.name = 'Name is required'
            isValid = false
        }
        if(!form.email){
            newError.email = 'Email is required'
            isValid = false
        }
        if(!form.password){
            newError.password = 'Password is required'
            isValid = false
        }
        if(!form.confirmPassword){
            newError.confirmPassword = 'Confirm Password is required '
            isValid = false
        }
        setErrors(newError)
        return isValid
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(Validate()){
            navigate('/')
            alert('user logged successfully')
        }
    }

    const navigate = useNavigate()
    const handleLogin = ()=>{
        navigate('/login')
    }
  return (
    <>
    <div className='signup-container'>
      <div className='signup-card'>
          <div className='login-header'>
               <h1>Register</h1>
          </div>
          <form action="" onSubmit={handleSubmit} className='signup-form'>
            <div className='signup-group'>
              <label htmlFor="name">Full Name</label>
              <input type="text"
               className='input-field'
                placeholder='Enter Your Name'
                 value={form.name}
                  onChange={(e)=> setForm({...form , name:e.target.value})} />
                  {errors.name && <p>{errors.name}</p>}
                  </div>

                   <div className='signup-group'>
              <label htmlFor="email">Email</label>
              <input type="email"
               className='input-field'
                placeholder='Enter Your Email' value={form.email}
                 onChange={(e)=> setForm({...form,email:e.target.value})} />
                 {errors.email && <p>{errors.email}</p>}
                 </div>

                  <div className='signup-group'>
              <label htmlFor="password">Password</label>
              <input type="password"
               className='input-field'
                placeholder='Enter a Password'
                 value={form.password}
                onChange={(e)=> setForm({...form,password:e.target.value})}
                />
                {errors.password && <p>{errors.password}</p>}
                </div>
                 <div className='signup-group'>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password"
                className='input-field'
                 placeholder='Enter Confirm Password'
                  value={form.confirmPassword} 
                  onChange={(e)=> setForm({...form,confirmPassword:e.target.value})}/>
                  {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                  </div>
            <div className='btn-class'>
            <button className='btn' type='submit'>Signup</button>
          </div>
          </form>
          <div className="signup-redirect">
            Already have an account? <a href="#" className="signup-link" onClick={handleLogin}>Login</a>
            </div>
      </div>
    </div>
    </>
  )
}

export default UserSignup