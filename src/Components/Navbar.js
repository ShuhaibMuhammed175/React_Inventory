import React from 'react';
import AuthContext from "./AuthContext";
import { Link } from 'react-router-dom';
import '../css/navbar.css'; 
import {useContext } from 'react';

const Navbar = () => {
    const { authToken,  logoutUser, user } = useContext(AuthContext);
    return (
        <nav className="navbar">
          <div className="navbar-logo">
            <Link to="/">Inventory</Link>
          </div>
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add-product">Add Product</Link></li>
            <li><Link to="/update-product">Add or Remove</Link></li>
          </ul>
          <div className="navbar-auth">
            {authToken && authToken.access ? (
              <>
                <span>Welcome {user.username}</span>
                <button className="navbar-logout" onClick={logoutUser}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register" className="navbar-register">Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      );
};

export default Navbar;
