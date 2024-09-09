import React from 'react';
import { Link } from 'react-router-dom';

const TheFooter: React.FC = () => {
  return (
    <footer className="bg-gray-800 p-6 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Copyright Text */}
        <div className="mb-4 md:mb-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
        </div>

        {/* Footer Links */}
        <nav className="flex space-x-4 mb-4 md:mb-0">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/users" className="hover:text-gray-400">
            Users
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default TheFooter;
