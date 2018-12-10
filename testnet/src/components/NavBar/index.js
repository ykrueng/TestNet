import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav-container">
      <h1>Welcome to TestNet!</h1>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/quizzes">Quizzes</NavLink>
        <NavLink to="/posts">Forum</NavLink>
      </nav>
    </div>
  );
};

export default NavBar;
