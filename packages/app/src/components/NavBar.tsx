import React from 'react';
import cn from 'classnames';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export type Props = {
  className?: string;
};

export const NavBar: React.FC<Props> = ({ className }) => (
  <div className={cn('navbar bg-transparent', className)}>
    <div className="flex-1">
      <a className="btn btn-ghost normal-case text-xl">ourcolor</a>
    </div>

    <div className="flex-none">
      <ConnectButton />
    </div>
  </div>
);

export default NavBar;
