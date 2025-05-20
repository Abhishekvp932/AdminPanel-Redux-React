import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import UserLogin from "./pages/UserLogin/UserLogin"
import UserHome from './pages/UserHome/UserHome'
import UserSignup from "./pages/UserSignup/UserSignup"
import AdminLogin from './pages/AdminLogin/AdminLogin'
import UserProfile from "./pages/UserProfile/UserProfile"
import AdminDashboard from './pages/AdminDashboard/Dashboard'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin/>}/>
         <Route path="/home" element={<UserHome/>}/>
         <Route path="/signup" element={<UserSignup/>}/>
         <Route path="/admin/login" element={<AdminLogin/>}/>
         <Route path="/profile/:id" element={<UserProfile/>}/>
         <Route path="/dashboard" element={<AdminDashboard/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App