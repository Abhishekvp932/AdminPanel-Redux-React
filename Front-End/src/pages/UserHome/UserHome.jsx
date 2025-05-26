import React,{useEffect,useState} from 'react'
import './UserHome.css'
import { useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import { useNavigate } from 'react-router-dom'
import api from '../../api/api'
function UserHome() {
  const {user, isLoggedIn} = useSelector((state) => state.user.user || {});
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!user && !localUser) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?._id) return;

      try {
        const token = localStorage.getItem('token');
        const res = await api.get(`/auth/users/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('API response data:', res.data);
        setUserData(res.data.user);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [user?._id]);

  return (
    <>
      <Header />
      <div className="user-home-container">
        <div className="welcome-container">
          {isLoggedIn ? (
            <h1>Welcome, {userData?.name || 'User'}</h1>
          ) : (
            <h1>You are not logged in</h1>
          )}
        </div>
      </div>
    </>
  );
}


export default UserHome