import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { AuthContext } from '../context/AuthContext';


const Layout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">
      {user ? (
        <div className="flex"> 
          <Sidebar />
          <main className="ml-16 p-4">
            <Outlet />
          </main>
        </div>
      ) : (
        <>
          <Navbar />
          <main className="p-4">
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
};

export default Layout;
