import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/actions/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    if (user?.auth) {
      navigate("/");
    }
  }, [user?.auth, navigate]);
  const handleChange = (e) => {
    const name = e.target.name;

    setInfo({
      ...info,
      [name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signupUser(info));
    setInfo({
      ...info,
      name: "",
      email: "",
      password: "",
    });
  };
  return (
    <div>
      <div className="auth-container">
        <div className="auth-box">
          <form onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            <br />
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={info?.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={info?.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={info?.password}
              onChange={handleChange}
              required
            />
            <p style={{ display: "flex", justifyContent: "end" }}>
              already user ?
              <Link to="/login" style={{ textDecoration: "none" }}>
                login
              </Link>
            </p>
            <button type="submit">register</button>
          </form>
        </div>
      </div>
    </div>
  );
};
