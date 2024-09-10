import React from 'react';
import NavLinks from './NavLink';

const TheFooter: React.FC = () => {
  return (
    <footer className="bg-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Copyright Text */}
        <div className="mb-4 md:mb-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
        </div>

        {/* Footer Links */}
        <NavLinks />
      </div>
    </footer>
  );
};

export default TheFooter;
