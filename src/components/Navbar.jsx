// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">Inventory Management</Link>
        <div className="flex space-x-4">
          {user ? (
            <>
              <Link to="/products" className="text-white">Products</Link>
              <Link to="/add-product" className="text-white">Add Product</Link>
              <span className="text-white">Hello, {user.username}</span>
              <button onClick={logout} className="text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white">Login</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
