import { ConnectButton } from '@rainbow-me/rainbowkit';

export const NavBar = () => (
  <div className="navbar bg-base-100">
    <div className="flex-1">
      <a className="btn btn-ghost normal-case text-xl">ourcolor</a>
    </div>
    <div className="flex-none">
      <ConnectButton />
    </div>
  </div>
);

export default NavBar;
