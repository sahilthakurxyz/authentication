import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Common.css";
import { loginUser } from "../redux/actions/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };
  useEffect(() => {
    if (user?.success) {
      navigate("/");
    }
  }, [navigate, user]);
  return (
    <div className="auth-container">
      <div className="auth-box">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <br />
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a>Forget password</a>
          <p style={{ display: "flex", justifyContent: "end" }}>
            new user ?
            <Link to="/signup" style={{ textDecoration: "none" }}>
              sign up
            </Link>
          </p>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
