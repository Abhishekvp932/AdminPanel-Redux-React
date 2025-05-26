import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/userSlice';
import api from '../../api/api'
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData,setData] = useState(null)
  const {user} = useSelector((state) => state.user);
    useEffect(()=>{
      if(!user){
        navigate('/login')
      }
    },[user,navigate])



  useEffect(() => {
  const token = localStorage.getItem('token');
  const userId = user?.user?._id;

  if (userId && token) {
    api.get(`/auth/userdata/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => setData(response.data))
    .catch(error => console.log('header user data getting error', error));
  } else {
    setData(null);
  }
}, [user?.user?._id]);



  const handleLogout = () => {  
    dispatch(logoutUser());
    localStorage.removeItem('user');
    localStorage.removeItem('token')
    navigate('/')
  };

  const handleProfile = () => {
     if(user && user?.user?._id){
        navigate(`/profile/${user?.user?._id}`)
     }
  };

  return (
    <>
    <div className="top-bar">
        <div className="profile-icon">
          <img 
            src={`http://localhost:2323/uploads/${userData?.user?.profilePic?.[0]}`}
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="profile">
          <button onClick={handleProfile}>
            <i className="bi bi-person-circle"></i>
          </button>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <span>Logout</span>
        </button>
      </div>

    </>
  );
}

export default Header;
