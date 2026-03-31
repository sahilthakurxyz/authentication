import React from "react";
import "../pages/Css.css";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="logo">AuthSystem</div>

      <nav className="nav-links">
        <span onClick={() => navigate("/")}>Home</span>
        <span onClick={() => navigate("/login")}>Login</span>
        {!user?.auth && <span onClick={() => navigate("/signup")}>Signup</span>}
        <span onClick={() => navigate("/dashboard")}>Dashboard</span>
      </nav>

      <div className="profile">
        <Link to="/profile">
          <span className="profile-circle">P</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
