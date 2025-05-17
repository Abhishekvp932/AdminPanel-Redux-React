import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import UserLogin from "./pages/UserLogin/UserLogin"
import UserHome from './pages/UserHome/UserHome'
import UserSignup from "./pages/UserSignup/UserSignup"
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<UserLogin/>}/>
         <Route path="/" element={<UserHome/>}/>
         <Route path="/signup" element={<UserSignup/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App