import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setOpen(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout error", err);
    }
  };


  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-black border-b border-gray-800">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">

        
        <Link to="/" className="text-xl font-semibold text-white">
          Gig<span className="text-indigo-500">Flow</span>
        </Link>

        
        <div
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent
          ${open ? "block" : "hidden"} md:flex`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 items-center p-4 md:p-0">
            <li>
              <Link to="/" className="text-white hover:text-indigo-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-gray-300 hover:text-indigo-400 transition">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/post" className="text-gray-300 hover:text-indigo-400 transition">
                Post Gig
              </Link>
            </li>

            
            <li className="md:hidden mt-2">
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-500 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        
        <div className="flex items-center space-x-3">
          
          <button
            onClick={handleLogout}
            className="hidden md:inline-block text-sm cursor-pointer font-medium text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>

          
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-400 hover:bg-gray-800 rounded-lg p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      </div>
    </nav>
  );
}


