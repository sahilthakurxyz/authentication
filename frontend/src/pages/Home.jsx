import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home">
      <div>
        <Link to="/">Home Page</Link>
      </div>
      <button>
        <Link to="/login">login</Link>
      </button>
      <button>
        <Link to="/signIn">signIn</Link>
      </button>
      <button>
        <Link to="/dashboard">dashboard</Link>
      </button>
    </div>
  );
};

export default Home;
