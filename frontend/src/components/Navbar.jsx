import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


export default function Navbar() {
const { user, logout } = useContext(AuthContext);
const nav = useNavigate();


const handleLogout = () => {
logout();
nav('/');
};


return (
<nav className="nav">
<div className="nav-left">
<Link to="/" className="brand">MovieReviews</Link>
<Link to="/movies">Movies</Link>
</div>
<div className="nav-right">
{user ? (
<>
<Link to={`/profile/${user.id}`}>{user.username}</Link>
<button onClick={handleLogout}>Logout</button>
</>
) : (
<Link to="/login">Login</Link>
)}
</div>
</nav>
);
}
