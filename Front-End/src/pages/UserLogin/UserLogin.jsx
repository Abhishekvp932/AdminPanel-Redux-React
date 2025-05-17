import { useNavigate } from 'react-router-dom'
import './UserLogin.css'
function UserLogin() {
    const navigate = useNavigate()
    const handleSignup = ()=>{
        navigate('/signup')
    }
  return (
    <>
      <div className='login-container'>
       <div className='login-card'>
            <div className='login-header'>
               <h1>Welcome Back !</h1>
            </div>
            <form action="" className='input-from'>
               <div className='input-group'>
                 <label htmlFor="Email">Email</label>
                <input type="text" className='input-filed' placeholder='Enter Your Email' />
                <label htmlFor="password">Password</label>
                <input type="password" className='input-filed' placeholder='Enter You Password'/>
               </div>
               <div className='btn-class'>
                <button className='btn-login'>Login</button>
               </div>
            </form>
             <div className="signup-redirect">
          Don't have an account? <a href="#" className="signup-link" onClick={handleSignup}>Sign up</a>
        </div>
       </div>
      </div>
    </>
  )
}

export default UserLogin