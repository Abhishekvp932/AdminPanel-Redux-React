import "./UserProfile.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedfile, setSelectedFile] = useState(null);
  const { user } = useSelector((state) => state.user.user);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.trim().length < 3) {
      setNameError("Name must be at least 3 characters.");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError("");
    }
  };

  useEffect(() => {
    if (userData) {
      setName(userData.user.name);
      setEmail(userData.user.email);
    }
  }, [userData]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (id) {
      api
        .get(`/auth/profile/${id}`)
        .then((response) => {
          setUserData(response.data);
          setName(response.data.user.name);
          setEmail(response.data.user.email);
        })
        .catch((error) => {
          console.log("user data fetching error", error);
        });
    }
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSaveProfile = async () => {
    if (nameError || emailError || name.trim() === "" || email.trim() === "") {
      alert("Please fix the errors before saving.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    if (selectedfile) {
      formData.append("profilePic", selectedfile);
    }

    try {
      const response = await api.post(`/auth/profile/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUserData(response.data);
      setSelectedFile(null);
      alert("User profile updated successfully");
      navigate("/home");
    } catch (error) {
      console.log("user profile updating error", error);
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="user-profile-container">
        <div className="profile-header">
          <div className="profile-pic-container">
            <div className="profile-pic-placeholder">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <label htmlFor="profile-upload" className="profile-pic-upload">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14"></path>
              </svg>
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <div className="profile-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={handleNameChange} />
            {nameError && <p className="error-text">{nameError}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={handleEmailChange} />
            {emailError && <p className="error-text">{emailError}</p>}
          </div>

          <button
            type="button"
            onClick={handleSaveProfile}
            className="save-button"
            disabled={nameError || emailError || !name || !email}
          >
            Save Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
