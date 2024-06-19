// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <div className="navbar">
      <h2>Admin</h2>
      <ul>
        <li>
          <Link to="/">Post Manager</Link>
        </li>
        <li>
          <Link to="/user">User Manager</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
