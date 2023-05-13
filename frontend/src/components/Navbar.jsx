import React from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = ({ onChange }) => {
  const cart = useSelector((state) => state.cart);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  const handleRedirection = () => {
    if (localStorage.getItem("token")) {
      window.location.href = "/products";
      return;
    }
    window.location.href = "/";
  }
  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-white shadow-md">
      <div className="flex items-center font-bold text-2xl">
        <button onClick={handleRedirection}>
        BrilliantPro
        </button>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative w-full max-w-xs">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <FaSearch className="text-gray-600" />
          </span>
          <input
            type="text"
            className="block w-full rounded-lg pl-10 pr-4 py-2 text-sm placeholder-gray-400 border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
            placeholder="Search for products..."
            onChange={(e) => onChange(e)}
            onKeyDown={(e) => {onChange(e)}}
          />
        </div>
      </div>
      <div className="flex items-center">
        <Link to="/cart" className="flex items-center text-sm font-semibold py-2 px-3 rounded border border-gray-900 text-gray-900">
          <FaShoppingCart className="mr-1" />
          Cart
          &nbsp;
          <span className="navbar-cart-count">{cart.length}</span>
        </Link>
        <button onClick={handleLogout} className="flex items-center text-sm font-semibold py-2 px-3 rounded border border-gray-900 text-gray-900 ml-5">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
