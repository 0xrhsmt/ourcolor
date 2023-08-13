import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => (
  <div
    className="hero min-h-screen"
    style={{
      backgroundImage: 'url(/ourcolor.svg)',
      backgroundRepeat: 'repeat',
      backgroundSize: '20% auto',
    }}
  >
    <div className="hero-overlay bg-opacity-70"></div>
    <div className="hero-content text-center text-neutral-content">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold">ourcolor</h1>
        <p className="mb-5">
          Create your own color and share it with your friends.
        </p>

        <Link to="/colors">
          <button className="btn btn-primary">Get Started</button>
        </Link>
      </div>
    </div>
  </div>
);

export default HomePage;
