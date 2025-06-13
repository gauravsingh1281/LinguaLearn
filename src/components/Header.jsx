import React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <nav className="fixed inset-x-0 top-0 bg-white border-b shadow-md z-50">
      <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* Brand / Logo */}
        <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">
          Lingua<span className="text-gray-800">Learn</span>
        </h1>

        {/* Nav links */}
        <div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-medium transition 
                       ${
                         isActive
                           ? "bg-blue-600 text-white shadow"
                           : "text-gray-700 hover:bg-gray-100"
                       }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/flashcards"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-medium transition 
                       ${
                         isActive
                           ? "bg-blue-600 text-white shadow"
                           : "text-gray-700 hover:bg-gray-100"
                       }`
            }
          >
            Flashcards
          </NavLink>
          <NavLink
            to="/quizzes"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-medium transition 
                       ${
                         isActive
                           ? "bg-blue-600 text-white shadow"
                           : "text-gray-700 hover:bg-gray-100"
                       }`
            }
          >
            Quizzes
          </NavLink>
          <NavLink
            to="/progress"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-medium transition 
                       ${
                         isActive
                           ? "bg-blue-600 text-white shadow"
                           : "text-gray-700 hover:bg-gray-100"
                       }`
            }
          >
            Progress Tracker
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
