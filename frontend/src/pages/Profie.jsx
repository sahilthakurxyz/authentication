import React from "react";
import "./Css.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Profie = () => {
  const { loading, user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && loading === false) navigate("/");
  }, [user?.success, user]);
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Image */}
        <div className="avatar-wrapper">
          <img src={user?.user?.avatar} alt="Profile" className="avatar" />
        </div>

        {/* User Info */}
        <div className="profile-info">
          <h2>{user?.user?.name}</h2>
          <p className="email">{user?.user?.email}</p>
          {/* <span className="role">{user.role}</span> */}
        </div>

        {/* Details */}
        <div className="profile-details">
          <div className="detail-row">
            <span>Account Created</span>
            <span>{user?.user && formatDate(user?.user?.createdAt)}</span>
          </div>
          <div className="detail-row">
            <span>Last Updated</span>
            <span>{user?.user && formatDate(user?.user?.updatedAt)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="profile-actions">
          <button className="primary-btn">Edit Profile</button>
          <button className="secondary-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profie;
