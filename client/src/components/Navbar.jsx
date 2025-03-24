import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Navbar = ({ isAuthenticated, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full py-4 px-6 flex justify-between items-center bg-white border-b border-gray-200">
      <Link to={isAuthenticated ? "/dashboard" : "/"}>
        <Logo size="small" />
      </Link>

      <div className="flex gap-4">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="text-black hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/send" className="text-black hover:text-blue-600">
              Send Money
            </Link>
            <button
              onClick={handleLogout}
              className="text-black hover:text-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className="text-black hover:text-blue-600">
              Sign In
            </Link>
            <Link to="/signup" className="text-black hover:text-blue-600">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
