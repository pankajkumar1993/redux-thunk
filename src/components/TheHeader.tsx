import React from 'react';
import { Link } from 'react-router-dom';

const TheHeader: React.FC = () => {
  return (
    <header className="bg-green-500 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-white font-bold text-lg">My App</span>
      </div>
      <nav className="flex space-x-4">
        <Link
          to="/"
          className="text-white hover:text-gray-200 font-medium"
        >
          Users
        </Link>
        <Link
          to="/todos"
          className="text-white hover:text-gray-200 font-medium"
        >
          Todos
        </Link>
      </nav>
    </header>
  );
};

export default TheHeader;
