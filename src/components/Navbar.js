import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function NavBar({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  function logOut() {
    setLoggedIn(false);
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/books" className="nav-link">Books</Link>
      {loggedIn ? (
        <button className="logout-button" onClick={logOut}>Logout</button>
      ) : (
        <Link to="/login" className="nav-link">Login</Link>
      )}
      <Link to="/cart" className="nav-link">Cart 🛒</Link>
    </nav>
  );
}

export default NavBar;
