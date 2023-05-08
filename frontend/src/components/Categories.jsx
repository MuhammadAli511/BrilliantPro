import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="bg-gray-100 py-2">
      <nav className="flex items-center justify-center">
        <Link to="/men-clothing" className="px-4 py-2 text-gray-600 hover:text-gray-800">
          Men's Clothing
        </Link>
        <Link to="/women-clothing" className="px-4 py-2 text-gray-600 hover:text-gray-800">
          Women's Clothing
        </Link>
        <Link to="/jewelery" className="px-4 py-2 text-gray-600 hover:text-gray-800">
          Jewelery
        </Link>
        <Link to="/electronics" className="px-4 py-2 text-gray-600 hover:text-gray-800">
          Electronics
        </Link>
      </nav>
    </div>
  );
};

export default Categories;
