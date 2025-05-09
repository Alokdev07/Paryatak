// Layout.jsx
import React from 'react';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;