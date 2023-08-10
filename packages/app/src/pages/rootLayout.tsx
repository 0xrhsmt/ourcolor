import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const RootLayout = () => (
  <div>
    <NavBar className="h-16 absolute z-10" />

    <Outlet />
  </div>
);

export default RootLayout;
