import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const RootLayout: React.FC = () => (
  <div>
    <NavBar className="h-16 absolute z-10" />

    <Outlet />
  </div>
);

export default RootLayout;
