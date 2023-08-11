import React from 'react';
import cn from 'classnames';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';

export type Props = {
  className?: string;
};

export const NavBar: React.FC<Props> = ({ className }) => (
  <div className={cn('navbar bg-transparent', className)}>
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost normal-case text-xl">
        ourcolor
      </Link>
    </div>

    <div className="flex-none">
      <ul className="menu menu-horizontal items-center space-x-3">
        <li>
          <Link to="/colors" className="link -mb-1.5">
            Collection
          </Link>
        </li>
        <li>
          <Link to="/colors/new" className="link -mb-1.5">
            New Color
          </Link>
        </li>
        <li>
          <ConnectButton />
        </li>
      </ul>
    </div>
  </div>
);

export default NavBar;
