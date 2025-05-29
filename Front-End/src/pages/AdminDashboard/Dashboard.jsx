import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import api from "../../api/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/adminHeader/adminHeader";
const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [newModal, setNewModal] = useState(false);
  const [newUser, setNewUser] = useState({ email: "", name: "", password: "" });
  const [error, setError] = useState({ email: "", name: "", password: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const handleEditClick = (user) => {
    setEditUser(user);
    setFormData({ name: user.name, email: user.email });
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);
  const closeNewModal = () => setNewModal(false);
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    console.log("admin is", admin);

    if (!admin) {
      navigate("/admin/login");
    }
  }, [navigate]);
  const [userDatas, setUserDatas] = useState([]);
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    const token = localStorage.getItem("token");
    api
      .get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserDatas(response.data.userData);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("user data fetching error", error);
        alert(error.response.data.msg);
      });
  };

  const deleteuser = (userId) => {
    const token = localStorage.getItem("token");
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await api.delete(`/admin/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res);
          Swal.fire(res.data.msg);
          fetchUser();
        } catch (error) {
          console.log("user deleting error", error);
          Swal.fire(error.res.data.msg);
        }
      }
    });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.put(`/admin/users/${editUser._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      Swal.fire(response.data.msg);
      setModalOpen(false);
      fetchUser();
    } catch (error) {
      console.log("user updating error", error);
    }
  };

  const handleNewModal = () => {
    setNewModal(true);
  };

  const validate = () => {
    const newError = { email: "", name: "", password: "" };
    let isValidate = true;

    if (!newUser.email) {
      newError.email = "Email is required";
      isValidate = false;
    }
    if (!newUser.name) {
      newError.name = "Name is required";
      isValidate = false;
    }
    if (!newUser.password) {
      newError.password = "Password is required";
      isValidate = false;
    }
    setError(newError);
    return isValidate;
  };

  const handleNewUserSave = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await api.post("/admin/newUsers", newUser);
        console.log(response);
        Swal.fire(response.data.msg);
        setNewModal(false);
        setNewUser({ email: "", name: "", password: "" });
        setSearchQuery(""); 
        fetchUser(); 
      } catch (error) {
        console.log(error);
        Swal.fire(error.response?.data?.msg || "Error adding user");
      }
    }
  };

  const filterUserData = userDatas.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  return (
    <>
      <div className="admin-dashboard">
        <div className="main-content">
          <AdminHeader />
          <div className="dashboard-content">
            <div className="content-card">
              <div className="card-header">
                <h3>User List</h3>
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="search-button">🔍</button>
                </div>
                <button className="add-user" onClick={handleNewModal}>
                  Add User
                </button>
              </div>

              <div className="table-container">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Create At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(searchQuery ? filterUserData : userDatas).map(
                      (users, index) => (
                        <tr key={index}>
                          <td>
                            <div className="user-info">
                              <div className="user-avatar">
                                <img
                                  src={`http://localhost:2323/uploads/${users?.profilePic?.[0]}`}
                                  alt="Profile"
                                  className="w-10 h-10 rounded-full object-cover"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                              <span>{users?.name}</span>
                            </div>
                          </td>
                          <td>{users?.email}</td>
                          <td>
                            {new Date(users?.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="edit-btn"
                                onClick={() => handleEditClick(users)}
                              >
                                Edit
                              </button>
                              <button
                                className="delete-btn"
                                onClick={() => deleteuser(users._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={handleClose}>
              &times;
            </button>

            <h3 className="modal-title">Edit Profile</h3>
            <form>
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </form>

            <div className="button-group">
              <button className="cancel-button" onClick={handleClose}>
                Cancel
              </button>
              <button className="save-button" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {newModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeNewModal}>
              &times;
            </button>
            <h3 className="modal-title">Add Profile</h3>
            <form>
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
                {error && <p style={{ color: "red" }}>{error.name}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
                {error && <p style={{ color: "red" }}>{error.email}</p>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
                {error && <p style={{ color: "red" }}>{error.password}</p>}
              </div>
            </form>

            <div className="button-group">
              <button className="cancel-button" onClick={closeNewModal}>
                Cancel
              </button>
              <button className="save-button" onClick={handleNewUserSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
