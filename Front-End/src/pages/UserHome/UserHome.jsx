import React,{useEffect} from 'react'
import './UserHome.css'
import { useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import { useNavigate } from 'react-router-dom'
function UserHome() {
  const {user,isLoggedIn} = useSelector((state) => state.user.user)
   const navigate = useNavigate()
  useEffect(()=>{
     const users  =  JSON.parse(localStorage.getItem("user"));
     if(!user && !users){
      navigate('/')
     }
  })
  return (
    <>
    <div>
     <Header/>
    </div>
    <div className="user-home-container">
      
      
      <div className="welcome-container">
         {isLoggedIn ? (
        <h1>Welcome, {user.name}</h1>
      ) : (
        <h1>You are not logged in</h1>
      )}
      </div>
    </div>
    </>
  )
}

export default UserHome