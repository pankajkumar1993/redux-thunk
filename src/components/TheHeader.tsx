import React from 'react';
import NavLinks from './NavLink';

const TheHeader: React.FC = () => {
  return (
    <header className="bg-green-500 p-4 flex items-center justify-between">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-black font-bold text-lg">My App</span>
        </div>
        <NavLinks />
      </div>
    </header>
  );
};

export default TheHeader;
